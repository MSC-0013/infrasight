import { API_BASE_URL } from './config';
import { apiGet, apiPatch, apiPost } from './client';
import {
  mapAlertRule,
  mapApiKey,
  mapAudit,
  mapDeployment,
  mapEvent,
  mapIncident,
  mapLog,
  mapMember,
  mapMlModel,
  mapNotification,
  mapOrganization,
  mapPaginated,
  mapQueue,
  mapService,
  mapSlo,
  mapSpan,
  mapTrace,
  mapWorker,
  mapAiInsight,
  type Paginated,
} from './mappers';

type ListParams = {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  severity?: string;
  service?: string;
  level?: string;
  query?: string;
};

async function fetchList<T>(
  path: string,
  params: ListParams,
  mapper: (r: Record<string, unknown>) => T,
): Promise<T[]> {
  const raw = await apiGet<Paginated<Record<string, unknown>>>(path, params);
  return mapPaginated(raw, mapper);
}

export interface AuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    orgId: string;
    orgName?: string;
    orgSlug?: string;
    permissions: string[];
  };
}

export interface DashboardMetrics {
  eventsPerHour: number;
  eventsTotal: number;
  activeAlerts: number;
  onlineWorkers: number;
  totalWorkers: number;
  openIncidents: number;
  healthyServices: number;
  totalServices: number;
  avgP95: number;
  avgErrorRate: number;
  totalRps: number;
  avgUptime: number;
  avgQueueLag: number;
}

export const pulseAuth = {
  login: (email: string, password: string) =>
    apiPost<AuthLoginResponse>('/auth/login', { email, password }),

  register: (data: { email: string; password: string; name: string; organizationName?: string }) =>
    apiPost<AuthLoginResponse>('/auth/register', data),

  logout: (refreshToken: string) => apiPost('/auth/logout', { refreshToken }),

  me: () => apiGet<AuthLoginResponse['user']>('/auth/me'),
};

export const pulseApi = {
  health: async () => {
    const base = API_BASE_URL.replace(/\/api\/v1\/?$/, '');
    const res = await fetch(`${base}/health`);
    if (!res.ok) throw new Error('API unreachable');
    return res.json() as Promise<{ status: string }>;
  },

  dashboard: {
    metrics: () => apiGet<DashboardMetrics>('/dashboard/metrics'),
  },

  events: {
    list: (params: ListParams = {}) => fetchList('/events', { pageSize: 200, ...params }, mapEvent),
    stats: () => apiGet<Record<string, number>>('/events/stats'),
  },

  incidents: {
    list: (params: ListParams = {}) => fetchList('/incidents', { pageSize: 100, ...params }, mapIncident),
    get: async (id: string) =>
      mapIncident((await apiGet<Record<string, unknown>>(`/incidents/${id}`)) as Record<string, unknown>),
    acknowledge: (id: string) => apiPost(`/incidents/${id}/acknowledge`, {}),
    resolve: (id: string, note: string) => apiPost(`/incidents/${id}/resolve`, { note }),
  },

  workers: {
    list: (params: ListParams = {}) => fetchList('/workers', { pageSize: 50, ...params }, mapWorker),
  },

  queues: {
    list: (params: ListParams = {}) => fetchList('/queues', { pageSize: 50, ...params }, mapQueue),
  },

  services: {
    list: (params: ListParams = {}) => fetchList('/services', { pageSize: 50, ...params }, mapService),
    getByName: async (name: string) =>
      mapService(
        (await apiGet<Record<string, unknown>>(`/services/by-name/${encodeURIComponent(name)}`)) as Record<
          string,
          unknown
        >,
      ),
  },

  traces: {
    list: (params: ListParams = {}) => fetchList('/traces', { pageSize: 100, ...params }, mapTrace),
    get: async (traceId: string) => {
      const raw = await apiGet<Record<string, unknown> & { spans?: Record<string, unknown>[] }>(
        `/traces/${encodeURIComponent(traceId)}`,
      );
      const trace = mapTrace(raw);
      const start = new Date(raw.startTime as string);
      const spans = (raw.spans ?? []).map((s) => mapSpan(s, start));
      return { trace, spans };
    },
  },

  logs: {
    list: (params: ListParams = {}) => fetchList('/logs', { pageSize: 300, ...params }, mapLog),
  },

  deployments: {
    list: (params: ListParams = {}) => fetchList('/deployments', { pageSize: 50, ...params }, mapDeployment),
  },

  slos: {
    list: (params: ListParams = {}) => fetchList('/slos', { pageSize: 50, ...params }, mapSlo),
  },

  alerts: {
    list: (params: ListParams = {}) => fetchList('/alerts', { pageSize: 50, ...params }, mapAlertRule),
    acknowledge: (id: string) => apiPost(`/alerts/${id}/acknowledge`, {}),
  },

  audit: {
    list: (params: ListParams = {}) => fetchList('/audit', { pageSize: 120, ...params }, mapAudit),
  },

  organizations: {
    list: (params: ListParams = {}) => fetchList('/organizations', params, mapOrganization),
  },

  mlops: {
    models: (params: ListParams = {}) => fetchList('/mlops', { pageSize: 50, ...params }, mapMlModel),
  },

  ai: {
    insights: (params: ListParams = {}) => fetchList('/ai/insights', params, mapAiInsight),
  },

  analytics: {
    overview: () => apiGet<Record<string, number>>('/analytics/overview'),
    throughput: (from?: string, to?: string) =>
      apiGet<Array<{ t: string; success: number; failed: number }>>('/analytics/throughput', { from, to }),
  },

  topology: {
    graph: () => apiGet<{ nodes: unknown[]; edges: unknown[]; generatedAt: string }>('/topology'),
  },

  settings: {
    apiKeys: async () => {
      const raw = await apiGet<Record<string, unknown>[]>('/settings/api-keys');
      return (raw ?? []).map((k) => mapApiKey(k));
    },
  },

  users: {
    list: (params: ListParams = {}) => fetchList('/users', params, mapMember),
  },

  notifications: {
    list: () => fetchList('/notifications', { pageSize: 50 }, mapNotification),
    markRead: (id: string) => apiPatch(`/notifications/${id}/read`, {}),
  },
};
