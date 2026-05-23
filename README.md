# Pulse — Distributed Event Processing & Observability Platform

> Engineering-grade observability for distributed event pipelines. Traces, logs, metrics, queues, workers, deployments, incidents and MLOps in one console.

**Stack:** TanStack Start · React 19 · TypeScript (strict) · Tailwind 4 · shadcn/ui · Zustand · TanStack Query · TanStack Table · Recharts
**Design language:** Grafana / Datadog / Sentry / Vercel · dark-first · high-density · zero flash

---

## Table of Contents

1. [Progress Matrix](#1-progress-matrix)
2. [Architecture Overview](#2-architecture-overview)
3. [Folder Structure](#3-folder-structure)
4. [State Management](#4-state-management)
5. [Design System](#5-design-system)
6. [Permission Matrix](#6-permission-matrix)
7. [Realtime Engine](#7-realtime-engine)
8. [Mock Data Strategy](#8-mock-data-strategy)
9. [Backend Integration Readiness](#9-backend-integration-readiness)
10. [Performance Optimization](#10-performance-optimization)
11. [Role-based Dashboards](#11-role-based-dashboards)
12. [Future Enterprise Roadmap](#12-future-enterprise-roadmap)

---

## 1. Progress Matrix

| # | Area | Status | Notes |
|---|---|---|---|
| 01 | Marketing landing (`/welcome`) | ✅ | Hero, features, roles, architecture, pricing, CTA |
| 02 | Enterprise auth UI | ✅ | `/login` `/signup` `/forgot-password`, OAuth (Google/GitHub mocked) |
| 03 | 5-role RBAC | ✅ | `super_admin · admin · sre · developer · viewer` |
| 04 | Role-based dashboards | ✅ | Adaptive KPIs + quick actions per role |
| 05 | Sidebar permission filtering | ✅ | `can(perm)` gates each nav item |
| 06 | Command palette (⌘K) | ✅ | Global nav + quick actions |
| 07 | Right-side inspector drawer | ✅ | Metadata · related logs · related traces · actions · timeline |
| 08 | Global time-range selector | ✅ | 15m / 1h / 24h / 7d / custom — Zustand synced |
| 09 | Realtime dashboard | ✅ | Throughput, latency, queue lag, distribution, workers |
| 10 | Events explorer | ✅ | Streaming table + payload inspector |
| 11 | Distributed traces | ✅ | `/traces` + `/traces/$traceId` waterfall |
| 12 | Log explorer | ✅ | Live tail, saved queries, query history, pinned logs, AI summary placeholder |
| 13 | Service topology | ✅ | SVG dependency graph with RPS + error edges |
| 14 | Service health | ✅ | Per-service SLOs, latency, error rate |
| 15 | Queues & workers | ✅ | Lag, depth, jobs/min, status |
| 16 | API monitoring | ✅ | Per-endpoint latency & error breakdown |
| 17 | Alerts | ✅ | Alert cards + acknowledge workflow |
| 18 | Incidents | ✅ | List + `/incidents/$id` (timeline, RCA, responders, comments) |
| 19 | Deployments | ✅ | History, rollback, deploy markers |
| 20 | MLOps | ✅ | Drift, inference latency, model versions |
| 21 | Audit log | ✅ | Org governance trail |
| 22 | Organizations | ✅ | Workspace switching + member view |
| 23 | Settings | ✅ | API keys, integrations, notifications |
| 24 | Notification center | ✅ | Topbar bell with unread feed |
| 25 | Mocked realtime engine | ✅ | `setInterval`-based stream + buffer |
| 26 | Backend-ready abstraction | ✅ | Typed interfaces + swappable mock layer |

---

## 2. Architecture Overview

### Frontend architecture

```text
┌───────────────────────────────────────────────────────────────┐
│                      Browser (Pulse UI)                       │
│                                                               │
│  ┌─────────┐  ┌──────────────┐  ┌──────────────────────────┐  │
│  │ Routes  │  │  Components  │  │      Realtime hub        │  │
│  │ (file-  │◀▶│  (shadcn +   │◀▶│  setInterval streams →   │  │
│  │  based) │  │   features)  │  │  store hydration         │  │
│  └────┬────┘  └──────┬───────┘  └────────────┬─────────────┘  │
│       │              │                       │                │
│       ▼              ▼                       ▼                │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Zustand stores  ·  TanStack Query cache  ·  Inspector │   │
│  └────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────┘
                              │
                              ▼  (createServerFn · WS · REST/GraphQL)
                  ┌──────────────────────┐
                  │  Edge / SSR runtime  │
                  └──────────────────────┘
```

### State-management flow

- **Ephemeral UI state** → `useState` / `useReducer` colocated in components.
- **Cross-route UI state** → Zustand (`ui-store`, `inspector-store`, `time-range-store`).
- **Identity / RBAC** → `auth-store` (persisted in `localStorage` under `pulse-auth`).
- **Server cache** → TanStack Query (`QueryClient` lives at root; per-route `queryOptions`).
- **Realtime hydration** → realtime engine pushes into Query cache via `setQueryData` (currently emulated; same shape works for WS).

### Routing architecture

File-based via TanStack Router. `__root.tsx` switches between **auth routes** (`/login`, `/signup`, `/forgot-password`, `/welcome`) which render bare, and everything else which renders inside `AppShell` (sidebar + topbar + main + command palette + inspector drawer). Dynamic params use `$` (`traces.$traceId.tsx`, `incidents.$incidentId.tsx`).

### Realtime architecture

A pluggable hub. Today it emits via `setInterval`; tomorrow it swaps to a single WebSocket multiplexed by topic (`events`, `traces`, `logs`, `metrics:<service>`, `incidents`). Subscribers receive typed deltas and feed them into either local state or `queryClient.setQueryData`.

### Data flow

```text
mock-data.ts ─┐
              ├─▶ Query cache ─▶ Components ─▶ Inspector / Drawers
realtime hub ─┘                       │
                                      ▼
                                 Zustand UI state (selection, filters)
```

### Permission architecture

`PERMISSIONS[role]: string[]` is the single source of truth. The `can(perm)` helper on `auth-store` resolves:

1. `"*"` → grants everything
2. exact match → grants the specific perm
3. wildcard `"verb:*"` → grants any object for that verb

Every sidebar item, dashboard widget, and gated route calls `can(...)`. Mutating actions (acknowledge, rollback, declare-incident) check `manage:*` perms before firing.

---

## 3. Folder Structure

```text
src/
├── routes/                    # file-based routes (TanStack Router)
│   ├── __root.tsx             # html shell, providers, auth-route detection
│   ├── index.tsx              # /            — role-aware dashboard
│   ├── welcome.tsx            # /welcome     — public marketing landing
│   ├── login.tsx              # /login       — auth UI
│   ├── signup.tsx             # /signup
│   ├── forgot-password.tsx    # /forgot-password
│   ├── events.tsx             # /events      — realtime event explorer
│   ├── traces.tsx             # /traces
│   ├── traces.$traceId.tsx    # /traces/:id  — span waterfall
│   ├── logs.tsx               # /logs        — explorer + live tail
│   ├── topology.tsx           # /topology
│   ├── services.tsx           # /services
│   ├── analytics.tsx          # /analytics
│   ├── api.tsx                # /api         — endpoint monitoring
│   ├── queues.tsx             # /queues
│   ├── workers.tsx            # /workers
│   ├── deployments.tsx        # /deployments
│   ├── incidents.tsx          # /incidents
│   ├── incidents.$incidentId.tsx
│   ├── alerts.tsx             # /alerts
│   ├── mlops.tsx              # /mlops
│   ├── ml-insights.tsx
│   ├── audit.tsx              # /audit
│   ├── organizations.tsx      # /organizations
│   └── settings.tsx
│
├── components/                # reusable presentational + feature components
│   ├── layout/
│   │   ├── app-shell.tsx      # sidebar + topbar + main + palette + drawer
│   │   ├── sidebar.tsx        # permission-filtered nav
│   │   └── topbar.tsx         # search · time-range · notifications · user
│   ├── ui/                    # shadcn primitives (do not edit by hand)
│   ├── role-dashboard-header.tsx
│   ├── metric-card.tsx
│   ├── chart-card.tsx
│   ├── alert-card.tsx
│   ├── queue-card.tsx
│   ├── worker-card.tsx
│   ├── status-badge.tsx
│   ├── role-badge.tsx
│   ├── command-palette.tsx
│   ├── inspector-drawer.tsx
│   ├── notification-center.tsx
│   ├── trace-waterfall.tsx
│   ├── topology-graph.tsx
│   ├── log-row.tsx
│   ├── time-range-selector.tsx
│   ├── json-viewer.tsx
│   ├── empty-state.tsx
│   ├── page-header.tsx
│   ├── realtime-indicator.tsx
│   ├── oauth-buttons.tsx
│   └── auth-layout.tsx
│
├── store/                     # Zustand stores (cross-route state)
│   ├── auth-store.ts          # identity, role, can()
│   ├── ui-store.ts            # sidebar collapse, theme, density
│   ├── inspector-store.ts     # right-drawer subject + tabs
│   └── time-range-store.ts    # global time range
│
├── lib/
│   ├── mock-data.ts           # seeded generators for every domain entity
│   ├── format.ts              # number/date formatters
│   ├── types.ts               # cross-module type aliases
│   ├── hooks.ts               # generic hooks
│   ├── use-auth.ts            # supabase helper (unused in mock mode)
│   ├── csv-utils.ts
│   └── utils.ts               # cn(), misc
│
├── hooks/                     # app-level hooks (e.g. use-mobile)
├── integrations/
│   ├── supabase/              # generated clients (auto-managed)
│   └── lovable/               # platform helpers
├── styles.css                 # tokens + Tailwind 4 theme
└── router.tsx                 # createRouter wiring
```

> **Convention:** anything that touches >1 route belongs in `components/`. Anything that touches >1 component and is *state* belongs in `store/`. Pure functions go in `lib/`.

---

## 4. State Management

### Zustand stores

| Store | Persistence | Purpose |
|---|---|---|
| `auth-store` | `localStorage` (`pulse-auth`) | Current user, role, `can(perm)`, `signIn` / `signOut` |
| `ui-store` | session-only | Sidebar collapse, density, theme |
| `inspector-store` | session-only | Right drawer subject (`{ kind, id, payload }`) and active tab |
| `time-range-store` | session-only | Global time window (`15m`, `1h`, `24h`, `7d`, custom) |

**Why Zustand?** Atomic stores, no provider tree, selector-based subscriptions, trivial to test, and tiny. We *do not* use Redux/Context for state — Context is reserved for static config.

### Query caching

TanStack Query is the canonical server-cache layer. Pattern:

```ts
const eventsQuery = queryOptions({
  queryKey: ["events", filters],
  queryFn: () => api.events.list(filters),
  staleTime: 5_000,
});

// in component:
const { data } = useSuspenseQuery(eventsQuery);
```

- `staleTime` defaults: list views `5s`, detail views `30s`, static refs `5m`.
- Cache keys are tuples — first element is the resource, rest are filters.
- Background refetch on focus is enabled for dashboards, disabled for log tails (the realtime stream handles freshness).

### Optimistic updates

Mutations (acknowledge alert, declare incident, rollback deploy) follow the
[TanStack optimistic UI pattern](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates):

1. `onMutate` → snapshot prior cache, write the optimistic value.
2. `onError` → restore the snapshot, surface a toast.
3. `onSettled` → `queryClient.invalidateQueries` to reconcile with server truth.

### Realtime synchronization

Realtime deltas are pushed into the Query cache via `setQueryData`, *not* into Zustand. This keeps a single source of truth: components only ever read from the cache, regardless of whether the data arrived via REST or WS.

```ts
realtimeHub.on("events:new", (event) =>
  queryClient.setQueryData<AppEvent[]>(["events", filters], (prev = []) =>
    [event, ...prev].slice(0, 500)
  )
);
```

---

## 5. Design System

All tokens are defined in `src/styles.css` as `oklch()` values and surfaced as Tailwind 4 theme variables. Components consume tokens — never hex literals.

### Spacing system

8-pt grid, with 2-pt subdivisions for engineering density.

| Token | Value | Usage |
|---|---|---|
| `gap-1` | 4px | inline icon + label |
| `gap-2` | 8px | row spacing in compact lists |
| `gap-3` | 12px | grid gutter (default for dashboards) |
| `gap-4` | 16px | section spacing within a card |
| `gap-6` | 24px | between sections |
| `px-6` | 24px | page horizontal padding |

### Typography

| Stack | Family | Usage |
|---|---|---|
| Sans (body, UI) | `Inter, system-ui` | Default for all UI text |
| Mono (data, code, timestamps) | `JetBrains Mono` | IDs, latencies, timestamps, code blocks |

Scale: `text-[10px]` (mono uppercase labels) · `text-[11px]` (table cells, captions) · `text-xs` (12px body) · `text-sm` (14px primary) · `text-base` (16px section titles) · `text-xl`+ (page titles only).

### Color tokens

Defined in `src/styles.css`:

| Token | Role |
|---|---|
| `--background` | App background (near-black) |
| `--foreground` | Primary text |
| `--card` / `--card-foreground` | Surface elements |
| `--muted` / `--muted-foreground` | Secondary surface and text |
| `--border` | Hairline borders, table dividers |
| `--accent` / `--accent-foreground` | Hover / focus surfaces |
| `--primary` / `--primary-foreground` | Brand blue (CTA, active state) |
| `--sidebar*` | Sidebar-specific surfaces |
| `--chart-1..5` | Recharts series palette |

### Severity palette

| Tone | Token | Meaning |
|---|---|---|
| `info` | `--info` (cool blue) | Informational, queued |
| `success` | `--success` (engineering green) | Healthy, acknowledged, resolved |
| `warning` | `--warning` (amber) | Degraded, retrying, near-threshold |
| `error` | `--destructive` (red) | Failed, breaching SLO |
| `critical` | `--critical` (deep red) | SEV1, paged, super-admin |

Every status pill in the app routes through `<StatusBadge tone={…}>` — no ad-hoc colors.

### Semantic colors

Component-level semantic mapping:

- **Status badges** → `STATUS_TONE` map per domain (events, alerts, incidents).
- **Role badges** → `ROLE_TONE` in `auth-store.ts`.
- **Latency thresholds** → `text-warning` above p95 SLO, `text-destructive` above p99.

---

## 6. Permission Matrix

Defined in `src/store/auth-store.ts`. `*` and `verb:*` wildcards are honored by `can()`.

| Permission | super_admin | admin | sre | developer | viewer |
|---|:-:|:-:|:-:|:-:|:-:|
| view:dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:events | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:traces | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:services | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:topology | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:analytics | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:api | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:queues | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:workers | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:deployments | ✅ | ✅ | ✅ | ✅ | — |
| view:mlops | ✅ | ✅ | ✅ | ✅ | — |
| view:alerts | ✅ | ✅ | ✅ | ✅ | ✅ |
| view:incidents | ✅ | ✅ | ✅ | ✅ | ✅ |
| manage:incidents | ✅ | ✅ | ✅ | ✅ | — |
| manage:alerts | ✅ | ✅ | ✅ | — | — |
| manage:deployments | ✅ | ✅ | ✅ | — | — |
| manage:queues | ✅ | — | ✅ | — | — |
| manage:workers | ✅ | — | ✅ | — | — |
| manage:users | ✅ | ✅ | — | — | — |
| manage:billing | ✅ | ✅ | — | — | — |
| manage:settings | ✅ | ✅ | — | — | — |
| manage:api_keys | ✅ | ✅ | — | — | — |
| manage:org | ✅ | ✅ | — | — | — |

### Route restrictions

Routes are filtered at three layers: **sidebar** (no nav item), **route guard** (planned `_authenticated` layout for hard gate), and **action guard** (buttons disabled / hidden via `can()`).

---

## 7. Realtime Engine

### WebSocket architecture (target)

```text
┌────────┐    ws://api/realtime    ┌──────────────┐
│ Client │ ◀───── multiplexed ───▶ │  Pub/sub bus │ ─▶ Kafka / NATS
└────────┘   (json or msgpack)     └──────────────┘
   │  topics: events, traces:<service>, logs:<service>,
   │          metrics:<service>, incidents, deployments
   ▼
realtimeHub.on(topic, handler)
```

Today the hub is emulated via `setInterval`. The public surface (`realtimeHub.on/off/send`) is the same as the future WS implementation, so swapping is a one-file change.

### Stream synchronization

- Each topic carries a monotonic `seq`. Subscribers detect gaps and trigger a backfill REST call to reconcile.
- Snapshot-first protocol: on subscribe, server sends a snapshot, then deltas. Clients apply deltas only with `seq === lastSeq + 1`.

### Reconnect strategy

- Exponential backoff with jitter: `min(2^attempt * 250ms, 30s)`.
- On reconnect, send `lastSeq` per topic → server replays from buffer or returns `RESYNC` directive forcing a full snapshot.
- Topbar `RealtimeIndicator` reflects state: `live · reconnecting · degraded · offline`.

### Event buffering

- Ring buffer per topic, max 500 entries in memory.
- High-throughput topics (events, logs) coalesce updates with `requestAnimationFrame` to avoid render thrash.
- When the tab is hidden (`document.visibilityState === "hidden"`), buffering pauses UI rendering but keeps the connection warm.

---

## 8. Mock Data Strategy

`src/lib/mock-data.ts` is the single source for fixtures.

### Seeded RNG

A pure 32-bit hash-based RNG keyed off a stable seed so renders are deterministic across reloads and tests. Stories, e2e tests, and snapshots all see the same data.

### Deterministic datasets

- `generateEvents(n)`, `generateTraces(n)`, `generateLogs(n)`, etc.
- Each generator accepts a `seed?` override for per-test isolation.
- Cross-references are consistent: an event's `traceId` resolves to a real trace, which resolves to real spans, which name real services.

### Realtime generators

`setInterval`-driven micro-generators emit one new entity per tick:

```ts
const id = setInterval(() => setEvents((p) => [generateEvents(1)[0], ...p].slice(0, 50)), 2500);
```

The same generator functions are reused — the realtime engine only adds time-jitter and `seq`.

### Domain interfaces

Every generator returns typed records (`AppEvent`, `TraceSpan`, `LogLine`, `Incident`, `ServiceHealth`, …) defined in `lib/mock-data.ts` and re-exported. These types **are** the eventual API contract — backend just has to honor them.

---

## 9. Backend Integration Readiness

### API abstraction (target)

```ts
// src/lib/api/index.ts (planned)
export const api = {
  events: { list, get, replay },
  traces: { list, get },
  logs:   { search, tail },
  incidents: { list, get, declare, ack, resolve },
  deployments: { list, rollback },
  // ...
};
```

Components never call `fetch` directly. They call `api.<resource>.<verb>()`. In mock mode each verb returns a `Promise` resolving to the seeded generator output. In production each verb is a thin wrapper around `createServerFn` (TanStack Start) or REST/GraphQL.

### Typed interfaces

All domain types live in `lib/mock-data.ts` (and will graduate to `lib/types/*.ts`). They are the contract — backend conforms to them, not the other way around. Strict TS means a contract drift surfaces as a compile error.

### Auth integration points

- `auth-store.signIn(email)` → swap mock with `supabase.auth.signInWithPassword` or your IdP call.
- `auth-store.signOut()` → swap with `supabase.auth.signOut()`.
- OAuth providers (`oauth-buttons.tsx`) wire to `supabase.auth.signInWithOAuth({ provider })` (already configured via Lovable Cloud).
- `requireSupabaseAuth` middleware is available for any `createServerFn` that needs the user's session (see TanStack Start server-function patterns).

### WebSocket integration

`src/lib/realtime/hub.ts` (planned) exposes:

```ts
realtimeHub.on(topic: string, handler: (msg) => void): () => void;
realtimeHub.send(topic: string, msg: unknown): void;
realtimeHub.state: "connecting" | "live" | "reconnecting" | "offline";
```

The mock implementation uses `setInterval`. The production implementation opens one WS connection, multiplexes by topic, handles backoff/resync, and surfaces `state` to `RealtimeIndicator`.

### GraphQL / REST compatibility

Because `api.*` is the only call site, you can:

- Implement it on top of **REST** (per-resource endpoints, fetch + Zod parse).
- Implement it on top of **GraphQL** (single endpoint, generated SDK).
- Implement it on top of **TanStack Start server functions** (createServerFn) — recommended default.

Components do not know or care.

---

## 10. Performance Optimization

### Virtualization

- Log explorer and events table use `@tanstack/react-virtual` (planned full rollout) — only visible rows render; 100k+ row tables stay smooth.
- Trace waterfalls collapse deep span trees by default; only expanded subtrees render.

### Lazy loading

- Routes are code-split automatically by the TanStack Router file-based plugin.
- Heavy components (`TopologyGraph`, `TraceWaterfall`, charts) are imported lazily where they are not first-paint critical.
- Recharts is tree-shaken — we import only the chart types we use.

### Memoization

- Expensive generators (`useMemo(() => generateEvents(40), [])`) so realtime renders never recompute fixtures.
- `React.memo` on row components for log/event tables.
- Selector subscriptions on Zustand (`useAuthStore((s) => s.can)`) so unrelated state changes don't re-render.

### Code splitting

- Per-route split (TanStack Router default).
- Per-feature split inside routes (charts, topology, waterfall, palette).
- Auth pages share an `AuthLayout` that excludes the heavy `AppShell` (no sidebar, no charts).

### TanStack optimization

- Single `QueryClient` at root; per-route `queryOptions` for type-safe cache keys.
- `staleTime` tuned per resource — list views short, detail views longer.
- Realtime hub writes via `setQueryData` to avoid full refetches.
- `useSuspenseQuery` in loaders (where applicable) for streaming SSR.

---

## 11. Role-based Dashboards

The `/` route renders `<RoleDashboardHeader />` which adapts to the current user's role:

| Role | Headline | KPIs surfaced | Quick actions |
|---|---|---|---|
| **Super Admin** | Global control plane | Workspaces · Seats · MRR · Security findings | Organizations · Audit · Settings |
| **Admin** | Workspace administration | Members · Invites · Integrations · API keys | Members · Settings · Alert policies |
| **SRE** | Reliability cockpit | Open incidents · MTTR · Error budget · Deploys/24h | Incidents · Deployments · Topology |
| **Developer** | Engineering workspace | Your services · Open issues · p95 · Error rate | Traces · Logs · Service health |
| **Viewer** | Read-only overview | Uptime · Healthy services · Active alerts · Events/sec | Service health · Alerts · MLOps |

Below the role header, every role sees the shared realtime overview (metric strip, throughput, latency, queue lag, distribution, worker performance, event stream, alerts, queues, workers). The **sidebar** is also permission-filtered, so each role only sees nav items they can use.

A demo **role switcher** lives in the topbar avatar menu — use it to instantly experience each persona.

---

## 12. Future Enterprise Roadmap

### Frontend

- [ ] Saved dashboards + share links
- [ ] Drag-and-drop dashboard editor
- [ ] Full virtualized log / event tables
- [ ] Mobile + tablet adaptive layouts
- [ ] Per-user dashboard preferences (server-persisted)
- [ ] Keyboard-driven workflows (vim-like motions in log / trace explorers)
- [ ] Skeleton loaders + suspense boundaries throughout

### Backend

- [ ] Real `api.*` implementation via `createServerFn` + Lovable Cloud
- [ ] Event ingestion pipeline (OTLP-compatible)
- [ ] Trace, log and metric long-term storage adapters (ClickHouse / Loki / Prometheus)
- [ ] Multi-tenant RLS policies for every domain table
- [ ] Audit-log append-only writer
- [ ] Webhook + cron endpoints for external integrations

### Infrastructure

- [ ] WebSocket pub/sub hub (Cloudflare Durable Objects or NATS)
- [ ] Edge ingestion workers with backpressure + dead-letter queues
- [ ] Horizontal worker autoscaling driven by queue lag
- [ ] Multi-region active/active with regional pinning
- [ ] Automated DR drills

### AI systems

- [ ] AI assistant in command palette (natural-language → query)
- [ ] Log clustering + anomaly summarization (Lovable AI Gateway)
- [ ] Incident RCA draft generation
- [ ] Trace anomaly detection (slow-span flagging)
- [ ] Drift detection alerts for ML models
- [ ] Auto-triage of alerts to responders

### Integrations

- [ ] Slack / Teams / PagerDuty / Opsgenie
- [ ] GitHub / GitLab deploy markers
- [ ] Jira / Linear incident sync
- [ ] Datadog / New Relic / Sentry forwarders
- [ ] SAML SSO + SCIM provisioning
- [ ] Terraform / Pulumi provider

### Observability engine

- [ ] OTLP gRPC + HTTP ingestion
- [ ] Trace sampling policies (head + tail)
- [ ] SLO definitions with burn-rate alerting
- [ ] Synthetic checks + RUM
- [ ] Profiling (pprof / async-profiler ingestion)
- [ ] Cost attribution per team / service

---

**Built with TanStack Start, React 19, Tailwind 4 and a strong opinion that observability tools should feel like the tools their users build.**
