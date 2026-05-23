import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { C as ChartCard } from "./chart-card-DCecWeLK.mjs";
import { Q as QueueCard } from "./queue-card-B2FKXX0a.mjs";
import { M as MetricCard } from "./metric-card-DIhW495_.mjs";
import { L as generateQueues, K as generateQueueLagSeries, U as generateTimeSeries, l as StatusBadge, D as Dialog, a as DialogContent, c as DialogHeader, d as DialogTitle, b as DialogDescription, J as JSONViewer } from "./router-F21aWjaR.mjs";
import "../_libs/sonner.mjs";
import { R as ResponsiveContainer, a as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, A as Area, e as LineChart, d as Line, b as BarChart, B as Bar } from "../_libs/recharts.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
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
function QueuesPage() {
  const queues = reactExports.useMemo(() => generateQueues(), []);
  const lag = reactExports.useMemo(() => generateQueueLagSeries(60), []);
  const tput = reactExports.useMemo(() => generateTimeSeries(60, 1200, 300), []);
  const retries = reactExports.useMemo(() => generateTimeSeries(60, 40, 20), []);
  const [selected, setSelected] = reactExports.useState(null);
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 100, 30), []);
  const totalMsgs = queues.reduce((a, q) => a + q.messages, 0);
  const totalDlq = queues.reduce((a, q) => a + q.dlq, 0);
  const totalThroughput = queues.reduce((a, q) => a + q.throughput, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Queue Monitoring", description: "Realtime visibility into every queue and DLQ." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Total queues", value: queues.length.toString(), series: spark, trend: 0, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Messages in flight", value: totalMsgs.toLocaleString(), series: spark, trend: 3.4, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Throughput", value: `${totalThroughput.toLocaleString()}/s`, series: spark, trend: 5.1, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Dead-letter total", value: totalDlq.toString(), series: spark, trend: -8.2, trendInverted: true, status: "warning" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Average lag", description: "ms across all queues", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: lag, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lg", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-warning)", stopOpacity: 0.35 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-warning)", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "lag", stroke: "var(--color-warning)", fill: "url(#lg)", strokeWidth: 1.5 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Throughput", description: "Messages / sec", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: tput, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { dataKey: "value", stroke: "var(--color-primary)", dot: false, strokeWidth: 1.5 })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Retry rate", description: "Retries / min", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: retries, margin: {
        top: 4,
        right: 8,
        left: -16,
        bottom: 0
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick, tickLine: false, axisLine: false, interval: 10 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick, tickLine: false, axisLine: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: ttStyle, cursor: {
          fill: "var(--color-accent)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "var(--color-destructive)", radius: [2, 2, 0, 0] })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold", children: "Queues" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "success", children: "all reachable" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3", children: queues.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-left", onClick: () => setSelected(q), children: /* @__PURE__ */ jsxRuntimeExports.jsx(QueueCard, { queue: q }) }, q.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!selected, onOpenChange: (o) => !o && setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "max-w-xl", children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "font-mono text-sm", children: selected.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "text-xs", children: [
          "Health score: ",
          Math.round(100 - selected.messages / 14e3 * 60),
          " / 100"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: selected })
    ] }) }) })
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
  QueuesPage as component
};
