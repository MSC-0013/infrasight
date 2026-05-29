import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listQuerySchema, nameParamSchema } from './services.schema.js';
import { servicesService } from './services.service.js';

export const servicesController = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const q = listQuerySchema.parse(req.query);
    const r = await servicesService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await servicesService.get(req.orgId!, id)));
  },

  async getByName(req: FastifyRequest, reply: FastifyReply) {
    const { name } = nameParamSchema.parse(req.params);
    return reply.send(success(await servicesService.getByName(req.orgId!, name)));
  },
};
