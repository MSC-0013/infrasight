import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { requirePermission } from '../../core/middleware/rbac.middleware.js';
import { eventsController } from './events.controller.js';

export async function eventsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);

  app.get('/', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.list(r, p));
  app.get('/stats', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.stats(r, p));
  app.get('/:id', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.get(r, p));
  app.post('/', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.create(r, p));
  app.post('/batch', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.batch(r, p));
  app.delete('/:id', { preHandler: requirePermission('read:events') }, (r, p) => eventsController.remove(r, p));
}
