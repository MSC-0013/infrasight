import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import { settingsService } from './settings.service.js';
export const settingsController = {
  get: async (req: FastifyRequest, reply: FastifyReply) => reply.send(success(await settingsService.get(req.orgId!))),
  apiKeys: async (req: FastifyRequest, reply: FastifyReply) => reply.send(success(await settingsService.apiKeys(req.orgId!))),
};
