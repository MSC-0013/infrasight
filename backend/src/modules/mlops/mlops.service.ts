import { AppError } from '../../core/errors/app-error.js';
import { mlopsRepository } from './mlops.repository.js';
import type { ListQuery } from './mlops.schema.js';

export const mlopsService = {
  list: (orgId: string, q: ListQuery) => mlopsRepository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await mlopsRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Mlops not found');
    return row;
  },
};
