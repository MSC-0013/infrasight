# Pulse — Enterprise Evolution Plan

This is a large scope. To ship quality work without thrashing, I'll execute in **3 phases** across this turn and (if you approve more) follow-ups. I'll also create a `README.md` that tracks progress across all 20 feature areas you listed.

## What's already done (no rework)
- Command palette (CMD+K) ✅
- Trace waterfall + trace detail page ✅
- Topology graph ✅
- Log explorer (basic) ✅
- Incidents list, Deployments, Audit, MLOps, Services pages ✅
- Realtime indicator + notification center ✅
- Mock data system w/ intervals ✅

## Phase 1 — THIS turn (highest impact, all frontend, mocked)

1. **Auth UI + Multi-role system (mocked, no backend)**
   - `/login`, `/signup`, `/forgot-password` pages — clean engineering style
   - Google / GitHub OAuth buttons (mocked handlers, no real OAuth wiring)
   - Zustand `auth-store` with 5 roles: `super_admin | admin | sre | developer | viewer`
   - Role switcher in Topbar (dev affordance) + role badge
   - `_authenticated` route guard pattern (mocked — checks store), permission helpers `can(action)`
   - Sidebar filters items by role (viewer hides deployments/settings; SRE sees incidents; admin sees org/settings)

2. **Right-side Inspector Drawer (global)**
   - `InspectorProvider` + `useInspector()` hook
   - Wired into: logs, events, incidents, traces
   - Tabs: Metadata · Related logs · Related traces · Actions · Timeline
   - Does NOT navigate away — Sheet from right

3. **Global Time Range selector**
   - Top toolbar: 15m / 1h / 24h / 7d / custom
   - Zustand `time-range-store`; charts read from it

4. **Incident Details page** (`/incidents/$incidentId`)
   - Timeline · Responders · Severity · Affected services · RCA notes · Comments · Activity feed · Related deployments/logs/traces

5. **Advanced Log Viewer upgrades**
   - JSON expansion, saved queries (localStorage), query history, stream mode toggle, pinned logs, AI summary placeholder

6. **README.md** with full progress matrix (✅ done / 🚧 in progress / ⏳ planned) across all 20 areas

## Phase 2 — follow-up turn (if you approve)
- Deployment intelligence (compare/rollback viz, release health score, post-deploy error spike)
- Alert workflow (ack/assign/snooze/escalation/history)
- AI Observability Assistant (mocked summaries, RCA, query gen)
- Saved dashboards + custom widget layout
- Org management (invite, members, billing, usage)
- Settings expansion (API keys, webhooks, RBAC editor, integrations, retention)

## Phase 3 — polish turn
- Skeleton loaders + empty/error states across all pages
- Mobile/tablet responsive pass (collapsible sidebar, sheet nav, adaptive tables)
- Topology interactivity (animated edges, hover metrics, click-to-drill)
- Live event stream widget on dashboard
- WebSocket UX states (reconnecting, stale, heartbeat)

## Notes
- Everything stays **frontend-only with mocks** — no real Google/GitHub OAuth, no real backend writes (matches your current direction).
- Real auth/OAuth would need Lovable Cloud wiring; happy to add in a later turn if you want.
- Will keep the existing dark engineering aesthetic — no redesign.

**Approve to proceed with Phase 1?** Or tell me to reorder / cut / expand.
