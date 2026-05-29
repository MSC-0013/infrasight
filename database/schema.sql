-- =============================================================================
--  InfraSight / Pulse — Production PostgreSQL Schema
--  Compatible with: PostgreSQL 16 + TimescaleDB 2.x
--  Generated for: backend/src/prisma/schema.sql
--
--  MODULE ORDER (dependency-safe):
--    1.  Extensions & helpers
--    2.  Enums
--    3.  Organizations
--    4.  Users
--    5.  Refresh tokens / Sessions
--    6.  API Keys
--    7.  OAuth accounts
--    8.  Events  (TimescaleDB hypertable)
--    9.  Traces / Spans  (TimescaleDB hypertable)
--    10. Logs  (TimescaleDB hypertable)
--    11. Queues
--    12. Workers
--    13. Incidents + Timeline + Post-Mortems
--    14. Alerts + Alert history
--    15. Deployments
--    16. SLOs + SLO history
--    17. Analytics snapshots  (TimescaleDB hypertable)
--    18. MLOps — Models, Drift, Inference
--    19. Services registry
--    20. Topology — Nodes + Edges
--    21. Audit log
--    22. Settings + Notification preferences
--    23. AI Insights + Chat history
--    24. Indexes (all modules)
--    25. Triggers (updated_at)
--    26. TimescaleDB hypertable setup
--    27. Seed data
-- =============================================================================

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. EXTENSIONS & HELPERS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";         -- uuid_generate_v4()
CREATE EXTENSION IF NOT EXISTS "pg_trgm";           -- trigram full-text search on logs
CREATE EXTENSION IF NOT EXISTS "btree_gin";         -- GIN indexes on JSONB
CREATE EXTENSION IF NOT EXISTS "timescaledb" CASCADE; -- time-series

-- Utility: auto-update updated_at column
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ─────────────────────────────────────────────────────────────────────────────
-- 2. ENUMS
-- ─────────────────────────────────────────────────────────────────────────────

-- User roles (matches frontend RBAC exactly)
CREATE TYPE user_role AS ENUM (
  'super_admin',
  'admin',
  'sre',
  'developer',
  'viewer'
);

-- Subscription plans
CREATE TYPE plan_type AS ENUM (
  'hobby',
  'team',
  'enterprise'
);

-- Event status
CREATE TYPE event_status AS ENUM (
  'success',
  'failed',
  'retrying',
  'queued',
  'processing'
);

-- Severity (shared across events, alerts, incidents)
CREATE TYPE severity_level AS ENUM (
  'info',
  'warning',
  'error',
  'critical'
);

-- Span / trace status
CREATE TYPE span_status AS ENUM (
  'ok',
  'error',
  'unset'
);

-- Log levels
CREATE TYPE log_level AS ENUM (
  'debug',
  'info',
  'warn',
  'error',
  'fatal'
);

-- Queue types
CREATE TYPE queue_type AS ENUM (
  'kafka',
  'sqs',
  'pubsub',
  'redis_streams',
  'rabbitmq',
  'nats'
);

-- Queue / worker health status
CREATE TYPE health_status AS ENUM (
  'healthy',
  'warning',
  'critical',
  'paused',
  'offline'
);

-- Worker status
CREATE TYPE worker_status AS ENUM (
  'online',
  'offline',
  'draining',
  'idle',
  'error'
);

-- Incident severity (P1–P5)
CREATE TYPE incident_severity AS ENUM (
  'P1',
  'P2',
  'P3',
  'P4',
  'P5'
);

-- Incident lifecycle
CREATE TYPE incident_status AS ENUM (
  'open',
  'investigating',
  'identified',
  'mitigated',
  'resolved'
);

-- Alert rule status
CREATE TYPE alert_status AS ENUM (
  'ok',
  'firing',
  'silenced',
  'acknowledged',
  'resolved'
);

-- Notification channels
CREATE TYPE notification_channel AS ENUM (
  'slack',
  'pagerduty',
  'email',
  'webhook',
  'teams'
);

-- Deployment status
CREATE TYPE deployment_status AS ENUM (
  'pending',
  'running',
  'success',
  'failed',
  'cancelled',
  'rolled_back'
);

-- Deployment environment
CREATE TYPE deploy_env AS ENUM (
  'development',
  'staging',
  'production',
  'canary'
);

-- SLO status
CREATE TYPE slo_status AS ENUM (
  'healthy',
  'at_risk',
  'breached'
);

-- ML model status
CREATE TYPE ml_model_status AS ENUM (
  'active',
  'archived',
  'degraded',
  'pending'
);

-- Service tier
CREATE TYPE service_tier AS ENUM (
  'critical',
  'high',
  'medium',
  'low'
);

-- AI task types
CREATE TYPE ai_task_type AS ENUM (
  'rca',
  'log_anomaly',
  'deploy_summary',
  'slo_prediction',
  'trace_explain',
  'drift_alert',
  'chat'
);

-- Topology node type
CREATE TYPE topology_node_type AS ENUM (
  'service',
  'database',
  'cache',
  'queue',
  'cdn',
  'gateway',
  'external'
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 3. ORGANIZATIONS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE organizations (
  id                UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT          NOT NULL,
  slug              TEXT          NOT NULL UNIQUE,  -- URL-safe identifier
  plan              plan_type     NOT NULL DEFAULT 'hobby',
  -- Usage limits (enforced in service layer)
  max_users         INT           NOT NULL DEFAULT 5,
  max_retention_days INT          NOT NULL DEFAULT 7,
  max_api_keys      INT           NOT NULL DEFAULT 3,
  -- Billing
  billing_email     TEXT,
  stripe_customer_id TEXT,
  -- Metadata
  avatar_url        TEXT,
  website           TEXT,
  description       TEXT,
  -- Lifecycle
  is_active         BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 4. USERS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE users (
  id                UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id            UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email             TEXT          NOT NULL UNIQUE,
  name              TEXT          NOT NULL,
  password_hash     TEXT,         -- NULL if OAuth-only
  role              user_role     NOT NULL DEFAULT 'viewer',
  -- Profile
  avatar_url        TEXT,
  timezone          TEXT          NOT NULL DEFAULT 'UTC',
  -- Email verification
  email_verified    BOOLEAN       NOT NULL DEFAULT FALSE,
  email_verify_token TEXT,
  email_verify_expires_at TIMESTAMPTZ,
  -- Password reset
  reset_token       TEXT,
  reset_token_expires_at TIMESTAMPTZ,
  -- Status
  is_active         BOOLEAN       NOT NULL DEFAULT TRUE,
  last_login_at     TIMESTAMPTZ,
  -- Lifecycle
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 5. REFRESH TOKENS / SESSIONS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE refresh_tokens (
  id          UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash  TEXT          NOT NULL UNIQUE, -- bcrypt hash of the opaque token
  user_agent  TEXT,
  ip_address  INET,
  expires_at  TIMESTAMPTZ   NOT NULL,
  revoked     BOOLEAN       NOT NULL DEFAULT FALSE,
  revoked_at  TIMESTAMPTZ,
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 6. API KEYS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE api_keys (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id       UUID        NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by   UUID        NOT NULL REFERENCES users(id),
  name         TEXT        NOT NULL,
  key_hash     TEXT        NOT NULL UNIQUE,  -- SHA-256 hash of the raw key
  key_prefix   TEXT        NOT NULL,         -- first 8 chars shown in UI (e.g. "pls_live")
  permissions  TEXT[]      NOT NULL DEFAULT '{}', -- e.g. ['read:events', 'write:events']
  last_used_at TIMESTAMPTZ,
  expires_at   TIMESTAMPTZ,
  revoked      BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 7. OAUTH ACCOUNTS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE oauth_accounts (
  id              UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID        NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  provider        TEXT        NOT NULL,  -- 'google' | 'github'
  provider_user_id TEXT       NOT NULL,
  access_token    TEXT,
  refresh_token   TEXT,
  expires_at      TIMESTAMPTZ,
  raw_profile     JSONB,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (provider, provider_user_id)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 8. EVENTS  (TimescaleDB hypertable on timestamp)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE events (
  id              UUID          NOT NULL DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- Correlation
  trace_id        TEXT,
  span_id         TEXT,
  -- Event identity
  event_type      TEXT          NOT NULL,
  status          event_status  NOT NULL DEFAULT 'success',
  severity        severity_level NOT NULL DEFAULT 'info',
  -- Routing
  organization    TEXT          NOT NULL,  -- logical org name (denormalized for speed)
  queue           TEXT          NOT NULL,
  worker          TEXT          NOT NULL,
  region          TEXT          NOT NULL DEFAULT 'us-east-1',
  -- Performance
  latency_ms      INT           NOT NULL DEFAULT 0,
  retries         INT           NOT NULL DEFAULT 0,
  -- Data
  payload         JSONB         NOT NULL DEFAULT '{}',
  metadata        JSONB         NOT NULL DEFAULT '{}',
  -- Time (partitioning key)
  timestamp       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  processed_at    TIMESTAMPTZ,
  PRIMARY KEY (id, timestamp)
);

-- Convert to TimescaleDB hypertable (partition by 1 day)
-- (executed after table creation — see section 26)


-- ─────────────────────────────────────────────────────────────────────────────
-- 9. TRACES + SPANS  (TimescaleDB hypertable on start_time)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE traces (
  trace_id        TEXT          NOT NULL,
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  root_span_id    TEXT          NOT NULL,
  root_service    TEXT          NOT NULL,
  root_name       TEXT          NOT NULL,
  duration_ms     INT           NOT NULL,
  span_count      INT           NOT NULL DEFAULT 1,
  error_count     INT           NOT NULL DEFAULT 0,
  status          span_status   NOT NULL DEFAULT 'ok',
  start_time      TIMESTAMPTZ   NOT NULL,
  end_time        TIMESTAMPTZ   NOT NULL,
  PRIMARY KEY (trace_id, start_time)
);

CREATE TABLE spans (
  span_id         TEXT          NOT NULL,
  trace_id        TEXT          NOT NULL,
  parent_span_id  TEXT,
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  service         TEXT          NOT NULL,
  kind            TEXT          NOT NULL DEFAULT 'INTERNAL', -- SERVER, CLIENT, PRODUCER, CONSUMER
  start_time      TIMESTAMPTZ   NOT NULL,
  end_time        TIMESTAMPTZ   NOT NULL,
  duration_ms     INT           NOT NULL,
  status          span_status   NOT NULL DEFAULT 'ok',
  status_message  TEXT,
  -- OTLP attributes stored as JSONB
  attributes      JSONB         NOT NULL DEFAULT '{}',
  events_log      JSONB         NOT NULL DEFAULT '[]',  -- span events array
  resource        JSONB         NOT NULL DEFAULT '{}',  -- resource attributes
  PRIMARY KEY (span_id, start_time)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 10. LOGS  (TimescaleDB hypertable on timestamp)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE log_entries (
  id              UUID          NOT NULL DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- Correlation
  trace_id        TEXT,
  span_id         TEXT,
  -- Log body
  timestamp       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  level           log_level     NOT NULL DEFAULT 'info',
  service         TEXT          NOT NULL,
  host            TEXT,
  message         TEXT          NOT NULL,
  -- Structured fields
  fields          JSONB         NOT NULL DEFAULT '{}',
  -- Full-text search (generated from message + fields)
  search_vector   TSVECTOR GENERATED ALWAYS AS (
    to_tsvector('english', message)
  ) STORED,
  PRIMARY KEY (id, timestamp)
);

-- Saved log queries
CREATE TABLE saved_log_queries (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id      UUID        NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  created_by  UUID        NOT NULL REFERENCES users(id),
  name        TEXT        NOT NULL,
  query       TEXT        NOT NULL,
  filters     JSONB       NOT NULL DEFAULT '{}',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 11. QUEUES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE queues (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  type            queue_type    NOT NULL,
  status          health_status NOT NULL DEFAULT 'healthy',
  -- Live metrics (updated by heartbeat)
  lag_ms          INT           NOT NULL DEFAULT 0,
  depth           INT           NOT NULL DEFAULT 0,
  throughput_rps  FLOAT         NOT NULL DEFAULT 0,
  dlq_size        INT           NOT NULL DEFAULT 0,
  consumer_count  INT           NOT NULL DEFAULT 0,
  -- Config (broker-specific)
  config          JSONB         NOT NULL DEFAULT '{}',
  -- Thresholds for alerting
  lag_threshold_ms INT          NOT NULL DEFAULT 500,
  depth_threshold  INT          NOT NULL DEFAULT 10000,
  -- Lifecycle
  paused          BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, name)
);

-- Queue metrics history (TimescaleDB hypertable)
CREATE TABLE queue_metrics (
  queue_id        UUID          NOT NULL REFERENCES queues(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  lag_ms          INT           NOT NULL,
  depth           INT           NOT NULL,
  throughput_rps  FLOAT         NOT NULL,
  dlq_size        INT           NOT NULL,
  recorded_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (queue_id, recorded_at)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 12. WORKERS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE workers (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  status          worker_status NOT NULL DEFAULT 'offline',
  queue_name      TEXT          NOT NULL,
  region          TEXT          NOT NULL DEFAULT 'us-east-1',
  -- Live metrics
  jobs_processed  BIGINT        NOT NULL DEFAULT 0,
  jobs_failed     BIGINT        NOT NULL DEFAULT 0,
  cpu_percent     FLOAT         NOT NULL DEFAULT 0,
  mem_mb          FLOAT         NOT NULL DEFAULT 0,
  uptime_seconds  BIGINT        NOT NULL DEFAULT 0,
  -- Heartbeat
  last_heartbeat  TIMESTAMPTZ,
  -- Lifecycle
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, name)
);

-- Worker metrics history (TimescaleDB hypertable)
CREATE TABLE worker_metrics (
  worker_id       UUID          NOT NULL REFERENCES workers(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  cpu_percent     FLOAT         NOT NULL,
  mem_mb          FLOAT         NOT NULL,
  jobs_per_min    FLOAT         NOT NULL,
  recorded_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (worker_id, recorded_at)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 13. INCIDENTS + TIMELINE + POST-MORTEMS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE incidents (
  id              UUID              PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID              NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  -- Identity
  incident_number SERIAL,           -- human-readable INC-xxxx
  title           TEXT              NOT NULL,
  description     TEXT,
  severity        incident_severity NOT NULL DEFAULT 'P3',
  status          incident_status   NOT NULL DEFAULT 'open',
  -- Attribution
  service         TEXT              NOT NULL,
  tags            TEXT[]            NOT NULL DEFAULT '{}',
  alert_ids       UUID[]            NOT NULL DEFAULT '{}',
  -- People
  reporter_id     UUID              REFERENCES users(id),
  assignee_id     UUID              REFERENCES users(id),
  -- Timing (SLAs)
  opened_at       TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  acknowledged_at TIMESTAMPTZ,
  identified_at   TIMESTAMPTZ,
  mitigated_at    TIMESTAMPTZ,
  resolved_at     TIMESTAMPTZ,
  -- Computed TTD/TTR (seconds)
  ttd_seconds     INT GENERATED ALWAYS AS (
    CASE WHEN identified_at IS NOT NULL
      THEN EXTRACT(EPOCH FROM (identified_at - opened_at))::INT
    ELSE NULL END
  ) STORED,
  ttr_seconds     INT GENERATED ALWAYS AS (
    CASE WHEN resolved_at IS NOT NULL
      THEN EXTRACT(EPOCH FROM (resolved_at - opened_at))::INT
    ELSE NULL END
  ) STORED,
  created_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

CREATE TABLE incident_timeline (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id     UUID          NOT NULL REFERENCES incidents(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  actor_id        UUID          REFERENCES users(id),
  actor_name      TEXT          NOT NULL DEFAULT 'system',
  event_type      TEXT          NOT NULL, -- e.g. 'status_change', 'comment', 'alert_linked'
  content         TEXT          NOT NULL,
  metadata        JSONB         NOT NULL DEFAULT '{}',
  occurred_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE post_mortems (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id     UUID          NOT NULL UNIQUE REFERENCES incidents(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  author_id       UUID          NOT NULL REFERENCES users(id),
  summary         TEXT          NOT NULL,
  timeline        TEXT          NOT NULL,
  root_cause      TEXT          NOT NULL,
  action_items    JSONB         NOT NULL DEFAULT '[]', -- [{title, owner, due_date, done}]
  contributing_factors TEXT,
  lessons_learned TEXT,
  ai_generated    BOOLEAN       NOT NULL DEFAULT FALSE,
  published       BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 14. ALERTS + ALERT HISTORY
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE alert_rules (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  description     TEXT,
  severity        severity_level NOT NULL DEFAULT 'warning',
  -- Condition definition (flexible JSON)
  condition       JSONB         NOT NULL,
  -- e.g. { "metric": "error_rate", "op": ">", "threshold": 0.05, "window": "5m" }
  service         TEXT,
  -- Notification
  channels        notification_channel[] NOT NULL DEFAULT '{}',
  channel_config  JSONB         NOT NULL DEFAULT '{}', -- webhook URLs, Slack channel, etc.
  -- Behavior
  cooldown_seconds INT          NOT NULL DEFAULT 300,
  for_duration     TEXT         NOT NULL DEFAULT '1m', -- must be firing for N mins
  enabled         BOOLEAN       NOT NULL DEFAULT TRUE,
  -- Silence
  silenced        BOOLEAN       NOT NULL DEFAULT FALSE,
  silence_until   TIMESTAMPTZ,
  silenced_by     UUID          REFERENCES users(id),
  -- State
  status          alert_status  NOT NULL DEFAULT 'ok',
  current_value   FLOAT,
  fired_at        TIMESTAMPTZ,
  resolved_at     TIMESTAMPTZ,
  acknowledged_by UUID          REFERENCES users(id),
  acknowledged_at TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Immutable history of every alert state transition
CREATE TABLE alert_history (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  alert_rule_id   UUID          NOT NULL REFERENCES alert_rules(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  previous_status alert_status  NOT NULL,
  new_status      alert_status  NOT NULL,
  value           FLOAT,
  threshold       FLOAT,
  message         TEXT,
  occurred_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 15. DEPLOYMENTS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE deployments (
  id              UUID              PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID              NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  service         TEXT              NOT NULL,
  version         TEXT              NOT NULL,
  environment     deploy_env        NOT NULL DEFAULT 'production',
  status          deployment_status NOT NULL DEFAULT 'pending',
  -- Git
  sha             TEXT              NOT NULL,
  branch          TEXT              NOT NULL,
  commit_message  TEXT,
  -- People / CI
  triggered_by    TEXT              NOT NULL, -- user email or CI bot
  triggered_by_id UUID              REFERENCES users(id),
  ci_url          TEXT,
  -- Timing
  started_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  completed_at    TIMESTAMPTZ,
  duration_seconds INT GENERATED ALWAYS AS (
    CASE WHEN completed_at IS NOT NULL
      THEN EXTRACT(EPOCH FROM (completed_at - started_at))::INT
    ELSE NULL END
  ) STORED,
  -- Canary
  canary_percent  INT               NOT NULL DEFAULT 100,
  is_rollback     BOOLEAN           NOT NULL DEFAULT FALSE,
  rolled_back_to  TEXT,             -- version being rolled back to
  -- Impact (populated by analytics job after deploy)
  latency_delta_ms  FLOAT,
  error_rate_delta  FLOAT,
  created_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 16. SLOs + SLO HISTORY
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE slos (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  description     TEXT,
  service         TEXT          NOT NULL,
  -- SLI definition
  metric          TEXT          NOT NULL, -- e.g. 'availability', 'latency_p95'
  target          FLOAT         NOT NULL, -- e.g. 99.9
  threshold_ms    INT,                    -- for latency SLOs, good request threshold
  window          TEXT          NOT NULL DEFAULT '30d',
  -- Current state (recalculated every 5 min by BullMQ job)
  current         FLOAT         NOT NULL DEFAULT 100.0,
  error_budget    FLOAT         NOT NULL DEFAULT 100.0,  -- % remaining
  burn_rate       FLOAT         NOT NULL DEFAULT 0.0,
  status          slo_status    NOT NULL DEFAULT 'healthy',
  breach_count    INT           NOT NULL DEFAULT 0,
  last_breach_at  TIMESTAMPTZ,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- SLO compliance snapshots (TimescaleDB hypertable)
CREATE TABLE slo_history (
  slo_id          UUID          NOT NULL REFERENCES slos(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  current         FLOAT         NOT NULL,
  error_budget    FLOAT         NOT NULL,
  burn_rate       FLOAT         NOT NULL,
  status          slo_status    NOT NULL,
  recorded_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (slo_id, recorded_at)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 17. ANALYTICS SNAPSHOTS  (TimescaleDB hypertable)
-- ─────────────────────────────────────────────────────────────────────────────

-- Pre-aggregated metrics — populated by BullMQ job every minute
CREATE TABLE analytics_snapshots (
  id              UUID          NOT NULL DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  service         TEXT,         -- NULL = org-wide aggregate
  region          TEXT,
  -- Throughput
  events_total    BIGINT        NOT NULL DEFAULT 0,
  events_success  BIGINT        NOT NULL DEFAULT 0,
  events_failed   BIGINT        NOT NULL DEFAULT 0,
  throughput_rps  FLOAT         NOT NULL DEFAULT 0,
  -- Latency (ms)
  latency_p50     FLOAT,
  latency_p95     FLOAT,
  latency_p99     FLOAT,
  latency_avg     FLOAT,
  -- Error rate
  error_rate      FLOAT         NOT NULL DEFAULT 0,
  -- Resources
  queue_lag_avg   FLOAT,
  active_workers  INT,
  cpu_avg         FLOAT,
  mem_avg         FLOAT,
  -- Bucket timestamp (granularity 1 min)
  bucket          TIMESTAMPTZ   NOT NULL,
  PRIMARY KEY (id, bucket)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 18. MLOPS — MODELS, DRIFT, INFERENCE
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE ml_models (
  id              UUID            PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID            NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT            NOT NULL,
  version         TEXT            NOT NULL,
  framework       TEXT            NOT NULL,  -- 'sklearn', 'pytorch', 'tensorflow', 'xgboost'
  description     TEXT,
  status          ml_model_status NOT NULL DEFAULT 'active',
  -- Performance baseline
  baseline_metrics JSONB          NOT NULL DEFAULT '{}',
  -- Registry info
  model_uri       TEXT,           -- S3 path, MLflow URI, etc.
  tags            TEXT[]          NOT NULL DEFAULT '{}',
  created_by      UUID            REFERENCES users(id),
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, name, version)
);

-- Drift measurements (TimescaleDB hypertable)
CREATE TABLE drift_metrics (
  id              UUID          NOT NULL DEFAULT uuid_generate_v4(),
  model_id        UUID          NOT NULL REFERENCES ml_models(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  feature         TEXT          NOT NULL,
  -- PSI / KS test scores
  psi_score       FLOAT         NOT NULL,
  ks_score        FLOAT,
  -- Distribution stats
  baseline_mean   FLOAT,
  current_mean    FLOAT,
  baseline_stddev FLOAT,
  current_stddev  FLOAT,
  -- Alert
  threshold       FLOAT         NOT NULL DEFAULT 0.1,
  is_alert        BOOLEAN       NOT NULL DEFAULT FALSE,
  measured_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, measured_at)
);

-- Inference latency snapshots (TimescaleDB hypertable)
CREATE TABLE inference_metrics (
  id              UUID          NOT NULL DEFAULT uuid_generate_v4(),
  model_id        UUID          NOT NULL REFERENCES ml_models(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  latency_ms      FLOAT         NOT NULL,
  status          TEXT          NOT NULL DEFAULT 'success', -- 'success' | 'error' | 'timeout'
  input_tokens    INT,
  output_tokens   INT,
  recorded_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (id, recorded_at)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 19. SERVICES REGISTRY
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE services (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name            TEXT          NOT NULL,
  display_name    TEXT,
  description     TEXT,
  language        TEXT,           -- 'go', 'node', 'python', 'java', 'rust'
  team            TEXT,
  tier            service_tier  NOT NULL DEFAULT 'medium',
  repository_url  TEXT,
  docs_url        TEXT,
  -- Current version (updated on deploy)
  current_version TEXT,
  -- Live health (updated by heartbeat)
  status          health_status NOT NULL DEFAULT 'healthy',
  rps             FLOAT         NOT NULL DEFAULT 0,
  p95_ms          FLOAT         NOT NULL DEFAULT 0,
  error_rate      FLOAT         NOT NULL DEFAULT 0,
  uptime_pct      FLOAT         NOT NULL DEFAULT 100.0,
  last_deploy_at  TIMESTAMPTZ,
  -- Dependencies (denormalized for topology)
  upstream_services  TEXT[]     NOT NULL DEFAULT '{}',
  downstream_services TEXT[]    NOT NULL DEFAULT '{}',
  tags            TEXT[]        NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (org_id, name)
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 20. TOPOLOGY — NODES + EDGES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE topology_snapshots (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  generated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE topology_nodes (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_id     UUID          NOT NULL REFERENCES topology_snapshots(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  node_id         TEXT          NOT NULL,  -- stable identifier (service name)
  label           TEXT          NOT NULL,
  node_type       topology_node_type NOT NULL DEFAULT 'service',
  status          health_status NOT NULL DEFAULT 'healthy',
  -- Metrics at snapshot time
  rps             FLOAT         NOT NULL DEFAULT 0,
  p95_ms          FLOAT,
  error_rate      FLOAT,
  -- Layout hints (from force-directed, persisted for stability)
  x               FLOAT,
  y               FLOAT,
  metadata        JSONB         NOT NULL DEFAULT '{}'
);

CREATE TABLE topology_edges (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  snapshot_id     UUID          NOT NULL REFERENCES topology_snapshots(id) ON DELETE CASCADE,
  org_id          UUID          NOT NULL,
  from_node       TEXT          NOT NULL,
  to_node         TEXT          NOT NULL,
  -- Traffic metrics at snapshot time
  rps             FLOAT         NOT NULL DEFAULT 0,
  error_rate      FLOAT         NOT NULL DEFAULT 0,
  p95_ms          FLOAT,
  has_error       BOOLEAN       NOT NULL DEFAULT FALSE,
  -- Derived from trace parent-child relationships
  sample_trace_ids TEXT[]       NOT NULL DEFAULT '{}'
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 21. AUDIT LOG  (append-only, never UPDATE or DELETE)
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE audit_log (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  actor_id        UUID          REFERENCES users(id),
  actor_email     TEXT          NOT NULL,
  actor_role      user_role     NOT NULL,
  -- What happened
  action          TEXT          NOT NULL,  -- e.g. 'incident.create', 'user.role_change'
  resource_type   TEXT          NOT NULL,  -- e.g. 'incident', 'user', 'alert_rule'
  resource_id     TEXT          NOT NULL,
  -- State diff
  before_state    JSONB,
  after_state     JSONB,
  -- Request context
  ip_address      INET,
  user_agent      TEXT,
  request_id      TEXT,
  -- Immutable timestamp
  occurred_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- Prevent any modification of audit entries (hard enforcement)
CREATE RULE audit_no_update AS ON UPDATE TO audit_log DO INSTEAD NOTHING;
CREATE RULE audit_no_delete AS ON DELETE TO audit_log DO INSTEAD NOTHING;


-- ─────────────────────────────────────────────────────────────────────────────
-- 22. SETTINGS + NOTIFICATION PREFERENCES
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE org_settings (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL UNIQUE REFERENCES organizations(id) ON DELETE CASCADE,
  -- General
  default_timezone TEXT         NOT NULL DEFAULT 'UTC',
  date_format     TEXT          NOT NULL DEFAULT 'ISO8601',
  -- Retention policies (days)
  events_retention_days  INT    NOT NULL DEFAULT 30,
  logs_retention_days    INT    NOT NULL DEFAULT 30,
  traces_retention_days  INT    NOT NULL DEFAULT 14,
  metrics_retention_days INT    NOT NULL DEFAULT 90,
  -- SSO
  sso_enabled     BOOLEAN       NOT NULL DEFAULT FALSE,
  sso_provider    TEXT,         -- 'saml' | 'oidc'
  sso_metadata_url TEXT,
  sso_entity_id   TEXT,
  sso_certificate TEXT,
  -- Security
  enforce_mfa     BOOLEAN       NOT NULL DEFAULT FALSE,
  allowed_ips     INET[]        NOT NULL DEFAULT '{}',
  -- Integrations
  slack_webhook_url TEXT,
  pagerduty_api_key TEXT,
  github_app_id   TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE notification_preferences (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID          NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  -- Per-event-type preferences
  incident_opened   BOOLEAN     NOT NULL DEFAULT TRUE,
  incident_resolved BOOLEAN     NOT NULL DEFAULT TRUE,
  alert_fired       BOOLEAN     NOT NULL DEFAULT TRUE,
  alert_resolved    BOOLEAN     NOT NULL DEFAULT FALSE,
  deploy_failed     BOOLEAN     NOT NULL DEFAULT TRUE,
  slo_breach        BOOLEAN     NOT NULL DEFAULT TRUE,
  drift_alert       BOOLEAN     NOT NULL DEFAULT FALSE,
  -- Channels
  email_enabled     BOOLEAN     NOT NULL DEFAULT TRUE,
  slack_enabled     BOOLEAN     NOT NULL DEFAULT FALSE,
  slack_user_id     TEXT,
  -- Quiet hours (UTC)
  quiet_start_utc   TIME,
  quiet_end_utc     TIME,
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 23. AI INSIGHTS + CHAT HISTORY
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE ai_insights (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  type            ai_task_type  NOT NULL,
  title           TEXT          NOT NULL,
  description     TEXT          NOT NULL,
  severity        severity_level NOT NULL DEFAULT 'info',
  -- Association
  service         TEXT,
  incident_id     UUID          REFERENCES incidents(id),
  deployment_id   UUID          REFERENCES deployments(id),
  model_id        UUID          REFERENCES ml_models(id),
  -- AI metadata
  ai_model        TEXT          NOT NULL DEFAULT 'gpt-4o',
  prompt_tokens   INT,
  completion_tokens INT,
  confidence      FLOAT,
  raw_response    JSONB         NOT NULL DEFAULT '{}',
  recommendations JSONB         NOT NULL DEFAULT '[]',
  -- Status
  dismissed       BOOLEAN       NOT NULL DEFAULT FALSE,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_chat_sessions (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id          UUID          NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  user_id         UUID          NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title           TEXT,
  -- Context that was injected into this session
  context_type    TEXT,         -- 'incident', 'trace', 'deployment', 'general'
  context_id      TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE TABLE ai_chat_messages (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id      UUID          NOT NULL REFERENCES ai_chat_sessions(id) ON DELETE CASCADE,
  role            TEXT          NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content         TEXT          NOT NULL,
  tokens          INT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 24. INDEXES
-- ─────────────────────────────────────────────────────────────────────────────

-- Organizations
CREATE INDEX idx_orgs_slug         ON organizations(slug);
CREATE INDEX idx_orgs_plan         ON organizations(plan);

-- Users
CREATE INDEX idx_users_org         ON users(org_id);
CREATE INDEX idx_users_email       ON users(email);
CREATE INDEX idx_users_role        ON users(org_id, role);

-- Refresh tokens
CREATE INDEX idx_refresh_user      ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_expires   ON refresh_tokens(expires_at) WHERE revoked = FALSE;

-- API Keys
CREATE INDEX idx_api_keys_org      ON api_keys(org_id);
CREATE INDEX idx_api_keys_hash     ON api_keys(key_hash);

-- Events (time-series — TimescaleDB adds chunk indexes automatically)
CREATE INDEX idx_events_org_time   ON events(org_id, timestamp DESC);
CREATE INDEX idx_events_status     ON events(org_id, status, timestamp DESC);
CREATE INDEX idx_events_queue      ON events(org_id, queue, timestamp DESC);
CREATE INDEX idx_events_worker     ON events(org_id, worker, timestamp DESC);
CREATE INDEX idx_events_trace      ON events(trace_id) WHERE trace_id IS NOT NULL;
CREATE INDEX idx_events_payload    ON events USING gin(payload);  -- JSONB search

-- Traces
CREATE INDEX idx_traces_org_time   ON traces(org_id, start_time DESC);
CREATE INDEX idx_traces_service    ON traces(org_id, root_service, start_time DESC);
CREATE INDEX idx_traces_status     ON traces(org_id, status, start_time DESC);

-- Spans
CREATE INDEX idx_spans_trace       ON spans(trace_id, start_time);
CREATE INDEX idx_spans_service     ON spans(org_id, service, start_time DESC);
CREATE INDEX idx_spans_parent      ON spans(parent_span_id) WHERE parent_span_id IS NOT NULL;

-- Logs
CREATE INDEX idx_logs_org_time     ON log_entries(org_id, timestamp DESC);
CREATE INDEX idx_logs_service      ON log_entries(org_id, service, timestamp DESC);
CREATE INDEX idx_logs_level        ON log_entries(org_id, level, timestamp DESC);
CREATE INDEX idx_logs_trace        ON log_entries(trace_id) WHERE trace_id IS NOT NULL;
CREATE INDEX idx_logs_fts          ON log_entries USING gin(search_vector);  -- full-text
CREATE INDEX idx_logs_fields       ON log_entries USING gin(fields);         -- JSONB

-- Queues
CREATE INDEX idx_queues_org        ON queues(org_id);
CREATE INDEX idx_queues_status     ON queues(org_id, status);
CREATE INDEX idx_queue_metrics_ts  ON queue_metrics(queue_id, recorded_at DESC);

-- Workers
CREATE INDEX idx_workers_org       ON workers(org_id);
CREATE INDEX idx_workers_queue     ON workers(org_id, queue_name);
CREATE INDEX idx_workers_status    ON workers(org_id, status);
CREATE INDEX idx_worker_metrics_ts ON worker_metrics(worker_id, recorded_at DESC);

-- Incidents
CREATE INDEX idx_incidents_org     ON incidents(org_id);
CREATE INDEX idx_incidents_status  ON incidents(org_id, status);
CREATE INDEX idx_incidents_sev     ON incidents(org_id, severity);
CREATE INDEX idx_incidents_service ON incidents(org_id, service);
CREATE INDEX idx_incidents_opened  ON incidents(org_id, opened_at DESC);
CREATE INDEX idx_timeline_incident ON incident_timeline(incident_id, occurred_at);

-- Alert rules
CREATE INDEX idx_alerts_org        ON alert_rules(org_id);
CREATE INDEX idx_alerts_status     ON alert_rules(org_id, status);
CREATE INDEX idx_alerts_service    ON alert_rules(org_id, service);
CREATE INDEX idx_alerts_enabled    ON alert_rules(org_id, enabled) WHERE enabled = TRUE;
CREATE INDEX idx_alert_history_ts  ON alert_history(alert_rule_id, occurred_at DESC);

-- Deployments
CREATE INDEX idx_deploys_org       ON deployments(org_id, started_at DESC);
CREATE INDEX idx_deploys_service   ON deployments(org_id, service, started_at DESC);
CREATE INDEX idx_deploys_env       ON deployments(org_id, environment, started_at DESC);
CREATE INDEX idx_deploys_status    ON deployments(org_id, status);

-- SLOs
CREATE INDEX idx_slos_org          ON slos(org_id);
CREATE INDEX idx_slos_service      ON slos(org_id, service);
CREATE INDEX idx_slos_status       ON slos(org_id, status);
CREATE INDEX idx_slo_history_ts    ON slo_history(slo_id, recorded_at DESC);

-- Analytics
CREATE INDEX idx_analytics_org_ts  ON analytics_snapshots(org_id, bucket DESC);
CREATE INDEX idx_analytics_svc     ON analytics_snapshots(org_id, service, bucket DESC);

-- MLOps
CREATE INDEX idx_ml_models_org     ON ml_models(org_id);
CREATE INDEX idx_drift_model_ts    ON drift_metrics(model_id, measured_at DESC);
CREATE INDEX idx_drift_alert       ON drift_metrics(model_id) WHERE is_alert = TRUE;
CREATE INDEX idx_inference_model   ON inference_metrics(model_id, recorded_at DESC);

-- Services
CREATE INDEX idx_services_org      ON services(org_id);
CREATE INDEX idx_services_status   ON services(org_id, status);
CREATE INDEX idx_services_tier     ON services(org_id, tier);

-- Topology
CREATE INDEX idx_topo_snap_org     ON topology_snapshots(org_id, generated_at DESC);
CREATE INDEX idx_topo_nodes_snap   ON topology_nodes(snapshot_id);
CREATE INDEX idx_topo_edges_snap   ON topology_edges(snapshot_id);

-- Audit log
CREATE INDEX idx_audit_org_ts      ON audit_log(org_id, occurred_at DESC);
CREATE INDEX idx_audit_actor       ON audit_log(actor_id, occurred_at DESC);
CREATE INDEX idx_audit_resource    ON audit_log(org_id, resource_type, resource_id);
CREATE INDEX idx_audit_action      ON audit_log(org_id, action, occurred_at DESC);

-- AI
CREATE INDEX idx_ai_insights_org   ON ai_insights(org_id, created_at DESC);
CREATE INDEX idx_ai_insights_type  ON ai_insights(org_id, type, created_at DESC);
CREATE INDEX idx_ai_chat_user      ON ai_chat_sessions(user_id, updated_at DESC);
CREATE INDEX idx_ai_messages_sess  ON ai_chat_messages(session_id, created_at);


-- ─────────────────────────────────────────────────────────────────────────────
-- 25. TRIGGERS — auto-update updated_at
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TRIGGER trg_orgs_updated_at
  BEFORE UPDATE ON organizations
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_queues_updated_at
  BEFORE UPDATE ON queues
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_workers_updated_at
  BEFORE UPDATE ON workers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_incidents_updated_at
  BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_postmortems_updated_at
  BEFORE UPDATE ON post_mortems
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_alert_rules_updated_at
  BEFORE UPDATE ON alert_rules
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_deployments_updated_at
  BEFORE UPDATE ON deployments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_slos_updated_at
  BEFORE UPDATE ON slos
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_ml_models_updated_at
  BEFORE UPDATE ON ml_models
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_org_settings_updated_at
  BEFORE UPDATE ON org_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_notif_prefs_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_ai_sessions_updated_at
  BEFORE UPDATE ON ai_chat_sessions
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();


-- ─────────────────────────────────────────────────────────────────────────────
-- 26. TIMESCALEDB HYPERTABLES
--     Run AFTER CREATE TABLE statements above.
--     Partition interval chosen for query performance vs chunk overhead.
-- ─────────────────────────────────────────────────────────────────────────────

-- Events: high volume — 1-day chunks
SELECT create_hypertable(
  'events', 'timestamp',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Spans: medium volume — 1-day chunks
SELECT create_hypertable(
  'spans', 'start_time',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Traces: lower volume — 1-day chunks
SELECT create_hypertable(
  'traces', 'start_time',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Logs: high volume — 1-day chunks
SELECT create_hypertable(
  'log_entries', 'timestamp',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Queue metrics: per-minute polling — 1-day chunks
SELECT create_hypertable(
  'queue_metrics', 'recorded_at',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Worker metrics: per-minute polling — 1-day chunks
SELECT create_hypertable(
  'worker_metrics', 'recorded_at',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- SLO history: every 5 min — 7-day chunks
SELECT create_hypertable(
  'slo_history', 'recorded_at',
  chunk_time_interval => INTERVAL '7 days',
  if_not_exists => TRUE
);

-- Analytics snapshots: every 1 min — 1-day chunks
SELECT create_hypertable(
  'analytics_snapshots', 'bucket',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- Drift metrics: periodic — 7-day chunks
SELECT create_hypertable(
  'drift_metrics', 'measured_at',
  chunk_time_interval => INTERVAL '7 days',
  if_not_exists => TRUE
);

-- Inference metrics: high volume — 1-day chunks
SELECT create_hypertable(
  'inference_metrics', 'recorded_at',
  chunk_time_interval => INTERVAL '1 day',
  if_not_exists => TRUE
);

-- ── Data retention policies (auto-drop old chunks) ───────────────────────────
-- These match the defaults in org_settings; can be overridden per-org in service layer

SELECT add_retention_policy('events',            INTERVAL '30 days',  if_not_exists => TRUE);
SELECT add_retention_policy('log_entries',       INTERVAL '30 days',  if_not_exists => TRUE);
SELECT add_retention_policy('spans',             INTERVAL '14 days',  if_not_exists => TRUE);
SELECT add_retention_policy('traces',            INTERVAL '14 days',  if_not_exists => TRUE);
SELECT add_retention_policy('analytics_snapshots', INTERVAL '90 days',if_not_exists => TRUE);
SELECT add_retention_policy('queue_metrics',     INTERVAL '7 days',   if_not_exists => TRUE);
SELECT add_retention_policy('worker_metrics',    INTERVAL '7 days',   if_not_exists => TRUE);
SELECT add_retention_policy('drift_metrics',     INTERVAL '90 days',  if_not_exists => TRUE);
SELECT add_retention_policy('inference_metrics', INTERVAL '30 days',  if_not_exists => TRUE);

-- ── Continuous aggregates (pre-compute 1-hour rollups for dashboard) ─────────

CREATE MATERIALIZED VIEW events_hourly
WITH (timescaledb.continuous) AS
SELECT
  org_id,
  queue,
  time_bucket('1 hour', timestamp) AS bucket,
  COUNT(*)                         AS total,
  COUNT(*) FILTER (WHERE status = 'success') AS success_count,
  COUNT(*) FILTER (WHERE status = 'failed')  AS failed_count,
  AVG(latency_ms)                  AS avg_latency_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY latency_ms) AS p95_latency_ms,
  PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY latency_ms) AS p99_latency_ms
FROM events
GROUP BY org_id, queue, time_bucket('1 hour', timestamp)
WITH NO DATA;

SELECT add_continuous_aggregate_policy('events_hourly',
  start_offset => INTERVAL '2 hours',
  end_offset   => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour',
  if_not_exists => TRUE
);

CREATE MATERIALIZED VIEW spans_hourly
WITH (timescaledb.continuous) AS
SELECT
  org_id,
  service,
  time_bucket('1 hour', start_time) AS bucket,
  COUNT(*)                           AS total_spans,
  COUNT(*) FILTER (WHERE status = 'error') AS error_spans,
  AVG(duration_ms)                   AS avg_duration_ms,
  PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY duration_ms) AS p95_duration_ms
FROM spans
GROUP BY org_id, service, time_bucket('1 hour', start_time)
WITH NO DATA;

SELECT add_continuous_aggregate_policy('spans_hourly',
  start_offset => INTERVAL '2 hours',
  end_offset   => INTERVAL '1 hour',
  schedule_interval => INTERVAL '1 hour',
  if_not_exists => TRUE
);


-- ─────────────────────────────────────────────────────────────────────────────
-- 27. SEED DATA  (demo org + 5 role users)
-- ─────────────────────────────────────────────────────────────────────────────

-- Demo organization
INSERT INTO organizations (id, name, slug, plan, max_users, max_retention_days)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Pulse Demo',
  'pulse-demo',
  'enterprise',
  100,
  90
) ON CONFLICT (slug) DO NOTHING;

-- Demo users (passwords are bcrypt hashes of the plaintext shown in UI)
-- Plaintext: admin123 / ops123 / sre123 / dev123 / viewer123
INSERT INTO users (id, org_id, email, name, password_hash, role, email_verified) VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'admin@pulse.io',
    'Admin User',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lmz8Rq0GhAjkpqK.',
    'super_admin',
    TRUE
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'ops@pulse.io',
    'Ops Admin',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lmz8Rq0GhAjkpqK.',
    'admin',
    TRUE
  ),
  (
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000001',
    'sre@pulse.io',
    'SRE Engineer',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lmz8Rq0GhAjkpqK.',
    'sre',
    TRUE
  ),
  (
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000001',
    'dev@pulse.io',
    'Developer',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lmz8Rq0GhAjkpqK.',
    'developer',
    TRUE
  ),
  (
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000001',
    'viewer@pulse.io',
    'Viewer User',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/Lmz8Rq0GhAjkpqK.',
    'viewer',
    TRUE
  )
ON CONFLICT (email) DO NOTHING;

-- Default org settings
INSERT INTO org_settings (org_id)
VALUES ('a0000000-0000-0000-0000-000000000001')
ON CONFLICT (org_id) DO NOTHING;

-- Default notification preferences for all seed users
INSERT INTO notification_preferences (user_id)
VALUES
  ('b0000000-0000-0000-0000-000000000001'),
  ('b0000000-0000-0000-0000-000000000002'),
  ('b0000000-0000-0000-0000-000000000003'),
  ('b0000000-0000-0000-0000-000000000004'),
  ('b0000000-0000-0000-0000-000000000005')
ON CONFLICT (user_id) DO NOTHING;

-- Demo services
INSERT INTO services (org_id, name, display_name, language, team, tier, status, rps, p95_ms, error_rate) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'api-gateway',   'API Gateway',   'go',     'platform', 'critical', 'healthy', 847, 42,  0.003),
  ('a0000000-0000-0000-0000-000000000001', 'auth-svc',      'Auth Service',  'node',   'identity', 'critical', 'healthy', 312, 11,  0.001),
  ('a0000000-0000-0000-0000-000000000001', 'checkout-svc',  'Checkout',      'python', 'commerce', 'critical', 'warning', 428, 98,  0.024),
  ('a0000000-0000-0000-0000-000000000001', 'inventory-svc', 'Inventory',     'java',   'commerce', 'high',     'healthy', 188, 22,  0.002),
  ('a0000000-0000-0000-0000-000000000001', 'payment-svc',   'Payments',      'go',     'payments', 'critical', 'healthy', 214, 38,  0.005),
  ('a0000000-0000-0000-0000-000000000001', 'notif-svc',     'Notifications', 'node',   'platform', 'medium',   'healthy', 98,  10,  0.001)
ON CONFLICT (org_id, name) DO NOTHING;

-- Demo queues
INSERT INTO queues (org_id, name, type, status, lag_ms, depth, throughput_rps, dlq_size) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'user-events',    'kafka',        'warning',  892,  14822, 847, 2),
  ('a0000000-0000-0000-0000-000000000001', 'checkout-flow',  'kafka',        'healthy',   44,    892, 428, 0),
  ('a0000000-0000-0000-0000-000000000001', 'ml-inference',   'sqs',          'critical', 3201, 41080, 122, 18),
  ('a0000000-0000-0000-0000-000000000001', 'notifications',  'redis_streams','healthy',   12,    204,  98, 0),
  ('a0000000-0000-0000-0000-000000000001', 'payment-events', 'kafka',        'healthy',   28,    512, 214, 1)
ON CONFLICT (org_id, name) DO NOTHING;

-- Demo SLOs
INSERT INTO slos (org_id, name, service, metric, target, window, current, error_budget, burn_rate, status) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'payments-availability', 'payment-svc',  'availability', 99.9, '30d', 99.82, 26.7, 0.8,  'healthy'),
  ('a0000000-0000-0000-0000-000000000001', 'checkout-latency-p95',  'checkout-svc', 'latency_p95',  99.5, '30d', 98.91,  4.2, 2.4,  'at_risk'),
  ('a0000000-0000-0000-0000-000000000001', 'api-gateway-uptime',    'api-gateway',  'availability', 99.9, '30d', 99.99, 90.0, 0.1,  'healthy')
ON CONFLICT DO NOTHING;

-- Demo alert rules
INSERT INTO alert_rules (org_id, name, severity, condition, service, channels, status) VALUES
  ('a0000000-0000-0000-0000-000000000001',
   'checkout-svc p99 elevated',
   'warning',
   '{"metric":"latency_p99","op":">","threshold":300,"window":"5m"}',
   'checkout-svc',
   ARRAY['slack']::notification_channel[],
   'firing'),
  ('a0000000-0000-0000-0000-000000000001',
   'queue lag above threshold',
   'warning',
   '{"metric":"queue_lag","op":">","threshold":500,"window":"2m"}',
   NULL,
   ARRAY['slack','pagerduty']::notification_channel[],
   'ok'),
  ('a0000000-0000-0000-0000-000000000001',
   'error rate spike',
   'critical',
   '{"metric":"error_rate","op":">","threshold":0.05,"window":"3m"}',
   NULL,
   ARRAY['pagerduty','email']::notification_channel[],
   'ok')
ON CONFLICT DO NOTHING;

-- Demo incident
INSERT INTO incidents (
  org_id, title, description, severity, status, service,
  reporter_id, assignee_id
) VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'checkout-svc p99 elevated',
  'P99 latency has been above 300ms for the last 14 minutes. checkout-flow queue lag also elevated.',
  'P2',
  'investigating',
  'checkout-svc',
  'b0000000-0000-0000-0000-000000000003',
  'b0000000-0000-0000-0000-000000000003'
) ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────────────────────────────────────────
-- END OF SCHEMA
-- =============================================================================