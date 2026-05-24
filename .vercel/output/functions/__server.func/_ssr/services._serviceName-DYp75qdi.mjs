import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { s as Route$1, a8 as generateServices, a6 as generateSLOs, U as generateDeployments, ae as generateTraces, M as generateAlerts, _ as generateLatencySeries, aa as generateThroughputSeries, ab as generateTimeSeries, ai as useInspector, G as formatDistanceToNow, y as StatusBadge, H as formatNumber, J as JSONViewer, F as cn } from "./router-BB8e-L7y.mjs";
import { M as MetricCard } from "./metric-card-DSdZbkSX.mjs";
import { C as ChartCard } from "./chart-card-B0xbHfdw.mjs";
import "../_libs/sonner.mjs";
import { A as Activity, x as Globe, j as ChevronLeft, L as Layers, G as GitBranch, a8 as TriangleAlert, ac as Workflow, e as Boxes, a2 as ShieldCheck, d as ArrowUpRight, a as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, e as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Line, a as AreaChart, A as Area } from "../_libs/recharts.mjs";
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
const statusTone = (s) => s === "healthy" ? "success" : s === "degraded" ? "warning" : "error";
const sloTone = (s) => s === "healthy" ? "success" : s === "at_risk" ? "warning" : "error";
function ServiceDetailPage() {
  const {
    serviceName
  } = Route$1.useParams();
  const services = reactExports.useMemo(() => generateServices(), []);
  const service = reactExports.useMemo(() => services.find((s) => s.name === serviceName) ?? services[0], [services, serviceName]);
  const slos = reactExports.useMemo(() => generateSLOs().filter((s) => s.service === service.name), [service.name]);
  const deploys = reactExports.useMemo(() => generateDeployments(12).filter((d) => d.service === service.name), [service.name]);
  const traces = reactExports.useMemo(() => generateTraces(20).filter((t) => t.rootService === service.name || t.services.includes(service.name)), [service.name]);
  const alerts = reactExports.useMemo(() => generateAlerts(8).filter((a) => a.service === service.name), [service.name]);
  const latency = reactExports.useMemo(() => generateLatencySeries(60), []);
  const throughput = reactExports.useMemo(() => generateThroughputSeries(40), []);
  const errorSeries = reactExports.useMemo(() => generateTimeSeries(60, service.errorRate, 0.4), [service.errorRate]);
  const cpuSeries = reactExports.useMemo(() => generateTimeSeries(60, service.cpu, 6), [service.cpu]);
  const memSeries = reactExports.useMemo(() => generateTimeSeries(60, service.memory, 5), [service.memory]);
  const sparkLatency = reactExports.useMemo(() => generateTimeSeries(20, service.p95Ms, 20), [service.p95Ms]);
  const sparkRps = reactExports.useMemo(() => generateTimeSeries(20, service.rps, 100), [service.rps]);
  const sparkErr = reactExports.useMemo(() => generateTimeSeries(20, service.errorRate, 0.3), [service.errorRate]);
  const sparkUptime = reactExports.useMemo(() => generateTimeSeries(20, service.uptimePct, 0.02), [service.uptimePct]);
  const inspect = useInspector((s) => s.inspect);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: service.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: statusTone(service.status), children: service.status })
    ] }), description: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2 font-mono text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: service.version }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
        " ",
        service.region
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "·" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "deployed ",
        formatDistanceToNow(service.lastDeploy)
      ] })
    ] }), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => inspect({
      kind: "event",
      id: service.id,
      title: service.name,
      subtitle: `${service.status} · ${service.rps} rps`,
      data: {
        status: service.status,
        rps: service.rps,
        p95Ms: service.p95Ms,
        errorRate: service.errorRate,
        cpu: service.cpu,
        memory: service.memory,
        version: service.version,
        region: service.region
      },
      service: service.name
    }), className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5" }),
      " Inspect"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "RPS", value: formatNumber(service.rps), series: sparkRps, trend: 4.2, status: "info", variant: "area" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "p95 Latency", value: `${service.p95Ms}`, unit: "ms", series: sparkLatency, trend: -2.1, trendInverted: true, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error rate", value: `${service.errorRate}`, unit: "%", series: sparkErr, trend: -8.4, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Uptime", value: `${service.uptimePct}`, unit: "%", series: sparkUptime, trend: 0.01, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "CPU", value: `${service.cpu}`, unit: "%", series: cpuSeries.slice(0, 20), trend: 1.2, status: service.cpu > 80 ? "warning" : "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Memory", value: `${service.memory}`, unit: "%", series: memSeries.slice(0, 20), trend: 0.8, status: service.memory > 80 ? "warning" : "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Deploys (7d)", value: deploys.length.toString(), series: sparkRps, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Active alerts", value: alerts.filter((a) => !a.acknowledged).length.toString(), series: sparkErr, status: alerts.some((a) => a.severity === "critical") ? "error" : "warning" })
    ] }),
    slos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold", children: "SLOs & Error Budget" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 lg:grid-cols-2", children: slos.map((slo) => /* @__PURE__ */ jsxRuntimeExports.jsx(SLOCard, { slo }, slo.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-2 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { className: "lg:col-span-2", title: "Latency", description: "p50 / p95 / p99 (ms)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: latency, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p50", stroke: "var(--color-chart-2)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p95", stroke: "var(--color-chart-1)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "p99", stroke: "var(--color-chart-4)", strokeWidth: 1.5, dot: false })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Throughput", description: "Requests / minute", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-52", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: throughput, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "svc-thru", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.35 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "success", stroke: "var(--color-success)", fill: "url(#svc-thru)", strokeWidth: 1.5 })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Error rate", description: "% over time", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: errorSeries, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "svc-err", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-destructive)", stopOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-destructive)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "value", stroke: "var(--color-destructive)", fill: "url(#svc-err)", strokeWidth: 1.5 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Resource usage", description: "CPU and Memory %", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: cpuSeries.map((c, i) => ({
        label: c.label,
        cpu: c.value,
        memory: memSeries[i]?.value ?? 0
      })), margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false, domain: [0, 100] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "cpu", stroke: "var(--color-chart-1)", strokeWidth: 1.5, dot: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "memory", stroke: "var(--color-chart-3)", strokeWidth: 1.5, dot: false })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Dependencies", icon: Layers, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Depends on" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: service.dependsOn.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/$serviceName", params: {
          serviceName: d
        }, className: "rounded border border-border bg-background px-2 py-1 font-mono text-[11px] hover:bg-accent hover:text-foreground", children: d }, d)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Depended on by" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: services.filter((s) => s.dependsOn.includes(service.name)).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/$serviceName", params: {
          serviceName: s.name
        }, className: "rounded border border-border bg-background px-2 py-1 font-mono text-[11px] hover:bg-accent hover:text-foreground", children: s.name }, s.id)) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Recent deployments", icon: GitBranch, count: deploys.length, children: deploys.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No recent deploys" }) : deploys.slice(0, 6).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: d.version }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-mono text-[10px] text-muted-foreground", children: d.commit.slice(0, 7) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: d.environment }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning", dot: false, children: d.status.replace("_", " ") })
        ] })
      ] }, d.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Active alerts", icon: TriangleAlert, count: alerts.length, children: alerts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No active alerts" }) : alerts.slice(0, 6).map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: a.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning", dot: false, children: a.severity }),
          a.acknowledged && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "acked" })
        ] })
      ] }, a.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Recent traces", icon: Workflow, count: traces.length, children: traces.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No recent traces" }) : traces.slice(0, 8).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/traces/$traceId", params: {
        traceId: t.id
      }, className: "flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0 hover:text-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1 font-mono", children: t.rootOperation }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
            t.durationMs,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: t.status === "ok" ? "success" : t.status === "error" ? "error" : "warning", dot: false, children: t.status })
        ] })
      ] }, t.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Service info", icon: Boxes, children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: {
        name: service.name,
        status: service.status,
        version: service.version,
        region: service.region,
        rps: service.rps,
        p95Ms: service.p95Ms,
        errorRate: service.errorRate,
        cpu: service.cpu,
        memory: service.memory,
        uptimePct: service.uptimePct,
        lastDeploy: service.lastDeploy,
        dependsOn: service.dependsOn
      } }) })
    ] }) })
  ] });
}
function SLOCard({
  slo
}) {
  const budgetPct = slo.budgetRemaining;
  const budgetTone = budgetPct > 50 ? "success" : budgetPct > 20 ? "warning" : "error";
  const isBreached = slo.status === "breached";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-lg border bg-card p-4", isBreached ? "border-destructive/40" : "border-border"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: cn("h-4 w-4", isBreached ? "text-destructive" : "text-primary") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: slo.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: sloTone(slo.status), children: slo.status.replace("_", " ") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: [
        "Period: ",
        slo.period,
        " · Burn rate window: ",
        slo.burnRateWindow
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Budget left" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex items-center gap-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-lg font-semibold tabular-nums", budgetTone === "error" ? "text-destructive" : budgetTone === "warning" ? "text-warning" : "text-success"), children: [
          budgetPct,
          "%"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 overflow-hidden rounded bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded", budgetTone === "error" ? "bg-destructive" : budgetTone === "warning" ? "bg-warning" : "bg-success"), style: {
          width: `${Math.min(100, budgetPct)}%`
        } }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Burn rate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("text-lg font-semibold tabular-nums", slo.burnRate > 2 ? "text-destructive" : slo.burnRate > 1 ? "text-warning" : "text-foreground"), children: [
            slo.burnRate,
            "x"
          ] }),
          slo.burnRate > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: cn("h-3.5 w-3.5", slo.burnRate > 2 ? "text-destructive" : "text-warning") }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3.5 w-3.5 text-success" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: slo.slis.map((sli) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: sli.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 font-mono text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(sli.type === "error_rate" ? sli.current > sli.target ? "text-destructive" : "text-success" : sli.type === "latency" ? sli.current > sli.target ? "text-destructive" : "text-success" : sli.current < sli.target ? "text-destructive" : "text-success"), children: [
            sli.type === "availability" || sli.type === "throughput" ? sli.current : sli.current,
            sli.unit
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "/ ",
            sli.target,
            sli.unit
          ] })
        ] })
      ] }, sli.name)) })
    ] })
  ] });
}
function Section({
  title,
  icon: Icon,
  count,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 border-b border-border px-3 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium", children: title }),
      count !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
        "(",
        count,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children })
  ] });
}
const tick = {
  fill: "var(--color-muted-foreground)",
  fontSize: 10
};
const ttStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11
};
export {
  ServiceDetailPage as component
};
