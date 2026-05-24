import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { N as Navigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-9rBCoVTg.mjs";
import { M as MetricCard } from "./metric-card-KkdmGoaN.mjs";
import { C as ChartCard } from "./chart-card-D_uLqjQ7.mjs";
import { ah as useAuthStore, y as StatusBadge, R as ROLE_LABEL, a3 as generateOrganizations, P as generateAuditLogs, O as generateApiKeys, ab as generateTimeSeries, B as Button, a2 as generateMembers, M as generateAlerts, a as Dialog, b as DialogContent, e as DialogHeader, f as DialogTitle, c as DialogDescription, I as Input, Y as generateIncidents, U as generateDeployments, a6 as generateSLOs, F as cn, a8 as generateServices, X as generateEvents, aa as generateThroughputSeries, _ as generateLatencySeries, T as Tabs, A as TabsList, C as TabsTrigger, z as TabsContent, a0 as generateMLInsights, af as generateWorkers, a5 as generateQueues, a4 as generateQueueLagSeries, W as generateEventDistribution, ac as generateTimelineEvents, J as JSONViewer, ai as useInspector, G as formatDistanceToNow$1 } from "./router-C7vl9p1Y.mjs";
import { A as AlertCard } from "./alert-card-B6EYlPLg.mjs";
import { Q as QueueCard } from "./queue-card-DRMz0i-4.mjs";
import { W as WorkerCard } from "./worker-card-DJK8ZAXu.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-rQogMtfK.mjs";
import "../_libs/sonner.mjs";
import { g as ChartColumn, B as Bell, a3 as Sparkles, ac as Workflow, F as FileText, R as OctagonAlert, G as GitBranch, Q as Network, a2 as ShieldCheck, A as Activity, f as Building2, K as KeyRound, V as Plus, a1 as Settings, ab as Users, v as Flame, J as ListFilter, W as RefreshCw, D as Download, k as ChevronRight, s as Cpu, L as Layers, a8 as TriangleAlert, X as Rocket, l as ChevronUp, i as ChevronDown } from "../_libs/lucide-react.mjs";
import { a as formatDistanceToNow, f as format } from "../_libs/date-fns.mjs";
import { R as ResponsiveContainer, a as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, A as Area, e as LineChart, d as Line, f as PieChart, P as Pie, c as Cell, L as Legend, b as BarChart, B as Bar } from "../_libs/recharts.mjs";
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
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const ROLE_VIEW = {
  super_admin: {
    headline: "Global control plane",
    sub: "Org governance, billing posture, audit trail and security signals across every workspace.",
    tone: "critical",
    actions: [
      { to: "/organizations", label: "Organizations", icon: ShieldCheck, hint: "12 workspaces" },
      { to: "/audit", label: "Audit log", icon: FileText, hint: "8.4k events / 24h" },
      { to: "/settings", label: "Platform settings", icon: Activity, hint: "SSO · SCIM · RLS" }
    ],
    kpis: [
      { label: "Workspaces", value: "12" },
      { label: "Seats in use", value: "248 / 400" },
      { label: "MRR", value: "$18.4k" },
      { label: "Security findings", value: "0 high" }
    ]
  },
  admin: {
    headline: "Workspace administration",
    sub: "Users, billing, integrations and platform settings for this organization.",
    tone: "error",
    actions: [
      { to: "/organizations", label: "Members", icon: ShieldCheck, hint: "24 active" },
      { to: "/settings", label: "Settings", icon: Activity, hint: "API keys · SSO" },
      { to: "/alerts", label: "Alert policies", icon: Bell, hint: "18 active" }
    ],
    kpis: [
      { label: "Team members", value: "24" },
      { label: "Pending invites", value: "3" },
      { label: "Active integrations", value: "9" },
      { label: "API keys", value: "14" }
    ]
  },
  sre: {
    headline: "Reliability cockpit",
    sub: "Incidents, on-call rotations, deployment posture and infrastructure health.",
    tone: "warning",
    actions: [
      { to: "/incidents", label: "Incidents", icon: OctagonAlert, hint: "3 open · 1 SEV1" },
      { to: "/deployments", label: "Deployments", icon: GitBranch, hint: "Last: 12m ago" },
      { to: "/topology", label: "Topology", icon: Network, hint: "32 services" }
    ],
    kpis: [
      { label: "Open incidents", value: "3" },
      { label: "MTTR (7d)", value: "18m" },
      { label: "Error budget", value: "82%" },
      { label: "Deploys (24h)", value: "14" }
    ]
  },
  developer: {
    headline: "Engineering workspace",
    sub: "Traces, logs, queues and the services you own. Jump straight into debugging.",
    tone: "info",
    actions: [
      { to: "/traces", label: "Traces", icon: Workflow, hint: "Search spans" },
      { to: "/logs", label: "Logs", icon: FileText, hint: "Live tail" },
      { to: "/services", label: "Service health", icon: ChartColumn, hint: "Your services" }
    ],
    kpis: [
      { label: "Your services", value: "6" },
      { label: "Open issues", value: "2" },
      { label: "p95 latency", value: "142ms" },
      { label: "Error rate", value: "1.24%" }
    ]
  },
  viewer: {
    headline: "Read-only dashboard",
    sub: "Live overview of platform health. You can browse but not modify configuration.",
    tone: "success",
    actions: [
      { to: "/services", label: "Service health", icon: ChartColumn, hint: "Live" },
      { to: "/alerts", label: "Alerts feed", icon: Bell, hint: "Read-only" },
      { to: "/mlops", label: "MLOps", icon: Sparkles, hint: "Model health" }
    ],
    kpis: [
      { label: "System uptime", value: "99.992%" },
      { label: "Healthy services", value: "30/32" },
      { label: "Active alerts", value: "4" },
      { label: "Events / sec", value: "847" }
    ]
  }
};
function RoleDashboardHeader() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  const view = ROLE_VIEW[user.role];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-gradient-to-b from-card/40 to-transparent px-6 py-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: view.tone, children: ROLE_LABEL[user.role] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground", children: [
            user.email,
            " · workspace · pulse-prod"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-xl font-semibold tracking-tight", children: view.headline }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 max-w-2xl text-xs text-muted-foreground", children: view.sub })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden gap-2 md:flex", children: view.actions.map(({ to, label, icon: Icon, hint }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to,
          className: "group flex min-w-[140px] flex-col gap-0.5 rounded-md border border-border bg-card px-3 py-2 transition-colors hover:border-primary/40 hover:bg-accent/40",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: label })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: hint })
          ]
        },
        to
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4", children: view.kpis.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: k.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-mono text-base tabular-nums", children: k.value })
    ] }, k.label)) })
  ] });
}
function SuperAdminDashboard() {
  const orgs = reactExports.useMemo(() => generateOrganizations(), []);
  const auditLogs = reactExports.useMemo(() => generateAuditLogs(15), []);
  const apiKeys = reactExports.useMemo(() => generateApiKeys(), []);
  const sparkA = reactExports.useMemo(() => generateTimeSeries(20, 12, 2), []);
  const sparkB = reactExports.useMemo(() => generateTimeSeries(20, 248, 30), []);
  const sparkC = reactExports.useMemo(() => generateTimeSeries(20, 14, 4), []);
  const sparkD = reactExports.useMemo(() => generateTimeSeries(20, 8400, 800), []);
  const totalOrgs = orgs.length;
  const totalMembers = 248;
  const totalApiKeys = apiKeys.filter((k) => k.status === "active").length;
  const auditEvents24h = auditLogs.length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Global Control Plane",
        description: "Org governance, billing posture, audit trail and security signals across every workspace.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/organizations", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3 w-3" }),
            "New Org"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/audit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
            "Audit"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Workspaces", value: totalOrgs, series: sparkA, trend: 4.2, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Total members", value: totalMembers, series: sparkB, trend: 6.1, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active API keys", value: totalApiKeys, series: sparkC, trend: 2.3, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Audit 24h", value: auditEvents24h, series: sparkD, trend: -3.2, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Security findings", value: "0 high", series: generateTimeSeries(20, 0, 0), trend: 0, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Seats used", value: "248 / 400", series: sparkB, trend: 1.8, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "MRR", value: "$18.4k", series: generateTimeSeries(20, 18400, 1200), trend: 7.2, status: "success", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Regions", value: "5", series: generateTimeSeries(20, 5, 0), trend: 0, status: "info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-3.5 w-3.5 text-primary" }),
              "Organizations"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              orgs.length,
              " workspaces"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/organizations", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Region" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: orgs.slice(0, 8).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-medium", children: o.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: o.plan === "enterprise" ? "info" : o.plan === "pro" ? "success" : "warning", children: o.plan }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: "us-east-1" })
          ] }, o.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
              "Audit Trail"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              auditLogs.length,
              " recent events"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/audit", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Actor" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Action" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Entity" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: auditLogs.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: formatDistanceToNow(new Date(a.timestamp), { addSuffix: true }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: a.actor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: a.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: a.entity })
          ] }, a.id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5 text-primary" }),
            "API Keys"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            totalApiKeys,
            " active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", className: "text-xs text-primary hover:underline", children: "Manage" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4", children: apiKeys.slice(0, 6).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: k.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: k.status === "active" ? "success" : "error", children: k.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[10px] text-muted-foreground", children: [
          k.prefix,
          "…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[10px] text-muted-foreground", children: [
          k.requests24h,
          " req/24h"
        ] })
      ] }, k.id)) })
    ] }) })
  ] });
}
function AdminDashboard() {
  const members = reactExports.useMemo(() => generateMembers(), []);
  const apiKeys = reactExports.useMemo(() => generateApiKeys(), []);
  const alerts = reactExports.useMemo(() => generateAlerts(8), []);
  const [inviteOpen, setInviteOpen] = reactExports.useState(false);
  const [inviteEmail, setInviteEmail] = reactExports.useState("");
  const [inviteRole, setInviteRole] = reactExports.useState("engineer");
  const activeMembers = members.filter((m) => m.status === "active").length;
  const pendingInvites = members.filter((m) => m.status === "invited").length;
  const activeKeys = apiKeys.filter((k) => k.status === "active").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Workspace Administration",
        description: "Users, billing, integrations and platform settings for this organization.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", onClick: () => setInviteOpen(true), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
            "Invite"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3 w-3" }),
            "Settings"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Team members", value: activeMembers, series: generateTimeSeries(20, 24, 2), trend: 4.1, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Pending invites", value: pendingInvites, series: generateTimeSeries(20, 3, 1), trend: 0, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active integrations", value: "9", series: generateTimeSeries(20, 9, 0), trend: 0, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "API keys", value: activeKeys, series: generateTimeSeries(20, 14, 2), trend: 1.2, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active alerts", value: alerts.filter((a) => !a.acknowledged).length, series: generateTimeSeries(20, 4, 2), trend: 0, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Open incidents", value: 3, series: generateTimeSeries(20, 3, 1), trend: -14, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Events / hour", value: "3.2k", series: generateTimeSeries(20, 3200, 400), trend: 2.8, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Uptime", value: "99.9%", series: generateTimeSeries(20, 99.9, 8e-3), trend: 0.01, status: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-3.5 w-3.5 text-primary" }),
              "Members"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              activeMembers,
              " active · ",
              pendingInvites,
              " pending"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/organizations", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Team" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: members.slice(0, 10).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-medium", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: m.email }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: m.role === "admin" ? "error" : m.role === "engineer" ? "info" : "success", children: m.role }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-[11px]", children: m.team }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: m.status === "active" ? "success" : m.status === "invited" ? "warning" : "error", children: m.status }) })
          ] }, m.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "h-3.5 w-3.5 text-primary" }),
              "API Keys"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              activeKeys,
              " active · ",
              apiKeys.filter((k) => k.status === "revoked").length,
              " revoked"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", className: "text-xs text-primary hover:underline", children: "Manage" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Prefix" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Req/24h" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Expires" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: apiKeys.slice(0, 10).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-medium", children: k.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: [
              k.prefix,
              "…"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: k.status === "active" ? "success" : "error", children: k.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] tabular-nums", children: k.requests24h }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: k.expiresAt ? formatDistanceToNow(new Date(k.expiresAt), { addSuffix: true }) : "Never" })
          ] }, k.id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 text-warning" }),
            "Active Alerts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            alerts.filter((a) => !a.acknowledged).length,
            " unacknowledged"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alerts", className: "text-xs text-primary hover:underline", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 p-4", children: alerts.slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning", children: a.severity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: a.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[10px] text-muted-foreground", children: [
          a.service,
          " · ",
          a.source
        ] })
      ] }, a.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: inviteOpen, onOpenChange: setInviteOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Invite team member" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Send an invitation to join your workspace." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Email address", value: inviteEmail, onChange: (e) => setInviteEmail(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { className: "w-full rounded-md border border-border bg-background px-3 py-2 text-sm", value: inviteRole, onChange: (e) => setInviteRole(e.target.value), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "engineer", children: "Engineer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "Viewer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "analyst", children: "Analyst" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", onClick: () => {
          setInviteOpen(false);
          setInviteEmail("");
        }, children: "Send invitation" })
      ] })
    ] }) })
  ] });
}
const SEV_TONE$1 = {
  sev1: "critical",
  sev2: "error",
  sev3: "warning",
  sev4: "info"
};
const STATUS_TONE$2 = {
  investigating: "warning",
  identified: "info",
  monitoring: "info",
  resolved: "success"
};
const DEPLOY_TONE = {
  succeeded: "success",
  failed: "error",
  rolled_back: "warning",
  in_progress: "info"
};
function SREDashboard() {
  const incidents = reactExports.useMemo(() => generateIncidents(), []);
  const deployments = reactExports.useMemo(() => generateDeployments(10), []);
  const slos = reactExports.useMemo(() => generateSLOs(), []);
  const openIncidents = incidents.filter((i) => i.status !== "resolved").length;
  const sev1Incidents = incidents.filter((i) => i.severity === "sev1" && i.status !== "resolved").length;
  const avgErrorBudget = slos.length ? +(slos.reduce((a, s) => a + s.budgetRemaining, 0) / slos.length).toFixed(1) : 100;
  const deploys24h = deployments.filter((d) => d.status !== "in_progress").length;
  const atRiskSLOs = slos.filter((s) => s.status === "at_risk").length;
  const breachedSLOs = slos.filter((s) => s.status === "breached").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Reliability Cockpit",
        description: "Incidents, on-call rotations, deployment posture and infrastructure health.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/incidents", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3 w-3" }),
            "Declare Incident"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deployments", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3 w-3" }),
            "Deployments"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Open incidents", value: openIncidents, series: generateTimeSeries(20, 3, 1), trend: -14.2, trendInverted: true, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "SEV1 incidents", value: sev1Incidents, series: generateTimeSeries(20, 1, 0), trend: 0, status: sev1Incidents > 0 ? "critical" : "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error budget", value: `${avgErrorBudget}%`, series: generateTimeSeries(20, 82, 5), trend: -2.1, trendInverted: true, status: avgErrorBudget < 50 ? "error" : "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Deploys 24h", value: deploys24h, series: generateTimeSeries(20, 14, 3), trend: 8.4, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "MTTR (7d)", value: "18m", series: generateTimeSeries(20, 18, 6), trend: -5.2, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "At-risk SLOs", value: atRiskSLOs, series: generateTimeSeries(20, 2, 1), trend: 0, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Breached SLOs", value: breachedSLOs, series: generateTimeSeries(20, 0, 0), trend: 0, status: breachedSLOs > 0 ? "error" : "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Uptime", value: "99.992%", series: generateTimeSeries(20, 99.992, 8e-3), trend: 0.01, status: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-3.5 w-3.5 text-destructive" }),
              "Active Incidents"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              openIncidents,
              " open"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/incidents", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Severity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Opened" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: incidents.filter((i) => i.status !== "resolved").slice(0, 8).map((inc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: SEV_TONE$1[inc.severity] ?? "info", children: inc.severity }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-medium", children: inc.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE$2[inc.status] ?? "info", children: inc.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: formatDistanceToNow(new Date(inc.openedAt), { addSuffix: true }) })
          ] }, inc.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3.5 w-3.5 text-primary" }),
              "Recent Deployments"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              deployments.length,
              " recent"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/deployments", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[340px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Version" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Env" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "When" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: deployments.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: d.service }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: d.version }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: d.environment === "prod" ? "error" : d.environment === "staging" ? "warning" : "info", children: d.environment }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: DEPLOY_TONE[d.status] ?? "info", children: d.status.replace("_", " ") }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: formatDistanceToNow(new Date(d.startedAt), { addSuffix: true }) })
          ] }, d.id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 text-warning" }),
            "SLO Error Budgets"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            slos.length,
            " SLOs"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/slos", className: "text-xs text-primary hover:underline", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4", children: slos.slice(0, 6).map((slo) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: slo.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: slo.status === "healthy" ? "success" : slo.status === "at_risk" ? "warning" : "error", children: slo.status.replace("_", " ") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 font-mono text-[10px] text-muted-foreground", children: slo.service }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all", slo.budgetRemaining > 50 ? "bg-success" : slo.budgetRemaining > 20 ? "bg-warning" : "bg-destructive"), style: { width: `${slo.budgetRemaining}%` } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Budget: ",
            slo.budgetRemaining,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Burn rate: ",
            slo.burnRate,
            "x"
          ] })
        ] })
      ] }, slo.id)) })
    ] }) })
  ] });
}
const STATUS_TONE$1 = {
  success: "success",
  failed: "error",
  retrying: "warning",
  queued: "info",
  processing: "info"
};
function DeveloperDashboard() {
  const services = reactExports.useMemo(() => generateServices(), []);
  const incidents = reactExports.useMemo(() => generateIncidents(), []);
  const events = reactExports.useMemo(() => generateEvents(20), []);
  const throughput = reactExports.useMemo(() => generateThroughputSeries(40), []);
  const latency = reactExports.useMemo(() => generateLatencySeries(40), []);
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  const serviceCount = services.length;
  const openIssues = incidents.filter((i) => i.status === "investigating").length;
  const avgP95 = services.length ? Math.round(services.reduce((a, s) => a + s.p95Ms, 0) / services.length) : 0;
  const avgErrorRate = services.length ? +(services.reduce((a, s) => a + s.errorRate, 0) / services.length).toFixed(2) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Engineering Workspace",
        description: "Traces, logs, queues and the services you own. Jump straight into debugging.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/traces", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "h-3 w-3" }),
            "Traces"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/logs", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3" }),
            "Logs"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Your services", value: serviceCount, series: generateTimeSeries(20, 6, 1), trend: 0, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Open issues", value: openIssues, series: generateTimeSeries(20, 2, 1), trend: -12, trendInverted: true, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "p95 latency", value: `${avgP95}ms`, series: generateTimeSeries(20, 142, 20), trend: -3.1, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error rate", value: `${avgErrorRate}%`, series: generateTimeSeries(20, 1.24, 0.4), trend: -8.2, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Events / sec", value: "847", series: generateTimeSeries(20, 847, 80), trend: 4.2, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Queue lag", value: "412ms", series: generateTimeSeries(20, 412, 100), trend: 9.8, trendInverted: true, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active workers", value: "92", series: generateTimeSeries(20, 92, 8), trend: 1.2, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Success rate", value: "98.76%", series: generateTimeSeries(20, 98.76, 0.4), trend: 0.3, status: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Event throughput", description: "Successful vs failed events per minute", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: throughput, margin: { top: 4, right: 8, left: -16, bottom: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dev-g-success", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-success)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-success)", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "dev-g-failed", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-destructive)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-destructive)", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: "var(--color-muted-foreground)", fontSize: 10 }, tickLine: false, axisLine: false, interval: 6 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fill: "var(--color-muted-foreground)", fontSize: 10 }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle$2, cursor: { stroke: "var(--color-border)" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "success", stroke: "var(--color-success)", strokeWidth: 1.5, fill: "url(#dev-g-success)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "failed", stroke: "var(--color-destructive)", strokeWidth: 1.5, fill: "url(#dev-g-failed)" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "API latency", description: "p50 / p95 / p99 (ms)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: latency, margin: { top: 4, right: 8, left: -16, bottom: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: { fill: "var(--color-muted-foreground)", fontSize: 10 }, tickLine: false, axisLine: false, interval: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: { fill: "var(--color-muted-foreground)", fontSize: 10 }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle$2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p50", stroke: "var(--color-chart-2)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p95", stroke: "var(--color-chart-1)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p99", stroke: "var(--color-chart-4)", strokeWidth: 1.5, dot: false })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5 text-primary" }),
              "Service Health"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              services.length,
              " services"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "p95" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Err%" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: s.status === "healthy" ? "success" : s.status === "degraded" ? "warning" : "error", children: s.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-1.5 font-mono text-[11px] tabular-nums", children: [
              s.p95Ms,
              "ms"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-1.5 font-mono text-[11px] tabular-nums", children: [
              s.errorRate,
              "%"
            ] })
          ] }, s.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: "Recent Events" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            events.length,
            " events"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Latency" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: events.slice(0, 15).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", onClick: () => setSelectedEvent(e), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: format(new Date(e.timestamp), "HH:mm:ss") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: e.eventType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE$1[e.status] ?? "info", children: e.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning"), children: [
              e.latencyMs,
              "ms"
            ] })
          ] }, e.id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedEvent, onOpenChange: (o) => !o && setSelectedEvent(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl", children: selectedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-mono text-sm", children: [
          selectedEvent.eventType,
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE$1[selectedEvent.status] ?? "info", children: selectedEvent.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "font-mono text-[11px]", children: [
          "id: ",
          selectedEvent.id,
          " · ",
          formatDistanceToNow(new Date(selectedEvent.timestamp), { addSuffix: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "payload", className: "mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payload", className: "text-xs", children: "Payload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "context", className: "text-xs", children: "Context" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payload", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-xs", children: JSON.stringify(selectedEvent.payload, null, 2) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "context", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-xs", children: JSON.stringify({ queue: selectedEvent.queue, worker: selectedEvent.worker, retries: selectedEvent.retries, latencyMs: selectedEvent.latencyMs }, null, 2) }) })
      ] })
    ] }) }) })
  ] });
}
const tooltipStyle$2 = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 8px"
};
const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];
function ViewerDashboard() {
  const services = reactExports.useMemo(() => generateServices(), []);
  const alerts = reactExports.useMemo(() => generateAlerts(6), []);
  const mlInsights = reactExports.useMemo(() => generateMLInsights(), []);
  const healthyServices = services.filter((s) => s.status === "healthy").length;
  const totalServices = services.length;
  const uptime = totalServices ? +(services.reduce((a, s) => a + s.uptimePct, 0) / totalServices).toFixed(3) : 99.9;
  const activeAlerts = alerts.filter((a) => !a.acknowledged).length;
  const eventsPerSec = services.reduce((a, s) => a + s.rps, 0);
  const serviceDist = reactExports.useMemo(
    () => services.reduce((acc, s) => {
      const existing = acc.find((a) => a.name === s.status);
      if (existing) existing.value++;
      else acc.push({ name: s.status, value: 1 });
      return acc;
    }, []),
    [services]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PageHeader,
      {
        title: "Read-only Dashboard",
        description: "Live overview of platform health. You can browse but not modify configuration.",
        actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3 w-3" }),
            "Services"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alerts", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3 w-3" }),
            "Alerts"
          ] }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "System uptime", value: `${uptime}%`, series: generateTimeSeries(20, 99.9, 8e-3), trend: 0.01, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Healthy services", value: `${healthyServices}/${totalServices}`, series: generateTimeSeries(20, 30, 2), trend: 0.5, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active alerts", value: activeAlerts, series: generateTimeSeries(20, 4, 2), trend: 0, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Events / sec", value: eventsPerSec, series: generateTimeSeries(20, 847, 80), trend: 4.2, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "API latency p95", value: "142ms", series: generateTimeSeries(20, 142, 20), trend: -3.1, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error rate", value: `${(100 - uptime).toFixed(2)}%`, series: generateTimeSeries(20, 1.24, 0.4), trend: -8, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "ML Models", value: "6", series: generateTimeSeries(20, 6, 0), trend: 0, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Anomalies 24h", value: mlInsights.filter((m) => m.type === "anomaly").length, series: generateTimeSeries(20, 2, 1), trend: 0, status: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Service distribution", description: "By health status", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: serviceDist, dataKey: "value", nameKey: "name", innerRadius: 36, outerRadius: 62, paddingAngle: 2, children: serviceDist.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length], stroke: "var(--color-card)" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle$1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: 10, color: "var(--color-muted-foreground)" }, iconSize: 8 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 rounded-lg border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
              "ML Insights"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              mlInsights.length,
              " insights"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/mlops", className: "text-xs text-primary hover:underline", children: "View all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-[300px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Type" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Confidence" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: mlInsights.slice(0, 10).map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: m.type === "anomaly" ? "warning" : m.type === "prediction" ? "info" : "success", children: m.type }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-medium", children: m.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: m.service }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-1.5 font-mono text-[11px] tabular-nums", children: [
              m.confidence,
              "%"
            ] })
          ] }, m.id)) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold tracking-tight flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5 text-warning" }),
            "Active Alerts"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            activeAlerts,
            " unacknowledged"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/alerts", className: "text-xs text-primary hover:underline", children: "View all" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 p-4", children: alerts.slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning", children: a.severity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[11px] text-muted-foreground", children: a.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[10px] text-muted-foreground", children: [
          a.service,
          " · ",
          a.source
        ] })
      ] }, a.id)) })
    ] }) })
  ] });
}
const tooltipStyle$1 = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 8px"
};
const TYPE_CONFIG = {
  deploy: { icon: Rocket, tone: "info", label: "Deploy" },
  alert: { icon: TriangleAlert, tone: "warning", label: "Alert" },
  incident: { icon: OctagonAlert, tone: "critical", label: "Incident" },
  queue_spike: { icon: Layers, tone: "error", label: "Queue Spike" },
  worker_restart: { icon: Cpu, tone: "warning", label: "Worker Restart" },
  config_change: { icon: Settings, tone: "info", label: "Config Change" },
  slo_breach: { icon: ShieldCheck, tone: "error", label: "SLO Breach" },
  ai_anomaly: { icon: Sparkles, tone: "warning", label: "AI Anomaly" }
};
const ALL_TYPES = [
  "deploy",
  "alert",
  "incident",
  "queue_spike",
  "worker_restart",
  "config_change",
  "slo_breach",
  "ai_anomaly"
];
function UnifiedTimeline({
  events,
  title,
  description,
  compact = false,
  maxVisible = 20
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [typeFilter, setTypeFilter] = reactExports.useState(new Set(ALL_TYPES));
  const [showFilters, setShowFilters] = reactExports.useState(false);
  const inspect = useInspector((s) => s.inspect);
  const filtered = reactExports.useMemo(
    () => events.filter((e) => typeFilter.has(e.type)),
    [events, typeFilter]
  );
  const visible = expanded ? filtered : filtered.slice(0, maxVisible);
  const hidden = filtered.length - visible.length;
  const toggleType = (t) => {
    setTypeFilter((cur) => {
      const next = new Set(cur);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };
  const handleClick = (e) => {
    inspect({
      kind: mapKind(e.type),
      id: e.id,
      title: e.title,
      subtitle: e.description,
      data: { type: e.type, service: e.service, severity: e.severity },
      service: e.service
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
    (title || description) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        title && /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "h-7 gap-1 text-xs",
          onClick: () => setShowFilters(!showFilters),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ListFilter, { className: "h-3 w-3" }),
            " Filter"
          ]
        }
      )
    ] }),
    showFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 px-4 py-2", children: [
      ALL_TYPES.map((t) => {
        const cfg = TYPE_CONFIG[t];
        const active = typeFilter.has(t);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => toggleType(t),
            className: cn(
              "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase transition-colors",
              active ? "border-border bg-card text-foreground" : "border-border/40 bg-transparent text-muted-foreground/40"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(cfg.icon, { className: "h-3 w-3" }),
              cfg.label
            ]
          },
          t
        );
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setTypeFilter(new Set(ALL_TYPES)),
          className: "ml-1 font-mono text-[10px] text-muted-foreground hover:text-foreground",
          children: "Reset"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", !compact && "p-2"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[19px] top-0 bottom-0 w-px bg-border" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-0", children: visible.map((e) => {
        const cfg = TYPE_CONFIG[e.type];
        const Icon = cfg.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleClick(e),
            className: "group relative flex w-full items-start gap-3 px-2 py-2 text-left transition-colors hover:bg-accent/40 rounded-md",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn(
                "h-3.5 w-3.5",
                cfg.tone === "critical" ? "text-destructive" : cfg.tone === "error" ? "text-destructive" : cfg.tone === "warning" ? "text-warning" : cfg.tone === "success" ? "text-success" : "text-info"
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: cfg.tone, dot: false, children: cfg.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: e.title })
                ] }),
                !compact && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: e.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow$1(e.timestamp) }),
                  e.service && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: e.service })
                  ] }),
                  e.severity && e.severity !== "info" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(
                      e.severity === "critical" ? "text-destructive" : e.severity === "error" ? "text-destructive" : "text-warning"
                    ), children: e.severity })
                  ] })
                ] })
              ] })
            ]
          },
          e.id
        );
      }) }),
      hidden > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setExpanded(!expanded),
          className: "mt-1 flex w-full items-center justify-center gap-1 py-2 text-xs text-muted-foreground hover:text-foreground",
          children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }),
            " Show less"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }),
            " ",
            hidden,
            " more events"
          ] })
        }
      ),
      filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-6 text-center text-xs text-muted-foreground", children: "No events match current filters." })
    ] })
  ] });
}
function mapKind(t) {
  switch (t) {
    case "deploy":
      return "deployment";
    case "alert":
      return "alert";
    case "incident":
      return "incident";
    default:
      return "event";
  }
}
const STATUS_TONE = {
  success: "success",
  failed: "error",
  retrying: "warning",
  queued: "info",
  processing: "info"
};
const SEV_TONE = {
  info: "info",
  warning: "warning",
  error: "error",
  critical: "critical"
};
function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role;
  if (!user) return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/login" });
  if (role === "super_admin") return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminDashboard, {})
  ] });
  if (role === "admin") return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDashboard, {})
  ] });
  if (role === "sre") return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SREDashboard, {})
  ] });
  if (role === "developer") return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DeveloperDashboard, {})
  ] });
  if (role === "viewer") return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ViewerDashboard, {})
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewDashboard, {});
}
function OverviewDashboard() {
  const initialEvents = reactExports.useMemo(() => generateEvents(40), []);
  const [events, setEvents] = reactExports.useState(initialEvents);
  const [alerts, setAlerts] = reactExports.useState(reactExports.useMemo(() => generateAlerts(6), []));
  const workers = reactExports.useMemo(() => generateWorkers(), []);
  const queues = reactExports.useMemo(() => generateQueues(), []);
  const throughput = reactExports.useMemo(() => generateThroughputSeries(40), []);
  const latency = reactExports.useMemo(() => generateLatencySeries(40), []);
  const queueLag = reactExports.useMemo(() => generateQueueLagSeries(40), []);
  const eventDist = reactExports.useMemo(() => generateEventDistribution(), []);
  const sparkA = reactExports.useMemo(() => generateTimeSeries(20, 800, 80), []);
  const sparkB = reactExports.useMemo(() => generateTimeSeries(20, 40, 12), []);
  const sparkC = reactExports.useMemo(() => generateTimeSeries(20, 450, 100), []);
  const sparkD = reactExports.useMemo(() => generateTimeSeries(20, 92, 8), []);
  const sparkE = reactExports.useMemo(() => generateTimeSeries(20, 1.2, 0.6), []);
  const sparkF = reactExports.useMemo(() => generateTimeSeries(20, 99.4, 0.4), []);
  const sparkG = reactExports.useMemo(() => generateTimeSeries(20, 1240, 200), []);
  const sparkH = reactExports.useMemo(() => generateTimeSeries(20, 8, 1), []);
  const timelineEvents = reactExports.useMemo(() => generateTimelineEvents(40), []);
  const [selectedEvent, setSelectedEvent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const id = setInterval(() => {
      const [next] = generateEvents(1);
      setEvents((prev) => [{
        ...next,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }, ...prev].slice(0, 50));
    }, 2500);
    return () => clearInterval(id);
  }, []);
  const ackAlert = (id) => setAlerts((prev) => prev.map((a) => a.id === id ? {
    ...a,
    acknowledged: true
  } : a));
  const COLORS2 = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleDashboardHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Overview", description: "Realtime health across events, queues, workers and ML.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListFilter, { className: "h-3 w-3" }),
        "Filter"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
        "Refresh"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
        "Export"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Events / sec", value: "847", series: sparkA, trend: 4.2, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "API latency p95", value: "142", unit: "ms", series: sparkB, trend: -3.1, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Queue lag", value: "412", unit: "ms", series: sparkC, trend: 9.8, trendInverted: true, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active workers", value: "92", series: sparkD, trend: 1.2, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error rate", value: "1.24", unit: "%", series: sparkE, trend: -12.4, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Success rate", value: "98.76", unit: "%", series: sparkF, trend: 0.3, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active users", value: "12.4k", series: sparkG, trend: 6.7, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "System uptime", value: "99.992", unit: "%", series: sparkH, trend: 0.01, status: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { className: "lg:col-span-2", title: "Event throughput", description: "Successful vs failed events per minute", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: throughput, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g-success", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-success)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-success)", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g-failed", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-destructive)", stopOpacity: 0.35 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-destructive)", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false, interval: 6 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle, cursor: {
          stroke: "var(--color-border)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "success", stroke: "var(--color-success)", strokeWidth: 1.5, fill: "url(#g-success)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "failed", stroke: "var(--color-destructive)", strokeWidth: 1.5, fill: "url(#g-failed)" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "API latency", description: "p50 / p95 / p99 (ms)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-56", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: latency, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false, interval: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p50", stroke: "var(--color-chart-2)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p95", stroke: "var(--color-chart-1)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p99", stroke: "var(--color-chart-4)", strokeWidth: 1.5, dot: false })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Queue lag", description: "Average lag (ms)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: queueLag, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "g-lag", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-warning)", stopOpacity: 0.35 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-warning)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false, interval: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "lag", stroke: "var(--color-warning)", strokeWidth: 1.5, fill: "url(#g-lag)" })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Event distribution", description: "By event type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: eventDist, dataKey: "value", nameKey: "name", innerRadius: 36, outerRadius: 62, paddingAngle: 2, children: eventDist.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS2[i % COLORS2.length], stroke: "var(--color-card)" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: {
          fontSize: 10,
          color: "var(--color-muted-foreground)"
        }, iconSize: 8 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Worker performance", description: "Jobs / min per worker", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: workers.map((w) => ({
        name: w.name.replace("worker-", ""),
        jobs: Math.round(w.jobsProcessed / 1e3)
      })), margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 9
        }, tickLine: false, axisLine: false, interval: 0, angle: -20, textAnchor: "end", height: 40 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
          fill: "var(--color-muted-foreground)",
          fontSize: 10
        }, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle, cursor: {
          fill: "var(--color-accent)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "jobs", fill: "var(--color-primary)", radius: [2, 2, 0, 0] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card lg:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-4 py-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: "Realtime event stream" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Updates every 2.5s · ",
              events.length,
              " events buffered"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "success", children: "live" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thin-scrollbar max-h-[460px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Time" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Event" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Org" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Queue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Worker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Latency" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Retries" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 w-8" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: events.slice(0, 30).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", onClick: () => setSelectedEvent(e), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: format(new Date(e.timestamp), "HH:mm:ss") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: e.eventType }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-[11px]", children: e.organization }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[e.status], children: e.status }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: e.queue }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: e.worker.replace("worker-", "") }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning"), children: [
              e.latencyMs,
              "ms"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-right font-mono text-[11px] tabular-nums", children: e.retries }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }) })
          ] }, e.id)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UnifiedTimeline, { events: timelineEvents, title: "Unified timeline", description: "Deploys, alerts, incidents, SLO breaches — in chronological order", compact: true, maxVisible: 12 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold tracking-tight", children: "Active alerts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              alerts.filter((a) => !a.acknowledged).length,
              " unacknowledged"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 p-3", children: alerts.slice(0, 4).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCard, { alert: a, onAck: ackAlert }, a.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 py-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Queues" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            queues.length,
            " active"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: queues.slice(0, 4).map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(QueueCard, { queue: q }, q.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Workers" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            workers.filter((w) => w.status === "online").length,
            "/",
            workers.length,
            " online"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2", children: workers.slice(0, 4).map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCard, { worker: w }, w.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selectedEvent, onOpenChange: (o) => !o && setSelectedEvent(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-2xl", children: selectedEvent && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-mono text-sm", children: [
          selectedEvent.eventType,
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[selectedEvent.status], children: selectedEvent.status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: SEV_TONE[selectedEvent.severity], children: selectedEvent.severity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "font-mono text-[11px]", children: [
          "id: ",
          selectedEvent.id,
          " · ",
          formatDistanceToNow(new Date(selectedEvent.timestamp), {
            addSuffix: true
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "payload", className: "mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payload", className: "text-xs", children: "Payload" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timeline", className: "text-xs", children: "Timeline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "context", className: "text-xs", children: "Context" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payload", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: selectedEvent.payload }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 text-xs", children: [["ingested", "0ms", "api-gateway"], ["enqueued", "4ms", selectedEvent.queue], ["picked up", "18ms", selectedEvent.worker], ["processed", `${selectedEvent.latencyMs}ms`, selectedEvent.worker]].map(([k, t, src]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium", children: k }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: src }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] tabular-nums", children: t })
        ] }, k)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "context", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: {
          org: selectedEvent.organization,
          queue: selectedEvent.queue,
          worker: selectedEvent.worker,
          retries: selectedEvent.retries,
          latencyMs: selectedEvent.latencyMs
        } }) })
      ] })
    ] }) }) })
  ] });
}
const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 8px"
};
export {
  DashboardPage as component
};
