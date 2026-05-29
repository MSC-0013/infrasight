import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const listQuerySchema = paginationSchema.extend({
  service: z.string().optional(),
  status: z.enum(['ok', 'error', 'unset']).optional(),
});

export const ingestTraceSchema = z.object({
  traceId: z.string(),
  rootService: z.string(),
  rootName: z.string(),
  spans: z.array(
    z.object({
      spanId: z.string(),
      parentSpanId: z.string().optional(),
      name: z.string(),
      service: z.string(),
      startTime: z.coerce.date(),
      endTime: z.coerce.date(),
      durationMs: z.number().int(),
      status: z.enum(['ok', 'error', 'unset']).default('ok'),
      attributes: z.record(z.unknown()).default({}),
    }),
  ).min(1),
});

export const traceIdParamSchema = z.object({ traceId: z.string() });
export type ListQuery = z.infer<typeof listQuerySchema>;
