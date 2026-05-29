import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { servicesController as c } from './services.controller.js';

export async function servicesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r, p) => c.list(r, p));
  app.get('/by-name/:name', (r, p) => c.getByName(r, p));
  app.get('/:id', (r, p) => c.get(r, p));
}
