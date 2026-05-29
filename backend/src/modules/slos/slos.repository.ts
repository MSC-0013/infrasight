import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './slos.schema.js';

export const slosRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { orgId };
    const [items, total] = await Promise.all([
      prisma.slo.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.slo.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.slo.findFirst({ where: { id, orgId } }),
};
