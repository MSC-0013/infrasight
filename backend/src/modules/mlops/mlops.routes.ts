import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { mlopsController as ctrl } from './mlops.controller.js';

export async function mlopsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
}
