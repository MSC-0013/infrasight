import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listUsersSchema = paginationSchema.extend({ search: z.string().optional() });
export const updateUserSchema = z.object({ name: z.string().optional(), role: z.enum(['super_admin','admin','sre','developer','viewer']).optional(), avatarUrl: z.string().url().optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
export type ListUsersQuery = z.infer<typeof listUsersSchema>;
