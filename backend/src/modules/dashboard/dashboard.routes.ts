import type { FastifyInstance } from 'fastify';
import { authenticate } from '../../core/middleware/auth.middleware.js';
import { success } from '../../core/utils/response.js';
import { dashboardService } from './dashboard.service.js';

export async function dashboardRoutes(app: FastifyInstance) {
  app.addHook('preHandler', authenticate);

  app.get('/metrics', async (req, reply) => {
    const data = await dashboardService.metrics(req.orgId!);
    return reply.send(success(data));
  });
}
