import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { success } from '../../core/utils/response.js';
import { aiService } from './ai.service.js';

const incidentBody = z.object({ incidentId: z.string().uuid() });

export const aiController = {
  analyzeIncident: async (req: FastifyRequest, reply: FastifyReply) => {
    const { incidentId } = incidentBody.parse(req.body);
    return reply.send(success(await aiService.analyzeIncident(req.orgId!, incidentId)));
  },
  listInsights: async (req: FastifyRequest, reply: FastifyReply) =>
    reply.send(success(await aiService.listInsights(req.orgId!))),
};
