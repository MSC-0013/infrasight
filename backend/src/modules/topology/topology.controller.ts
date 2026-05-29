import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import { topologyService } from './topology.service.js';

export const topologyController = {
  graph: async (req: FastifyRequest, reply: FastifyReply) =>
    reply.send(success(await topologyService.getGraph(req.orgId!))),

  discover: async (req: FastifyRequest, reply: FastifyReply) =>
    reply.send(success(await topologyService.discover(req.orgId!))),
};
