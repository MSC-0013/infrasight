import { AppError } from '../../core/errors/app-error.js';
import { slosRepository } from './slos.repository.js';
import type { ListQuery } from './slos.schema.js';

export const slosService = {
  list: (orgId: string, q: ListQuery) => slosRepository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await slosRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Slos not found');
    return row;
  },
};
