import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const eventFilterSchema = paginationSchema.extend({
  status: z.enum(['success', 'failed', 'retrying', 'queued', 'processing']).optional(),
  severity: z.enum(['info', 'warning', 'error', 'critical']).optional(),
  queue: z.string().optional(),
  worker: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
  search: z.string().optional(),
});

export const createEventSchema = z.object({
  eventType: z.string().min(1),
  status: z.enum(['success', 'failed', 'retrying', 'queued', 'processing']).default('success'),
  severity: z.enum(['info', 'warning', 'error', 'critical']).default('info'),
  queue: z.string().default('default'),
  worker: z.string().default('worker-1'),
  latencyMs: z.number().int().min(0).default(0),
  retries: z.number().int().min(0).default(0),
  traceId: z.string().optional(),
  payload: z.record(z.unknown()).default({}),
});

export const batchEventsSchema = z.object({
  events: z.array(createEventSchema).min(1).max(1000),
});

export const idParamSchema = z.object({ id: z.string().uuid() });

export type EventFilter = z.infer<typeof eventFilterSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
