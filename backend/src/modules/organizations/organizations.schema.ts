import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listOrgsSchema = paginationSchema;
export const createOrgSchema = z.object({ name: z.string().min(1), slug: z.string().min(1), plan: z.enum(['hobby','team','enterprise']).optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
