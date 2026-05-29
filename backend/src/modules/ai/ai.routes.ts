import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { aiController as c } from './ai.controller.js';

export async function aiRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);
  app.post('/analyze-incident', (r, p) => c.analyzeIncident(r, p));
  app.get('/insights', (r, p) => c.listInsights(r, p));
  app.get('/', (r, p) => c.listInsights(r, p));
}
