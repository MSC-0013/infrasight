ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.queues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trace_spans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.slos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sli_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ml_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topology_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topology_edges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_endpoints ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployment_impacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "org_read" ON public.organizations FOR SELECT USING (true);
CREATE POLICY "org_admin_write" ON public.organizations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = organizations.id)
);

CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_own_write" ON public.profiles FOR UPDATE USING (id = auth.uid());
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (id = auth.uid());

CREATE POLICY "services_read" ON public.services FOR SELECT USING (true);
CREATE POLICY "services_write" ON public.services FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = services.org_id)
);

CREATE POLICY "events_read" ON public.events FOR SELECT USING (true);
CREATE POLICY "events_insert" ON public.events FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = events.org_id)
);

CREATE POLICY "alerts_read" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "alerts_write" ON public.alerts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = alerts.org_id)
);

CREATE POLICY "workers_read" ON public.workers FOR SELECT USING (true);
CREATE POLICY "workers_write" ON public.workers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = workers.org_id)
);

CREATE POLICY "queues_read" ON public.queues FOR SELECT USING (true);
CREATE POLICY "queues_write" ON public.queues FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = queues.org_id)
);

CREATE POLICY "traces_read" ON public.traces FOR SELECT USING (true);
CREATE POLICY "traces_insert" ON public.traces FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = traces.org_id)
);

CREATE POLICY "trace_spans_read" ON public.trace_spans FOR SELECT USING (true);
CREATE POLICY "trace_spans_insert" ON public.trace_spans FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles p JOIN public.traces t ON t.org_id = p.org_id WHERE p.id = auth.uid() AND t.id = trace_spans.trace_id)
);

CREATE POLICY "logs_read" ON public.logs FOR SELECT USING (true);
CREATE POLICY "logs_insert" ON public.logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = logs.org_id)
);

CREATE POLICY "incidents_read" ON public.incidents FOR SELECT USING (true);
CREATE POLICY "incidents_write" ON public.incidents FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre', 'developer') AND org_id = incidents.org_id)
);

CREATE POLICY "incident_updates_read" ON public.incident_updates FOR SELECT USING (true);
CREATE POLICY "incident_updates_insert" ON public.incident_updates FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles p JOIN public.incidents i ON i.org_id = p.org_id WHERE p.id = auth.uid() AND i.id = incident_updates.incident_id)
);

CREATE POLICY "deployments_read" ON public.deployments FOR SELECT USING (true);
CREATE POLICY "deployments_write" ON public.deployments FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = deployments.org_id)
);

CREATE POLICY "audit_logs_read" ON public.audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = audit_logs.org_id)
);
CREATE POLICY "audit_logs_insert" ON public.audit_logs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = audit_logs.org_id)
);

CREATE POLICY "api_keys_read" ON public.api_keys FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = api_keys.org_id)
);
CREATE POLICY "api_keys_write" ON public.api_keys FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = api_keys.org_id)
);

CREATE POLICY "members_read" ON public.members FOR SELECT USING (true);
CREATE POLICY "members_write" ON public.members FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = members.org_id)
);

CREATE POLICY "slos_read" ON public.slos FOR SELECT USING (true);
CREATE POLICY "slos_write" ON public.slos FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = slos.org_id)
);

CREATE POLICY "sli_metrics_read" ON public.sli_metrics FOR SELECT USING (true);
CREATE POLICY "sli_metrics_write" ON public.sli_metrics FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles p JOIN public.slos s ON s.org_id = p.org_id WHERE p.id = auth.uid() AND s.id = sli_metrics.slo_id)
);

CREATE POLICY "ml_models_read" ON public.ml_models FOR SELECT USING (true);
CREATE POLICY "ml_models_write" ON public.ml_models FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin') AND org_id = ml_models.org_id)
);

CREATE POLICY "ml_insights_read" ON public.ml_insights FOR SELECT USING (true);
CREATE POLICY "ml_insights_write" ON public.ml_insights FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = ml_insights.org_id)
);

CREATE POLICY "topology_nodes_read" ON public.topology_nodes FOR SELECT USING (true);
CREATE POLICY "topology_nodes_write" ON public.topology_nodes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = topology_nodes.org_id)
);

CREATE POLICY "topology_edges_read" ON public.topology_edges FOR SELECT USING (true);
CREATE POLICY "topology_edges_write" ON public.topology_edges FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = topology_edges.org_id)
);

CREATE POLICY "notifications_read" ON public.notifications FOR SELECT USING (
  user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = notifications.org_id)
);
CREATE POLICY "notifications_own" ON public.notifications FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "notifications_insert" ON public.notifications FOR INSERT WITH CHECK (
  user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND org_id = notifications.org_id)
);

CREATE POLICY "api_endpoints_read" ON public.api_endpoints FOR SELECT USING (true);
CREATE POLICY "api_endpoints_write" ON public.api_endpoints FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = api_endpoints.org_id)
);

CREATE POLICY "deployment_impacts_read" ON public.deployment_impacts FOR SELECT USING (true);
CREATE POLICY "deployment_impacts_write" ON public.deployment_impacts FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin', 'sre') AND org_id = deployment_impacts.org_id)
);

CREATE INDEX idx_events_org_time ON public.events (org_id, timestamp DESC);
CREATE INDEX idx_events_type ON public.events (event_type);
CREATE INDEX idx_events_severity ON public.events (severity) WHERE severity IN ('error', 'critical');
CREATE INDEX idx_alerts_org_unack ON public.alerts (org_id, acknowledged) WHERE acknowledged = false;
CREATE INDEX idx_workers_org_status ON public.workers (org_id, status);
CREATE INDEX idx_queues_org_status ON public.queues (org_id, status);
CREATE INDEX idx_traces_org_time ON public.traces (org_id, started_at DESC);
CREATE INDEX idx_trace_spans_trace ON public.trace_spans (trace_id);
CREATE INDEX idx_logs_org_time ON public.logs (org_id, timestamp DESC);
CREATE INDEX idx_logs_service ON public.logs (service);
CREATE INDEX idx_incidents_org_status ON public.incidents (org_id, status);
CREATE INDEX idx_deployments_org_time ON public.deployments (org_id, started_at DESC);
CREATE INDEX idx_audit_logs_org_time ON public.audit_logs (org_id, timestamp DESC);
CREATE INDEX idx_notifications_user_read ON public.notifications (user_id, read) WHERE read = false;
CREATE INDEX idx_services_org ON public.services (org_id);
CREATE INDEX idx_slos_org ON public.slos (org_id);
CREATE INDEX idx_sli_metrics_slo ON public.sli_metrics (slo_id);
CREATE INDEX idx_members_org ON public.members (org_id);
CREATE INDEX idx_api_keys_org ON public.api_keys (org_id);
CREATE INDEX idx_ml_models_org ON public.ml_models (org_id);
CREATE INDEX idx_topology_nodes_org ON public.topology_nodes (org_id);
CREATE INDEX idx_topology_edges_org ON public.topology_edges (org_id);
