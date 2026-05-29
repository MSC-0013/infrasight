import type { FastifyInstance } from 'fastify';
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
