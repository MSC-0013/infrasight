import { AppError } from '../../core/errors/app-error.js';
import { organizationsRepository } from './organizations.repository.js';
export const organizationsService = {
  list: organizationsRepository.list,
  async get(id: string) { const o = await organizationsRepository.get(id); if (!o) throw AppError.notFound(); return o; },
  create: organizationsRepository.create,
  members: organizationsRepository.members,
};
