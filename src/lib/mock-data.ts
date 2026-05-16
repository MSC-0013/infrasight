// Deterministic-ish mock data generators for the observability platform.
// All numbers are random but bounded so charts look realistic.

export type Severity = "info" | "warning" | "error" | "critical";
export type EventStatus = "success" | "failed" | "retrying" | "queued" | "processing";

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
  cpu: number;
  memory: number;
  jobsProcessed: number;
  retries: number;
  uptimeHours: number;
  lastHeartbeat: string;
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
const SERVICES = ["api-gateway", "events-ingest", "queue-processor", "ml-inference", "postgres-primary", "redis-cluster"];

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
  return WORKERS_NAMES.map((name, i) => {
    const status: Worker["status"] = i === 4 ? "offline" : i === 2 ? "degraded" : "online";
    return {
      id: id(),
      name,
      status,
      region: pick(REGIONS),
      cpu: Math.round(between(12, 92)),
      memory: Math.round(between(28, 88)),
      jobsProcessed: Math.floor(between(12000, 480000)),
      retries: Math.floor(between(0, 240)),
      uptimeHours: Math.round(between(2, 720)),
      lastHeartbeat: new Date(Date.now() - between(1000, 60000)).toISOString(),
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
