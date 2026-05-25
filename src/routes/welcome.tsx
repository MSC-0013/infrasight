import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ChartBar as BarChart3, Bell, GitBranch, Network, Workflow, ShieldCheck, Sparkles, ArrowRight, Github, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "Pulse — Distributed Event Processing & Observability Platform" },
      { name: "description", content: "Realtime observability for distributed event pipelines: traces, logs, metrics, queues, workers, incidents and MLOps in one engineering-grade console." },
      { property: "og:title", content: "Pulse — Distributed Event Processing Platform" },
      { property: "og:description", content: "One platform for distributed events, traces, logs, queues, workers, incidents and MLOps." },
    ],
  }),
  component: WelcomePage,
});

const FEATURES = [
  { icon: Workflow, title: "Distributed Tracing", desc: "Span-level waterfalls across every service hop with deep linking to logs and metrics." },
  { icon: BarChart3, title: "Realtime Analytics", desc: "Streaming throughput, latency percentiles and cardinality breakdowns at second resolution." },
  { icon: Network, title: "Service Topology", desc: "Auto-discovered dependency graph with live RPS and error-rate edges." },
  { icon: Bell, title: "Alerting & Incidents", desc: "SLO-aware alerts, on-call rotations, RCA timelines and post-mortems." },
  { icon: GitBranch, title: "Deployment Intelligence", desc: "Correlate every deploy with traffic, errors, latency and rollback in one click." },
  { icon: Sparkles, title: "MLOps Observability", desc: "Model drift, feature distribution and inference latency for AI workloads." },
];

const ROLES = [
  { name: "Super Admin", tagline: "Global control plane, org governance, audit trails.", perms: ["All permissions", "Org & billing", "API keys & SSO"] },
  { name: "Admin", tagline: "Workspace administration and team management.", perms: ["Manage users", "Manage settings", "Manage alerts"] },
  { name: "SRE", tagline: "Incidents, on-call, deployments and infra health.", perms: ["Manage incidents", "Manage deployments", "Manage queues"] },
  { name: "Developer", tagline: "Traces, logs, metrics and incident ownership.", perms: ["View observability", "Open incidents", "Inspect traces"] },
  { name: "Viewer", tagline: "Read-only dashboards for stakeholders.", perms: ["Dashboards", "Alerts feed", "Service health"] },
];

function WelcomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/welcome" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight">Pulse</span>
            <span className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline">v2.4.0</span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#roles" className="hover:text-foreground">Roles</a>
            <a href="#architecture" className="hover:text-foreground">Architecture</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button size="sm" variant="ghost" className="h-7 text-xs">Sign in</Button></Link>
            <Link to="/dashboard"><Button size="sm" className="h-7 gap-1.5 text-xs">Open console <ArrowRight className="h-3 w-3" /></Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            <span>cluster · us-east-1 · 99.992% uptime · 847 events/sec</span>
          </div>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight">
            Observability for distributed event pipelines, built for engineers.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-muted-foreground">
            Traces, logs, metrics, queues, workers, deployments, incidents and MLOps in a single
            engineering-grade console. Designed like Grafana, Datadog and Sentry — without the bloat.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/dashboard"><Button className="h-9 gap-2">Launch console <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/signup"><Button variant="outline" className="h-9">Create account</Button></Link>
            <a href="https://github.com" target="_blank" rel="noreferrer"><Button variant="ghost" className="h-9 gap-2"><Github className="h-4 w-4" />View source</Button></a>
          </div>

          {/* Stat strip */}
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {[
              ["Events / sec", "847k"],
              ["p95 latency", "142ms"],
              ["Workers online", "92/96"],
              ["Open incidents", "3"],
            ].map(([l, v]) => (
              <div key={l} className="bg-card px-5 py-4">
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{l}</div>
                <div className="mt-1 font-mono text-2xl tabular-nums">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Platform</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">One console for every signal.</h2>
            <p className="mt-3 text-sm text-muted-foreground">From the API edge to the worker pool, Pulse captures every span and renders it in workflows engineers actually use.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-card p-6">
                <Icon className="h-5 w-5 text-primary" />
                <h3 className="mt-4 text-sm font-semibold">{title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Access Control</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Role-based dashboards, out of the box.</h2>
            <p className="mt-3 text-sm text-muted-foreground">Five built-in roles with a permission matrix that maps to sidebar visibility, route guards and dashboard layouts.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {ROLES.map((r) => (
              <div key={r.name} className="rounded-lg border border-border bg-card p-5">
                <div className="text-sm font-semibold">{r.name}</div>
                <p className="mt-1 text-[11px] text-muted-foreground">{r.tagline}</p>
                <ul className="mt-4 space-y-1.5">
                  {r.perms.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Check className="h-3 w-3 text-success" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section id="architecture" className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Architecture</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight">Frontend-first, backend-ready.</h2>
              <p className="mt-3 text-sm text-muted-foreground">Typed interfaces, abstracted API layer, mockable realtime streams and pluggable auth. Swap mocks for your gRPC, REST or GraphQL backend without touching components.</p>
              <ul className="mt-6 space-y-2 text-sm">
                {[
                  "TanStack Start · React 19 · TypeScript strict",
                  "Zustand stores · TanStack Query · TanStack Table",
                  "shadcn/ui · Tailwind 4 · Recharts",
                  "Seeded RNG mocks · setInterval realtime stream",
                  "Role-gated routes · permission matrix",
                  "Backend-ready REST/WebSocket abstractions",
                ].map((l) => (
                  <li key={l} className="flex items-center gap-2 text-muted-foreground">
                    <ShieldCheck className="h-4 w-4 text-success" /> {l}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-5 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <div className="text-foreground">$ pulse/architecture</div>
              <pre className="mt-3 whitespace-pre">
{`┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Browser   │◀──▶│  Edge / SSR  │◀──▶│  Services   │
│  (Pulse UI) │ WS │  TanStack    │RPC │  (events,   │
│             │    │  Start       │    │   workers)  │
└─────────────┘    └──────────────┘    └─────────────┘
        │                  │                    │
        ▼                  ▼                    ▼
   Zustand           createServerFn        Queues / DB
   Query cache       requireAuth           MLOps store
   Realtime hub      RLS                   Trace store`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Simple, transparent, per-host.</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              { name: "Hobby", price: "$0", desc: "For local development and single-engineer projects.", feats: ["1 workspace", "7-day retention", "Community support"] },
              { name: "Team", price: "$29", desc: "For growing engineering teams.", feats: ["10 workspaces", "30-day retention", "SSO + audit log", "Priority support"], popular: true },
              { name: "Enterprise", price: "Custom", desc: "For production-grade observability.", feats: ["Unlimited workspaces", "Custom retention", "SAML SSO + SCIM", "Dedicated CSM"] },
            ].map((t) => (
              <div key={t.name} className={`rounded-lg border bg-card p-6 ${t.popular ? "border-primary" : "border-border"}`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{t.name}</div>
                  {t.popular && <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-mono uppercase text-primary-foreground">Popular</span>}
                </div>
                <div className="mt-4 font-mono text-3xl">{t.price}<span className="text-xs text-muted-foreground">/host/mo</span></div>
                <p className="mt-2 text-xs text-muted-foreground">{t.desc}</p>
                <ul className="mt-5 space-y-1.5">
                  {t.feats.map((f) => <li key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground"><Check className="h-3 w-3 text-success" /> {f}</li>)}
                </ul>
                <Link to="/signup" className="mt-5 block"><Button className="w-full" variant={t.popular ? "default" : "outline"}>Get started</Button></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <h2 className="text-3xl font-semibold tracking-tight">Ship observability your engineers will actually use.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Launch the live console — no signup required for the demo workspace.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/dashboard"><Button className="h-9 gap-2">Open console <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/signup"><Button variant="outline" className="h-9">Create workspace</Button></Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <Activity className="h-3.5 w-3.5 text-primary" />
            <span>Pulse · Distributed Event Processing & Observability</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Docs</a>
            <a href="#" className="hover:text-foreground">Status</a>
            <a href="#" className="hover:text-foreground">Changelog</a>
            <a href="#" className="hover:text-foreground">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
