import { prisma } from '../../core/database/prisma.js';

export const dashboardService = {
  async metrics(orgId: string) {
    const oneHourAgo = new Date(Date.now() - 3600_000);

    const [
      eventsLastHour,
      eventsTotal,
      failedLastHour,
      openIncidents,
      firingAlerts,
      workers,
      services,
      queues,
      latencyAgg,
    ] = await Promise.all([
      prisma.event.count({ where: { orgId, timestamp: { gte: oneHourAgo } } }),
      prisma.event.count({ where: { orgId } }),
      prisma.event.count({
        where: { orgId, timestamp: { gte: oneHourAgo }, status: 'failed' },
      }),
      prisma.incident.count({
        where: { orgId, status: { notIn: ['resolved'] } },
      }),
      prisma.alertRule.count({
        where: { orgId, status: 'firing' },
      }),
      prisma.worker.findMany({ where: { orgId } }),
      prisma.service.findMany({ where: { orgId } }),
      prisma.queue.findMany({ where: { orgId } }),
      prisma.event.aggregate({
        where: { orgId, timestamp: { gte: oneHourAgo } },
        _avg: { latencyMs: true },
      }),
    ]);

    const onlineWorkers = workers.filter((w) => w.status === 'online').length;
    const healthyServices = services.filter((s) => s.status === 'healthy').length;
    const avgP95 = services.length
      ? Math.round(services.reduce((a, s) => a + s.p95Ms, 0) / services.length)
      : 0;
    const avgErrorRate = services.length
      ? +(services.reduce((a, s) => a + s.errorRate, 0) / services.length).toFixed(4)
      : 0;
    const totalRps = services.reduce((a, s) => a + s.rps, 0);
    const avgUptime = services.length
      ? +(services.reduce((a, s) => a + s.uptimePct, 0) / services.length).toFixed(3)
      : 100;
    const avgQueueLag = queues.length
      ? Math.round(queues.reduce((a, q) => a + q.lagMs, 0) / queues.length)
      : 0;

    const errorRate =
      eventsLastHour > 0 ? +((failedLastHour / eventsLastHour) * 100).toFixed(2) : 0;

    return {
      eventsPerHour: eventsLastHour,
      eventsTotal,
      activeAlerts: firingAlerts,
      onlineWorkers,
      totalWorkers: workers.length,
      openIncidents,
      healthyServices,
      totalServices: services.length,
      avgP95: avgP95 || Math.round(latencyAgg._avg.latencyMs ?? 0),
      avgErrorRate: errorRate || avgErrorRate * 100,
      totalRps: +totalRps.toFixed(1),
      avgUptime,
      avgQueueLag,
    };
  },
};
