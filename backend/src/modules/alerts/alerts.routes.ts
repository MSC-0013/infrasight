import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { alertsController as c } from './alerts.controller.js';

export async function alertsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.get('/:id', (r, p) => c.get(r, p));
  app.post('/:id/acknowledge', (r, p) => c.acknowledge(r, p));
}
