import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const modulesDir = join(dirname(fileURLToPath(import.meta.url)), '../src/modules');

const orderByMap = {
  traces: 'startTime',
  logs: 'timestamp',
  audit: 'timestamp',
  analytics: 'bucket',
  notifications: 'createdAt',
  events: 'timestamp',
};

for (const [mod, field] of Object.entries(orderByMap)) {
  const path = join(modulesDir, mod, `${mod}.repository.ts`);
  try {
    let content = readFileSync(path, 'utf8');
    content = content.replace(/orderBy: \{ createdAt: 'desc' \}/g, `orderBy: { ${field}: 'desc' }`);
    writeFileSync(path, content);
    console.log('fixed', mod);
  } catch {
    /* skip */
  }
}

// settings: use findFirst
const settingsPath = join(modulesDir, 'settings', 'settings.repository.ts');
try {
  writeFileSync(settingsPath, `import { prisma } from '../../core/database/prisma.js';

export const settingsRepository = {
  get: (orgId: string) => prisma.orgSettings.findUnique({ where: { orgId } }),
  upsert: (orgId: string, data: { notificationPrefs?: object; retentionDays?: number }) =>
    prisma.orgSettings.upsert({
      where: { orgId },
      create: { orgId, ...data, notificationPrefs: data.notificationPrefs ?? {} },
      update: data,
    }),
  listApiKeys: (orgId: string) =>
    prisma.apiKey.findMany({ where: { orgId, revoked: false }, select: { id: true, name: true, keyPrefix: true, permissions: true, lastUsedAt: true, expiresAt: true, createdAt: true } }),
};
`);
  writeFileSync(join(modulesDir, 'settings', 'settings.service.ts'), `import { AppError } from '../../core/errors/app-error.js';
import { settingsRepository } from './settings.repository.js';
export const settingsService = {
  get: async (orgId: string) => {
    const s = await settingsRepository.get(orgId);
    if (!s) return { orgId, notificationPrefs: {}, retentionDays: 7 };
    return s;
  },
  update: settingsRepository.upsert,
  apiKeys: settingsRepository.listApiKeys,
};
`);
  writeFileSync(join(modulesDir, 'settings', 'settings.controller.ts'), `import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import { settingsService } from './settings.service.js';
export const settingsController = {
  get: async (req: FastifyRequest, reply: FastifyReply) => reply.send(success(await settingsService.get(req.orgId!))),
  apiKeys: async (req: FastifyRequest, reply: FastifyReply) => reply.send(success(await settingsService.apiKeys(req.orgId!))),
};
`);
  writeFileSync(join(modulesDir, 'settings', 'settings.routes.ts'), `import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { settingsController as c } from './settings.controller.js';
export async function settingsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => c.get(r,p));
  app.get('/api-keys', (r,p) => c.apiKeys(r,p));
}
`);
  console.log('fixed settings');
} catch (e) {
  console.error(e);
}
