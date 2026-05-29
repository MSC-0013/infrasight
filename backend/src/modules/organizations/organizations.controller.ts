import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { createOrgSchema, idParamSchema, listOrgsSchema } from './organizations.schema.js';
import { organizationsService } from './organizations.service.js';
export const organizationsController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => { const q = listOrgsSchema.parse(req.query); const r = await organizationsService.list(q); return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize))); },
  get: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await organizationsService.get(id))); },
  create: async (req: FastifyRequest, reply: FastifyReply) => { const body = createOrgSchema.parse(req.body); return reply.status(201).send(success(await organizationsService.create(body))); },
  members: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await organizationsService.members(id))); },
};
