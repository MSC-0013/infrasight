import { prisma } from '../../core/database/prisma.js';
import { AppError } from '../../core/errors/app-error.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './notifications.schema.js';

export const notificationsService = {
  async list(userId: string, orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { userId, orgId };
    const [items, total] = await Promise.all([
      prisma.notification.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.notification.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  async markRead(userId: string, id: string) {
    const result = await prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
    if (result.count === 0) throw AppError.notFound();
    return { read: true };
  },
};
