import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { notificationsController as c } from './notifications.controller.js';

export async function notificationsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.patch('/:id/read', (r, p) => c.markRead(r, p));
  app.post('/:id/read', (r, p) => c.markRead(r, p));
}
