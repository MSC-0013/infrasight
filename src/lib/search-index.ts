import type {
  Alert,
  AppEvent,
  Deployment,
  Incident,
  Queue,
  SearchableEntity,
  ServiceHealth,
  Trace,
  Worker,
} from '@/lib/mock-data';

export function buildSearchIndex(data: {
  traces: Trace[];
  incidents: Incident[];
  services: ServiceHealth[];
  deployments: Deployment[];
  alerts: Alert[];
  queues: Queue[];
  workers: Worker[];
  events: AppEvent[];
}): SearchableEntity[] {
  const items: SearchableEntity[] = [];

  data.traces.slice(0, 30).forEach((t) =>
    items.push({
      kind: 'trace',
      id: t.id,
      title: t.rootOperation,
      subtitle: `${t.rootService} · ${t.durationMs}ms`,
      route: `/traces/${t.id}`,
      tone: t.status === 'error' ? 'error' : t.status === 'degraded' ? 'warning' : 'success',
    }),
  );

  data.incidents.forEach((i) =>
    items.push({
      kind: 'incident',
      id: i.id,
      title: i.title,
      subtitle: i.severity,
      route: `/incidents/${i.id}`,
      tone: i.severity === 'sev1' ? 'critical' : i.severity === 'sev2' ? 'error' : 'warning',
    }),
  );

  data.services.forEach((s) =>
    items.push({
      kind: 'service',
      id: s.id,
      title: s.name,
      subtitle: `${s.status} · ${s.rps} rps`,
      route: `/services/${s.name}`,
      tone: s.status === 'healthy' ? 'success' : s.status === 'degraded' ? 'warning' : 'error',
    }),
  );

  data.deployments.slice(0, 20).forEach((d) =>
    items.push({
      kind: 'deployment',
      id: d.id,
      title: `${d.service}@${d.version}`,
      subtitle: d.environment,
      route: '/deployments',
      tone: d.status === 'succeeded' ? 'success' : d.status === 'failed' ? 'error' : 'warning',
    }),
  );

  data.alerts.slice(0, 20).forEach((a) =>
    items.push({
      kind: 'alert',
      id: a.id,
      title: a.title,
      subtitle: a.severity,
      route: '/alerts',
      tone: a.severity === 'critical' ? 'critical' : a.severity === 'error' ? 'error' : 'warning',
    }),
  );

  data.queues.forEach((q) =>
    items.push({
      kind: 'queue',
      id: q.id,
      title: q.name,
      subtitle: `${q.messages} msgs · ${q.status}`,
      route: '/queues',
      tone: q.status === 'backlogged' ? 'error' : q.status === 'degraded' ? 'warning' : 'success',
    }),
  );

  data.workers.forEach((w) =>
    items.push({
      kind: 'worker',
      id: w.id,
      title: w.name,
      subtitle: w.status,
      route: '/workers',
      tone: w.status === 'online' ? 'success' : 'error',
    }),
  );

  data.events.slice(0, 20).forEach((e) =>
    items.push({
      kind: 'event',
      id: e.id,
      title: e.eventType,
      subtitle: e.organization,
      route: '/events',
      tone: e.status === 'failed' ? 'error' : 'info',
    }),
  );

  return items;
}
