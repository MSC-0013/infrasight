import { AppError } from '../../core/errors/app-error.js';
import { deploymentsRepository } from './deployments.repository.js';
import type { ListQuery } from './deployments.schema.js';
import type { z } from 'zod';
import type { createDeploymentSchema } from './deployments.schema.js';

type CreateInput = z.infer<typeof createDeploymentSchema>;

export const deploymentsService = {
  list: (orgId: string, q: ListQuery) => deploymentsRepository.findMany(orgId, q),

  async get(orgId: string, id: string) {
    const row = await deploymentsRepository.findById(orgId, id);
    if (!row) throw AppError.notFound();
    return row;
  },

  create: (orgId: string, data: CreateInput, userEmail: string) =>
    deploymentsRepository.create(orgId, data, userEmail),
};
