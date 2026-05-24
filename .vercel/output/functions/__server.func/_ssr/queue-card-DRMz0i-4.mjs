import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { y as StatusBadge, F as cn } from "./router-C7vl9p1Y.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
const STATUS_TONE = { healthy: "success", degraded: "warning", backlogged: "error" };
function QueueCard({ queue }) {
  const pct = Math.min(100, queue.messages / 14e3 * 100);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold", children: queue.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: [
          queue.consumers,
          " consumers"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[queue.status], children: queue.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Messages", value: queue.messages.toLocaleString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Lag", value: `${queue.lagMs}ms` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Throughput", value: `${queue.throughput}/s` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Retries", value: queue.retries.toString() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "DLQ", value: queue.dlq.toString(), tone: queue.dlq > 80 ? "error" : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "Backlog", value: `${pct.toFixed(0)}%` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1 flex justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "capacity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          pct.toFixed(0),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: pct, className: "h-1" })
    ] })
  ] });
}
function Stat({ label, value, tone }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `tabular-nums ${tone === "error" ? "text-destructive" : ""}`, children: value })
  ] });
}
export {
  QueueCard as Q
};
