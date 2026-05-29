import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import {
  createIncidentSchema,
  idParamSchema,
  listIncidentsSchema,
  timelineSchema,
  updateIncidentSchema,
} from './incidents.schema.js';
import { incidentsService } from './incidents.service.js';

export const incidentsController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    const q = listIncidentsSchema.parse(req.query);
    const r = await incidentsService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  get: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await incidentsService.get(req.orgId!, id)));
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const body = createIncidentSchema.parse(req.body);
    const incident = await incidentsService.create(req.orgId!, body, req.user?.id);
    return reply.status(201).send(success(incident));
  },

  update: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateIncidentSchema.parse(req.body);
    await incidentsService.update(req.orgId!, id, body);
    return reply.send(success({ updated: true }));
  },

  acknowledge: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    await incidentsService.acknowledge(req.orgId!, id);
    return reply.send(success({ acknowledged: true }));
  },

  resolve: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const { note } = z.object({ note: z.string().default('Resolved') }).parse(req.body);
    await incidentsService.resolve(req.orgId!, id, note);
    return reply.send(success({ resolved: true }));
  },

  timeline: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    const body = timelineSchema.parse(req.body);
    const entry = await incidentsService.addTimeline(
      req.orgId!,
      id,
      body.content,
      body.eventType,
      req.user?.name ?? 'user',
    );
    return reply.status(201).send(success(entry));
  },
};
