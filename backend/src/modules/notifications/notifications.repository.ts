import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './notifications.schema.js';

export const notificationsRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const delegate = (prisma as Record<string, { findMany: Function; count: Function }>).notification;
    const where = { orgId };
    const [items, total] = await Promise.all([
      delegate.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      delegate.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },
  async findById(orgId: string, id: string) {
    const delegate = (prisma as Record<string, { findFirst: Function }>).notification;
    return delegate.findFirst({ where: { id, orgId } });
  },
};
