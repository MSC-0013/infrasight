#!/usr/bin/env node
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../src/modules');

const specs = [
  {
    name: 'users',
    routes: `app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
  app.patch('/:id', (r,p) => ctrl.update(r,p));
  app.delete('/:id', (r,p) => ctrl.remove(r,p));`,
    repo: `async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const where = { orgId, isActive: true, ...(q.search ? { OR: [{ name: { contains: q.search, mode: 'insensitive' } }, { email: { contains: q.search, mode: 'insensitive' } }] } : {}) };
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take, orderBy: { createdAt: 'desc' }, select: { id: true, email: true, name: true, role: true, orgId: true, avatarUrl: true, createdAt: true, lastLoginAt: true } }),
      prisma.user.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  }
  async findById(orgId: string, id: string) { return prisma.user.findFirst({ where: { id, orgId } }); }
  async update(orgId: string, id: string, data: { name?: string; role?: import('@prisma/client').UserRole; avatarUrl?: string }) {
    return prisma.user.updateMany({ where: { id, orgId }, data });
  }
  async softDelete(orgId: string, id: string) { return prisma.user.updateMany({ where: { id, orgId }, data: { isActive: false } }); }`,
    model: 'User',
  },
  {
    name: 'organizations',
    routes: `app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
  app.post('/', (r,p) => ctrl.create(r,p));
  app.patch('/:id', (r,p) => ctrl.update(r,p));
  app.get('/:id/members', (r,p) => ctrl.members(r,p));`,
    repo: `async list(q: ListQuery) {
    const { skip, take } = paginate(q);
    const [items, total] = await Promise.all([
      prisma.organization.findMany({ skip, take, orderBy: { createdAt: 'desc' }, include: { _count: { select: { users: true } } } }),
      prisma.organization.count(),
    ]);
    return { items: items.map(o => ({ ...o, memberCount: o._count.users })), total, page: q.page, pageSize: q.pageSize };
  }
  async get(id: string) { return prisma.organization.findUnique({ where: { id }, include: { _count: { select: { users: true } } } }); }
  async create(data: { name: string; slug: string; plan?: 'hobby'|'team'|'enterprise' }) {
    const org = await prisma.organization.create({ data: { ...data, plan: data.plan ?? 'hobby' } });
    await prisma.orgSettings.create({ data: { orgId: org.id } });
    return org;
  }
  async update(id: string, data: { name?: string; plan?: 'hobby'|'team'|'enterprise' }) {
    return prisma.organization.update({ where: { id }, data });
  }
  async members(orgId: string) {
    return prisma.user.findMany({ where: { orgId, isActive: true }, select: { id: true, email: true, name: true, role: true, createdAt: true } });
  }`,
    model: 'Organization',
    skipOrg: true,
  },
];

// Write users + organizations manually in script - for rest use template
const simpleModules = [
  'traces', 'logs', 'queues', 'workers', 'incidents', 'alerts', 'deployments', 'slos',
  'analytics', 'mlops', 'services', 'topology', 'audit', 'settings', 'notifications', 'ai',
];

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

for (const mod of simpleModules) {
  const dir = join(root, mod);
  mkdirSync(dir, { recursive: true });
  const M = cap(mod);
  const tableMap = {
    traces: 'trace', logs: 'logEntry', queues: 'queue', workers: 'worker',
    incidents: 'incident', alerts: 'alertRule', deployments: 'deployment',
    slos: 'slo', analytics: 'analyticsSnapshot', mlops: 'mlModel',
    services: 'service', topology: 'topologyNode', audit: 'auditEntry',
    settings: 'orgSettings', notifications: 'notification', ai: 'aiInsight',
  };
  const delegate = tableMap[mod] ?? mod;

  writeFileSync(join(dir, `${mod}.schema.ts`), `import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listQuerySchema = paginationSchema.extend({ search: z.string().optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
export type ListQuery = z.infer<typeof listQuerySchema>;
`);

  writeFileSync(join(dir, `${mod}.repository.ts`), `import { prisma } from '../../core/database/prisma.js';
import { paginate } from '../../core/utils/pagination.js';
import type { ListQuery } from './${mod}.schema.js';

export const ${mod}Repository = {
  async findMany(orgId: string, q: ListQuery) {
    const { skip, take } = paginate(q);
    const delegate = (prisma as Record<string, { findMany: Function; count: Function }>).${delegate};
    const where = { orgId };
    const [items, total] = await Promise.all([
      delegate.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } }),
      delegate.count({ where }),
    ]);
    return { items, total, page: q.page, pageSize: q.pageSize };
  },
  async findById(orgId: string, id: string) {
    const delegate = (prisma as Record<string, { findFirst: Function }>).${delegate};
    return delegate.findFirst({ where: { id, orgId } });
  },
};
`);

  writeFileSync(join(dir, `${mod}.service.ts`), `import { AppError } from '../../core/errors/app-error.js';
import { ${mod}Repository } from './${mod}.repository.js';
import type { ListQuery } from './${mod}.schema.js';

export const ${mod}Service = {
  list: (orgId: string, q: ListQuery) => ${mod}Repository.findMany(orgId, q),
  async get(orgId: string, id: string) {
    const row = await ${mod}Repository.findById(orgId, id);
    if (!row) throw AppError.notFound('${M} not found');
    return row;
  },
};
`);

  writeFileSync(join(dir, `${mod}.controller.ts`), `import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listQuerySchema } from './${mod}.schema.js';
import { ${mod}Service } from './${mod}.service.js';

export const ${mod}Controller = {
  async list(req: FastifyRequest, reply: FastifyReply) {
    const q = listQuerySchema.parse(req.query);
    const r = await ${mod}Service.list(req.orgId!, q);
    return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize)));
  },
  async get(req: FastifyRequest, reply: FastifyReply) {
    const { id } = idParamSchema.parse(req.params);
    return reply.send(success(await ${mod}Service.get(req.orgId!, id)));
  },
};
`);

  writeFileSync(join(dir, `${mod}.routes.ts`), `import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { ${mod}Controller as ctrl } from './${mod}.controller.js';

export async function ${mod}Routes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
}
`);

  writeFileSync(join(dir, 'index.ts'), `export { ${mod}Routes } from './${mod}.routes.js';\n`);
  console.log('bootstrapped', mod);
}

// users module full
const usersDir = join(root, 'users');
mkdirSync(usersDir, { recursive: true });
writeFileSync(join(usersDir, 'users.schema.ts'), `import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listUsersSchema = paginationSchema.extend({ search: z.string().optional() });
export const updateUserSchema = z.object({ name: z.string().optional(), role: z.enum(['super_admin','admin','sre','developer','viewer']).optional(), avatarUrl: z.string().url().optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
export type ListUsersQuery = z.infer<typeof listUsersSchema>;
`);
writeFileSync(join(usersDir, 'users.repository.ts'), `import { prisma } from '../../core/database/prisma.js';
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
`);
writeFileSync(join(usersDir, 'users.service.ts'), `import { AppError } from '../../core/errors/app-error.js';
import { usersRepository } from './users.repository.js';
import type { ListUsersQuery } from './users.schema.js';
export const usersService = {
  list: (orgId: string, q: ListUsersQuery) => usersRepository.findMany(orgId, q),
  async get(orgId: string, id: string) { const u = await usersRepository.findById(orgId, id); if (!u) throw AppError.notFound(); return u; },
  update: (orgId: string, id: string, data: Record<string, unknown>) => usersRepository.update(orgId, id, data),
  remove: (orgId: string, id: string) => usersRepository.softDelete(orgId, id),
};
`);
writeFileSync(join(usersDir, 'users.controller.ts'), `import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { idParamSchema, listUsersSchema, updateUserSchema } from './users.schema.js';
import { usersService } from './users.service.js';
export const usersController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => { const q = listUsersSchema.parse(req.query); const r = await usersService.list(req.orgId!, q); return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize))); },
  get: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await usersService.get(req.orgId!, id))); },
  update: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); const body = updateUserSchema.parse(req.body); await usersService.update(req.orgId!, id, body); return reply.send(success({ updated: true })); },
  remove: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); await usersService.remove(req.orgId!, id); return reply.send(success({ deleted: true })); },
};
`);
writeFileSync(join(usersDir, 'users.routes.ts'), `import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { requirePermission } from '../../core/middleware/rbac.middleware.js';
import { usersController as c } from './users.controller.js';
export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', { preHandler: requirePermission('manage:users') }, (r,p) => c.list(r,p));
  app.get('/:id', { preHandler: requirePermission('manage:users') }, (r,p) => c.get(r,p));
  app.patch('/:id', { preHandler: requirePermission('manage:users') }, (r,p) => c.update(r,p));
  app.delete('/:id', { preHandler: requirePermission('manage:users') }, (r,p) => c.remove(r,p));
}
`);
writeFileSync(join(usersDir, 'index.ts'), `export { usersRoutes } from './users.routes.js';\n`);

// organizations
const orgDir = join(root, 'organizations');
mkdirSync(orgDir, { recursive: true });
writeFileSync(join(orgDir, 'organizations.schema.ts'), `import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';
export const listOrgsSchema = paginationSchema;
export const createOrgSchema = z.object({ name: z.string().min(1), slug: z.string().min(1), plan: z.enum(['hobby','team','enterprise']).optional() });
export const idParamSchema = z.object({ id: z.string().uuid() });
`);
writeFileSync(join(orgDir, 'organizations.repository.ts'), `import { prisma } from '../../core/database/prisma.js';
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
`);
writeFileSync(join(orgDir, 'organizations.service.ts'), `import { AppError } from '../../core/errors/app-error.js';
import { organizationsRepository } from './organizations.repository.js';
export const organizationsService = {
  list: organizationsRepository.list,
  async get(id: string) { const o = await organizationsRepository.get(id); if (!o) throw AppError.notFound(); return o; },
  create: organizationsRepository.create,
  members: organizationsRepository.members,
};
`);
writeFileSync(join(orgDir, 'organizations.controller.ts'), `import type { FastifyReply, FastifyRequest } from 'fastify';
import { paginatedResponse } from '../../core/utils/pagination.js';
import { success } from '../../core/utils/response.js';
import { createOrgSchema, idParamSchema, listOrgsSchema } from './organizations.schema.js';
import { organizationsService } from './organizations.service.js';
export const organizationsController = {
  list: async (req: FastifyRequest, reply: FastifyReply) => { const q = listOrgsSchema.parse(req.query); const r = await organizationsService.list(q); return reply.send(success(paginatedResponse(r.items, r.total, r.page, r.pageSize))); },
  get: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await organizationsService.get(id))); },
  create: async (req: FastifyRequest, reply: FastifyReply) => { const body = createOrgSchema.parse(req.body); return reply.status(201).send(success(await organizationsService.create(body))); },
  members: async (req: FastifyRequest, reply: FastifyReply) => { const { id } = idParamSchema.parse(req.params); return reply.send(success(await organizationsService.members(id))); },
};
`);
writeFileSync(join(orgDir, 'organizations.routes.ts'), `import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { requireRole } from '../../core/middleware/rbac.middleware.js';
import { organizationsController as c } from './organizations.controller.js';
export async function organizationsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', { preHandler: requireRole('super_admin') }, (r,p) => c.list(r,p));
  app.post('/', { preHandler: requireRole('super_admin') }, (r,p) => c.create(r,p));
  app.get('/:id', (r,p) => c.get(r,p));
  app.get('/:id/members', (r,p) => c.members(r,p));
}
`);
writeFileSync(join(orgDir, 'index.ts'), `export { organizationsRoutes } from './organizations.routes.js';\n`);

console.log('Bootstrap complete');
