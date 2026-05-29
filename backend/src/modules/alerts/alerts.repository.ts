import type { Prisma } from '@prisma/client';
import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './alerts.schema.js';

export const alertsRepository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where: Prisma.AlertRuleWhereInput = { orgId };
    const [items, total] = await Promise.all([
      prisma.alertRule.findMany({ where, skip, take, orderBy: { updatedAt: 'desc' } }),
      prisma.alertRule.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },

  findById: (orgId: string, id: string) =>
    prisma.alertRule.findFirst({ where: { id, orgId } }),

  acknowledge: (orgId: string, id: string, userId: string) =>
    prisma.alertRule.updateMany({
      where: { id, orgId },
      data: {
        status: 'acknowledged',
        acknowledgedBy: userId,
      },
    }),
};
