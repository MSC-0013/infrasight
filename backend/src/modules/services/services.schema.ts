import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const listQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
});

export const idParamSchema = z.object({ id: z.string().uuid() });
export const nameParamSchema = z.object({ name: z.string().min(1) });

export type ListQuery = z.infer<typeof listQuerySchema>;
