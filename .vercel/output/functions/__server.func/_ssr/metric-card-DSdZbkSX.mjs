import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { F as cn } from "./router-BB8e-L7y.mjs";
import { d as ArrowUpRight, a as ArrowDownRight } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as AreaChart, A as Area, e as LineChart, d as Line } from "../_libs/recharts.mjs";
const statusToColor = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-destructive)",
  critical: "var(--color-destructive)",
  info: "var(--color-primary)"
};
function MetricCard({
  label,
  value,
  unit,
  trend,
  trendInverted,
  series,
  status = "info",
  variant = "line"
}) {
  const isPos = trend !== void 0 && trend >= 0;
  const isGood = trendInverted ? !isPos : isPos;
  const color = statusToColor[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-border/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: color } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-semibold tracking-tight tabular-nums", children: value }),
          unit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground", children: unit })
        ] }),
        trend !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "mt-0.5 flex items-center gap-0.5 text-[11px] font-mono",
              isGood ? "text-success" : "text-destructive"
            ),
            children: [
              isPos ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "h-3 w-3" }),
              Math.abs(trend).toFixed(1),
              "%",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-muted-foreground", children: "24h" })
            ]
          }
        )
      ] }),
      series && series.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 w-20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: variant === "area" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { data: series, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `grad-${label}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Area, { type: "monotone", dataKey: "value", stroke: color, strokeWidth: 1.5, fill: `url(#grad-${label})` })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LineChart, { data: series, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Line, { type: "monotone", dataKey: "value", stroke: color, strokeWidth: 1.5, dot: false }) }) }) })
    ] })
  ] });
}
export {
  MetricCard as M
};
