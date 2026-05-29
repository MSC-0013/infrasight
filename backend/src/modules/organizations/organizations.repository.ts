import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
export const organizationsRepository = {
  list: async (q: { page: number; pageSize: number }) => {
    const { skip, take } = paginate(q);
    const [items, total] = await Promise.all([
      prisma.organization.findMany({ skip, take, include: { _count: { select: { users: true } } } }),
      prisma.organization.count(),
    ]);
    return { items: items.map(o => ({ id: o.id, name: o.name, slug: o.slug, plan: o.plan, memberCount: o._count.users, createdAt: o.createdAt })), total, page: q.page, pageSize: q.pageSize };
  },
  get: (id: string) => prisma.organization.findUnique({ where: { id } }),
  create: async (data: { name: string; slug: string; plan?: 'hobby'|'team'|'enterprise' }) => {
    const org = await prisma.organization.create({ data: { name: data.name, slug: data.slug, plan: data.plan ?? 'hobby' } });
    await prisma.orgSettings.create({ data: { orgId: org.id } });
    return org;
  },
  members: (orgId: string) => prisma.user.findMany({ where: { orgId, isActive: true } }),
};
