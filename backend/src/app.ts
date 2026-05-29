import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';
import { config } from './core/config/index.js';
import { errorHandler } from './core/errors/error-handler.js';
import { authRoutes } from './modules/auth/index.js';
import { usersRoutes } from './modules/users/index.js';
import { organizationsRoutes } from './modules/organizations/index.js';
import { eventsRoutes } from './modules/events/index.js';
import { tracesRoutes } from './modules/traces/index.js';
import { logsRoutes } from './modules/logs/index.js';
import { queuesRoutes } from './modules/queues/index.js';
import { workersRoutes } from './modules/workers/index.js';
import { incidentsRoutes } from './modules/incidents/index.js';
import { alertsRoutes } from './modules/alerts/index.js';
import { deploymentsRoutes } from './modules/deployments/index.js';
import { slosRoutes } from './modules/slos/index.js';
import { analyticsRoutes } from './modules/analytics/index.js';
import { mlopsRoutes } from './modules/mlops/index.js';
import { servicesRoutes } from './modules/services/index.js';
import { topologyRoutes } from './modules/topology/index.js';
import { auditRoutes } from './modules/audit/index.js';
import { settingsRoutes } from './modules/settings/index.js';
import { notificationsRoutes } from './modules/notifications/index.js';
import { aiRoutes } from './modules/ai/index.js';
import { dashboardRoutes } from './modules/dashboard/dashboard.routes.js';
import { registerWebSocket } from './core/websocket/handler.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: config.isDev ? 'info' : 'warn',
      transport: config.isDev
        ? { target: 'pino-pretty', options: { colorize: true } }
        : undefined,
    },
  });

  await app.register(helmet, { contentSecurityPolicy: false });
  await app.register(cors, {
    origin: config.cors.origins,
    credentials: true,
  });
  await app.register(cookie);
  await app.register(rateLimit, {
    max: 200,
    timeWindow: '1 minute',
  });

  if (config.features.websocket) {
    await app.register(websocket);
    await registerWebSocket(app);
  }

  app.setErrorHandler(errorHandler);

  app.get('/health', async () => ({
    status: 'ok',
    service: 'infrasight-api',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  }));

  await app.register(
    async (api) => {
      await api.register(authRoutes, { prefix: '/auth' });
      await api.register(usersRoutes, { prefix: '/users' });
      await api.register(organizationsRoutes, { prefix: '/organizations' });
      await api.register(eventsRoutes, { prefix: '/events' });
      await api.register(tracesRoutes, { prefix: '/traces' });
      await api.register(logsRoutes, { prefix: '/logs' });
      await api.register(queuesRoutes, { prefix: '/queues' });
      await api.register(workersRoutes, { prefix: '/workers' });
      await api.register(incidentsRoutes, { prefix: '/incidents' });
      await api.register(alertsRoutes, { prefix: '/alerts' });
      await api.register(deploymentsRoutes, { prefix: '/deployments' });
      await api.register(slosRoutes, { prefix: '/slos' });
      await api.register(analyticsRoutes, { prefix: '/analytics' });
      await api.register(mlopsRoutes, { prefix: '/mlops' });
      await api.register(servicesRoutes, { prefix: '/services' });
      await api.register(topologyRoutes, { prefix: '/topology' });
      await api.register(auditRoutes, { prefix: '/audit' });
      await api.register(settingsRoutes, { prefix: '/settings' });
      await api.register(notificationsRoutes, { prefix: '/notifications' });
      await api.register(aiRoutes, { prefix: '/ai' });
      await api.register(dashboardRoutes, { prefix: '/dashboard' });
    },
    { prefix: '/api/v1' },
  );

  return app;
}
