#!/usr/bin/env node
/**
 * Generates module boilerplate for all Pulse backend domains.
 */
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const modulesDir = join(__dirname, '../src/modules');

const modules = [
  'auth', 'users', 'organizations', 'events', 'traces', 'logs',
  'queues', 'workers', 'incidents', 'alerts', 'deployments', 'slos',
  'analytics', 'mlops', 'services', 'topology', 'audit', 'settings',
  'notifications', 'ai',
];

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

for (const name of modules) {
  const dir = join(modulesDir, name);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const mod = name;
  const Mod = capitalize(name);

  const schema = `import { z } from 'zod';
import { paginationSchema } from '../../core/utils/pagination.js';

export const list${Mod}QuerySchema = paginationSchema.extend({
  search: z.string().optional(),
});

export const idParamSchema = z.object({
  id: z.string().uuid(),
});

export type List${Mod}Query = z.infer<typeof list${Mod}QuerySchema>;
`;

  const dto = `export type { List${Mod}Query } from './${mod}.schema.js';
`;

  const model = `// Re-export Prisma types for ${mod} module
export type { } from '@prisma/client';
`;

  const repository = `import { prisma } from '../../core/database/prisma.js';
import type { List${Mod}Query } from './${mod}.schema.js';
import { paginate } from '../../core/utils/pagination.js';

export class ${Mod}Repository {
  async findMany(orgId: string, query: List${Mod}Query) {
    const { skip, take } = paginate(query);
    // Module-specific queries implemented in ${mod}.repository.ts
    return { items: [] as unknown[], total: 0, skip, take };
  }
}

export const ${mod}Repository = new ${Mod}Repository();
`;

  const service = `import { AppError } from '../../core/errors/app-error.js';
import { ${mod}Repository } from './${mod}.repository.js';
import type { List${Mod}Query } from './${mod}.schema.js';

export class ${Mod}Service {
  async list(orgId: string, query: List${Mod}Query) {
    return ${mod}Repository.findMany(orgId, query);
  }

  async getById(orgId: string, id: string) {
    throw AppError.notFound('${Mod} not found — override in repository');
  }
}

export const ${mod}Service = new ${Mod}Service();
`;

  const controller = `import type { FastifyReply, FastifyRequest } from 'fastify';
import { success } from '../../core/utils/response.js';
import { list${Mod}QuerySchema } from './${mod}.schema.js';
import { ${mod}Service } from './${mod}.service.js';

export class ${Mod}Controller {
  async list(request: FastifyRequest, reply: FastifyReply) {
    const query = list${Mod}QuerySchema.parse(request.query);
    const result = await ${mod}Service.list(request.orgId!, query);
    return reply.send(success(result));
  }
}

export const ${mod}Controller = new ${Mod}Controller();
`;

  const routes = `import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { ${mod}Controller } from './${mod}.controller.js';

export async function ${mod}Routes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);

  app.get('/', (req, reply) => ${mod}Controller.list(req, reply));
}
`;

  const index = `export { ${mod}Routes } from './${mod}.routes.js';
export { ${mod}Service } from './${mod}.service.js';
`;

  const files = {
    [`${mod}.schema.ts`]: schema,
    [`${mod}.dto.ts`]: dto,
    [`${mod}.model.ts`]: model,
    [`${mod}.repository.ts`]: repository,
    [`${mod}.service.ts`]: service,
    [`${mod}.controller.ts`]: controller,
    [`${mod}.routes.ts`]: routes,
    'index.ts': index,
  };

  for (const [file, content] of Object.entries(files)) {
    const path = join(dir, file);
    if (!existsSync(path) || process.argv.includes('--force')) {
      writeFileSync(path, content);
      console.log('wrote', path);
    }
  }
}

console.log('Done. Override auth, events, etc. with full implementations.');
