import { AppError } from '../../core/errors/app-error.js';
import { workersRepository } from './workers.repository.js';
import type { ListQuery } from './workers.schema.js';

export const workersService = {
  list: (orgId: string, q: ListQuery) => workersRepository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await workersRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Workers not found');
    return row;
  },
};
