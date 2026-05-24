import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { M as MetricCard } from "./metric-card-DSdZbkSX.mjs";
import { Z as generateLatencyHeatmap, V as generateEndpointHeatmap, a7 as generateServiceDependencyHeatmap, ab as generateTimeSeries, T as Tabs, A as TabsList, C as TabsTrigger, z as TabsContent, F as cn } from "./router-BB8e-L7y.mjs";
import "../_libs/sonner.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/recharts.mjs";
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
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
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
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
function HeatmapsPage() {
  const latency = reactExports.useMemo(() => generateLatencyHeatmap(), []);
  const endpoint = reactExports.useMemo(() => generateEndpointHeatmap(), []);
  const dependency = reactExports.useMemo(() => generateServiceDependencyHeatmap(), []);
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 100, 30), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Heatmaps", description: "Visualize latency, error distribution and service dependency patterns." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Peak latency cell", value: "480ms", series: spark, trend: 3.2, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Avg endpoint errors", value: "12.4", series: spark, trend: -2.1, trendInverted: true, status: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Top dependency RPS", value: "780", series: spark, trend: 5.4, status: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Services mapped", value: "6", series: spark, trend: 0, status: "info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "latency", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "latency", className: "text-xs", children: "Latency x Hour" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "endpoint", className: "text-xs", children: "Endpoint x Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "dependency", className: "text-xs", children: "Service Dependency" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "latency", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeatmapGrid, { data: latency, yLabels: ["api-gateway", "auth-service", "event-service", "worker-service", "ml-service", "analytics-service"], colorScale: "latency", unit: "ms" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "endpoint", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeatmapGrid, { data: endpoint, yLabels: ["200", "400", "401", "404", "500", "503"], colorScale: "requests", unit: "reqs" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "dependency", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeatmapGrid, { data: dependency, yLabels: ["api-gw", "auth", "events", "worker", "ml", "postgres"], colorScale: "rps", unit: "rps" }) })
    ] }) })
  ] });
}
function HeatmapGrid({
  data,
  yLabels,
  colorScale,
  unit
}) {
  const [hovered, setHovered] = reactExports.useState(null);
  const maxVal = data.maxValue;
  const xLabels = Array.from(new Set(data.cells.map((c) => c.label ?? String(c.x))));
  const cellMap = /* @__PURE__ */ new Map();
  data.cells.forEach((c) => cellMap.set(`${c.x},${c.y}`, c.value));
  const getColor = (v) => {
    const pct = v / maxVal;
    if (colorScale === "latency") {
      if (pct < 0.2) return "bg-success/40";
      if (pct < 0.4) return "bg-success/70";
      if (pct < 0.6) return "bg-warning/60";
      if (pct < 0.8) return "bg-warning/80";
      return "bg-destructive/70";
    }
    if (colorScale === "rps") {
      if (pct < 0.1) return "bg-primary/10";
      if (pct < 0.3) return "bg-primary/30";
      if (pct < 0.5) return "bg-primary/50";
      if (pct < 0.7) return "bg-primary/70";
      return "bg-primary/90";
    }
    if (pct < 0.05) return "bg-muted/40";
    if (pct < 0.2) return "bg-success/40";
    if (pct < 0.5) return "bg-chart-2/60";
    if (pct < 0.8) return "bg-warning/60";
    return "bg-destructive/60";
  };
  const hoveredValue = hovered ? cellMap.get(`${hovered.x},${hovered.y}`) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: data.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        data.xLabel,
        " x ",
        data.yLabel,
        " · hover for details"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
      hovered && hoveredValue !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 font-mono text-xs", children: [
        yLabels[hovered.y],
        " · ",
        xLabels[hovered.x],
        " = ",
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-foreground", children: [
          hoveredValue,
          " ",
          unit
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-block min-w-fit", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-px", style: {
        gridTemplateColumns: `120px repeat(${xLabels.length}, minmax(32px, 1fr))`
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
        xLabels.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-1 font-mono text-[10px] text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate px-0.5", children: l }) }, l)),
        yLabels.map((yLabel, yIdx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end pr-2 font-mono text-[10px] text-muted-foreground truncate", children: yLabel }),
          xLabels.map((_, xIdx) => {
            const val = cellMap.get(`${xIdx},${yIdx}`) ?? 0;
            const isHovered = hovered?.x === xIdx && hovered?.y === yIdx;
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { onMouseEnter: () => setHovered({
              x: xIdx,
              y: yIdx
            }), onMouseLeave: () => setHovered(null), className: cn("flex h-7 min-w-[32px] items-center justify-center rounded-sm text-[9px] font-mono tabular-nums transition-all cursor-default", getColor(val), val === 0 && "bg-muted/20", isHovered && "ring-1 ring-foreground scale-110 z-10"), children: val > 0 ? val : "" }, `${xIdx}-${yIdx}`);
          })
        ] }, yIdx))
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Less" }),
        colorScale === "latency" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-success/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-success/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-warning/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-warning/80" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-destructive/70" })
        ] }) : colorScale === "rps" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-primary/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-primary/50" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-primary/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-primary/90" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-muted/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-success/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-chart-2/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-warning/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-3 w-6 rounded-sm bg-destructive/60" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "More" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2", children: [
          "(",
          unit,
          ")"
        ] })
      ] })
    ] })
  ] });
}
export {
  HeatmapsPage as component
};
