import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { ingestTraceSchema, listQuerySchema, traceIdParamSchema } from './traces.schema.js';
import { tracesService } from './traces.service.js';

export const tracesController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => {
    const q = listQuerySchema.parse(req.query);
    const r = await tracesService.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },

  get: async (req: FastifyRequest, reply: FastifyReply) => {
    const { traceId } = traceIdParamSchema.parse(req.params);
    return reply.send(success(await tracesService.get(req.orgId!, traceId)));
  },

  ingest: async (req: FastifyRequest, reply: FastifyReply) => {
    const body = ingestTraceSchema.parse(req.body);
    const trace = await tracesService.ingest(req.orgId!, body);
    return reply.status(201).send(success(trace));
  },
};
