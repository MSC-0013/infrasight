import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { auditController as ctrl } from './audit.controller.js';

export async function auditRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => ctrl.list(r,p));
  app.get('/:id', (r,p) => ctrl.get(r,p));
}
