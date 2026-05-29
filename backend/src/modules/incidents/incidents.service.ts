import { AppError } from '../../core/errors/app-error.js';
import { publish, REDIS_CHANNELS } from '../../core/redis/client.js';
import { incidentsRepository } from './incidents.repository.js';
import type { z } from 'zod';
import type { createIncidentSchema, listIncidentsSchema, updateIncidentSchema } from './incidents.schema.js';

type ListQuery = z.infer<typeof listIncidentsSchema>;
type CreateInput = z.infer<typeof createIncidentSchema>;
type UpdateInput = z.infer<typeof updateIncidentSchema>;

export const incidentsService = {
  list: (orgId: string, q: ListQuery) => incidentsRepository.findMany(orgId, q),

  async get(orgId: string, id: string) {
    const row = await incidentsRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Incident not found');
    return row;
  },

  async create(orgId: string, data: CreateInput, reporterId?: string) {
    const incident = await incidentsRepository.create(orgId, data, reporterId);
    await publish(REDIS_CHANNELS.incidentsLive, { orgId, incident });
    return incident;
  },

  update: (orgId: string, id: string, data: UpdateInput) =>
    incidentsRepository.update(orgId, id, data),

  acknowledge: (orgId: string, id: string) => incidentsRepository.acknowledge(orgId, id),

  resolve: (orgId: string, id: string, note: string) => incidentsRepository.resolve(orgId, id, note),

  addTimeline: (
    orgId: string,
    id: string,
    content: string,
    eventType: string,
    actorName: string,
  ) => incidentsRepository.addTimeline(orgId, id, content, eventType, actorName),
};
