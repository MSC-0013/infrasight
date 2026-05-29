import { AppError } from '../../core/errors/app-error.js';
import { servicesRepository } from './services.repository.js';
import type { ListQuery } from './services.schema.js';

export const servicesService = {
  list: (orgId: string, q: ListQuery) => servicesRepository.findMany(orgId, q),

  async get(orgId: string, id: string) {
    const row = await servicesRepository.findById(orgId, id);
    if (!row) throw AppError.notFound('Service not found');
    return row;
  },

  async getByName(orgId: string, name: string) {
    const row = await servicesRepository.findByName(orgId, name);
    if (!row) throw AppError.notFound('Service not found');
    return row;
  },
};
