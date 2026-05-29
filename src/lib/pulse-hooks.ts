import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pulseApi } from '@/lib/api/pulse-api';
import { mapTopologyGraph } from '@/lib/api/mappers';

const stale = 30_000;

export const pulseKeys = {
  events: ['pulse', 'events'] as const,
  incidents: ['pulse', 'incidents'] as const,
  incident: (id: string) => ['pulse', 'incidents', id] as const,
  workers: ['pulse', 'workers'] as const,
  queues: ['pulse', 'queues'] as const,
  services: ['pulse', 'services'] as const,
  serviceByName: (name: string) => ['pulse', 'services', 'name', name] as const,
  traces: ['pulse', 'traces'] as const,
  trace: (id: string) => ['pulse', 'traces', id] as const,
  logs: ['pulse', 'logs'] as const,
  deployments: ['pulse', 'deployments'] as const,
  slos: ['pulse', 'slos'] as const,
  alerts: ['pulse', 'alerts'] as const,
  audit: ['pulse', 'audit'] as const,
  organizations: ['pulse', 'organizations'] as const,
  mlModels: ['pulse', 'ml-models'] as const,
  mlInsights: ['pulse', 'ml-insights'] as const,
  dashboard: ['pulse', 'dashboard'] as const,
  topology: ['pulse', 'topology'] as const,
  members: ['pulse', 'members'] as const,
  notifications: ['pulse', 'notifications'] as const,
  throughput: ['pulse', 'throughput'] as const,
  apiKeys: ['pulse', 'api-keys'] as const,
  health: ['pulse', 'health'] as const,
  analytics: ['pulse', 'analytics'] as const,
};

export function useApiHealth() {
  return useQuery({
    queryKey: pulseKeys.health,
    queryFn: () => pulseApi.health(),
    retry: 3,
    staleTime: 10_000,
  });
}

export function usePulseEvents(pageSize = 200) {
  return useQuery({
    queryKey: [...pulseKeys.events, pageSize],
    queryFn: () => pulseApi.events.list({ pageSize }),
    staleTime: stale,
    refetchInterval: 5000,
  });
}

export function usePulseIncidents() {
  return useQuery({
    queryKey: pulseKeys.incidents,
    queryFn: () => pulseApi.incidents.list(),
    staleTime: stale,
  });
}

export function usePulseIncident(id: string) {
  return useQuery({
    queryKey: pulseKeys.incident(id),
    queryFn: () => pulseApi.incidents.get(id),
    enabled: !!id,
  });
}

export function usePulseWorkers() {
  return useQuery({
    queryKey: pulseKeys.workers,
    queryFn: () => pulseApi.workers.list(),
    staleTime: stale,
    refetchInterval: 10_000,
  });
}

export function usePulseQueues() {
  return useQuery({
    queryKey: pulseKeys.queues,
    queryFn: () => pulseApi.queues.list(),
    staleTime: stale,
  });
}

export function usePulseServices() {
  return useQuery({
    queryKey: pulseKeys.services,
    queryFn: () => pulseApi.services.list(),
    staleTime: stale,
  });
}

export function usePulseServiceByName(name: string) {
  return useQuery({
    queryKey: pulseKeys.serviceByName(name),
    queryFn: () => pulseApi.services.getByName(name),
    enabled: !!name,
  });
}

export function usePulseTraces() {
  return useQuery({
    queryKey: pulseKeys.traces,
    queryFn: () => pulseApi.traces.list({ pageSize: 100 }),
    staleTime: stale,
  });
}

export function usePulseTrace(traceId: string) {
  return useQuery({
    queryKey: pulseKeys.trace(traceId),
    queryFn: () => pulseApi.traces.get(traceId),
    enabled: !!traceId,
  });
}

export function usePulseLogs() {
  return useQuery({
    queryKey: pulseKeys.logs,
    queryFn: () => pulseApi.logs.list({ pageSize: 300 }),
    staleTime: stale,
  });
}

export function usePulseDeployments(pageSize = 50) {
  return useQuery({
    queryKey: [...pulseKeys.deployments, pageSize],
    queryFn: () => pulseApi.deployments.list({ pageSize }),
    staleTime: stale,
  });
}

export function usePulseSLOs() {
  return useQuery({
    queryKey: pulseKeys.slos,
    queryFn: () => pulseApi.slos.list(),
    staleTime: stale,
  });
}

export function usePulseAlerts() {
  return useQuery({
    queryKey: pulseKeys.alerts,
    queryFn: () => pulseApi.alerts.list(),
    staleTime: stale,
  });
}

export function usePulseAuditLogs() {
  return useQuery({
    queryKey: pulseKeys.audit,
    queryFn: () => pulseApi.audit.list({ pageSize: 120 }),
    staleTime: stale,
  });
}

export function usePulseOrganizations() {
  return useQuery({
    queryKey: pulseKeys.organizations,
    queryFn: () => pulseApi.organizations.list(),
    staleTime: stale,
  });
}

export function usePulseMLModels() {
  return useQuery({
    queryKey: pulseKeys.mlModels,
    queryFn: () => pulseApi.mlops.models(),
    staleTime: stale,
  });
}

export function usePulseMLInsights() {
  return useQuery({
    queryKey: pulseKeys.mlInsights,
    queryFn: () => pulseApi.ai.insights(),
    staleTime: stale,
  });
}

export function usePulseDashboardMetrics() {
  return useQuery({
    queryKey: pulseKeys.dashboard,
    queryFn: () => pulseApi.dashboard.metrics(),
    staleTime: stale,
    refetchInterval: 15_000,
  });
}

export function usePulseThroughput(hours = 1) {
  const to = new Date();
  const from = new Date(to.getTime() - hours * 3600_000);
  return useQuery({
    queryKey: [...pulseKeys.throughput, hours],
    queryFn: () => pulseApi.analytics.throughput(from.toISOString(), to.toISOString()),
    staleTime: stale,
  });
}

export function usePulseTopology() {
  return useQuery({
    queryKey: pulseKeys.topology,
    queryFn: async () => {
      const raw = await pulseApi.topology.graph();
      return mapTopologyGraph({
        nodes: (raw.nodes ?? []) as Array<Record<string, unknown>>,
        edges: (raw.edges ?? []) as Array<Record<string, unknown>>,
      });
    },
    staleTime: stale,
  });
}

export function usePulseMembers() {
  return useQuery({
    queryKey: pulseKeys.members,
    queryFn: () => pulseApi.users.list(),
    staleTime: stale,
  });
}

export function usePulseNotifications() {
  return useQuery({
    queryKey: pulseKeys.notifications,
    queryFn: () => pulseApi.notifications.list(),
    staleTime: stale,
    refetchInterval: 30_000,
  });
}

export function usePulseApiKeys() {
  return useQuery({
    queryKey: pulseKeys.apiKeys,
    queryFn: () => pulseApi.settings.apiKeys(),
    staleTime: stale,
  });
}

export function usePulseAnalyticsOverview() {
  return useQuery({
    queryKey: pulseKeys.analytics,
    queryFn: () => pulseApi.analytics.overview(),
    staleTime: stale,
    refetchInterval: 30_000,
  });
}

export function useAcknowledgeAlert() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pulseApi.alerts.acknowledge(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: pulseKeys.alerts }),
  });
}

export function useAcknowledgeIncident() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pulseApi.incidents.acknowledge(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: pulseKeys.incidents }),
  });
}

export function useResolveIncident() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, note }: { id: string; note: string }) =>
      pulseApi.incidents.resolve(id, note),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: pulseKeys.incidents });
      qc.invalidateQueries({ queryKey: pulseKeys.incident(id) });
    },
  });
}

export function useMarkNotificationRead() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pulseApi.notifications.markRead(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: pulseKeys.notifications }),
  });
}
