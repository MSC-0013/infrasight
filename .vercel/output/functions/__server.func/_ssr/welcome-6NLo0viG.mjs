import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./router--DYUD3CX.mjs";
import "../_libs/sonner.mjs";
import { A as Activity, c as ArrowRight, u as Github, aa as Workflow, g as ChartColumn, O as Network, B as Bell, G as GitBranch, a1 as Sparkles, h as Check, a0 as ShieldCheck } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
const FEATURES = [{
  icon: Workflow,
  title: "Distributed Tracing",
  desc: "Span-level waterfalls across every service hop with deep linking to logs and metrics."
}, {
  icon: ChartColumn,
  title: "Realtime Analytics",
  desc: "Streaming throughput, latency percentiles and cardinality breakdowns at second resolution."
}, {
  icon: Network,
  title: "Service Topology",
  desc: "Auto-discovered dependency graph with live RPS and error-rate edges."
}, {
  icon: Bell,
  title: "Alerting & Incidents",
  desc: "SLO-aware alerts, on-call rotations, RCA timelines and post-mortems."
}, {
  icon: GitBranch,
  title: "Deployment Intelligence",
  desc: "Correlate every deploy with traffic, errors, latency and rollback in one click."
}, {
  icon: Sparkles,
  title: "MLOps Observability",
  desc: "Model drift, feature distribution and inference latency for AI workloads."
}];
const ROLES = [{
  name: "Super Admin",
  tagline: "Global control plane, org governance, audit trails.",
  perms: ["All permissions", "Org & billing", "API keys & SSO"]
}, {
  name: "Admin",
  tagline: "Workspace administration and team management.",
  perms: ["Manage users", "Manage settings", "Manage alerts"]
}, {
  name: "SRE",
  tagline: "Incidents, on-call, deployments and infra health.",
  perms: ["Manage incidents", "Manage deployments", "Manage queues"]
}, {
  name: "Developer",
  tagline: "Traces, logs, metrics and incident ownership.",
  perms: ["View observability", "Open incidents", "Inspect traces"]
}, {
  name: "Viewer",
  tagline: "Read-only dashboards for stakeholders.",
  perms: ["Dashboards", "Alerts feed", "Service health"]
}];
function WelcomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 max-w-7xl items-center justify-between px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/welcome", className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-tight", children: "Pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:inline", children: "v2.4.0" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden items-center gap-6 text-xs text-muted-foreground md:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#features", className: "hover:text-foreground", children: "Features" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#roles", className: "hover:text-foreground", children: "Roles" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#architecture", className: "hover:text-foreground", children: "Architecture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#pricing", className: "hover:text-foreground", children: "Pricing" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-7 text-xs", children: "Sign in" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
          "Open console ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3 w-3" })
        ] }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px] font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success animate-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "cluster · us-east-1 · 99.992% uptime · 847 events/sec" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight", children: "Observability for distributed event pipelines, built for engineers." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 max-w-2xl text-base text-muted-foreground", children: "Traces, logs, metrics, queues, workers, deployments, incidents and MLOps in a single engineering-grade console. Designed like Grafana, Datadog and Sentry — without the bloat." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-9 gap-2", children: [
          "Launch console ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-9", children: "Create account" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://github.com", target: "_blank", rel: "noreferrer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", className: "h-9 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Github, { className: "h-4 w-4" }),
          "View source"
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4", children: [["Events / sec", "847k"], ["p95 latency", "142ms"], ["Workers online", "92/96"], ["Open incidents", "3"]].map(([l, v]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-5 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: l }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-2xl tabular-nums", children: v })
      ] }, l)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-wider text-primary", children: "Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-semibold tracking-tight", children: "One console for every signal." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "From the API edge to the worker pool, Pulse captures every span and renders it in workflows engineers actually use." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2 lg:grid-cols-3", children: FEATURES.map(({
        icon: Icon,
        title,
        desc
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-5 w-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-sm font-semibold", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-xs leading-relaxed text-muted-foreground", children: desc })
      ] }, title)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "roles", className: "border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-wider text-primary", children: "Access Control" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-semibold tracking-tight", children: "Role-based dashboards, out of the box." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Five built-in roles with a permission matrix that maps to sidebar visibility, route guards and dashboard layouts." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: r.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: r.tagline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-1.5", children: r.perms.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-success" }),
          " ",
          p
        ] }, p)) })
      ] }, r.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "architecture", className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-6 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-10 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-wider text-primary", children: "Architecture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-semibold tracking-tight", children: "Frontend-first, backend-ready." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: "Typed interfaces, abstracted API layer, mockable realtime streams and pluggable auth. Swap mocks for your gRPC, REST or GraphQL backend without touching components." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-6 space-y-2 text-sm", children: ["TanStack Start · React 19 · TypeScript strict", "Zustand stores · TanStack Query · TanStack Table", "shadcn/ui · Tailwind 4 · Recharts", "Seeded RNG mocks · setInterval realtime stream", "Role-gated routes · permission matrix", "Backend-ready REST/WebSocket abstractions"].map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-success" }),
          " ",
          l
        ] }, l)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-5 font-mono text-[11px] leading-relaxed text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-foreground", children: "$ pulse/architecture" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "mt-3 whitespace-pre", children: `┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   Browser   │◀──▶│  Edge / SSR  │◀──▶│  Services   │
│  (Pulse UI) │ WS │  TanStack    │RPC │  (events,   │
│             │    │  Start       │    │   workers)  │
└─────────────┘    └──────────────┘    └─────────────┘
        │                  │                    │
        ▼                  ▼                    ▼
   Zustand           createServerFn        Queues / DB
   Query cache       requireAuth           MLOps store
   Realtime hub      RLS                   Trace store` })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "pricing", className: "border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-wider text-primary", children: "Pricing" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 text-3xl font-semibold tracking-tight", children: "Simple, transparent, per-host." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-1 gap-4 md:grid-cols-3", children: [{
        name: "Hobby",
        price: "$0",
        desc: "For local development and single-engineer projects.",
        feats: ["1 workspace", "7-day retention", "Community support"]
      }, {
        name: "Team",
        price: "$29",
        desc: "For growing engineering teams.",
        feats: ["10 workspaces", "30-day retention", "SSO + audit log", "Priority support"],
        popular: true
      }, {
        name: "Enterprise",
        price: "Custom",
        desc: "For production-grade observability.",
        feats: ["Unlimited workspaces", "Custom retention", "SAML SSO + SCIM", "Dedicated CSM"]
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-lg border bg-card p-6 ${t.popular ? "border-primary" : "border-border"}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: t.name }),
          t.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-primary px-1.5 py-0.5 text-[10px] font-mono uppercase text-primary-foreground", children: "Popular" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 font-mono text-3xl", children: [
          t.price,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "/host/mo" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground", children: t.desc }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-1.5", children: t.feats.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3 text-success" }),
          " ",
          f
        ] }, f)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "mt-5 block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", variant: t.popular ? "default" : "outline", children: "Get started" }) })
      ] }, t.name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-6 py-20 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold tracking-tight", children: "Ship observability your engineers will actually use." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-3 max-w-xl text-sm text-muted-foreground", children: "Launch the live console — no signup required for the demo workspace." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-9 gap-2", children: [
          "Open console ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "h-9", children: "Create workspace" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pulse · Distributed Event Processing & Observability" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Docs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Changelog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy" })
      ] })
    ] }) })
  ] });
}
export {
  WelcomePage as component
};
