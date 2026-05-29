import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { slosController as ctrl } from './slos.controller.js';

export async function slosRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
}
