import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listUsersSchema, updateUserSchema } from './users.schema.js';
import { usersService } from './users.service.js';
export const usersController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => { const q = listUsersSchema.parse(req.query); const r = await usersService.list(req.orgId!, q); return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize))); },
  get: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await usersService.get(req.orgId!, id))); },
  update: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); const body = updateUserSchema.parse(req.body); await usersService.update(req.orgId!, id, body); return reply.send(success({ updated: true })); },
  remove: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); await usersService.remove(req.orgId!, id); return reply.send(success({ deleted: true })); },
};
