import type { FastifyInstance } from 'fastify';
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
