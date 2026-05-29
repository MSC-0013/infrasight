import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { tracesController as c } from './traces.controller.js';

export async function tracesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.get('/:traceId', (r, p) => c.get(r, p));
  app.post('/', (r, p) => c.ingest(r, p));
}
