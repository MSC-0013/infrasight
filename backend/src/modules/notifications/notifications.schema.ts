import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listQuerySchema = paginationSchema.extend({ search: z.string().optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
export type ListQuery = z.infer<typeof listQuerySchema>;
