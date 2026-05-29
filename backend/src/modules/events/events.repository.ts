import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { CreateEventInput, EventFilter } from './events.schema.js';

export class EventsRepository {
  async findMany(orgId: string, filter: EventFilter) {
    const { skip, take } = paginate(filter);
    const where: Prisma.EventWhereInput = {
      orgId,
      ...(filter.status && { status: filter.status }),
      ...(filter.severity && { severity: filter.severity }),
      ...(filter.queue && { queue: filter.queue }),
      ...(filter.worker && { worker: filter.worker }),
      ...(filter.from || filter.to
        ? {
            timestamp: {
              ...(filter.from && { gte: filter.from }),
              ...(filter.to && { lte: filter.to }),
            },
          }
        : {}),
      ...(filter.search
        ? {
            OR: [
              { eventType: { contains: filter.search, mode: 'insensitive' } },
              { queue: { contains: filter.search, mode: 'insensitive' } },
              { worker: { contains: filter.search, mode: 'insensitive' } },
            ],
          }
        : {}),
    };

    const [items, total] = await Promise.all([
      prisma.event.findMany({ where, skip, take, orderBy: { timestamp: 'desc' } }),
      prisma.event.count({ where }),
    ]);

    return { items, total, page: filter.page, pageSize: filter.pageSize };
  }

  async findById(orgId: string, id: string) {
    return prisma.event.findFirst({ where: { id, orgId } });
  }

  async create(orgId: string, orgName: string, input: CreateEventInput) {
    return prisma.event.create({
      data: {
        orgId,
        organization: orgName,
        eventType: input.eventType,
        status: input.status,
        severity: input.severity,
        queue: input.queue,
        worker: input.worker,
        latencyMs: input.latencyMs,
        retries: input.retries,
        traceId: input.traceId,
        payload: input.payload as Prisma.InputJsonValue,
        processedAt: new Date(),
      },
    });
  }

  async createMany(orgId: string, orgName: string, inputs: CreateEventInput[]) {
    return prisma.event.createMany({
      data: inputs.map((e) => ({
        orgId,
        organization: orgName,
        eventType: e.eventType,
        status: e.status,
        severity: e.severity,
        queue: e.queue,
        worker: e.worker,
        latencyMs: e.latencyMs,
        retries: e.retries,
        traceId: e.traceId,
        payload: e.payload as Prisma.InputJsonValue,
        processedAt: new Date(),
      })),
    });
  }

  async delete(orgId: string, id: string) {
    return prisma.event.deleteMany({ where: { id, orgId } });
  }

  async stats(orgId: string, from?: Date, to?: Date) {
    const where: Prisma.EventWhereInput = {
      orgId,
      ...(from || to
        ? { timestamp: { ...(from && { gte: from }), ...(to && { lte: to }) } }
        : {}),
    };

    const [total, failed, agg] = await Promise.all([
      prisma.event.count({ where }),
      prisma.event.count({ where: { ...where, status: 'failed' } }),
      prisma.event.aggregate({
        where,
        _avg: { latencyMs: true },
      }),
    ]);

    const successRate = total > 0 ? ((total - failed) / total) * 100 : 100;
    return {
      total,
      successRate: Math.round(successRate * 100) / 100,
      avgLatency: Math.round(agg._avg.latencyMs ?? 0),
      errorRate: total > 0 ? Math.round((failed / total) * 10000) / 100 : 0,
      p95: Math.round((agg._avg.latencyMs ?? 0) * 1.5),
      p99: Math.round((agg._avg.latencyMs ?? 0) * 2),
    };
  }
}

export const eventsRepository = new EventsRepository();
