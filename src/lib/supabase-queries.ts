// @ts-nocheck
// This file contains Supabase query helpers for future backend integration.
// Currently unused - dashboards use mock data generators instead.
// Re-enable type checking when the full database schema is migrated.

import { supabase } from "@/integrations/supabase/client";

// Re-export Supabase client for convenience
export { supabase };

// Helper to get the current user's org_id
async function getUserOrgId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("org_id")
    .eq("id", user.id)
    .single();
  return profile?.org_id ?? null;
}

// ── Dashboard Aggregations ──

export async function fetchDashboardMetrics() {
  const orgId = await getUserOrgId();
  if (!orgId) return null;

  // Events count in last hour
  const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
  const { count: eventsCount } = await supabase
    .from("events")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .gte("timestamp", oneHourAgo);

  // Active alerts (unacknowledged)
  const { count: activeAlerts } = await supabase
    .from("alerts")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("acknowledged", false);

  // Online workers
  const { count: onlineWorkers } = await supabase
    .from("workers")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("status", "online");

  const { count: totalWorkers } = await supabase
    .from("workers")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId);

  // Open incidents
  const { count: openIncidents } = await supabase
    .from("incidents")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .neq("status", "resolved");

  // Services
  const { count: healthyServices } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("status", "healthy");

  const { count: totalServices } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId);

  // Average latency p95 from services
  const { data: svcData } = await supabase
    .from("services")
    .select("p95_ms, error_rate, rps, uptime_pct")
    .eq("org_id", orgId);

  const avgP95 = svcData?.length
    ? Math.round(svcData.reduce((a, s) => a + s.p95_ms, 0) / svcData.length)
    : 0;
  const avgErrorRate = svcData?.length
    ? +(svcData.reduce((a, s) => a + s.error_rate, 0) / svcData.length).toFixed(2)
    : 0;
  const totalRps = svcData?.reduce((a, s) => a + Number(s.rps), 0) ?? 0;
  const avgUptime = svcData?.length
    ? +(svcData.reduce((a, s) => a + s.uptime_pct, 0) / svcData.length).toFixed(3)
    : 0;

  // Queues
  const { data: queuesData } = await supabase
    .from("queues")
    .select("lag_ms, status")
    .eq("org_id", orgId);
  const avgLag = queuesData?.length
    ? Math.round(queuesData.reduce((a, q) => a + q.lag_ms, 0) / queuesData.length)
    : 0;

  return {
    eventsPerHour: eventsCount ?? 0,
    activeAlerts: activeAlerts ?? 0,
    onlineWorkers: onlineWorkers ?? 0,
    totalWorkers: totalWorkers ?? 0,
    openIncidents: openIncidents ?? 0,
    healthyServices: healthyServices ?? 0,
    totalServices: totalServices ?? 0,
    avgP95,
    avgErrorRate,
    totalRps,
    avgUptime,
    avgQueueLag: avgLag,
  };
}

// ── Super Admin Metrics ──

export async function fetchSuperAdminMetrics() {
  const { count: totalOrgs } = await supabase
    .from("organizations")
    .select("*", { count: "exact", head: true });

  const { count: totalMembers } = await supabase
    .from("members")
    .select("*", { count: "exact", head: true });

  const { count: totalApiKeys } = await supabase
    .from("api_keys")
    .select("*", { count: "exact", head: true })
    .eq("status", "active");

  const { count: auditToday } = await supabase
    .from("audit_logs")
    .select("*", { count: "exact", head: true })
    .gte("timestamp", new Date(Date.now() - 86400000).toISOString());

  return {
    totalOrgs: totalOrgs ?? 0,
    totalMembers: totalMembers ?? 0,
    totalApiKeys: totalApiKeys ?? 0,
    auditEvents24h: auditToday ?? 0,
  };
}

// ── SRE Metrics ──

export async function fetchSREMetrics() {
  const orgId = await getUserOrgId();
  if (!orgId) return null;

  const { count: sev1 } = await supabase
    .from("incidents")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("severity", "sev1")
    .neq("status", "resolved");

  const { data: slos } = await supabase
    .from("slos")
    .select("budget_remaining, burn_rate, status")
    .eq("org_id", orgId);

  const avgBudget = slos?.length
    ? +(slos.reduce((a, s) => a + Number(s.budget_remaining), 0) / slos.length).toFixed(1)
    : 100;

  const { count: deploys24h } = await supabase
    .from("deployments")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .gte("started_at", new Date(Date.now() - 86400000).toISOString());

  return {
    sev1Incidents: sev1 ?? 0,
    openIncidents: (await supabase.from("incidents").select("*", { count: "exact", head: true }).eq("org_id", orgId).neq("status", "resolved")).count ?? 0,
    avgErrorBudget: avgBudget,
    deploys24h: deploys24h ?? 0,
  };
}

// ── Developer Metrics ──

export async function fetchDeveloperMetrics() {
  const orgId = await getUserOrgId();
  if (!orgId) return null;

  const { data: services } = await supabase
    .from("services")
    .select("p95_ms, error_rate, status")
    .eq("org_id", orgId);

  const { count: myIncidents } = await supabase
    .from("incidents")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("status", "investigating");

  return {
    serviceCount: services?.length ?? 0,
    avgP95: services?.length ? Math.round(services.reduce((a, s) => a + s.p95_ms, 0) / services.length) : 0,
    avgErrorRate: services?.length ? +(services.reduce((a, s) => a + s.error_rate, 0) / services.length).toFixed(2) : 0,
    openIssues: myIncidents ?? 0,
  };
}

// ── Viewer Metrics ──

export async function fetchViewerMetrics() {
  const orgId = await getUserOrgId();
  if (!orgId) return null;

  const { count: healthySvc } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("status", "healthy");

  const { count: totalSvc } = await supabase
    .from("services")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId);

  const { count: alerts } = await supabase
    .from("alerts")
    .select("*", { count: "exact", head: true })
    .eq("org_id", orgId)
    .eq("acknowledged", false);

  const { data: svcData } = await supabase
    .from("services")
    .select("uptime_pct, rps")
    .eq("org_id", orgId);

  return {
    uptime: svcData?.length ? +(svcData.reduce((a, s) => a + s.uptime_pct, 0) / svcData.length).toFixed(3) : 99.9,
    healthyServices: healthySvc ?? 0,
    totalServices: totalSvc ?? 0,
    activeAlerts: alerts ?? 0,
    eventsPerSec: svcData?.reduce((a, s) => a + Number(s.rps), 0) ?? 0,
  };
}

// ── Data Fetching ──

export async function fetchRecentEvents(limit = 30) {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("org_id", orgId)
    .order("timestamp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchActiveAlerts(limit = 10) {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("alerts")
    .select("*")
    .eq("org_id", orgId)
    .eq("acknowledged", false)
    .order("timestamp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchWorkers() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("workers")
    .select("*")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchQueues() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("queues")
    .select("*")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchServices() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchIncidents() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("incidents")
    .select("*")
    .eq("org_id", orgId)
    .order("opened_at", { ascending: false });
  return data ?? [];
}

export async function fetchDeployments(limit = 20) {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("deployments")
    .select("*")
    .eq("org_id", orgId)
    .order("started_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchSLOs() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("slos")
    .select("*, sli_metrics(*)")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchOrganizations() {
  const { data } = await supabase
    .from("organizations")
    .select("*")
    .order("name");
  return data ?? [];
}

export async function fetchMembers() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("members")
    .select("*")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchAuditLogs(limit = 50) {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("audit_logs")
    .select("*")
    .eq("org_id", orgId)
    .order("timestamp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function fetchApiKeys() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("api_keys")
    .select("*")
    .eq("org_id", orgId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function fetchMLModels() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("ml_models")
    .select("*")
    .eq("org_id", orgId)
    .order("name");
  return data ?? [];
}

export async function fetchMLInsights() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("ml_insights")
    .select("*")
    .eq("org_id", orgId)
    .order("timestamp", { ascending: false });
  return data ?? [];
}

export async function fetchTopology() {
  const orgId = await getUserOrgId();
  if (!orgId) return { nodes: [], edges: [] };
  const { data: nodes } = await supabase
    .from("topology_nodes")
    .select("*")
    .eq("org_id", orgId);
  const { data: edges } = await supabase
    .from("topology_edges")
    .select("*")
    .eq("org_id", orgId);
  return { nodes: nodes ?? [], edges: edges ?? [] };
}

export async function fetchNotifications() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("read", false)
    .order("timestamp", { ascending: false });
  return data ?? [];
}

export async function fetchApiEndpoints() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("api_endpoints")
    .select("*")
    .eq("org_id", orgId)
    .order("path");
  return data ?? [];
}

export async function fetchDeploymentImpacts() {
  const orgId = await getUserOrgId();
  if (!orgId) return [];
  const { data } = await supabase
    .from("deployment_impacts")
    .select("*")
    .eq("org_id", orgId)
    .order("deployment_id");
  return data ?? [];
}

// ── Mutations ──

export async function acknowledgeAlert(id: string) {
  const { data } = await supabase
    .from("alerts")
    .update({ acknowledged: true })
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function markNotificationRead(id: string) {
  const { data } = await supabase
    .from("notifications")
    .update({ read: true })
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function updateIncidentStatus(id: string, status: string) {
  const { data } = await supabase
    .from("incidents")
    .update({ status })
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function addIncidentUpdate(incidentId: string, status: string, author: string, message: string) {
  const { data } = await supabase
    .from("incident_updates")
    .insert({ incident_id: incidentId, status, author, message })
    .select()
    .single();
  return data;
}

export async function createOrganization(slug: string, name: string, plan: string, region: string) {
  const { data } = await supabase
    .from("organizations")
    .insert({ slug, name, plan, region })
    .select()
    .single();
  return data;
}

export async function createMember(orgId: string, name: string, email: string, role: string, team: string) {
  const { data } = await supabase
    .from("members")
    .insert({ org_id: orgId, name, email, role, team })
    .select()
    .single();
  return data;
}

export async function deleteMember(id: string) {
  await supabase.from("members").delete().eq("id", id);
}

export async function revokeApiKey(id: string) {
  const { data } = await supabase
    .from("api_keys")
    .update({ status: "revoked" })
    .eq("id", id)
    .select()
    .single();
  return data;
}

export async function insertEvent(event: {
  org_id: string;
  event_type: string;
  status: string;
  queue: string;
  worker: string;
  latency_ms: number;
  retries: number;
  severity: string;
  trace_id?: string;
  payload?: Record<string, unknown>;
}) {
  const { data } = await supabase
    .from("events")
    .insert(event)
    .select()
    .single();
  return data;
}
