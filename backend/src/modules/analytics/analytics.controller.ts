import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import { analyticsService } from './analytics.service.js';

export const analyticsController = {
  overview: async (req: FastifyRequest, reply: FastifyReply) =>
    reply.send(success(await analyticsService.overview(req.orgId!))),

  throughput: async (req: FastifyRequest, reply: FastifyReply) => {
    const q = req.query as { from?: string; to?: string };
    const to = q.to ? new Date(q.to) : new Date();
    const from = q.from ? new Date(q.from) : new Date(to.getTime() - 3600_000);
    return reply.send(success(await analyticsService.throughput(req.orgId!, from, to)));
  },
};
