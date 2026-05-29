import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './topology.schema.js';

export const topologyRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const delegate = (prisma as Record<string, { findMany: Function; count: Function }>).topologyNode;
    const where = { orgId };
    const [items, total] = await Promise.all([
      delegate.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      delegate.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },
  async findById(orgId: string, id: string) {
    const delegate = (prisma as Record<string, { findFirst: Function }>).topologyNode;
    return delegate.findFirst({ where: { id, orgId } });
  },
};
