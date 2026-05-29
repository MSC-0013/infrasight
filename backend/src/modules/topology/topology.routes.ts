import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { topologyController as c } from './topology.controller.js';

export async function topologyRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.graph(r, p));
  app.post('/discover', (r, p) => c.discover(r, p));
}
