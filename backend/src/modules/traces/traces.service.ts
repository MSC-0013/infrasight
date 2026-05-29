import { AppError } from '../../core/errors/app-error.js';
import { tracesRepository } from './traces.repository.js';
import type { ListQuery } from './traces.schema.js';
import type { z } from 'zod';
import type { ingestTraceSchema } from './traces.schema.js';

type IngestInput = z.infer<typeof ingestTraceSchema>;

export const tracesService = {
  list: (orgId: string, q: ListQuery) => tracesRepository.findMany(orgId, q),

  async get(orgId: string, traceId: string) {
    const trace = await tracesRepository.findByTraceId(orgId, traceId);
    if (!trace) throw AppError.notFound('Trace not found');
    return trace;
  },

  ingest: (orgId: string, data: IngestInput) => tracesRepository.ingest(orgId, data),
};
