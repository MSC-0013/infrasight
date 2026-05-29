import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './mlops.schema.js';

export const mlopsRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { orgId };
    const [items, total] = await Promise.all([
      prisma.mlModel.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.mlModel.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.mlModel.findFirst({ where: { id, orgId } }),
};
