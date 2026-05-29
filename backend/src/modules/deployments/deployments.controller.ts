import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { createDeploymentSchema, idParamSchema, listQuerySchema } from './deployments.schema.js';
import { deploymentsService } from './deployments.service.js';

export const deploymentsController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    const q = listQuerySchema.parse(req.query);
    const r = await deploymentsService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  get: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await deploymentsService.get(req.orgId!, id)));
  },

  create: async (req: FastifyRequest, reply: FastifyReply) => {
    const body = createDeploymentSchema.parse(req.body);
    const d = await deploymentsService.create(req.orgId!, body, req.user!.email);
    return reply.status(201).send(success(d));
  },
};
