import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const listIncidentsSchema = paginationSchema.extend({
  status: z.enum(['open', 'investigating', 'identified', 'mitigated', 'resolved']).optional(),
  severity: z.enum(['P1', 'P2', 'P3', 'P4', 'P5']).optional(),
  service: z.string().optional(),
});

export const createIncidentSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  severity: z.enum(['P1', 'P2', 'P3', 'P4', 'P5']).default('P3'),
  service: z.string().min(1),
  tags: z.array(z.string()).optional(),
});

export const updateIncidentSchema = z.object({
  title: z.string().optional(),
  status: z.enum(['open', 'investigating', 'identified', 'mitigated', 'resolved']).optional(),
  severity: z.enum(['P1', 'P2', 'P3', 'P4', 'P5']).optional(),
  assigneeId: z.string().uuid().optional(),
});

export const timelineSchema = z.object({
  content: z.string().min(1),
  eventType: z.string().default('comment'),
});

export const idParamSchema = z.object({ id: z.string().uuid() });
