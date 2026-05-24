import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-CNgl2mVR.mjs";
import { M as MetricCard } from "./metric-card-BTip11pD.mjs";
import { C as ChartCard } from "./chart-card-Bju7-5ho.mjs";
import { K as generateApiEndpoints, Y as generateLatencySeries, a9 as generateTimeSeries, w as StatusBadge, C as cn } from "./router--DYUD3CX.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-CHdZL1im.mjs";
import "../_libs/sonner.mjs";
import { R as ResponsiveContainer, e as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Line, a as AreaChart, A as Area } from "../_libs/recharts.mjs";
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
const METHOD_TONE = {
  GET: "info",
  POST: "success",
  PUT: "warning",
  DELETE: "error",
  PATCH: "warning"
};
function ApiPage() {
  const endpoints = reactExports.useMemo(() => generateApiEndpoints(), []);
  const latency = reactExports.useMemo(() => generateLatencySeries(60), []);
  const rps = reactExports.useMemo(() => generateTimeSeries(60, 1400, 320), []);
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 80, 12), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "API Monitoring", description: "Endpoint-level latency, throughput and errors." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Requests / sec", value: "1,424", series: spark, trend: 3.4, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "p95 latency", value: "142", unit: "ms", series: spark, trend: -2.1, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error rate", value: "0.84", unit: "%", series: spark, trend: -1.2, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Endpoints", value: endpoints.length.toString(), series: spark, trend: 0, status: "info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Latency (ms)", description: "p50 / p95 / p99", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: latency, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p50", stroke: "var(--color-chart-2)", dot: false, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p95", stroke: "var(--color-chart-1)", dot: false, strokeWidth: 1.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "p99", stroke: "var(--color-chart-4)", dot: false, strokeWidth: 1.5 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Throughput", description: "Requests / sec", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: rps, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "rps", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-primary)", stopOpacity: 0.35 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-primary)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "value", stroke: "var(--color-primary)", fill: "url(#rps)", strokeWidth: 1.5 })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: "Endpoints" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Sorted by request volume" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Path" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "RPS" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "p50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "p95" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "p99" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Error %" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: endpoints.sort((a, b) => b.rps - a.rps).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs hover:bg-accent/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: METHOD_TONE[e.method], dot: false, children: e.method }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: e.path }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-right font-mono tabular-nums", children: e.rps.toLocaleString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-1.5 text-right font-mono tabular-nums", children: [
            e.p50,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono tabular-nums", e.p95 > 250 && "text-warning"), children: [
            e.p95,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono tabular-nums", e.p99 > 600 && "text-destructive"), children: [
            e.p99,
            "ms"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono tabular-nums", e.errorRate > 1.5 && "text-destructive"), children: [
            e.errorRate,
            "%"
          ] })
        ] }, e.method + e.path)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Request trace (preview)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "thin-scrollbar max-h-56 overflow-auto rounded-md bg-background p-3 font-mono text-[11px] leading-relaxed text-foreground/80", children: `trace_id=4d2f9b... POST /api/v1/events  201  84ms
  ├─ api-gateway        2ms   auth.verify
  ├─ events-ingest     12ms   schema.validate
  ├─ queue-processor    4ms   enqueue events.high
  └─ worker-us-east-1a 66ms   handler.run` }) }) })
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
  ApiPage as component
};
