import { prisma } from '../../core/database/prisma.js';

export const analyticsService = {
  async overview(orgId: string) {
    const [events, incidents, workers, services] = await Promise.all([
      prisma.event.count({ where: { orgId } }),
      prisma.incident.count({ where: { orgId, status: { not: 'resolved' } } }),
      prisma.worker.count({ where: { orgId, status: 'online' } }),
      prisma.service.count({ where: { orgId } }),
    ]);

    const recentEvents = await prisma.event.findMany({
      where: { orgId, timestamp: { gte: new Date(Date.now() - 3600_000) } },
      select: { latencyMs: true, status: true },
    });

    const latencies = recentEvents.map((e) => e.latencyMs).sort((a, b) => a - b);
    const p95 = latencies[Math.floor(latencies.length * 0.95)] ?? 0;
    const failed = recentEvents.filter((e) => e.status === 'failed').length;

    return {
      eventsTotal: events,
      openIncidents: incidents,
      onlineWorkers: workers,
      servicesCount: services,
      throughputRps: recentEvents.length / 3600,
      latencyP95: p95,
      errorRate: recentEvents.length ? (failed / recentEvents.length) * 100 : 0,
    };
  },

  async throughput(orgId: string, from: Date, to: Date) {
    const events = await prisma.event.findMany({
      where: { orgId, timestamp: { gte: from, lte: to } },
      select: { timestamp: true, status: true },
      orderBy: { timestamp: 'asc' },
    });

    const buckets = new Map<string, { success: number; failed: number }>();
    for (const e of events) {
      const key = e.timestamp.toISOString().slice(0, 16);
      const b = buckets.get(key) ?? { success: 0, failed: 0 };
      if (e.status === 'failed') b.failed++;
      else b.success++;
      buckets.set(key, b);
    }

    return [...buckets.entries()].map(([t, v]) => ({ t, ...v }));
  },
};
