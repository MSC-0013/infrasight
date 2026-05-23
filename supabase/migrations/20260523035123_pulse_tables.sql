CREATE TABLE public.organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  plan plan_type NOT NULL DEFAULT 'pro',
  region text NOT NULL DEFAULT 'us-east-1',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  avatar text NOT NULL DEFAULT '',
  role app_role NOT NULL DEFAULT 'viewer',
  org_id uuid REFERENCES public.organizations(id),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  status service_status NOT NULL DEFAULT 'healthy',
  uptime_pct numeric(5,2) NOT NULL DEFAULT 99.9,
  rps numeric(10,2) NOT NULL DEFAULT 0,
  p95_ms integer NOT NULL DEFAULT 0,
  error_rate numeric(5,4) NOT NULL DEFAULT 0,
  cpu numeric(5,2) NOT NULL DEFAULT 0,
  memory numeric(5,2) NOT NULL DEFAULT 0,
  version text NOT NULL DEFAULT '',
  region text NOT NULL DEFAULT 'us-east-1',
  last_deploy timestamptz,
  depends_on text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  timestamp timestamptz NOT NULL DEFAULT now(),
  event_type text NOT NULL,
  status event_status NOT NULL DEFAULT 'success',
  queue text NOT NULL,
  worker text NOT NULL,
  latency_ms integer NOT NULL DEFAULT 0,
  retries integer NOT NULL DEFAULT 0,
  severity severity_level NOT NULL DEFAULT 'info',
  trace_id text,
  payload jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE public.alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  severity severity_level NOT NULL DEFAULT 'warning',
  source text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT '',
  timestamp timestamptz NOT NULL DEFAULT now(),
  acknowledged boolean NOT NULL DEFAULT false
);

CREATE TABLE public.workers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  status worker_status NOT NULL DEFAULT 'online',
  region text NOT NULL DEFAULT 'us-east-1',
  pool text NOT NULL DEFAULT '',
  version text NOT NULL DEFAULT '',
  cpu numeric(5,2) NOT NULL DEFAULT 0,
  memory numeric(5,2) NOT NULL DEFAULT 0,
  jobs_processed bigint NOT NULL DEFAULT 0,
  retries integer NOT NULL DEFAULT 0,
  uptime_hours numeric(10,2) NOT NULL DEFAULT 0,
  last_heartbeat timestamptz NOT NULL DEFAULT now(),
  assigned_queues text[] NOT NULL DEFAULT '{}',
  heartbeats integer[] NOT NULL DEFAULT '{}'
);

CREATE TABLE public.queues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  messages integer NOT NULL DEFAULT 0,
  consumers integer NOT NULL DEFAULT 0,
  retries integer NOT NULL DEFAULT 0,
  dlq integer NOT NULL DEFAULT 0,
  lag_ms integer NOT NULL DEFAULT 0,
  throughput numeric(10,2) NOT NULL DEFAULT 0,
  status queue_status NOT NULL DEFAULT 'healthy'
);

CREATE TABLE public.traces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  root_operation text NOT NULL,
  root_service text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  duration_ms integer NOT NULL DEFAULT 0,
  span_count integer NOT NULL DEFAULT 0,
  error_count integer NOT NULL DEFAULT 0,
  services text[] NOT NULL DEFAULT '{}',
  status trace_status NOT NULL DEFAULT 'ok'
);

CREATE TABLE public.trace_spans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trace_id uuid NOT NULL REFERENCES public.traces(id) ON DELETE CASCADE,
  parent_id uuid,
  service text NOT NULL,
  operation text NOT NULL,
  kind span_kind NOT NULL DEFAULT 'server',
  start_ms integer NOT NULL DEFAULT 0,
  duration_ms integer NOT NULL DEFAULT 0,
  status span_status NOT NULL DEFAULT 'ok',
  attributes jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE public.logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  timestamp timestamptz NOT NULL DEFAULT now(),
  level log_level NOT NULL DEFAULT 'info',
  service text NOT NULL,
  message text NOT NULL,
  trace_id text,
  attrs jsonb NOT NULL DEFAULT '{}'
);

CREATE TABLE public.incidents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  title text NOT NULL,
  severity incident_severity NOT NULL DEFAULT 'sev3',
  status incident_status NOT NULL DEFAULT 'investigating',
  opened_at timestamptz NOT NULL DEFAULT now(),
  resolved_at timestamptz,
  impacted_services text[] NOT NULL DEFAULT '{}',
  acknowledged_by text,
  root_cause text
);

CREATE TABLE public.incident_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  incident_id uuid NOT NULL REFERENCES public.incidents(id) ON DELETE CASCADE,
  at timestamptz NOT NULL DEFAULT now(),
  status incident_status NOT NULL DEFAULT 'investigating',
  author text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT ''
);

CREATE TABLE public.deployments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  service text NOT NULL,
  version text NOT NULL,
  commit text NOT NULL DEFAULT '',
  author text NOT NULL DEFAULT '',
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  status deployment_status NOT NULL DEFAULT 'in_progress',
  environment deployment_env NOT NULL DEFAULT 'prod'
);

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  timestamp timestamptz NOT NULL DEFAULT now(),
  actor text NOT NULL,
  actor_email text NOT NULL DEFAULT '',
  action text NOT NULL,
  entity text NOT NULL,
  entity_id text NOT NULL DEFAULT '',
  metadata jsonb NOT NULL DEFAULT '{}',
  ip text NOT NULL DEFAULT ''
);

CREATE TABLE public.api_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  prefix text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  last_used timestamptz,
  expires_at timestamptz,
  permissions text[] NOT NULL DEFAULT '{}',
  requests_24h integer NOT NULL DEFAULT 0,
  status api_key_status NOT NULL DEFAULT 'active'
);

CREATE TABLE public.members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  email text NOT NULL,
  role member_role_pulse NOT NULL DEFAULT 'engineer',
  team text NOT NULL DEFAULT '',
  last_active timestamptz NOT NULL DEFAULT now(),
  status member_status NOT NULL DEFAULT 'active'
);

CREATE TABLE public.slos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  service text NOT NULL,
  status slo_status NOT NULL DEFAULT 'healthy',
  budget_remaining numeric(5,2) NOT NULL DEFAULT 100,
  burn_rate numeric(5,2) NOT NULL DEFAULT 1,
  burn_rate_window text NOT NULL DEFAULT '30d',
  period text NOT NULL DEFAULT '30d'
);

CREATE TABLE public.sli_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slo_id uuid NOT NULL REFERENCES public.slos(id) ON DELETE CASCADE,
  name text NOT NULL,
  type sli_type NOT NULL,
  target numeric(10,4) NOT NULL DEFAULT 0,
  current numeric(10,4) NOT NULL DEFAULT 0,
  unit text NOT NULL DEFAULT ''
);

CREATE TABLE public.ml_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  name text NOT NULL,
  version text NOT NULL DEFAULT '',
  status ml_model_status NOT NULL DEFAULT 'serving',
  inference_p95 integer NOT NULL DEFAULT 0,
  accuracy numeric(5,4) NOT NULL DEFAULT 0,
  drift numeric(5,4) NOT NULL DEFAULT 0,
  confidence numeric(5,4) NOT NULL DEFAULT 0,
  throughput integer NOT NULL DEFAULT 0,
  deployed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.ml_insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  title text NOT NULL,
  type ml_insight_type NOT NULL DEFAULT 'anomaly',
  confidence numeric(5,4) NOT NULL DEFAULT 0,
  timestamp timestamptz NOT NULL DEFAULT now(),
  description text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT ''
);

CREATE TABLE public.topology_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  label text NOT NULL,
  kind topology_kind NOT NULL DEFAULT 'service',
  status service_status NOT NULL DEFAULT 'healthy',
  x numeric(8,2) NOT NULL DEFAULT 0,
  y numeric(8,2) NOT NULL DEFAULT 0
);

CREATE TABLE public.topology_edges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  from_node uuid NOT NULL REFERENCES public.topology_nodes(id) ON DELETE CASCADE,
  to_node uuid NOT NULL REFERENCES public.topology_nodes(id) ON DELETE CASCADE,
  rps numeric(10,2) NOT NULL DEFAULT 0,
  error_rate numeric(5,4) NOT NULL DEFAULT 0
);

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  user_id uuid REFERENCES auth.users(id),
  title text NOT NULL,
  body text NOT NULL DEFAULT '',
  kind notification_kind NOT NULL DEFAULT 'alert',
  severity severity_level NOT NULL DEFAULT 'info',
  timestamp timestamptz NOT NULL DEFAULT now(),
  read boolean NOT NULL DEFAULT false
);

CREATE TABLE public.api_endpoints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  method http_method NOT NULL,
  path text NOT NULL,
  p50 integer NOT NULL DEFAULT 0,
  p95 integer NOT NULL DEFAULT 0,
  p99 integer NOT NULL DEFAULT 0,
  rps numeric(10,2) NOT NULL DEFAULT 0,
  error_rate numeric(5,4) NOT NULL DEFAULT 0
);

CREATE TABLE public.deployment_impacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id uuid NOT NULL REFERENCES public.organizations(id),
  deployment_id uuid NOT NULL REFERENCES public.deployments(id) ON DELETE CASCADE,
  service text NOT NULL,
  version text NOT NULL,
  environment deployment_env NOT NULL DEFAULT 'prod',
  before_p95 integer NOT NULL DEFAULT 0,
  after_p95 integer NOT NULL DEFAULT 0,
  before_error_rate numeric(5,4) NOT NULL DEFAULT 0,
  after_error_rate numeric(5,4) NOT NULL DEFAULT 0,
  before_rps numeric(10,2) NOT NULL DEFAULT 0,
  after_rps numeric(10,2) NOT NULL DEFAULT 0,
  regression_detected boolean NOT NULL DEFAULT false,
  confidence_score numeric(5,4) NOT NULL DEFAULT 0,
  affected_services text[] NOT NULL DEFAULT '{}',
  latency_diff integer NOT NULL DEFAULT 0,
  error_rate_diff numeric(5,4) NOT NULL DEFAULT 0
);
