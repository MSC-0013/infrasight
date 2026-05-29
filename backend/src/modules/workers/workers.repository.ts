import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './workers.schema.js';

export const workersRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { orgId };
    const [items, total] = await Promise.all([
      prisma.worker.findMany({ where, skip, take, orderBy: { name: 'asc' } }),
      prisma.worker.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.worker.findFirst({ where: { id, orgId } }),
};
