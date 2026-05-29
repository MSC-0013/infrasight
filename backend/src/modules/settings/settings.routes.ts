import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { settingsController as c } from './settings.controller.js';
export async function settingsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.get('/', (r,p) => c.get(r,p));
  app.get('/api-keys', (r,p) => c.apiKeys(r,p));
}
