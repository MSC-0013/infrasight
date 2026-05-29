import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { incidentsController as c } from './incidents.controller.js';

export async function incidentsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.post('/', (r, p) => c.create(r, p));
  app.get('/:id', (r, p) => c.get(r, p));
  app.patch('/:id', (r, p) => c.update(r, p));
  app.post('/:id/acknowledge', (r, p) => c.acknowledge(r, p));
  app.post('/:id/resolve', (r, p) => c.resolve(r, p));
  app.post('/:id/timeline', (r, p) => c.timeline(r, p));
}
