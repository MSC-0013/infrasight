// Deterministic-ish mock data generators for the observability platform.
// All numbers are random but bounded so charts look realistic.

export type Severity = "info" | "warning" | "error" | "critical";
export type EventStatus = "success" | "failed" | "retrying" | "queued" | "processing";
export type LogLevel = "debug" | "info" | "warn" | "error" | "critical";

export interface AppEvent {
  id: string;
  timestamp: string;
  eventType: string;
  organization: string;
  status: EventStatus;
  queue: string;
  worker: string;
  latencyMs: number;
  retries: number;
  severity: Severity;
  traceId: string;
  payload: Record<string, unknown>;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  source: string;
  service: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface Worker {
  id: string;
  name: string;
  status: "online" | "offline" | "degraded";
  region: string;
  pool: string;
  version: string;
  cpu: number;
  memory: number;
  jobsProcessed: number;
  retries: number;
  uptimeHours: number;
  lastHeartbeat: string;
  assignedQueues: string[];
  heartbeats: number[];
}

export interface Queue {
  id: string;
  name: string;
  messages: number;
  consumers: number;
  retries: number;
  dlq: number;
  lagMs: number;
  throughput: number;
  status: "healthy" | "degraded" | "backlogged";
}

export interface Organization {
  id: string;
  slug: string;
  name: string;
  plan: "free" | "pro" | "enterprise";
}

export interface MLInsight {
  id: string;
  title: string;
  type: "anomaly" | "prediction" | "summary";
  confidence: number;
  timestamp: string;
  description: string;
  service: string;
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  p50: number;
  p95: number;
  p99: number;
  rps: number;
  errorRate: number;
}

// ---------- New observability primitives ----------

export type SpanKind = "server" | "client" | "internal" | "producer" | "consumer";

export interface TraceSpan {
  id: string;
  parentId: string | null;
  traceId: string;
  service: string;
  operation: string;
  kind: SpanKind;
  startMs: number; // ms from trace start
  durationMs: number;
  status: "ok" | "error";
  attributes: Record<string, string | number | boolean>;
}

export interface Trace {
  id: string;
  rootOperation: string;
  rootService: string;
  startedAt: string;
  durationMs: number;
  spanCount: number;
  errorCount: number;
  services: string[];
  status: "ok" | "error" | "degraded";
}

export interface LogLine {
  id: string;
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  traceId?: string;
  attrs: Record<string, string | number | boolean>;
}

export interface ServiceHealth {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  uptimePct: number;
  rps: number;
  p95Ms: number;
  errorRate: number;
  cpu: number;
  memory: number;
  version: string;
  region: string;
  lastDeploy: string;
  dependsOn: string[];
}

export type IncidentStatus = "investigating" | "identified" | "monitoring" | "resolved";
export interface IncidentUpdate {
  at: string;
  status: IncidentStatus;
  author: string;
  message: string;
}
export interface Incident {
  id: string;
  title: string;
  severity: "sev1" | "sev2" | "sev3" | "sev4";
  status: IncidentStatus;
  openedAt: string;
  resolvedAt?: string;
  impactedServices: string[];
  acknowledgedBy?: string;
  rootCause?: string;
  updates: IncidentUpdate[];
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  actorEmail: string;
  action: string;
  entity: string;
  entityId: string;
  metadata: Record<string, unknown>;
  ip: string;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
  expiresAt: string | null;
  permissions: string[];
  requests24h: number;
  status: "active" | "revoked";
}

export type Role = "admin" | "engineer" | "viewer" | "analyst";
export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  team: string;
  lastActive: string;
  status: "active" | "invited" | "suspended";
}

export interface Deployment {
  id: string;
  service: string;
  version: string;
  commit: string;
  author: string;
  startedAt: string;
  finishedAt: string;
  status: "succeeded" | "failed" | "rolled_back" | "in_progress";
  environment: "prod" | "staging" | "dev";
}

export interface MLModel {
  id: string;
  name: string;
  version: string;
  status: "serving" | "shadow" | "deprecated";
  inferenceP95: number;
  accuracy: number;
  drift: number;
  confidence: number;
  throughput: number;
  deployedAt: string;
}

export interface TopologyNode {
  id: string;
  label: string;
  kind: "gateway" | "service" | "queue" | "worker" | "db" | "ml";
  status: "healthy" | "degraded" | "down";
  x: number;
  y: number;
}
export interface TopologyEdge {
  from: string;
  to: string;
  rps: number;
  errorRate: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  kind: "alert" | "incident" | "deploy" | "queue" | "worker";
  severity: Severity;
  timestamp: string;
  read: boolean;
}

// ---------- generators ----------

const EVENT_TYPES = [
  "user.signup", "order.created", "payment.processed", "email.sent",
  "webhook.delivered", "job.completed", "auth.login", "subscription.renewed",
  "file.uploaded", "ml.prediction", "alert.triggered", "session.expired",
];
const ORGS = ["acme-prod", "stripe-eu", "vercel-internal", "linear-app", "notion-co"];
const QUEUES = ["events.high", "events.low", "webhooks", "ml.jobs", "emails", "billing"];
const WORKERS_NAMES = [
  "worker-us-east-1a", "worker-us-east-1b", "worker-us-west-2a",
  "worker-eu-west-1a", "worker-eu-west-1b", "worker-ap-south-1a",
  "worker-ap-south-1b", "worker-sa-east-1a",
];
const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1", "sa-east-1"];
const SERVICES = [
  "api-gateway", "auth-service", "event-service", "analytics-service",
  "worker-service", "ml-service", "postgres-primary", "redis-cluster",
];

let rnd = 1;
function r() { rnd = (rnd * 9301 + 49297) % 233280; return rnd / 233280; }
const pick = <T,>(arr: T[]) => arr[Math.floor(r() * arr.length)];
const between = (min: number, max: number) => min + r() * (max - min);
const id = () => Math.random().toString(36).slice(2, 10);

export function generateEvents(count = 80): AppEvent[] {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const eventType = pick(EVENT_TYPES);
    const status: EventStatus = r() > 0.85 ? "failed" : r() > 0.92 ? "retrying" : "success";
    const severity: Severity = status === "failed" ? (r() > 0.6 ? "error" : "critical") : r() > 0.85 ? "warning" : "info";
    return {
      id: id(),
      timestamp: new Date(now - i * 1500 - r() * 1000).toISOString(),
      eventType,
      organization: pick(ORGS),
      status,
      queue: pick(QUEUES),
      worker: pick(WORKERS_NAMES),
      latencyMs: Math.round(between(8, 480)),
      retries: status === "retrying" ? Math.floor(between(1, 5)) : 0,
      severity,
      traceId: id() + id(),
      payload: {
        userId: `usr_${id()}`,
        requestId: `req_${id()}`,
        meta: { source: "api", ip: `10.0.${Math.floor(between(0, 255))}.${Math.floor(between(0, 255))}` },
        data: { type: eventType, value: Math.round(between(1, 9999)) },
      },
    };
  });
}

export function generateAlerts(count = 14): Alert[] {
  const titles = [
    "API latency spike detected", "Queue overflow on events.high",
    "Worker offline: worker-eu-west-1b", "Database connection pool saturated",
    "ML anomaly: unusual event volume", "Memory pressure on worker-us-east-1a",
    "DLQ growing: webhooks queue", "Authentication failures elevated",
    "Disk usage above 85%", "Replica lag exceeds 5s",
  ];
  return Array.from({ length: count }, (_, i) => {
    const sev: Severity = ["info", "warning", "error", "critical"][Math.floor(r() * 4)] as Severity;
    return {
      id: id(),
      title: pick(titles),
      description: "Threshold exceeded for the configured time window. Investigate dependent services and recent deploys.",
      severity: sev,
      source: pick(SERVICES),
      service: pick(SERVICES),
      timestamp: new Date(Date.now() - i * 360000 - r() * 60000).toISOString(),
      acknowledged: r() > 0.7,
    };
  });
}

export function generateWorkers(): Worker[] {
  const POOLS = ["events-primary", "events-overflow", "ml-inference", "webhooks"];
  return WORKERS_NAMES.map((name, i) => {
    const status: Worker["status"] = i === 4 ? "offline" : i === 2 ? "degraded" : "online";
    return {
      id: id(),
      name,
      status,
      region: pick(REGIONS),
      pool: pick(POOLS),
      version: `v2.${Math.floor(between(8, 14))}.${Math.floor(between(0, 24))}`,
      cpu: Math.round(between(12, 92)),
      memory: Math.round(between(28, 88)),
      jobsProcessed: Math.floor(between(12000, 480000)),
      retries: Math.floor(between(0, 240)),
      uptimeHours: Math.round(between(2, 720)),
      lastHeartbeat: new Date(Date.now() - between(1000, 60000)).toISOString(),
      assignedQueues: [pick(QUEUES), pick(QUEUES)],
      heartbeats: Array.from({ length: 30 }, () => (status === "offline" ? 0 : Math.round(between(40, 100)))),
    };
  });
}

export function generateQueues(): Queue[] {
  return QUEUES.map((name) => {
    const msgs = Math.floor(between(80, 14000));
    const status: Queue["status"] = msgs > 9000 ? "backlogged" : msgs > 5000 ? "degraded" : "healthy";
    return {
      id: id(),
      name,
      messages: msgs,
      consumers: Math.floor(between(1, 12)),
      retries: Math.floor(between(0, 320)),
      dlq: Math.floor(between(0, 180)),
      lagMs: Math.floor(between(20, 4800)),
      throughput: Math.floor(between(40, 2200)),
      status,
    };
  });
}

export function generateOrganizations(): Organization[] {
  return ORGS.map((slug) => ({
    id: id(),
    slug,
    name: slug.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" "),
    plan: r() > 0.6 ? "enterprise" : r() > 0.3 ? "pro" : "free",
  }));
}

export function generateMLInsights(): MLInsight[] {
  const items: Array<{ title: string; type: MLInsight["type"]; description: string }> = [
    { title: "Anomalous traffic on events.high", type: "anomaly", description: "Volume 4.2σ above baseline for last 12 minutes." },
    { title: "Predicted DLQ overflow within 45m", type: "prediction", description: "Current ingestion rate exceeds drain rate by 18%." },
    { title: "Daily summary: 14.3M events processed", type: "summary", description: "P95 latency improved 8% week-over-week." },
    { title: "Suspected worker degradation in eu-west-1", type: "anomaly", description: "Job duration drift +220ms compared to fleet median." },
    { title: "Forecast: error rate to spike around 18:00 UTC", type: "prediction", description: "Pattern matches prior deploy-window incidents." },
    { title: "Weekly digest: top 5 noisy endpoints", type: "summary", description: "/api/v1/sync accounts for 38% of retries." },
  ];
  return items.map((x, i) => ({
    id: id(),
    title: x.title,
    type: x.type,
    description: x.description,
    confidence: Math.round(between(72, 98)),
    timestamp: new Date(Date.now() - i * 1800000).toISOString(),
    service: pick(SERVICES),
  }));
}

export function generateApiEndpoints(): ApiEndpoint[] {
  const paths: Array<[ApiEndpoint["method"], string]> = [
    ["POST", "/api/v1/events"], ["GET", "/api/v1/events"],
    ["POST", "/api/v1/ingest"], ["GET", "/api/v1/queues"],
    ["GET", "/api/v1/workers"], ["POST", "/api/v1/alerts/ack"],
    ["GET", "/api/v1/orgs"], ["PUT", "/api/v1/orgs/:id"],
    ["POST", "/api/v1/auth/login"], ["GET", "/api/v1/me"],
  ];
  return paths.map(([method, path]) => ({
    method, path,
    p50: Math.round(between(8, 90)),
    p95: Math.round(between(80, 380)),
    p99: Math.round(between(220, 980)),
    rps: Math.round(between(12, 2400)),
    errorRate: +(between(0.01, 3.2)).toFixed(2),
  }));
}

export function generateTimeSeries(points = 30, base = 100, jitter = 30) {
  return Array.from({ length: points }, (_, i) => ({
    t: i,
    label: `${points - i}m`,
    value: Math.max(0, Math.round(base + Math.sin(i / 3) * jitter + (r() - 0.5) * jitter)),
  }));
}

export function generateThroughputSeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    t: new Date(Date.now() - (points - i) * 60000).toISOString(),
    label: `${points - i}m`,
    success: Math.round(800 + Math.sin(i / 4) * 200 + r() * 120),
    failed: Math.round(20 + Math.cos(i / 5) * 12 + r() * 14),
  }));
}

export function generateLatencySeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    label: `${points - i}m`,
    p50: Math.round(40 + Math.sin(i / 5) * 12 + r() * 8),
    p95: Math.round(140 + Math.sin(i / 4) * 30 + r() * 24),
    p99: Math.round(280 + Math.cos(i / 3) * 60 + r() * 48),
  }));
}

export function generateQueueLagSeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    label: `${points - i}m`,
    lag: Math.round(400 + Math.sin(i / 6) * 200 + r() * 150),
  }));
}

export function generateEventDistribution() {
  return EVENT_TYPES.slice(0, 6).map((name) => ({
    name,
    value: Math.round(between(200, 4200)),
  }));
}

// ---------- Traces & spans ----------

const TRACE_SERVICE_CHAIN: Array<[string, string, SpanKind]> = [
  ["api-gateway", "POST /v1/events", "server"],
  ["auth-service", "verify_token", "internal"],
  ["event-service", "validate_event", "internal"],
  ["redis-cluster", "rate_limit.check", "client"],
  ["event-service", "enqueue", "producer"],
  ["worker-service", "consume", "consumer"],
  ["ml-service", "predict", "client"],
  ["postgres-primary", "INSERT events", "client"],
  ["analytics-service", "rollup", "internal"],
];

export function generateTraces(count = 40): Trace[] {
  return Array.from({ length: count }, (_, i) => {
    const errCount = r() > 0.8 ? Math.floor(between(1, 4)) : 0;
    const status: Trace["status"] = errCount > 1 ? "error" : errCount === 1 ? "degraded" : "ok";
    const duration = Math.round(between(40, 2400));
    const root = TRACE_SERVICE_CHAIN[0];
    return {
      id: id() + id(),
      rootOperation: root[1],
      rootService: root[0],
      startedAt: new Date(Date.now() - i * 4200 - r() * 1000).toISOString(),
      durationMs: duration,
      spanCount: TRACE_SERVICE_CHAIN.length,
      errorCount: errCount,
      services: Array.from(new Set(TRACE_SERVICE_CHAIN.map((s) => s[0]))),
      status,
    };
  });
}

export function generateSpansForTrace(traceId: string, totalMs = 800): TraceSpan[] {
  const spans: TraceSpan[] = [];
  let cursor = 0;
  let parentId: string | null = null;
  TRACE_SERVICE_CHAIN.forEach(([service, operation, kind], i) => {
    const dur = Math.max(
      4,
      Math.round((totalMs / TRACE_SERVICE_CHAIN.length) * (0.4 + r() * 1.4))
    );
    const start = i === 0 ? 0 : cursor + Math.round(between(0, 12));
    cursor = start + dur;
    const spanId = id();
    spans.push({
      id: spanId,
      parentId: i === 0 ? null : parentId,
      traceId,
      service,
      operation,
      kind,
      startMs: start,
      durationMs: dur,
      status: i === TRACE_SERVICE_CHAIN.length - 2 && r() > 0.7 ? "error" : "ok",
      attributes: {
        "http.method": kind === "server" ? "POST" : "—",
        "net.peer.name": `${service}.internal`,
        "span.kind": kind,
        retry: i === 4 ? Math.floor(between(0, 2)) : 0,
      },
    });
    if (i === 0) parentId = spanId;
  });
  return spans;
}

// ---------- Logs ----------

const LOG_TEMPLATES: Array<{ level: LogLevel; msg: string }> = [
  { level: "info", msg: "request handled status=200" },
  { level: "info", msg: "event enqueued queue=events.high" },
  { level: "debug", msg: "cache hit key=org:settings:acme-prod" },
  { level: "warn", msg: "retry attempt=2 backoff_ms=420" },
  { level: "error", msg: "db connection refused upstream=postgres-primary" },
  { level: "info", msg: "worker heartbeat received" },
  { level: "warn", msg: "queue depth above soft limit messages=8120" },
  { level: "error", msg: "ml inference timeout deadline_exceeded=true" },
  { level: "critical", msg: "circuit breaker tripped target=payments-api" },
  { level: "info", msg: "deploy webhook accepted version=v2.14.3" },
];

export function generateLogs(count = 200): LogLine[] {
  return Array.from({ length: count }, (_, i) => {
    const t = pick(LOG_TEMPLATES);
    return {
      id: id(),
      timestamp: new Date(Date.now() - i * 800 - r() * 400).toISOString(),
      level: t.level,
      service: pick(SERVICES),
      message: t.msg,
      traceId: r() > 0.3 ? id() + id() : undefined,
      attrs: {
        region: pick(REGIONS),
        host: `${pick(SERVICES)}-${Math.floor(between(1, 9))}`,
        pid: Math.floor(between(1000, 9999)),
      },
    };
  });
}

// ---------- Services ----------

export function generateServices(): ServiceHealth[] {
  const defs: Array<{ name: string; deps: string[] }> = [
    { name: "api-gateway", deps: ["auth-service", "event-service"] },
    { name: "auth-service", deps: ["postgres-primary", "redis-cluster"] },
    { name: "event-service", deps: ["redis-cluster", "worker-service"] },
    { name: "analytics-service", deps: ["postgres-primary"] },
    { name: "worker-service", deps: ["postgres-primary", "ml-service"] },
    { name: "ml-service", deps: ["postgres-primary"] },
  ];
  return defs.map((d, i) => {
    const status: ServiceHealth["status"] = i === 4 ? "degraded" : i === 2 && r() > 0.6 ? "degraded" : "healthy";
    return {
      id: id(),
      name: d.name,
      status,
      uptimePct: +(between(99.2, 99.99)).toFixed(3),
      rps: Math.round(between(40, 3200)),
      p95Ms: Math.round(between(40, 420)),
      errorRate: +(between(0.02, status === "degraded" ? 4.4 : 1.2)).toFixed(2),
      cpu: Math.round(between(18, 84)),
      memory: Math.round(between(30, 82)),
      version: `v2.${Math.floor(between(8, 16))}.${Math.floor(between(0, 30))}`,
      region: pick(REGIONS),
      lastDeploy: new Date(Date.now() - between(3600_000, 7 * 86400_000)).toISOString(),
      dependsOn: d.deps,
    };
  });
}

// ---------- Incidents ----------

export function generateIncidents(): Incident[] {
  const items: Array<Pick<Incident, "title" | "severity" | "status" | "impactedServices" | "rootCause">> = [
    {
      title: "Elevated 5xx on api-gateway",
      severity: "sev2",
      status: "monitoring",
      impactedServices: ["api-gateway", "event-service"],
      rootCause: "Connection pool exhaustion after deploy v2.14.3 increased per-request DB allocation.",
    },
    {
      title: "events.high queue backlog",
      severity: "sev1",
      status: "investigating",
      impactedServices: ["event-service", "worker-service"],
    },
    {
      title: "ml-service drift threshold exceeded",
      severity: "sev3",
      status: "identified",
      impactedServices: ["ml-service"],
      rootCause: "Input feature distribution shift on `user.country`.",
    },
    {
      title: "Replica lag in eu-west-1",
      severity: "sev4",
      status: "resolved",
      impactedServices: ["postgres-primary"],
    },
  ];
  return items.map((x, i) => {
    const openedAt = new Date(Date.now() - (i + 1) * 3600_000 * (2 + r() * 6));
    const updates: IncidentUpdate[] = [
      { at: openedAt.toISOString(), status: "investigating", author: "on-call", message: "Incident opened. Paging primary." },
      { at: new Date(openedAt.getTime() + 12 * 60_000).toISOString(), status: "identified", author: "ana@pulse.io", message: "Identified suspected commit window." },
      { at: new Date(openedAt.getTime() + 28 * 60_000).toISOString(), status: "monitoring", author: "ana@pulse.io", message: "Mitigation rolled out, watching error rate." },
    ];
    if (x.status === "resolved") {
      updates.push({ at: new Date(openedAt.getTime() + 55 * 60_000).toISOString(), status: "resolved", author: "ana@pulse.io", message: "Resolved. Postmortem scheduled." });
    }
    return {
      id: "INC-" + (1000 + i),
      title: x.title,
      severity: x.severity,
      status: x.status,
      openedAt: openedAt.toISOString(),
      resolvedAt: x.status === "resolved" ? updates[updates.length - 1].at : undefined,
      impactedServices: x.impactedServices,
      acknowledgedBy: "ana@pulse.io",
      rootCause: x.rootCause,
      updates,
    };
  });
}

// ---------- Audit logs ----------

export function generateAuditLogs(count = 60): AuditLog[] {
  const actions = [
    ["created", "api_key"],
    ["revoked", "api_key"],
    ["updated", "rbac_role"],
    ["scaled", "worker_pool"],
    ["purged", "queue"],
    ["updated", "organization"],
    ["invited", "member"],
    ["rotated", "webhook_secret"],
    ["deployed", "service"],
  ];
  const actors = [
    ["Sam Engineer", "sam@pulse.io"],
    ["Ana Ops", "ana@pulse.io"],
    ["Priya SRE", "priya@pulse.io"],
    ["Leo Platform", "leo@pulse.io"],
  ];
  return Array.from({ length: count }, (_, i) => {
    const [action, entity] = pick(actions);
    const [name, email] = pick(actors);
    return {
      id: id(),
      timestamp: new Date(Date.now() - i * 540_000 - r() * 60_000).toISOString(),
      actor: name,
      actorEmail: email,
      action,
      entity,
      entityId: id(),
      metadata: { region: pick(REGIONS), ua: "pulse-cli/1.6" },
      ip: `10.0.${Math.floor(between(0, 255))}.${Math.floor(between(0, 255))}`,
    };
  });
}

// ---------- API keys ----------

export function generateApiKeys(): ApiKey[] {
  const names = ["ci-deploy", "metrics-reader", "events-writer-prod", "ml-trainer", "webhook-relay"];
  return names.map((n, i) => ({
    id: id(),
    name: n,
    prefix: `pk_live_${id().slice(0, 6)}`,
    createdAt: new Date(Date.now() - (i + 1) * 5 * 86400_000).toISOString(),
    lastUsed: new Date(Date.now() - r() * 3600_000).toISOString(),
    expiresAt: i === 1 ? null : new Date(Date.now() + (60 + i * 30) * 86400_000).toISOString(),
    permissions: i === 0 ? ["deploy:write", "service:read"] : i === 1 ? ["metrics:read"] : ["events:write", "events:read"],
    requests24h: Math.floor(between(1200, 480_000)),
    status: i === 4 ? "revoked" : "active",
  }));
}

// ---------- Members / RBAC ----------

export function generateMembers(): Member[] {
  const ppl: Array<[string, string, Role, string]> = [
    ["Sam Engineer", "sam@pulse.io", "admin", "platform"],
    ["Ana Ops", "ana@pulse.io", "engineer", "sre"],
    ["Priya SRE", "priya@pulse.io", "engineer", "sre"],
    ["Leo Platform", "leo@pulse.io", "admin", "platform"],
    ["Mia Analyst", "mia@pulse.io", "analyst", "data"],
    ["Owen Viewer", "owen@pulse.io", "viewer", "product"],
    ["Tess Eng", "tess@pulse.io", "engineer", "growth"],
  ];
  return ppl.map(([name, email, role, team], i) => ({
    id: id(),
    name,
    email,
    role,
    team,
    lastActive: new Date(Date.now() - i * 3600_000 - r() * 600_000).toISOString(),
    status: i === 6 ? "invited" : "active",
  }));
}

// ---------- Deployments ----------

export function generateDeployments(count = 18): Deployment[] {
  const services = ["api-gateway", "event-service", "worker-service", "ml-service", "analytics-service"];
  const authors = ["sam@pulse.io", "ana@pulse.io", "priya@pulse.io", "leo@pulse.io"];
  return Array.from({ length: count }, (_, i) => {
    const started = new Date(Date.now() - i * 3600_000 - r() * 600_000);
    const dur = Math.floor(between(60_000, 280_000));
    const status: Deployment["status"] =
      i === 0 ? "in_progress" : i === 3 ? "rolled_back" : r() > 0.92 ? "failed" : "succeeded";
    return {
      id: id(),
      service: pick(services),
      version: `v2.${Math.floor(between(8, 16))}.${Math.floor(between(0, 50))}`,
      commit: id().slice(0, 7),
      author: pick(authors),
      startedAt: started.toISOString(),
      finishedAt: new Date(started.getTime() + dur).toISOString(),
      status,
      environment: i % 5 === 0 ? "staging" : "prod",
    };
  });
}

// ---------- ML models ----------

export function generateMLModels(): MLModel[] {
  const names = ["anomaly-detector", "event-classifier", "latency-forecaster", "fraud-scorer"];
  return names.map((n, i) => ({
    id: id(),
    name: n,
    version: `${1 + i}.${Math.floor(between(0, 9))}.${Math.floor(between(0, 9))}`,
    status: i === 3 ? "shadow" : i === 0 ? "serving" : "serving",
    inferenceP95: Math.round(between(18, 240)),
    accuracy: +(between(0.86, 0.98)).toFixed(3),
    drift: +(between(0.01, i === 2 ? 0.18 : 0.08)).toFixed(3),
    confidence: +(between(0.7, 0.96)).toFixed(2),
    throughput: Math.floor(between(40, 1800)),
    deployedAt: new Date(Date.now() - (i + 1) * 86400_000).toISOString(),
  }));
}

export function generateConfidenceDistribution() {
  return Array.from({ length: 10 }, (_, i) => ({
    bucket: `${i * 10}-${i * 10 + 10}%`,
    value: Math.round(between(20, 1200) * (i > 5 ? 2 : 1)),
  }));
}

// ---------- Topology ----------

export function generateTopology(): { nodes: TopologyNode[]; edges: TopologyEdge[] } {
  const nodes: TopologyNode[] = [
    { id: "gw", label: "api-gateway", kind: "gateway", status: "healthy", x: 60, y: 200 },
    { id: "auth", label: "auth-service", kind: "service", status: "healthy", x: 240, y: 80 },
    { id: "evt", label: "event-service", kind: "service", status: "healthy", x: 240, y: 200 },
    { id: "ana", label: "analytics-service", kind: "service", status: "healthy", x: 240, y: 320 },
    { id: "q1", label: "events.high", kind: "queue", status: "degraded", x: 440, y: 160 },
    { id: "q2", label: "ml.jobs", kind: "queue", status: "healthy", x: 440, y: 280 },
    { id: "wrk", label: "worker-pool", kind: "worker", status: "healthy", x: 620, y: 160 },
    { id: "ml", label: "ml-service", kind: "ml", status: "degraded", x: 620, y: 280 },
    { id: "pg", label: "postgres-primary", kind: "db", status: "healthy", x: 820, y: 120 },
    { id: "rd", label: "redis-cluster", kind: "db", status: "healthy", x: 820, y: 240 },
  ];
  const edges: TopologyEdge[] = [
    { from: "gw", to: "auth", rps: 420, errorRate: 0.1 },
    { from: "gw", to: "evt", rps: 2100, errorRate: 0.3 },
    { from: "gw", to: "ana", rps: 180, errorRate: 0.0 },
    { from: "evt", to: "q1", rps: 1900, errorRate: 0.0 },
    { from: "evt", to: "q2", rps: 240, errorRate: 0.0 },
    { from: "q1", to: "wrk", rps: 1800, errorRate: 0.2 },
    { from: "q2", to: "ml", rps: 220, errorRate: 1.4 },
    { from: "wrk", to: "pg", rps: 1700, errorRate: 0.1 },
    { from: "ml", to: "pg", rps: 200, errorRate: 0.0 },
    { from: "auth", to: "rd", rps: 410, errorRate: 0.0 },
    { from: "evt", to: "rd", rps: 1900, errorRate: 0.0 },
  ];
  return { nodes, edges };
}

// ---------- Notifications ----------

export function generateNotifications(): Notification[] {
  const items: Array<Omit<Notification, "id" | "timestamp" | "read">> = [
    { title: "INC-1001 opened", body: "Elevated 5xx on api-gateway", kind: "incident", severity: "critical" },
    { title: "Queue events.high backlog", body: "Depth 12.4k, drain rate -18%", kind: "queue", severity: "error" },
    { title: "Worker offline", body: "worker-eu-west-1b heartbeat lost", kind: "worker", severity: "error" },
    { title: "Deploy succeeded", body: "event-service v2.14.3 → prod", kind: "deploy", severity: "info" },
    { title: "Anomaly detected", body: "ML drift +0.18 on ml-service", kind: "alert", severity: "warning" },
    { title: "API key rotated", body: "ci-deploy by sam@pulse.io", kind: "alert", severity: "info" },
  ];
  return items.map((x, i) => ({
    ...x,
    id: id(),
    timestamp: new Date(Date.now() - i * 7 * 60_000 - r() * 60_000).toISOString(),
    read: i > 2,
  }));
}

// ---------- Saved filter presets ----------

export interface FilterPreset {
  id: string;
  name: string;
  scope: "events" | "logs" | "traces" | "alerts";
  query: string;
}
export function generateFilterPresets(): FilterPreset[] {
  return [
    { id: id(), name: "Failed payments last 1h", scope: "events", query: "type:payment.* status:failed last:1h" },
    { id: id(), name: "5xx on api-gateway", scope: "logs", query: "service:api-gateway level:error" },
    { id: id(), name: "Slow traces > 1s", scope: "traces", query: "duration:>1000ms status:error" },
    { id: id(), name: "Critical alerts", scope: "alerts", query: "severity:critical ack:false" },
  ];
}

// ---------- Correlation Engine ----------

export interface CorrelationLink {
  kind: "log" | "event" | "trace" | "incident" | "alert" | "deployment";
  id: string;
  title: string;
  tone?: "success" | "warning" | "error" | "info" | "neutral" | "critical";
}

export interface CorrelatedContext {
  entity: CorrelationLink;
  service?: string;
  deployment?: CorrelationLink;
  incident?: CorrelationLink;
  alerts: CorrelationLink[];
  traces: CorrelationLink[];
  logs: CorrelationLink[];
  queues: CorrelationLink[];
  workers: CorrelationLink[];
  endpoints: CorrelationLink[];
  region?: string;
  environment?: string;
  aiSummary?: string;
}

// ---------- SLO / Error Budget ----------

export interface SLI {
  name: string;
  type: "availability" | "latency" | "error_rate" | "throughput";
  target: number;
  current: number;
  unit: string;
}

export interface SLO {
  id: string;
  name: string;
  service: string;
  status: "healthy" | "at_risk" | "breached";
  budgetRemaining: number;
  burnRate: number;
  burnRateWindow: string;
  slis: SLI[];
  period: string;
}

// ---------- Unified Timeline ----------

export type TimelineEventType = "deploy" | "alert" | "incident" | "queue_spike" | "worker_restart" | "config_change" | "slo_breach" | "ai_anomaly";

export interface TimelineEvent {
  id: string;
  timestamp: string;
  type: TimelineEventType;
  title: string;
  description: string;
  service?: string;
  severity?: Severity;
  link?: CorrelationLink;
}

// ---------- Deployment Intelligence ----------

export interface DeploymentImpact {
  deploymentId: string;
  service: string;
  version: string;
  environment: string;
  beforeP95: number;
  afterP95: number;
  beforeErrorRate: number;
  afterErrorRate: number;
  beforeRps: number;
  afterRps: number;
  regressionDetected: boolean;
  confidenceScore: number;
  affectedServices: string[];
  latencyDiff: number;
  errorRateDiff: number;
}

// ---------- Heatmaps ----------

export interface HeatmapCell {
  x: number;
  y: number;
  value: number;
  label?: string;
}

export interface HeatmapData {
  title: string;
  xLabel: string;
  yLabel: string;
  cells: HeatmapCell[];
  maxValue: number;
}

// ---------- Investigation Workspace ----------

export interface InvestigationItem {
  kind: "log" | "event" | "trace" | "incident" | "alert" | "deployment";
  id: string;
  title: string;
  addedAt: string;
  note?: string;
}

export interface InvestigationNote {
  id: string;
  text: string;
  author: string;
  at: string;
}

export interface InvestigationSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  items: InvestigationItem[];
  notes: InvestigationNote[];
  status: "active" | "resolved" | "archived";
}

// ---------- Universal Search ----------

export type SearchableEntityKind = "trace" | "incident" | "service" | "deployment" | "endpoint" | "log" | "alert" | "queue" | "worker" | "api_key" | "member" | "region";

export interface SearchableEntity {
  kind: SearchableEntityKind;
  id: string;
  title: string;
  subtitle?: string;
  route: string;
  tone?: "success" | "warning" | "error" | "info" | "neutral" | "critical";
}

// ---------- Environment ----------

export type Environment = "prod" | "staging" | "dev" | "preview";

export interface EnvironmentInfo {
  slug: Environment;
  label: string;
  color: string;
  region: string;
}

export const ENVIRONMENTS: EnvironmentInfo[] = [
  { slug: "prod", label: "Production", color: "var(--color-success)", region: "us-east-1" },
  { slug: "staging", label: "Staging", color: "var(--color-warning)", region: "us-east-1" },
  { slug: "dev", label: "Development", color: "var(--color-info)", region: "us-east-1" },
  { slug: "preview", label: "Preview", color: "var(--color-muted-foreground)", region: "us-west-2" },
];

function pickMultiple<T>(arr: T[], count: number): T[] {
  const result: T[] = [];
  const available = [...arr];
  for (let i = 0; i < count && available.length > 0; i++) {
    const idx = Math.floor(r() * available.length);
    result.push(available.splice(idx, 1)[0]);
  }
  return result;
}

export function generateSLOs(): SLO[] {
  const defs: Array<{ name: string; service: string; slis: SLI[] }> = [
    { name: "API Availability", service: "api-gateway", slis: [
      { name: "Availability", type: "availability", target: 99.99, current: 99.992, unit: "%" },
      { name: "p95 Latency", type: "latency", target: 200, current: 142, unit: "ms" },
    ]},
    { name: "Event Processing", service: "event-service", slis: [
      { name: "Availability", type: "availability", target: 99.95, current: 99.94, unit: "%" },
      { name: "Error Rate", type: "error_rate", target: 1, current: 1.24, unit: "%" },
    ]},
    { name: "Auth Latency", service: "auth-service", slis: [
      { name: "p99 Latency", type: "latency", target: 500, current: 380, unit: "ms" },
      { name: "Availability", type: "availability", target: 99.99, current: 99.998, unit: "%" },
    ]},
    { name: "ML Inference", service: "ml-service", slis: [
      { name: "p95 Inference", type: "latency", target: 300, current: 218, unit: "ms" },
      { name: "Accuracy", type: "throughput", target: 95, current: 91.2, unit: "%" },
    ]},
    { name: "Worker Throughput", service: "worker-service", slis: [
      { name: "Availability", type: "availability", target: 99.9, current: 99.85, unit: "%" },
      { name: "Throughput", type: "throughput", target: 2000, current: 1840, unit: "rps" },
    ]},
  ];
  return defs.map(d => {
    const breached = d.slis.some(s => {
      if (s.type === "error_rate") return s.current > s.target;
      if (s.type === "latency") return s.current > s.target;
      return s.current < s.target;
    });
    const atRisk = !breached && d.slis.some(s => {
      if (s.type === "availability") return s.current < s.target + 0.05;
      return false;
    });
    return {
      id: `slo_${id()}`,
      name: d.name,
      service: d.service,
      status: breached ? "breached" : atRisk ? "at_risk" : "healthy" as SLO["status"],
      budgetRemaining: breached ? Math.round(between(2, 15)) : atRisk ? Math.round(between(15, 40)) : Math.round(between(60, 98)),
      burnRate: breached ? +(between(3, 14)).toFixed(1) : atRisk ? +(between(1, 3)).toFixed(1) : +(between(0.1, 0.8)).toFixed(1),
      burnRateWindow: "1h",
      slis: d.slis,
      period: "30d",
    };
  });
}

export function generateTimelineEvents(count = 30): TimelineEvent[] {
  const now = Date.now();
  const items: Array<Omit<TimelineEvent, "id" | "timestamp">> = [
    { type: "deploy", title: "event-service v2.14.3", description: "Deployed to prod", service: "event-service", severity: "info" },
    { type: "alert", title: "Queue depth spike", description: "events.high depth > 10k", service: "event-service", severity: "warning" },
    { type: "incident", title: "INC-1001 opened", description: "Elevated 5xx on api-gateway", service: "api-gateway", severity: "critical" },
    { type: "queue_spike", title: "events.high backlog", description: "Lag 4.2s, 12k messages", service: "event-service", severity: "error" },
    { type: "worker_restart", title: "worker-eu-west-1b restarted", description: "OOM kill, auto-recovered", severity: "warning" },
    { type: "config_change", title: "Rate limit updated", description: "api-gateway: 2000 to 2500 rps", service: "api-gateway", severity: "info" },
    { type: "slo_breach", title: "SLO at risk: Event Processing", description: "Budget remaining 18%", service: "event-service", severity: "error" },
    { type: "ai_anomaly", title: "Anomaly: latency drift", description: "worker-service +220ms above baseline", service: "worker-service", severity: "warning" },
    { type: "deploy", title: "auth-service v2.12.1", description: "Hotfix: token validation", service: "auth-service", severity: "info" },
    { type: "alert", title: "DLQ growing", description: "webhooks queue DLQ > 100", service: "event-service", severity: "warning" },
  ];
  return items.slice(0, count).map((x, i) => ({
    ...x,
    id: id(),
    timestamp: new Date(now - i * (120_000 + Math.floor(r() * 480_000))).toISOString(),
    link: x.service ? { kind: "event" as const, id: id(), title: x.title } : undefined,
  }));
}

export function generateDeploymentImpacts(): DeploymentImpact[] {
  const deploys = generateDeployments(8);
  return deploys.filter(d => d.status === "succeeded" || d.status === "rolled_back").map(d => {
    const beforeP95 = Math.round(between(80, 300));
    const afterP95 = d.status === "rolled_back" ? Math.round(beforeP95 * between(1.2, 1.8)) : Math.round(beforeP95 * between(0.7, 1.1));
    const beforeErr = +(between(0.2, 2.0)).toFixed(2);
    const afterErr = d.status === "rolled_back" ? +(beforeErr * between(2, 5)).toFixed(2) : +(beforeErr * between(0.5, 1.3)).toFixed(2);
    return {
      deploymentId: d.id,
      service: d.service,
      version: d.version,
      environment: d.environment,
      beforeP95,
      afterP95,
      beforeErrorRate: beforeErr,
      afterErrorRate: afterErr,
      beforeRps: Math.round(between(400, 2800)),
      afterRps: Math.round(between(400, 2800)),
      regressionDetected: (afterP95 - beforeP95) > 50 || (afterErr - beforeErr) > 0.5,
      confidenceScore: +(between(0.72, 0.98)).toFixed(2),
      affectedServices: [d.service, ...pickMultiple(["api-gateway", "auth-service", "event-service", "redis-cluster"], Math.floor(between(1, 3)))],
      latencyDiff: afterP95 - beforeP95,
      errorRateDiff: +(afterErr - beforeErr).toFixed(2),
    };
  });
}

export function generateLatencyHeatmap(): HeatmapData {
  const services = ["api-gateway", "auth-service", "event-service", "worker-service", "ml-service", "analytics-service"];
  const cells: HeatmapCell[] = [];
  for (let h = 0; h < 24; h++) {
    for (let s = 0; s < services.length; s++) {
      const isPeak = h >= 9 && h <= 17;
      cells.push({ x: h, y: s, value: Math.round(isPeak ? between(120, 480) : between(30, 180)), label: `${h}:00` });
    }
  }
  return { title: "Latency Heatmap", xLabel: "Hour", yLabel: "Service", cells, maxValue: 500 };
}

export function generateEndpointHeatmap(): HeatmapData {
  const endpoints = ["/v1/events", "/v1/ingest", "/v1/auth", "/v1/queues", "/v1/workers", "/v1/me"];
  const codes = ["200", "400", "401", "404", "500", "503"];
  const cells: HeatmapCell[] = [];
  for (let e = 0; e < endpoints.length; e++) {
    for (let c = 0; c < codes.length; c++) {
      const isError = parseInt(codes[c]) >= 400;
      cells.push({ x: e, y: c, value: Math.round(isError ? between(0, 80) : between(200, 4000)) });
    }
  }
  return { title: "Endpoint x Status Code", xLabel: "Endpoint", yLabel: "Status", cells, maxValue: 4000 };
}

export function generateServiceDependencyHeatmap(): HeatmapData {
  const svcs = ["api-gw", "auth", "events", "worker", "ml", "postgres"];
  const cells: HeatmapCell[] = [];
  for (let a = 0; a < svcs.length; a++) {
    for (let b = 0; b < svcs.length; b++) {
      cells.push({ x: a, y: b, value: a === b ? 0 : (r() > 0.6 ? Math.round(between(50, 800)) : Math.round(between(0, 20))) });
    }
  }
  return { title: "Service Dependency RPS", xLabel: "Downstream", yLabel: "Upstream", cells, maxValue: 800 };
}

export function generateSearchIndex(): SearchableEntity[] {
  const items: SearchableEntity[] = [];
  generateTraces(20).forEach(t => items.push({ kind: "trace", id: t.id, title: t.rootOperation, subtitle: `${t.rootService} · ${t.durationMs}ms`, route: `/traces/${t.id}`, tone: t.status === "error" ? "error" : t.status === "degraded" ? "warning" : "success" }));
  generateIncidents().forEach(i => items.push({ kind: "incident", id: i.id, title: i.title, subtitle: i.severity, route: `/incidents/${i.id}`, tone: i.severity === "sev1" ? "critical" : i.severity === "sev2" ? "error" : "warning" }));
  generateServices().forEach(s => items.push({ kind: "service", id: s.id, title: s.name, subtitle: `${s.status} · ${s.rps} rps`, route: `/services/${s.name}`, tone: s.status === "healthy" ? "success" : s.status === "degraded" ? "warning" : "error" }));
  generateDeployments(10).forEach(d => items.push({ kind: "deployment", id: d.id, title: `${d.service}@${d.version}`, subtitle: d.environment, route: "/deployments", tone: d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning" }));
  generateApiEndpoints().forEach(e => items.push({ kind: "endpoint", id: `${e.method}:${e.path}`, title: `${e.method} ${e.path}`, subtitle: `${e.rps} rps · ${e.p95}ms`, route: "/api", tone: e.errorRate > 1 ? "error" : "info" }));
  generateAlerts(10).forEach(a => items.push({ kind: "alert", id: a.id, title: a.title, subtitle: a.severity, route: "/alerts", tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning" }));
  generateQueues().forEach(q => items.push({ kind: "queue", id: q.id, title: q.name, subtitle: `${q.messages} msgs · ${q.status}`, route: "/queues", tone: q.status === "backlogged" ? "error" : q.status === "degraded" ? "warning" : "success" }));
  generateWorkers().forEach(w => items.push({ kind: "worker", id: w.id, title: w.name, subtitle: `${w.status} · ${w.region}`, route: "/workers", tone: w.status === "online" ? "success" : "error" }));
  generateApiKeys().forEach(k => items.push({ kind: "api_key", id: k.id, title: k.name, subtitle: k.prefix, route: "/settings" }));
  generateMembers().forEach(m => items.push({ kind: "member", id: m.id, title: m.name, subtitle: `${m.role} · ${m.team}`, route: "/settings" }));
  REGIONS.forEach(rg => items.push({ kind: "region", id: rg, title: rg, subtitle: "AWS region", route: "/" }));
  return items;
}

export function buildCorrelatedContext(kind: CorrelationLink["kind"], entityId: string, entityTitle: string, service?: string): CorrelatedContext {
  const svc = service ?? pick(SERVICES);
  const alerts = generateAlerts(3).slice(0, Math.floor(between(0, 3))).map(a => ({ kind: "alert" as const, id: a.id, title: a.title, tone: a.severity === "critical" ? "critical" as const : a.severity === "error" ? "error" as const : "warning" as const }));
  const traces = generateTraces(3).slice(0, Math.floor(between(1, 3))).map(t => ({ kind: "trace" as const, id: t.id, title: `${t.rootOperation} · ${t.durationMs}ms`, tone: t.status === "ok" ? "success" as const : "error" as const }));
  const logs = generateLogs(4).slice(0, Math.floor(between(2, 4))).map(l => ({ kind: "log" as const, id: l.id, title: `${l.level}: ${l.message.slice(0, 60)}`, tone: l.level === "error" || l.level === "critical" ? "error" as const : l.level === "warn" ? "warning" as const : "neutral" as const }));
  const queues = generateQueues().slice(0, 2).map(q => ({ kind: "event" as const, id: q.id, title: `${q.name} · ${q.messages}`, tone: q.status === "backlogged" ? "error" as const : q.status === "degraded" ? "warning" as const : "success" as const }));
  const workers = generateWorkers().slice(0, 2).map(w => ({ kind: "event" as const, id: w.id, title: `${w.name} · ${w.status}`, tone: w.status === "online" ? "success" as const : "error" as const }));
  const endpoints = generateApiEndpoints().slice(0, 2).map(e => ({ kind: "event" as const, id: `${e.method}:${e.path}`, title: `${e.method} ${e.path}`, tone: e.errorRate > 1 ? "error" as const : "info" as const }));
  const deploy = generateDeployments(1)[0];
  const incident = generateIncidents()[0];
  const aiSummary = `Correlated anomaly: ${entityTitle} in ${svc} shows elevated latency correlated with deploy ${deploy.version} and ${alerts.length} active alerts. Probable cause: connection pool saturation after configuration change.`;
  return {
    entity: { kind, id: entityId, title: entityTitle },
    service: svc,
    deployment: { kind: "deployment", id: deploy.id, title: `${deploy.service}@${deploy.version}`, tone: deploy.status === "succeeded" ? "success" : "error" },
    incident: alerts.length > 0 ? { kind: "incident", id: incident.id, title: incident.title, tone: "error" } : undefined,
    alerts,
    traces,
    logs,
    queues,
    workers,
    endpoints,
    region: pick(REGIONS),
    environment: "prod",
    aiSummary,
  };
}
