import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { z } from 'zod';
import type {
  createIncidentSchema,
  listIncidentsSchema,
  updateIncidentSchema,
} from './incidents.schema.js';

type ListQuery = z.infer<typeof listIncidentsSchema>;
type CreateInput = z.infer<typeof createIncidentSchema>;
type UpdateInput = z.infer<typeof updateIncidentSchema>;

export const incidentsRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where: Prisma.IncidentWhereInput = {
      orgId,
      ...(q.status && { status: q.status }),
      ...(q.severity && { severity: q.severity }),
      ...(q.service && { service: q.service }),
    };
    const [items, total] = await Promise.all([
      prisma.incident.findMany({
        where,
        skip,
        take,
        orderBy: { openedAt: 'desc' },
        include: { timeline: { orderBy: { occurredAt: 'asc' }, take: 20 } },
      }),
      prisma.incident.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.incident.findFirst({
      where: { id, orgId },
      include: { timeline: { orderBy: { occurredAt: 'asc' } }, postMortem: true },
    }),

  create: (orgId: string, data: CreateInput, reporterId?: string) =>
    prisma.incident.create({
      data: {
        orgId,
        title: data.title,
        description: data.description,
        severity: data.severity,
        service: data.service,
        tags: data.tags ?? [],
        reporterId,
        timeline: {
          create: {
            orgId,
            eventType: 'created',
            content: 'Incident opened',
            actorName: 'system',
          },
        },
      },
      include: { timeline: true },
    }),

  update: (orgId: string, id: string, data: UpdateInput) =>
    prisma.incident.updateMany({ where: { id, orgId }, data }),

  acknowledge: (orgId: string, id: string) =>
    prisma.incident.updateMany({
      where: { id, orgId },
      data: { status: 'investigating', acknowledgedAt: new Date() },
    }),

  resolve: (orgId: string, id: string, note: string) =>
    prisma.$transaction([
      prisma.incident.updateMany({
        where: { id, orgId },
        data: { status: 'resolved', resolvedAt: new Date() },
      }),
      prisma.incidentTimeline.create({
        data: { incidentId: id, orgId, eventType: 'resolved', content: note, actorName: 'system' },
      }),
    ]),

  addTimeline: (orgId: string, incidentId: string, content: string, eventType: string, actorName: string) =>
    prisma.incidentTimeline.create({
      data: { orgId, incidentId, content, eventType, actorName },
    }),
};
