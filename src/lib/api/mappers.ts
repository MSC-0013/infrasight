import type {
  Alert,
  ApiKey,
  AppEvent,
  AuditLog,
  Deployment,
  Incident,
  IncidentStatus,
  IncidentUpdate,
  LogLine,
  MLInsight,
  MLModel,
  Member,
  Organization,
  Queue,
  ServiceHealth,
  SLO,
  Trace,
  TraceSpan,
  Worker,
} from '@/lib/mock-data';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function iso(d: string | Date | null | undefined): string {
  if (!d) return new Date().toISOString();
  return typeof d === 'string' ? d : d.toISOString();
}

// ─── Incidents ───────────────────────────────────────────────────────────────

const SEVERITY_TO_FRONT: Record<string, Incident['severity']> = {
  P1: 'sev1',
  P2: 'sev2',
  P3: 'sev3',
  P4: 'sev4',
  P5: 'sev4',
};

const STATUS_TO_FRONT: Record<string, IncidentStatus> = {
  open: 'investigating',
  investigating: 'investigating',
  identified: 'identified',
  mitigated: 'monitoring',
  resolved: 'resolved',
};

export function mapIncident(raw: Record<string, unknown>): Incident {
  const timeline = (raw.timeline as Array<Record<string, unknown>> | undefined) ?? [];
  const updates: IncidentUpdate[] = timeline.map((t) => ({
    at: iso(t.occurredAt as string),
    status: STATUS_TO_FRONT[(t.eventType as string) ?? ''] ?? 'investigating',
    author: (t.actorName as string) ?? 'system',
    message: (t.content as string) ?? '',
  }));

  const tags = (raw.tags as string[] | undefined) ?? [];
  const service = (raw.service as string) ?? 'unknown';

  return {
    id: raw.id as string,
    title: raw.title as string,
    severity: SEVERITY_TO_FRONT[(raw.severity as string) ?? 'P3'] ?? 'sev3',
    status: STATUS_TO_FRONT[(raw.status as string) ?? 'open'] ?? 'investigating',
    openedAt: iso(raw.openedAt as string),
    resolvedAt: raw.resolvedAt ? iso(raw.resolvedAt as string) : undefined,
    impactedServices: tags.length > 0 ? tags : [service],
    acknowledgedBy: raw.assigneeId ? String(raw.assigneeId) : undefined,
    rootCause: (raw.description as string) ?? undefined,
    updates,
  };
}

// ─── Events ──────────────────────────────────────────────────────────────────

export function mapEvent(raw: Record<string, unknown>): AppEvent {
  return {
    id: raw.id as string,
    timestamp: iso(raw.timestamp as string),
    eventType: (raw.eventType as string) ?? 'unknown',
    organization: (raw.organization as string) ?? 'default',
    status: (raw.status as AppEvent['status']) ?? 'success',
    queue: (raw.queue as string) ?? '',
    worker: (raw.worker as string) ?? '',
    latencyMs: Number(raw.latencyMs ?? 0),
    retries: Number(raw.retries ?? 0),
    severity: (raw.severity as AppEvent['severity']) ?? 'info',
    traceId: (raw.traceId as string) ?? '',
    payload: (raw.payload as Record<string, unknown>) ?? {},
  };
}

// ─── Workers ─────────────────────────────────────────────────────────────────

export function mapWorker(raw: Record<string, unknown>): Worker {
  const status = raw.status as string;
  const frontStatus: Worker['status'] =
    status === 'online' ? 'online' : status === 'offline' ? 'offline' : 'degraded';

  const uptimeSec = Number(raw.uptimeSeconds ?? 0);

  return {
    id: raw.id as string,
    name: raw.name as string,
    status: frontStatus,
    region: (raw.region as string) ?? 'us-east-1',
    pool: (raw.queueName as string) ?? 'default',
    version: 'v1.0.0',
    cpu: Math.round(Number(raw.cpuPercent ?? 0)),
    memory: Math.round(Number(raw.memMb ?? 0)),
    jobsProcessed: Number(raw.jobsProcessed ?? 0),
    retries: Number(raw.jobsFailed ?? 0),
    uptimeHours: +(uptimeSec / 3600).toFixed(1),
    lastHeartbeat: iso(raw.lastHeartbeat as string),
    assignedQueues: [(raw.queueName as string) ?? 'default'],
    heartbeats: Array.from({ length: 12 }, () => Math.round(40 + Math.random() * 40)),
  };
}

// ─── Queues ──────────────────────────────────────────────────────────────────

export function mapQueue(raw: Record<string, unknown>): Queue {
  const status = raw.status as string;
  const frontStatus: Queue['status'] =
    status === 'healthy' ? 'healthy' : status === 'paused' ? 'backlogged' : 'degraded';

  return {
    id: raw.id as string,
    name: raw.name as string,
    messages: Number(raw.depth ?? 0),
    consumers: Number(raw.consumerCount ?? 0),
    retries: 0,
    dlq: Number(raw.dlqSize ?? 0),
    lagMs: Number(raw.lagMs ?? 0),
    throughput: Number(raw.throughputRps ?? 0),
    status: frontStatus,
  };
}

// ─── Services ────────────────────────────────────────────────────────────────

export function mapService(raw: Record<string, unknown>): ServiceHealth {
  const status = raw.status as string;
  const frontStatus: ServiceHealth['status'] =
    status === 'healthy' ? 'healthy' : status === 'offline' || status === 'critical' ? 'down' : 'degraded';

  return {
    id: raw.id as string,
    name: raw.name as string,
    status: frontStatus,
    uptimePct: Number(raw.uptimePct ?? 99.9),
    rps: Number(raw.rps ?? 0),
    p95Ms: Math.round(Number(raw.p95Ms ?? 0)),
    errorRate: Number(raw.errorRate ?? 0),
    cpu: Math.round(Number(raw.cpuPercent ?? 0) || 30),
    memory: Math.round(Number(raw.memMb ?? 0) || 40),
    version: (raw.currentVersion as string) ?? '1.0.0',
    region: 'us-east-1',
    lastDeploy: iso(raw.updatedAt as string),
    dependsOn: (raw.dependencies as string[]) ?? [],
  };
}

// ─── Deployments ─────────────────────────────────────────────────────────────

export function mapDeployment(raw: Record<string, unknown>): Deployment {
  const status = raw.status as string;
  const frontStatus: Deployment['status'] =
    status === 'success'
      ? 'succeeded'
      : status === 'failed'
        ? 'failed'
        : status === 'rolled_back'
          ? 'rolled_back'
          : 'in_progress';

  const env = raw.environment as string;
  const environment: Deployment['environment'] =
    env === 'staging' ? 'staging' : env === 'development' ? 'dev' : 'prod';

  return {
    id: raw.id as string,
    service: raw.service as string,
    version: raw.version as string,
    commit: (raw.sha as string)?.slice(0, 7) ?? '',
    author: raw.triggeredBy as string,
    startedAt: iso(raw.startedAt as string),
    finishedAt: iso((raw.completedAt as string) ?? raw.startedAt as string),
    status: frontStatus,
    environment,
  };
}

// ─── Alerts (from alert rules) ─────────────────────────────────────────────

export function mapAlertRule(raw: Record<string, unknown>): Alert {
  const cond = (raw.condition as Record<string, unknown>) ?? {};
  return {
    id: raw.id as string,
    title: raw.name as string,
    description:
      (raw.description as string) ??
      `Threshold: ${cond.threshold ?? '—'} · metric: ${cond.metric ?? 'custom'}`,
    severity: (raw.severity as Alert['severity']) ?? 'warning',
    source: (raw.service as string) ?? 'platform',
    service: (raw.service as string) ?? 'unknown',
    timestamp: iso((raw.firedAt as string) ?? (raw.updatedAt as string)),
    acknowledged: raw.status === 'acknowledged' || Boolean(raw.acknowledgedBy),
  };
}

// ─── Traces ──────────────────────────────────────────────────────────────────

export function mapTrace(raw: Record<string, unknown>): Trace {
  const status = raw.status as string;
  return {
    id: (raw.traceId as string) ?? (raw.id as string),
    rootOperation: (raw.rootName as string) ?? 'operation',
    rootService: (raw.rootService as string) ?? 'unknown',
    startedAt: iso(raw.startTime as string),
    durationMs: Number(raw.durationMs ?? 0),
    spanCount: Number(raw.spanCount ?? 1),
    errorCount: Number(raw.errorCount ?? 0),
    services: [],
    status: status === 'error' ? 'error' : status === 'unset' ? 'degraded' : 'ok',
  };
}

export function mapSpan(raw: Record<string, unknown>, traceStart: Date): TraceSpan {
  const start = new Date(raw.startTime as string);
  const startMs = Math.max(0, start.getTime() - traceStart.getTime());
  return {
    id: raw.spanId as string,
    parentId: (raw.parentSpanId as string) ?? null,
    traceId: raw.traceId as string,
    service: raw.service as string,
    operation: raw.name as string,
    kind: 'server',
    startMs,
    durationMs: Number(raw.durationMs ?? 0),
    status: raw.status === 'error' ? 'error' : 'ok',
    attributes: (raw.attributes as Record<string, string | number | boolean>) ?? {},
  };
}

// ─── Logs ────────────────────────────────────────────────────────────────────

export function mapLog(raw: Record<string, unknown>): LogLine {
  const level = raw.level as string;
  const frontLevel: LogLine['level'] =
    level === 'warn' ? 'warn' : level === 'fatal' ? 'critical' : (level as LogLine['level']);

  return {
    id: raw.id as string,
    timestamp: iso(raw.timestamp as string),
    level: frontLevel ?? 'info',
    service: raw.service as string,
    message: raw.message as string,
    traceId: raw.traceId as string | undefined,
    attrs: (raw.fields as Record<string, string | number | boolean>) ?? {},
  };
}

// ─── SLOs ────────────────────────────────────────────────────────────────────

export function mapSlo(raw: Record<string, unknown>): SLO {
  const status = raw.status as string;
  const frontStatus: SLO['status'] =
    status === 'breached' ? 'breached' : status === 'at_risk' ? 'at_risk' : 'healthy';

  return {
    id: raw.id as string,
    name: raw.name as string,
    service: raw.service as string,
    status: frontStatus,
    budgetRemaining: Number(raw.errorBudget ?? 100),
    burnRate: Number(raw.burnRate ?? 0),
    burnRateWindow: (raw.window as string) ?? '30d',
    slis: [
      {
        name: raw.metric as string,
        type: 'availability',
        target: Number(raw.target ?? 99.9),
        current: Number(raw.current ?? 100),
        unit: '%',
      },
    ],
    period: (raw.window as string) ?? '30d',
  };
}

// ─── Audit ───────────────────────────────────────────────────────────────────

export function mapAudit(raw: Record<string, unknown>): AuditLog {
  return {
    id: raw.id as string,
    timestamp: iso(raw.timestamp as string),
    actor: (raw.actorId as string) ?? 'system',
    actorEmail: '',
    action: raw.action as string,
    entity: raw.resource as string,
    entityId: raw.resourceId as string,
    metadata: {
      before: raw.before,
      after: raw.after,
    },
    ip: (raw.ip as string) ?? '',
  };
}

// ─── ML ──────────────────────────────────────────────────────────────────────

export function mapMlModel(raw: Record<string, unknown>): MLModel {
  return {
    id: raw.id as string,
    name: raw.name as string,
    version: raw.version as string,
    status: raw.status === 'active' ? 'serving' : 'deprecated',
    inferenceP95: 45,
    accuracy: 0.94,
    drift: 0.02,
    confidence: 0.91,
    throughput: 120,
    deployedAt: iso(raw.createdAt as string),
  };
}

export function mapAiInsight(raw: Record<string, unknown>): MLInsight {
  return {
    id: raw.id as string,
    title: raw.title as string,
    type: 'anomaly',
    confidence: 0.85,
    timestamp: iso(raw.createdAt as string),
    description: raw.description as string,
    service: (raw.service as string) ?? 'unknown',
  };
}

// ─── Org / Members ───────────────────────────────────────────────────────────

export function mapOrganization(raw: Record<string, unknown>): Organization {
  const plan = raw.plan as string;
  const frontPlan: Organization['plan'] =
    plan === 'hobby' ? 'free' : plan === 'team' ? 'pro' : 'enterprise';

  return {
    id: raw.id as string,
    slug: raw.slug as string,
    name: raw.name as string,
    plan: frontPlan,
  };
}

export function mapNotification(raw: Record<string, unknown>) {
  return {
    id: raw.id as string,
    title: raw.title as string,
    body: raw.body as string,
    kind: (raw.kind as string) ?? 'info',
    severity: (raw.severity as 'info' | 'warning' | 'error' | 'critical') ?? 'info',
    timestamp: iso(raw.createdAt as string),
    read: Boolean(raw.read),
  };
}

export function mapMember(raw: Record<string, unknown>): Member {
  const role = raw.role as string;
  const frontRole: Member['role'] =
    role === 'admin' || role === 'super_admin'
      ? 'admin'
      : role === 'viewer'
        ? 'viewer'
        : role === 'sre'
          ? 'engineer'
          : 'engineer';

  return {
    id: raw.id as string,
    name: raw.name as string,
    email: raw.email as string,
    role: frontRole,
    team: 'platform',
    lastActive: iso((raw.lastLoginAt as string) ?? (raw.createdAt as string)),
    status: raw.isActive === false ? 'suspended' : 'active',
  };
}

// ─── Paginated list helper ───────────────────────────────────────────────────

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function mapTopologyGraph(raw: {
  nodes: Array<Record<string, unknown>>;
  edges: Array<Record<string, unknown>>;
}) {
  const nodes = raw.nodes.map((n, i) => {
    const status = n.status as string;
    const frontStatus =
      status === 'healthy' ? 'healthy' : status === 'offline' || status === 'critical' ? 'down' : 'degraded';
    return {
      id: (n.nodeId as string) ?? (n.id as string),
      label: (n.label as string) ?? (n.service as string),
      kind: 'service' as const,
      status: frontStatus as 'healthy' | 'degraded' | 'down',
      x: Number(n.posX ?? (i % 5) * 140 + 40),
      y: Number(n.posY ?? Math.floor(i / 5) * 100 + 40),
    };
  });
  const edges = raw.edges.map((e) => ({
    from: e.fromNode as string,
    to: e.toNode as string,
    rps: Number(e.rps ?? 0),
    errorRate: Number(e.errorRate ?? 0),
  }));
  return { nodes, edges };
}

export function mapPaginated<T>(
  raw: Paginated<Record<string, unknown>>,
  mapper: (r: Record<string, unknown>) => T,
): T[] {
  return raw.items.map(mapper);
}

export function mapApiKey(raw: Record<string, unknown>): ApiKey {
  return {
    id: raw.id as string,
    name: raw.name as string,
    prefix: (raw.keyPrefix as string) ?? 'pk_***',
    createdAt: iso(raw.createdAt as string),
    lastUsed: raw.lastUsedAt ? iso(raw.lastUsedAt as string) : iso(raw.createdAt as string),
    expiresAt: raw.expiresAt ? iso(raw.expiresAt as string) : null,
    permissions: (raw.permissions as string[]) ?? [],
    requests24h: Number(raw.requests24h ?? 0),
    status: 'active',
  };
}
