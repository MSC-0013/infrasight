import { AppError } from '../../core/errors/app-error.js';
import { alertsRepository } from './alerts.repository.js';
import type { ListQuery } from './alerts.schema.js';

export const alertsService = {
  list: (orgId: string, q: ListQuery) => alertsRepository.findMany(orgId, q),

  async get(orgId: string, id: string) {
    const row = await alertsRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Alert not found');
    return row;
  },

  async acknowledge(orgId: string, id: string, userId: string) {
    const result = await alertsRepository.acknowledge(orgId, id, userId);
    if (result.count === 0) throw AppError.notFound('Alert not found');
    return { acknowledged: true };
  },
};
