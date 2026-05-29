import { AppError } from '../../core/errors/app-error.js';
import { usersRepository } from './users.repository.js';
import type { ListUsersQuery } from './users.schema.js';
export const usersService = {
  list: (orgId: string, q: ListUsersQuery) => usersRepository.findMany(orgId, q),
  async get(orgId: string, id: string) { const u = await usersRepository.findById(orgId, id); if (!u) throw AppError.notFound(); return u; },
  update: (orgId: string, id: string, data: Record<string, unknown>) => usersRepository.update(orgId, id, data),
  remove: (orgId: string, id: string) => usersRepository.softDelete(orgId, id),
};
