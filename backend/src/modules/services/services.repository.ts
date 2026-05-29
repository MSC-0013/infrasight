import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './services.schema.js';

export const servicesRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where: Prisma.ServiceWhereInput = {
      orgId,
      ...(q.search ? { name: { contains: q.search, mode: 'insensitive' } } : {}),
    };
    const [items, total] = await Promise.all([
      prisma.service.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.service.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.service.findFirst({ where: { id, orgId } }),

  findByName: (orgId: string, name: string) =>
    prisma.service.findFirst({ where: { orgId, name } }),
};
