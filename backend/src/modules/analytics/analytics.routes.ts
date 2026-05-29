import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { analyticsController as c } from './analytics.controller.js';

export async function analyticsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/overview', (r, p) => c.overview(r, p));
  app.get('/throughput', (r, p) => c.throughput(r, p));
  app.get('/', (r, p) => c.overview(r, p));
}
