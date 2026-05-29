import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Pulse database…');

  const org = await prisma.organization.upsert({
    where: { slug: 'demo-org' },
    update: { name: 'Demo Organization', plan: 'team' },
    create: {
      name: 'Demo Organization',
      slug: 'demo-org',
      plan: 'team',
    },
  });

  await prisma.orgSettings.upsert({
    where: { orgId: org.id },
    update: {},
    create: { orgId: org.id, retentionDays: 30 },
  });

  const passwordHash = await bcrypt.hash('Demo1234!', 12);

  const users = await Promise.all(
    [
      { email: 'admin@pulse.io', name: 'Demo Admin', role: 'super_admin' as const },
      { email: 'sre@pulse.io', name: 'Demo SRE', role: 'sre' as const },
      { email: 'dev@pulse.io', name: 'Demo Developer', role: 'developer' as const },
      { email: 'viewer@pulse.io', name: 'Demo Viewer', role: 'viewer' as const },
    ].map((u) =>
      prisma.user.upsert({
        where: { email: u.email },
        update: { role: u.role, passwordHash },
        create: {
          email: u.email,
          name: u.name,
          passwordHash,
          role: u.role,
          orgId: org.id,
          emailVerified: true,
        },
      }),
    ),
  );

  const admin = users[0]!;

  const serviceNames = [
    'api-gateway',
    'auth-service',
    'worker-pool',
    'event-processor',
    'notification-service',
    'analytics-service',
  ];

  for (const name of serviceNames) {
    await prisma.service.upsert({
      where: { orgId_name: { orgId: org.id, name } },
      update: {
        rps: 100 + Math.random() * 200,
        p95Ms: 30 + Math.random() * 80,
        errorRate: Math.random() * 0.03,
        status: 'healthy',
      },
      create: {
        orgId: org.id,
        name,
        language: 'typescript',
        team: 'platform',
        tier: name === 'api-gateway' ? 'critical' : 'high',
        rps: 100 + Math.random() * 200,
        p95Ms: 30 + Math.random() * 80,
        errorRate: Math.random() * 0.03,
        uptimePct: 99.5 + Math.random() * 0.5,
        currentVersion: '2.14.0',
        dependencies: name === 'api-gateway' ? ['auth-service'] : [],
      },
    });
  }

  for (const name of ['events-main', 'notifications', 'dlq-retry', 'webhooks']) {
    await prisma.queue.upsert({
      where: { orgId_name: { orgId: org.id, name } },
      update: {},
      create: {
        orgId: org.id,
        name,
        type: 'redis_streams',
        lagMs: Math.floor(Math.random() * 150),
        depth: Math.floor(Math.random() * 400),
        throughputRps: 40 + Math.random() * 120,
        dlqSize: Math.floor(Math.random() * 20),
        consumerCount: 2 + Math.floor(Math.random() * 4),
      },
    });
  }

  for (let i = 1; i <= 6; i++) {
    await prisma.worker.upsert({
      where: { orgId_name: { orgId: org.id, name: `worker-${i}` } },
      update: {
        status: 'online',
        lastHeartbeat: new Date(),
        cpuPercent: 15 + Math.random() * 50,
        memMb: 200 + Math.random() * 600,
      },
      create: {
        orgId: org.id,
        name: `worker-${i}`,
        queueName: 'events-main',
        status: 'online',
        cpuPercent: 15 + Math.random() * 50,
        memMb: 200 + Math.random() * 600,
        jobsProcessed: BigInt(5000 + i * 1000),
        jobsFailed: BigInt(i * 10),
        uptimeSeconds: BigInt(86400 * i),
        lastHeartbeat: new Date(),
      },
    });
  }

  const eventTypes = [
    'order.created',
    'payment.processed',
    'email.sent',
    'webhook.delivered',
    'user.signup',
    'job.completed',
  ];

  await prisma.event.deleteMany({ where: { orgId: org.id } });
  for (let i = 0; i < 200; i++) {
    await prisma.event.create({
      data: {
        orgId: org.id,
        organization: org.name,
        eventType: eventTypes[i % eventTypes.length]!,
        status: i % 12 === 0 ? 'failed' : 'success',
        severity: i % 20 === 0 ? 'error' : i % 15 === 0 ? 'warning' : 'info',
        queue: 'events-main',
        worker: `worker-${(i % 6) + 1}`,
        latencyMs: 10 + Math.floor(Math.random() * 250),
        retries: i % 12 === 0 ? Math.floor(Math.random() * 3) : 0,
        payload: { index: i, source: 'seed' },
        timestamp: new Date(Date.now() - i * 45_000),
      },
    });
  }

  await prisma.logEntry.deleteMany({ where: { orgId: org.id } });
  const levels = ['info', 'info', 'info', 'warn', 'error', 'debug'] as const;
  for (let i = 0; i < 150; i++) {
    await prisma.logEntry.create({
      data: {
        orgId: org.id,
        level: levels[i % levels.length]!,
        service: serviceNames[i % serviceNames.length]!,
        message: `Log line ${i}: operation completed`,
        timestamp: new Date(Date.now() - i * 60_000),
        fields: { requestId: `req-${i}` },
      },
    });
  }

  const traceId = 'trace-seed-001';
  await prisma.trace.upsert({
    where: { traceId },
    update: {},
    create: {
      traceId,
      orgId: org.id,
      rootSpanId: 'span-root',
      rootService: 'api-gateway',
      rootName: 'GET /api/v1/events',
      durationMs: 145,
      spanCount: 3,
      errorCount: 0,
      status: 'ok',
      startTime: new Date(Date.now() - 300_000),
      endTime: new Date(Date.now() - 299_855),
    },
  });

  await prisma.span.createMany({
    data: [
      {
        spanId: 'span-root',
        traceId,
        orgId: org.id,
        name: 'GET /api/v1/events',
        service: 'api-gateway',
        startTime: new Date(Date.now() - 300_000),
        endTime: new Date(Date.now() - 299_855),
        durationMs: 145,
        status: 'ok',
      },
      {
        spanId: 'span-auth',
        traceId,
        parentSpanId: 'span-root',
        orgId: org.id,
        name: 'validateToken',
        service: 'auth-service',
        startTime: new Date(Date.now() - 299_990),
        endTime: new Date(Date.now() - 299_920),
        durationMs: 70,
        status: 'ok',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.slo.createMany({
    data: [
      {
        orgId: org.id,
        name: 'API Availability',
        service: 'api-gateway',
        metric: 'availability',
        target: 99.9,
        window: '30d',
        current: 99.95,
        errorBudget: 85,
        burnRate: 0.02,
        status: 'healthy',
      },
      {
        orgId: org.id,
        name: 'P95 Latency',
        service: 'api-gateway',
        metric: 'latency_p95',
        target: 99,
        window: '7d',
        current: 98.2,
        errorBudget: 70,
        burnRate: 0.08,
        status: 'at_risk',
      },
    ],
    skipDuplicates: true,
  });

  await prisma.alertRule.createMany({
    data: [
      {
        orgId: org.id,
        name: 'High Error Rate',
        severity: 'critical',
        condition: { metric: 'error_rate', op: '>', threshold: 0.05 },
        service: 'api-gateway',
        channels: ['slack', 'email'],
        status: 'ok',
        currentValue: 0.02,
      },
      {
        orgId: org.id,
        name: 'Queue Lag',
        severity: 'warning',
        condition: { metric: 'lag_ms', op: '>', threshold: 500 },
        service: 'events-main',
        channels: ['slack'],
        status: 'firing',
        currentValue: 620,
        firedAt: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  const incident = await prisma.incident.create({
    data: {
      orgId: org.id,
      title: 'Elevated latency on api-gateway',
      severity: 'P2',
      status: 'investigating',
      service: 'api-gateway',
      description: 'P95 latency exceeded 200ms for 5 minutes',
      assigneeId: users[1]!.id,
      reporterId: admin.id,
      timeline: {
        create: [
          {
            orgId: org.id,
            eventType: 'created',
            content: 'Incident opened from monitoring',
            actorName: 'system',
          },
          {
            orgId: org.id,
            eventType: 'comment',
            content: 'Investigating recent deployment',
            actorName: admin.name,
          },
        ],
      },
    },
  });

  await prisma.deployment.createMany({
    data: [
      {
        orgId: org.id,
        service: 'api-gateway',
        version: '2.14.0',
        environment: 'production',
        status: 'success',
        sha: 'a1b2c3d4e5f6',
        branch: 'main',
        triggeredBy: admin.email,
        startedAt: new Date(Date.now() - 86_400_000),
        completedAt: new Date(Date.now() - 86_300_000),
      },
      {
        orgId: org.id,
        service: 'auth-service',
        version: '1.8.2',
        environment: 'production',
        status: 'success',
        sha: 'f6e5d4c3b2a1',
        branch: 'main',
        triggeredBy: 'ci-bot',
        startedAt: new Date(Date.now() - 172_800_000),
        completedAt: new Date(Date.now() - 172_750_000),
      },
    ],
    skipDuplicates: true,
  });

  await prisma.mlModel.createMany({
    data: [
      {
        orgId: org.id,
        name: 'fraud-detector',
        version: '3.2.1',
        framework: 'pytorch',
        status: 'active',
      },
      {
        orgId: org.id,
        name: 'recommendation-engine',
        version: '1.0.4',
        framework: 'tensorflow',
        status: 'active',
      },
    ],
    skipDuplicates: true,
  });

  for (const svc of serviceNames.slice(0, 4)) {
    await prisma.topologyNode.upsert({
      where: { orgId_nodeId: { orgId: org.id, nodeId: svc } },
      create: { orgId: org.id, nodeId: svc, label: svc, service: svc, rps: 100 },
      update: { rps: 100 + Math.random() * 50 },
    });
  }

  await prisma.topologyEdge.upsert({
    where: { orgId_fromNode_toNode: { orgId: org.id, fromNode: 'api-gateway', toNode: 'auth-service' } },
    create: {
      orgId: org.id,
      fromNode: 'api-gateway',
      toNode: 'auth-service',
      rps: 80,
      errorRate: 0.001,
      p95Ms: 45,
    },
    update: {},
  });

  for (const u of users) {
    await prisma.notification.create({
      data: {
        orgId: org.id,
        userId: u.id,
        title: 'Welcome to Pulse',
        body: 'Your observability workspace is ready.',
        kind: 'info',
        severity: 'info',
      },
    });
  }

  await prisma.auditEntry.create({
    data: {
      orgId: org.id,
      action: 'seed.completed',
      actorId: admin.id,
      actorRole: 'super_admin',
      resource: 'database',
      resourceId: 'seed',
      after: { incidentId: incident.id },
      ip: '127.0.0.1',
    },
  });

  console.log('Seed complete.');
  console.log('  Login: admin@pulse.io / Demo1234!');
  console.log('  Org slug: demo-org');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
