import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listQuerySchema } from './alerts.schema.js';
import { alertsService } from './alerts.service.js';

export const alertsController = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const q = listQuerySchema.parse(req.query);
    const r = await alertsService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await alertsService.get(req.orgId!, id)));
  },

  async acknowledge(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    const result = await alertsService.acknowledge(req.orgId!, id, req.user!.id);
    return reply.send(success(result));
  },
};
