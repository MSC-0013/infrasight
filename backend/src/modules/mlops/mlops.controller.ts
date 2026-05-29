import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listQuerySchema } from './mlops.schema.js';
import { mlopsService } from './mlops.service.js';

export const mlopsController = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const q = listQuerySchema.parse(req.query);
    const r = await mlopsService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },
  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await mlopsService.get(req.orgId!, id)));
  },
};
