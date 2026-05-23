import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { W as WorkerCard } from "./worker-card-B89oS5O6.mjs";
import { M as MetricCard } from "./metric-card-DIhW495_.mjs";
import { C as ChartCard } from "./chart-card-DCecWeLK.mjs";
import { Y as generateWorkers, U as generateTimeSeries } from "./router-F21aWjaR.mjs";
import "../_libs/sonner.mjs";
import { R as ResponsiveContainer, a as AreaChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, A as Area } from "../_libs/recharts.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/date-fns.mjs";
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
function WorkersPage() {
  const workers = reactExports.useMemo(() => generateWorkers(), []);
  const cpu = reactExports.useMemo(() => generateTimeSeries(60, 45, 18), []);
  const mem = reactExports.useMemo(() => generateTimeSeries(60, 58, 12), []);
  const jobs = reactExports.useMemo(() => generateTimeSeries(60, 1200, 280), []);
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 80, 10), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Worker Monitoring", description: "Distributed worker fleet across regions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Total workers", value: workers.length.toString(), series: spark, trend: 0, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Online", value: workers.filter((w) => w.status === "online").length.toString(), series: spark, trend: 1.2, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Degraded", value: workers.filter((w) => w.status === "degraded").length.toString(), series: spark, trend: 0, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Offline", value: workers.filter((w) => w.status === "offline").length.toString(), series: spark, trend: 0, status: "error" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-3 px-6 lg:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Fleet CPU", description: "% average", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spark, { data: cpu, color: "var(--color-chart-1)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Fleet memory", description: "% average", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spark, { data: mem, color: "var(--color-chart-3)" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Jobs / sec", description: "aggregate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spark, { data: jobs, color: "var(--color-success)" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-2 text-sm font-semibold", children: "Worker fleet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4", children: workers.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkerCard, { worker: w }, w.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Worker logs (preview)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "thin-scrollbar max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-[11px] leading-relaxed text-foreground/80", children: `[2026-05-16T14:08:21Z] INFO  worker-us-east-1a started job=job_a83c2f queue=events.high
[2026-05-16T14:08:21Z] INFO  worker-us-east-1a processed event_type=user.signup latency=42ms
[2026-05-16T14:08:22Z] WARN  worker-eu-west-1b heartbeat missed (1/3)
[2026-05-16T14:08:23Z] INFO  worker-us-west-2a processed event_type=payment.processed latency=128ms
[2026-05-16T14:08:24Z] ERROR worker-eu-west-1b connection refused upstream=postgres-primary retry=2
[2026-05-16T14:08:25Z] INFO  worker-ap-south-1a processed event_type=webhook.delivered latency=88ms
[2026-05-16T14:08:26Z] INFO  worker-us-east-1b processed event_type=email.sent latency=51ms` }) }) })
  ] });
}
function Spark({
  data,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data, margin: {
    top: 4,
    right: 4,
    left: -24,
    bottom: 0
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: color, x1: "0", y1: "0", x2: "0", y2: "1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0 })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "var(--color-border)", strokeDasharray: "2 4", vertical: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", tick: {
      fill: "var(--color-muted-foreground)",
      fontSize: 9
    }, tickLine: false, axisLine: false, interval: 12 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
      fill: "var(--color-muted-foreground)",
      fontSize: 9
    }, tickLine: false, axisLine: false }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
      background: "var(--color-popover)",
      border: "1px solid var(--color-border)",
      borderRadius: 6,
      fontSize: 11
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { dataKey: "value", stroke: color, fill: `url(#${color})`, strokeWidth: 1.5 })
  ] }) }) });
}
export {
  WorkersPage as component
};
