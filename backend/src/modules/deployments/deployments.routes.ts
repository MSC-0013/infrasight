import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { deploymentsController as c } from './deployments.controller.js';

export async function deploymentsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.get('/:id', (r, p) => c.get(r, p));
  app.post('/', (r, p) => c.create(r, p));
}
