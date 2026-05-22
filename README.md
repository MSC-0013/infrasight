# Pulse — Distributed Event Processing & Analytics Observability Platform

> A production-grade observability platform frontend for distributed event-processing systems.
> Inspired by Grafana · Datadog · Sentry · Vercel · Supabase Studio.

**Stack:** TanStack Start (React 19 + TypeScript) · Tailwind 4 · shadcn/ui · Zustand · TanStack Query · TanStack Table · Recharts · cmdk

---

## Quick links

| Area | Where |
|---|---|
| Routes | `src/routes/` |
| Components | `src/components/` |
| Mock data generators | `src/lib/mock-data.ts` |
| Stores (Zustand) | `src/store/` |
| Design tokens | `src/styles.css` |

---

## Feature progress matrix

Legend: ✅ done · 🚧 partial / mocked · ⏳ planned

### 1. Enterprise Authentication
| Feature | Status | Notes |
|---|---|---|
| Login page | ✅ | `/login` with email + password |
| Signup page | ✅ | `/signup` with workspace slug |
| Forgot password | ✅ | `/forgot-password` w/ confirmation state |
| Google OAuth | 🚧 | Button + mocked handler (no real OAuth wiring) |
| GitHub OAuth | 🚧 | Button + mocked handler |
| Session/device mgmt | ⏳ | UI shell only |
| Org/workspace selector | ✅ | Topbar dropdown |
| Invite member flow | ⏳ | Menu item placeholder |

### 2. Multi-role Dashboard System
| Feature | Status | Notes |
|---|---|---|
| 5 roles (Super Admin · Admin · SRE · Developer · Viewer) | ✅ | `src/store/auth-store.ts` |
| Permission matrix | ✅ | `PERMISSIONS` map + `can()` helper |
| Sidebar visibility per role | ✅ | Viewer hides settings/deployments; SRE/Admin see incidents/admin |
| Role badge | ✅ | `RoleBadge` component, shown in profile menu |
| Role switcher (demo) | ✅ | Profile dropdown — switch on the fly |
| Protected routes | 🚧 | Sidebar gating today; route-level `_authenticated` guards planned |

### 3. Global Command Palette
| Feature | Status | Notes |
|---|---|---|
| CMD/CTRL + K trigger | ✅ | Global keyboard listener |
| Navigate to pages | ✅ | All 20+ routes |
| Quick actions | ✅ | Pause stream · Declare incident · View deployments |
| Recent searches | ⏳ | Planned |
| Search events/traces/logs | ⏳ | Currently navigation-only |

### 4. Right-side Inspector Drawer
| Feature | Status | Notes |
|---|---|---|
| Global inspector store | ✅ | `useInspector()` hook |
| Tabs: Metadata / Logs / Traces / Actions | ✅ | `InspectorDrawer` |
| Wired into logs | ✅ | Click row → drawer |
| Wired into incidents detail | ✅ | Related-logs panel |
| Wired into events / traces / alerts | 🚧 | Existing per-page sheets remain; migration planned |
| Does not navigate away | ✅ | Right-side sheet, page state preserved |

### 5. Incident Management
| Feature | Status | Notes |
|---|---|---|
| Incidents list | ✅ | `/incidents` |
| **Incident details page** | ✅ | `/incidents/$incidentId` with timeline, RCA, responders, comments, affected services, related deployments/traces/logs, notifications |
| Comments / activity feed | ✅ | Local state, mocked |
| Severity / status badges | ✅ | sev1–sev4 |
| Acknowledge / responder assignment | 🚧 | UI present, no backend |
| Escalation rules | ⏳ | |
| Snooze / mute | ⏳ | |

### 6. Trace Waterfall
| Feature | Status | Notes |
|---|---|---|
| Traces list | ✅ | `/traces` |
| Trace detail w/ waterfall | ✅ | `/traces/$traceId` |
| Span hierarchy + per-span drawer | ✅ | `TraceWaterfall` component |
| Latency visualization | ✅ | Width-proportional bars per service |
| Dependency map | ✅ | Shared with Topology view |

### 7. Advanced Log Viewer
| Feature | Status | Notes |
|---|---|---|
| Structured logs + level filters | ✅ | `/logs` |
| Live stream toggle (pause/resume) | ✅ | Drives realtime indicator too |
| Query bar + multi-filter | ✅ | Plain substring + level filters |
| **Saved queries (localStorage)** | ✅ | Sidebar panel |
| **Query history** | ✅ | Last 8 |
| **Pinned logs** | ✅ | Top-pinned section |
| **AI summary placeholder** | ✅ | Toggle banner with mock RCA |
| Inspector integration | ✅ | Click row → global drawer |
| JSON expansion | ✅ | Via `JSONViewer` in drawer |
| Real syntax highlighting | ⏳ | |

### 8. Realtime / Websocket UX
| Feature | Status | Notes |
|---|---|---|
| Mocked realtime via `setInterval` | ✅ | `src/lib/mock-data.ts` |
| Live indicator in topbar | ✅ | `RealtimeIndicator` |
| Pause / resume globally | ✅ | Sync'd via `ui-store` |
| Reconnect states / heartbeat | ⏳ | Planned in Phase 3 |
| Stale connection warning | ⏳ | |

### 9. Deployment Intelligence
| Feature | Status | Notes |
|---|---|---|
| Deployments list | ✅ | `/deployments` |
| Compare / diff | ⏳ | Phase 2 |
| Release health score | ⏳ | |
| Post-deploy error spike chart | ⏳ | |

### 10. Alert Workflow
| Feature | Status | Notes |
|---|---|---|
| Alerts page | ✅ | `/alerts` |
| Acknowledge | 🚧 | Boolean flag mocked |
| Assign / escalate / snooze | ⏳ | Phase 2 |
| Notification routing config | ⏳ | |

### 11. Saved Dashboards
| Status: ⏳ Phase 2 |
| Custom widget layout, share dashboards, pinned widgets |

### 12. Global Time Range
| Feature | Status | Notes |
|---|---|---|
| 15m / 1h / 24h / 7d / 30d | ✅ | Topbar selector |
| Zustand store `time-range-store` | ✅ | Charts can subscribe |
| Custom range picker | ⏳ | UI placeholder |
| All charts synchronized | 🚧 | Store wired; per-chart consumption ongoing |

### 13. AI Observability Assistant
| Feature | Status | Notes |
|---|---|---|
| Mock AI log summary | ✅ | Toggle on `/logs` |
| ML insights page | ✅ | `/ml-insights` + `/mlops` |
| Anomaly explanation | ⏳ | |
| AI query generation | ⏳ | |
| Auto RCA on incidents | ⏳ | |

### 14. Organization Management
| Feature | Status | Notes |
|---|---|---|
| Org list page | ✅ | `/organizations` |
| Org switcher | ✅ | Topbar |
| Invite users / billing / usage | ⏳ | Phase 2 |

### 15. Settings Expansion
| Feature | Status | Notes |
|---|---|---|
| Profile / API keys / webhooks / RBAC / notifications | 🚧 | Skeleton — to be expanded Phase 2 |
| Retention policies / security | ⏳ | |

### 16. Topology
| Feature | Status | Notes |
|---|---|---|
| SVG service graph | ✅ | `/topology` |
| Animated edges / hover metrics / click-to-drill | ⏳ | Phase 3 polish |

### 17. Live Event Stream
| Status: ✅ on dashboard `/` |

### 18. Empty & Loading States
| Status: 🚧 partial — `empty-state.tsx` exists; full skeleton pass in Phase 3 |

### 19. Responsive
| Status: 🚧 Desktop first; mobile/tablet pass in Phase 3 |

### 20. Documentation Tracking
| This file (README.md) is the canonical progress doc — update on every milestone. |

---

## Implemented routes (24)

```
/                       Dashboard (KPIs, live stream, charts)
/login                  Sign in (Google · GitHub · email)
/signup                 Create workspace
/forgot-password        Reset flow
/events                 Event explorer + JSON inspector
/traces                 Traces list
/traces/$traceId        Trace detail w/ waterfall
/logs                   Advanced log viewer (saved queries, pinned, AI summary)
/services               Service health
/topology               Service dependency graph
/analytics              Throughput, latency percentiles, distributions
/queues                 Queue depth, lag, throughput
/workers                Worker fleet health
/incidents              Incident list
/incidents/$incidentId  Incident details (timeline, RCA, responders, comments)
/alerts                 Alert center
/mlops                  ML model monitoring
/ml-insights            Anomaly detection
/deployments            Deployment history
/audit                  Audit log
/api                    API endpoint monitoring
/organizations          Tenant management
/settings               Profile, API keys, webhooks, RBAC, notifications
```

---

## Roadmap

### Phase 1 — DONE ✅
- Auth UI (login/signup/forgot)
- 5-role permission system + sidebar gating
- Right-side Inspector Drawer (global)
- Global Time Range selector
- Incident details page
- Advanced log viewer upgrades

### Phase 2 — Next
- Deployment intelligence (compare, rollback viz, post-deploy error spike, release health score)
- Alert workflow (ack/assign/snooze/escalation/history/routing)
- AI Observability Assistant (RCA, query generation, anomaly explanation)
- Saved & customizable dashboards
- Org management (invites, members, billing, usage)
- Settings expansion (API keys CRUD, webhooks, RBAC editor, integrations, retention)

### Phase 3 — Polish
- Skeleton loaders + empty/error states across all pages
- Mobile/tablet responsive pass
- Topology interactivity (animated edges, hover metrics, click-to-drill)
- WebSocket UX states (reconnecting, stale, heartbeat pulse)
- Realtime activity feed widget (live errors, deploys, queue spikes)

### Backend readiness (future)
- All data generators in `src/lib/mock-data.ts` map 1:1 to typed interfaces — ready to swap for `createServerFn` calls
- Auth store ready to plug into real OAuth via Lovable Cloud
- Inspector drawer payload shape is provider-agnostic

---

## Design principles

- **Dark by default** — graphite background, Grafana/Datadog status palette (blue/green/amber/red)
- **Typography** — Inter (UI) + JetBrains Mono (data)
- **Density** — compact engineering tables, not airy marketing layouts
- **No flashy animations**, no glassmorphism, no gradients beyond subtle accents
- **Semantic tokens only** — all colors via `src/styles.css` CSS variables

---

## Conventions

- Routes: file-based in `src/routes/` (flat dot-separated, e.g. `incidents.$incidentId.tsx`)
- State: Zustand stores in `src/store/` — one concern per file
- Mock data: every domain object generated by `src/lib/mock-data.ts` with stable seeded RNG
- Realtime: simulated via `setInterval` gated by `realtimeConnected` in `ui-store`
- Components: shadcn/ui in `src/components/ui/`, app components in `src/components/`
