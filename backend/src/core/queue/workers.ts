import { Queue, Worker } from 'bullmq';
import { config } from '../config/index.js';
import { prisma } from '../database/prisma.js';
import { publish, REDIS_CHANNELS, getRedis } from '../redis/client.js';

const connection = { url: config.redis.url };

let workers: Worker[] = [];
let alertQueue: Queue | null = null;

export async function startWorkers() {
  alertQueue = new Queue('alert-evaluator', { connection });

  await alertQueue.add(
    'evaluate',
    {},
    { repeat: { every: 30_000 }, removeOnComplete: 100, removeOnFail: 50 },
  );

  workers.push(
    new Worker(
      'alert-evaluator',
      async () => {
        const rules = await prisma.alertRule.findMany({
          where: { enabled: true, silenced: false },
        });

        for (const rule of rules) {
          const cond = rule.condition as { threshold?: number; metric?: string };
          const threshold = cond.threshold ?? 0;
          const value = rule.currentValue ?? 0;

          if (value > threshold && rule.status !== 'firing') {
            await prisma.alertRule.update({
              where: { id: rule.id },
              data: { status: 'firing', firedAt: new Date(), currentValue: value },
            });
            await publish(REDIS_CHANNELS.alertsLive, { ruleId: rule.id, status: 'firing' });
          } else if (value <= threshold && rule.status === 'firing') {
            await prisma.alertRule.update({
              where: { id: rule.id },
              data: { status: 'ok', resolvedAt: new Date() },
            });
            await publish(REDIS_CHANNELS.alertsLive, { ruleId: rule.id, status: 'ok' });
          }
        }
      },
      { connection },
    ),

    new Worker(
      'slo-calculator',
      async () => {
        const slos = await prisma.slo.findMany();
        for (const slo of slos) {
          const burnRate = slo.current < slo.target ? (slo.target - slo.current) / slo.target : 0;
          const status = slo.current < slo.target * 0.99 ? 'breached' : slo.current < slo.target * 0.995 ? 'at_risk' : 'healthy';
          await prisma.slo.update({
            where: { id: slo.id },
            data: { burnRate, status, errorBudget: Math.max(0, slo.target - slo.current) },
          });
        }
      },
      { connection },
    ),
  );

  const sloQueue = new Queue('slo-calculator', { connection });
  await sloQueue.add('calc', {}, { repeat: { every: 300_000 } });

  // Topology builder every 60s
  const topoQueue = new Queue('topology-builder', { connection });
  await topoQueue.add('build', {}, { repeat: { every: 60_000 } });

  workers.push(
    new Worker(
      'topology-builder',
      async () => {
        const orgs = await prisma.organization.findMany({ select: { id: true } });
        for (const org of orgs) {
          const spans = await prisma.span.findMany({
            where: { orgId: org.id },
            take: 500,
            orderBy: { startTime: 'desc' },
          });
          const services = new Set(spans.map((s) => s.service));
          for (const svc of services) {
            await prisma.topologyNode.upsert({
              where: { orgId_nodeId: { orgId: org.id, nodeId: svc } },
              create: { orgId: org.id, nodeId: svc, label: svc, service: svc },
              update: { rps: Math.random() * 1000 },
            });
          }
        }
        await getRedis().set('topology:last-build', Date.now().toString());
      },
      { connection },
    ),
  );
}

export async function stopWorkers() {
  await Promise.all(workers.map((w) => w.close()));
  workers = [];
  if (alertQueue) await alertQueue.close();
}
