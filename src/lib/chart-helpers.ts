/**
 * Chart utilities — derive visualization data from API metrics.
 */

import type {
  Alert,
  AppEvent,
  Deployment,
  HeatmapCell,
  HeatmapData,
  Incident,
  Queue,
  ServiceHealth,
  SLO,
  TimelineEvent,
} from '@/lib/mock-data';

export interface TimeBucket {
  t: string;
  label: string;
  value: number;
}

export interface ThroughputBucket {
  t: string;
  success: number;
  failed: number;
}

/** Build sparkline points from a single numeric metric */
export function sparklineFromValue(value: number, points = 20, variance = 0.15): TimeBucket[] {
  const now = Date.now();
  return Array.from({ length: points }, (_, i) => {
    const jitter = 1 + Math.sin(i * 0.7) * variance;
    return {
      t: new Date(now - (points - i) * 60_000).toISOString(),
      label: `${i}`,
      value: Math.max(0, Math.round(value * jitter)),
    };
  });
}

/** Map API throughput to chart format */
export function throughputToChart(
  data: ThroughputBucket[],
): Array<{ t: string; label: string; success: number; failed: number }> {
  return data.map((d, i) => ({
    t: d.t,
    label: `${i}`,
    success: d.success,
    failed: d.failed,
  }));
}

/** Latency chart from throughput buckets */
export function latencyFromThroughput(data: ThroughputBucket[]): Array<{
  t: string;
  label: string;
  p50: number;
  p95: number;
  p99: number;
}> {
  return data.map((d, i) => {
    const base = 40 + d.failed * 8;
    return {
      t: d.t,
      label: `${i}`,
      p50: base,
      p95: base * 1.8,
      p99: base * 2.4,
    };
  });
}

/** Queue lag series from queue records */
export function queueLagFromQueues(queues: Queue[]): Array<{ t: string; label: string; lag: number }> {
  if (!queues.length) return sparklineFromValue(0, 40, 0).map((p) => ({ ...p, lag: p.value }));
  return queues.map((q, i) => ({
    t: q.id,
    label: q.name.slice(0, 8),
    lag: q.lagMs,
  }));
}

/** Event distribution pie from events */
export function distributionFromEvents(events: AppEvent[]) {
  const counts: Record<string, number> = {};
  for (const e of events) {
    counts[e.eventType] = (counts[e.eventType] ?? 0) + 1;
  }
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

/** Unified timeline from API entities */
export function buildTimelineFromApi(
  incidents: Incident[],
  deployments: Deployment[],
  alerts: Alert[],
  slos: SLO[],
): TimelineEvent[] {
  const items: TimelineEvent[] = [];

  for (const d of deployments.slice(0, 8)) {
    items.push({
      id: d.id,
      timestamp: d.startedAt,
      type: 'deploy',
      title: `${d.service} ${d.version}`,
      description: `Status: ${d.status}`,
      service: d.service,
      severity: d.status === 'failed' ? 'error' : 'info',
    });
  }

  for (const i of incidents.filter((x) => x.status !== 'resolved').slice(0, 6)) {
    items.push({
      id: i.id,
      timestamp: i.openedAt,
      type: 'incident',
      title: i.title,
      description: i.severity,
      service: i.impactedServices[0],
      severity: i.severity === 'sev1' ? 'critical' : 'error',
    });
  }

  for (const a of alerts.filter((x) => !x.acknowledged).slice(0, 6)) {
    items.push({
      id: a.id,
      timestamp: a.timestamp,
      type: 'alert',
      title: a.title,
      description: a.service,
      service: a.service,
      severity: a.severity,
    });
  }

  for (const s of slos.filter((x) => x.status !== 'healthy').slice(0, 4)) {
    items.push({
      id: s.id,
      timestamp: new Date().toISOString(),
      type: 'slo_breach',
      title: `SLO ${s.status}: ${s.name}`,
      description: `Budget ${s.budgetRemaining}%`,
      service: s.service,
      severity: s.status === 'breached' ? 'error' : 'warning',
    });
  }

  return items
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 24);
}

/** Latency heatmap from service p95 across hours */
export function latencyHeatmapFromServices(services: ServiceHealth[]): HeatmapData {
  const names = services.map((s) => s.name);
  const cells: HeatmapCell[] = [];
  let maxValue = 1;
  for (let h = 0; h < 24; h++) {
    for (let s = 0; s < names.length; s++) {
      const svc = services[s];
      const peak = h >= 9 && h <= 17;
      const value = Math.round(svc.p95Ms * (peak ? 1.2 : 0.85) * (1 + Math.sin(h) * 0.1));
      maxValue = Math.max(maxValue, value);
      cells.push({ x: h, y: s, value, label: `${h}:00` });
    }
  }
  return { title: 'Latency Heatmap', xLabel: 'Hour', yLabel: 'Service', cells, maxValue };
}

/** Endpoint heatmap from services (error rate × service) */
export function endpointHeatmapFromServices(services: ServiceHealth[]): HeatmapData {
  const codes = ['200', '400', '401', '404', '500', '503'];
  const cells: HeatmapCell[] = [];
  let maxValue = 1;
  for (let e = 0; e < services.length; e++) {
    const svc = services[e];
    for (let c = 0; c < codes.length; c++) {
      const code = parseInt(codes[c], 10);
      const isError = code >= 400;
      const value = isError
        ? Math.round(svc.errorRate * svc.rps * (code >= 500 ? 3 : 1))
        : Math.round(svc.rps * 10);
      maxValue = Math.max(maxValue, value);
      cells.push({ x: e, y: c, value });
    }
  }
  return { title: 'Service x Status', xLabel: 'Service', yLabel: 'Status', cells, maxValue };
}

/** Dependency heatmap from service RPS matrix */
export function dependencyHeatmapFromServices(services: ServiceHealth[]): HeatmapData {
  const cells: HeatmapCell[] = [];
  let maxValue = 1;
  for (let a = 0; a < services.length; a++) {
    for (let b = 0; b < services.length; b++) {
      const value = a === b ? 0 : Math.round(services[a].rps * (a < b ? 0.3 : 0.15));
      maxValue = Math.max(maxValue, value);
      cells.push({ x: a, y: b, value });
    }
  }
  return { title: 'Service Dependency RPS', xLabel: 'Downstream', yLabel: 'Upstream', cells, maxValue };
}
