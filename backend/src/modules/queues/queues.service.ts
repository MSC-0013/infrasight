import { AppError } from '../../core/errors/app-error.js';
import { queuesRepository } from './queues.repository.js';
import type { ListQuery } from './queues.schema.js';

export const queuesService = {
  list: (orgId: string, q: ListQuery) => queuesRepository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await queuesRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Queues not found');
    return row;
  },
};
