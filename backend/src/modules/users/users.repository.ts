import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListUsersQuery } from './users.schema.js';
export const usersRepository = {
  findMany: async (orgId: string, q: ListUsersQuery) => {
    const { skip, take } = paginate(q);
    const where = { orgId, isActive: true };
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, name: true, role: true, orgId: true, avatarUrl: true, createdAt: true } }),
      prisma.user.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },
  findById: (orgId: string, id: string) => prisma.user.findFirst({ where: { id, orgId } }),
  update: (orgId: string, id: string, data: Record<string, unknown>) => prisma.user.updateMany({ where: { id, orgId }, data }),
  softDelete: (orgId: string, id: string) => prisma.user.updateMany({ where: { id, orgId }, data: { isActive: false } }),
};
