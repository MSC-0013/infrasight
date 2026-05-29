import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, ChartBar as BarChart3, Bell, GitBranch, Network, Workflow, ShieldCheck, Sparkles, ArrowRight, Github, Check, Zap, Globe, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { sparklineFromValue } from "@/lib/chart-helpers";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from "recharts";

export const Route = createFileRoute("/welcome1")({
  head: () => ({
    meta: [
      { title: "Pulse — Distributed Event Processing & Observability Platform" },
      { name: "description", content: "Realtime observability for distributed event pipelines: traces, logs, metrics, queues, workers, incidents and MLOps in one engineering-grade console." },
      { property: "og:title", content: "Pulse — Distributed Event Processing Platform" },
      { property: "og:description", content: "One platform for distributed events, traces, logs, queues, workers, incidents and MLOps." },
    ],
  }),
  component: LandingPage,
});

const FEATURES = [
  { icon: Workflow, title: "Distributed Tracing", desc: "Span-level waterfalls across every service hop with deep linking to logs and metrics." },
  { icon: BarChart3, title: "Realtime Analytics", desc: "Streaming throughput, latency percentiles and cardinality breakdowns at second resolution." },
  { icon: Network, title: "Service Topology", desc: "Auto-discovered dependency graph with live RPS and error-rate edges." },
  { icon: Bell, title: "Alerting & Incidents", desc: "SLO-aware alerts, on-call rotations, RCA timelines and post-mortems." },
  { icon: GitBranch, title: "Deployment Intelligence", desc: "Correlate every deploy with traffic, errors, latency and rollback in one click." },
  { icon: Sparkles, title: "MLOps Observability", desc: "Model drift, feature distribution and inference latency for AI workloads." },
];

const DEMO_ACCOUNTS = [
  { email: "admin@pulse.io", password: "admin123", role: "Super Admin", tone: "critical" as const, desc: "Full platform control, org governance, audit trails", perms: ["All features", "Org & billing", "API keys & SSO", "Audit trails"] },
  { email: "ops@pulse.io", password: "ops123", role: "Admin", tone: "error" as const, desc: "Workspace admin, team & billing management", perms: ["Manage users", "Settings & API keys", "Alerts & incidents", "Audit log"] },
  { email: "sre@pulse.io", password: "sre123", role: "SRE", tone: "warning" as const, desc: "Incidents, deployments, infrastructure health", perms: ["Manage incidents", "Deployments & queues", "Alerts & workers", "All observability"] },
  { email: "dev@pulse.io", password: "dev123", role: "Developer", tone: "info" as const, desc: "Traces, logs, queues, debugging tools", perms: ["Traces & logs", "Events & services", "Manage incidents", "Deployments & MLOps"] },
  { email: "viewer@pulse.io", password: "viewer123", role: "Viewer", tone: "success" as const, desc: "Read-only dashboards for stakeholders", perms: ["View dashboards", "Alerts & incidents", "Service health", "SLOs & heatmaps"] },
];

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 8px",
};

function LandingPage() {
  const sparkline = sparklineFromValue(800, 40, 0.1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span className="text-sm font-semibold tracking-tight">Pulse</span>
            <span className="hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline">v2.4.0</span>
          </Link>
          <nav className="hidden items-center gap-6 text-xs text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#roles" className="hover:text-foreground">Roles</a>
            <a href="#demo" className="hover:text-foreground">Demo</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button size="sm" variant="ghost" className="h-7 text-xs">Sign in</Button></Link>
            <Link to="/signup"><Button size="sm" className="h-7 gap-1.5 text-xs">Get started <ArrowRight className="h-3 w-3" /></Button></Link>
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
            <Link to="/login"><Button className="h-9 gap-2">Launch console <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/signup"><Button variant="outline" className="h-9">Create account</Button></Link>
            <a href="https://github.com" target="_blank" rel="noreferrer"><Button variant="ghost" className="h-9 gap-2"><Github className="h-4 w-4" />View source</Button></a>
          </div>

          {/* Live sparkline preview */}
          <div className="mt-12 rounded-lg border border-border bg-card p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-success" />
                <span className="text-xs font-semibold">Live event throughput</span>
                <StatusBadge tone="success">streaming</StatusBadge>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">847k events/sec · p95 142ms</span>
            </div>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkline} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <defs>
                    <linearGradient id="hero-g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} tickLine={false} axisLine={false} interval={8} />
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} tickLine={false} axisLine={false} width={32} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={1.5} fill="url(#hero-g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Stat strip */}
          <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {[
              { label: "Events / sec", value: "847k", icon: Zap },
              { label: "p95 latency", value: "142ms", icon: Clock },
              { label: "Workers online", value: "92/96", icon: Globe },
              { label: "Open incidents", value: "3", icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-card px-5 py-4">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  <Icon className="h-3 w-3" /> {label}
                </div>
                <div className="mt-1 font-mono text-2xl tabular-nums">{value}</div>
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

      {/* Demo accounts */}
      <section id="demo" className="border-b border-border bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Demo</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Sign in with any role.</h2>
            <p className="mt-3 text-sm text-muted-foreground">Five role-based dashboards, each with unique permissions and layouts. Use the credentials below to explore every view.</p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            {DEMO_ACCOUNTS.map((a) => (
              <div key={a.email} className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-2">
                  <StatusBadge tone={a.tone}>{a.role}</StatusBadge>
                </div>
                <div className="mt-3 space-y-1.5 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span>{a.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Password</span>
                    <span>{a.password}</span>
                  </div>
                </div>
                <p className="mt-3 text-[11px] text-muted-foreground">{a.desc}</p>
                <ul className="mt-2 space-y-1">
                  {a.perms.map((p) => (
                    <li key={p} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Check className="h-2.5 w-2.5 text-success" /> {p}
                    </li>
                  ))}
                </ul>
                <Link to="/login" className="mt-4 block">
                  <Button size="sm" variant="outline" className="h-7 w-full gap-1.5 text-xs">
                    Sign in <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-border">
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
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Pick a role, sign in, and explore the live dashboard — no setup required.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link to="/login"><Button className="h-9 gap-2">Open console <ArrowRight className="h-4 w-4" /></Button></Link>
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
