import { AppError } from '../../core/errors/app-error.js';
import { auditRepository } from './audit.repository.js';
import type { ListQuery } from './audit.schema.js';

export const auditService = {
  list: (orgId: string, q: ListQuery) => auditRepository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await auditRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Audit not found');
    return row;
  },
};
