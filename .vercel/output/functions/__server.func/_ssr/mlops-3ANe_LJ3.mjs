import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { a1 as generateMLModels, a0 as generateMLInsights, Q as generateConfidenceDistribution, ab as generateTimeSeries, y as StatusBadge, G as formatDistanceToNow } from "./router-BB8e-L7y.mjs";
import { C as ChartCard } from "./chart-card-B0xbHfdw.mjs";
import "../_libs/sonner.mjs";
import { R as ResponsiveContainer, e as LineChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, d as Line, b as BarChart, B as Bar } from "../_libs/recharts.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/lucide-react.mjs";
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
function MLOpsPage() {
  const models = reactExports.useMemo(() => generateMLModels(), []);
  const insights = reactExports.useMemo(() => generateMLInsights(), []);
  const dist = reactExports.useMemo(() => generateConfidenceDistribution(), []);
  const inferSeries = reactExports.useMemo(() => generateTimeSeries(60, 220, 60), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "MLOps", description: "Model serving health, drift detection and AI insights across the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 lg:grid-cols-2", children: models.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: m.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
              "v",
              m.version
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: m.status === "serving" ? "success" : m.status === "shadow" ? "info" : "neutral", children: m.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: [
            "deployed ",
            formatDistanceToNow(m.deployedAt)
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-5 gap-2 border-t border-border pt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "P95", v: `${m.inferenceP95}ms` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Throughput", v: `${m.throughput}/s` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Accuracy", v: `${(m.accuracy * 100).toFixed(1)}%` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Drift", v: m.drift.toFixed(3), tone: m.drift > 0.1 ? "warn" : void 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Conf", v: m.confidence.toFixed(2) })
        ] })
      ] }, m.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Inference latency (P95)", description: "Last 60 minutes, all models", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LineChart, { data: inferSeries, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", stroke: "hsl(var(--muted-foreground))", fontSize: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--popover)",
            border: "1px solid var(--border)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "value", stroke: "var(--chart-1)", dot: false, strokeWidth: 2 })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartCard, { title: "Prediction confidence distribution", description: "Bucketed across last 1h", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: dist, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "hsl(var(--border))" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "bucket", stroke: "hsl(var(--muted-foreground))", fontSize: 9 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { stroke: "hsl(var(--muted-foreground))", fontSize: 10 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { contentStyle: {
            background: "var(--popover)",
            border: "1px solid var(--border)"
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "value", fill: "var(--chart-2)" })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "AI insights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-2 lg:grid-cols-2", children: insights.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-semibold", children: i.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: i.type === "anomaly" ? "warning" : i.type === "prediction" ? "info" : "neutral", children: i.type })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: i.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between font-mono text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: i.service }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "confidence ",
              i.confidence,
              "%"
            ] })
          ] })
        ] }, i.id)) })
      ] })
    ] })
  ] });
}
function Stat({
  k,
  v,
  tone
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-mono text-xs " + (tone === "warn" ? "text-warning" : ""), children: v })
  ] });
}
export {
  MLOpsPage as component
};
