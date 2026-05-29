import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './audit.schema.js';

export const auditRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { orgId };
    const [items, total] = await Promise.all([
      prisma.auditEntry.findMany({ where, skip, take, orderBy: { timestamp: 'desc' } }),
      prisma.auditEntry.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.auditEntry.findFirst({ where: { id, orgId } }),
};
