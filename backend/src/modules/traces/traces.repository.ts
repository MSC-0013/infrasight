import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './traces.schema.js';

export const tracesRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where: Prisma.TraceWhereInput = {
      orgId,
      ...(q.service && { rootService: q.service }),
      ...(q.status && { status: q.status }),
    };
    const [items, total] = await Promise.all([
      prisma.trace.findMany({ where, skip, take, orderBy: { startTime: 'desc' } }),
      prisma.trace.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findByTraceId: (orgId: string, traceId: string) =>
    prisma.trace.findFirst({
      where: { orgId, traceId },
      include: { spans: { orderBy: { startTime: 'asc' } } },
    }),

  async ingest(
    orgId: string,
    data: {
      traceId: string;
      rootService: string;
      rootName: string;
      spans: Array<{
        spanId: string;
        parentSpanId?: string;
        name: string;
        service: string;
        startTime: Date;
        endTime: Date;
        durationMs: number;
        status: 'ok' | 'error' | 'unset';
        attributes: Record<string, unknown>;
      }>;
    },
  ) {
    const startTime = data.spans.reduce((min, s) => (s.startTime < min ? s.startTime : min), data.spans[0]!.startTime);
    const endTime = data.spans.reduce((max, s) => (s.endTime > max ? s.endTime : max), data.spans[0]!.endTime);
    const durationMs = endTime.getTime() - startTime.getTime();
    const errorCount = data.spans.filter((s) => s.status === 'error').length;

    return prisma.$transaction(async (tx) => {
      const trace = await tx.trace.upsert({
        where: { traceId: data.traceId },
        create: {
          traceId: data.traceId,
          orgId,
          rootSpanId: data.spans[0]!.spanId,
          rootService: data.rootService,
          rootName: data.rootName,
          durationMs,
          spanCount: data.spans.length,
          errorCount,
          status: errorCount > 0 ? 'error' : 'ok',
          startTime,
          endTime,
        },
        update: {
          durationMs,
          spanCount: data.spans.length,
          errorCount,
          status: errorCount > 0 ? 'error' : 'ok',
          endTime,
        },
      });

      for (const span of data.spans) {
        await tx.span.create({
          data: {
            spanId: span.spanId,
            traceId: data.traceId,
            parentSpanId: span.parentSpanId,
            orgId,
            name: span.name,
            service: span.service,
            startTime: span.startTime,
            endTime: span.endTime,
            durationMs: span.durationMs,
            status: span.status,
            attributes: span.attributes as Prisma.InputJsonValue,
          },
        });
      }

      return trace;
    });
  },
};
