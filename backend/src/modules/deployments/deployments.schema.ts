import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const listQuerySchema = paginationSchema.extend({
  service: z.string().optional(),
  environment: z.enum(['development', 'staging', 'production', 'canary']).optional(),
});

export const createDeploymentSchema = z.object({
  service: z.string().min(1),
  version: z.string().min(1),
  environment: z.enum(['development', 'staging', 'production', 'canary']).default('production'),
  sha: z.string().min(1),
  branch: z.string().default('main'),
  triggeredBy: z.string().optional(),
});

export const idParamSchema = z.object({ id: z.string().uuid() });
export type ListQuery = z.infer<typeof listQuerySchema>;
