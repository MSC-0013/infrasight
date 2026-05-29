import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listQuerySchema } from './notifications.schema.js';
import { notificationsService } from './notifications.service.js';

export const notificationsController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    const q = listQuerySchema.parse(req.query);
    const r = await notificationsService.list(req.user!.id, req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  markRead: async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await notificationsService.markRead(req.user!.id, id)));
  },
};
