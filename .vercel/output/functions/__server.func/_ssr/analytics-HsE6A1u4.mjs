import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { C as ChartCard } from "./chart-card-DCecWeLK.mjs";
import { M as MetricCard } from "./metric-card-DIhW495_.mjs";
import { Q as generateThroughputSeries, E as generateLatencySeries, K as generateQueueLagSeries, z as generateEventDistribution, I as generateOrganizations, Y as generateWorkers, U as generateTimeSeries } from "./router-F21aWjaR.mjs";
import "../_libs/sonner.mjs";
import { a as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, A as Area, e as LineChart, L as Legend, d as Line, f as PieChart, P as Pie, c as Cell, b as BarChart, B as Bar, R as ResponsiveContainer } from "../_libs/recharts.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
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
function AnalyticsPage() {
  const throughput = reactExports.useMemo(() => generateThroughputSeries(80), []);
  const latency = reactExports.useMemo(() => generateLatencySeries(80), []);
  const lag = reactExports.useMemo(() => generateQueueLagSeries(80), []);
  const dist = reactExports.useMemo(() => generateEventDistribution(), []);
  const orgs = reactExports.useMemo(() => generateOrganizations(), []);
  const workers = reactExports.useMemo(() => generateWorkers(), []);
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 100, 20), []);
  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Analytics", description: "Throughput, latency and distribution across the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Total events (24h)", value: "14.3M", series: spark, trend: 6.2, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Avg latency", value: "84", unit: "ms", series: spark, trend: -2.4, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Peak RPS", value: "2,421", series: spark, trend: 11.2, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "SLA compliance", value: "99.94", unit: "%", series: spark, trend: 0.05, status: "success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Throughput", description: "Events / minute", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: throughput, margin: chartMargin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "a1", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-success)", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-success)", stopOpacity: 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "a2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-destructive)", stopOpacity: 0.3 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-destructive)", stopOpacity: 0 })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: axisTick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "success", stroke: "var(--color-success)", fill: "url(#a1)", strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "failed", stroke: "var(--color-destructive)", fill: "url(#a2)", strokeWidth: 1.5 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Latency percentiles", description: "p50 / p95 / p99", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: latency, margin: chartMargin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: axisTick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: legendStyle, iconSize: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p50", stroke: "var(--color-chart-2)", dot: false, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p95", stroke: "var(--color-chart-1)", dot: false, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p99", stroke: "var(--color-chart-4)", dot: false, strokeWidth: 1.5 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Queue lag trend", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: lag, margin: chartMargin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lag2", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-warning)", stopOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-warning)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: axisTick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "lag", stroke: "var(--color-warning)", fill: "url(#lag2)", strokeWidth: 1.5 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Event distribution", description: "Share by event type", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: dist, dataKey: "value", nameKey: "name", innerRadius: 50, outerRadius: 80, paddingAngle: 2, children: dist.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i % COLORS.length], stroke: "var(--color-card)" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: legendStyle, iconSize: 8 })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Top organizations", description: "By event volume", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: orgs.map((o, i) => ({
        name: o.slug,
        events: 2e5 - i * 28e3 + Math.round(Math.random() * 2e4)
      })), margin: chartMargin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle, cursor: {
          fill: "var(--color-accent)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "events", fill: "var(--color-primary)", radius: [2, 2, 0, 0] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Worker throughput", description: "Jobs processed (k)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Chart, { h: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: workers.map((w) => ({
        name: w.name.replace("worker-", ""),
        jobs: Math.round(w.jobsProcessed / 1e3)
      })), margin: chartMargin, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "name", tick: {
          ...axisTick,
          fontSize: 9
        }, tickLine: false, axisLine: false, angle: -20, textAnchor: "end", height: 40, interval: 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: axisTick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: tooltipStyle, cursor: {
          fill: "var(--color-accent)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "jobs", fill: "var(--color-chart-2)", radius: [2, 2, 0, 0] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6" })
  ] });
}
const axisTick = {
  fill: "var(--color-muted-foreground)",
  fontSize: 10
};
const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11
};
const legendStyle = {
  fontSize: 10,
  color: "var(--color-muted-foreground)"
};
const chartMargin = {
  top: 4,
  right: 8,
  left: -16,
  bottom: 0
};
function Chart({
  children,
  h
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
    height: h
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children }) });
}
export {
  AnalyticsPage as component
};
