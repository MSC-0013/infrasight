import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { y as StatusBadge } from "./router-BDT-YXA5.mjs";
import { r as Cpu, M as MemoryStick } from "../_libs/lucide-react.mjs";
import { a as formatDistanceToNow } from "../_libs/date-fns.mjs";
const STATUS_TONE = { online: "success", offline: "error", degraded: "warning" };
function WorkerCard({ worker }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 rounded-lg border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-xs font-semibold", children: worker.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-[11px] text-muted-foreground", children: worker.region })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[worker.status], children: worker.status })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Resource, { icon: Cpu, label: "CPU", value: worker.cpu }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Resource, { icon: MemoryStick, label: "MEM", value: worker.memory })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 border-t border-border pt-2 text-[11px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Jobs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tabular-nums", children: [
          (worker.jobsProcessed / 1e3).toFixed(1),
          "k"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Retries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "tabular-nums", children: worker.retries })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Uptime" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "tabular-nums", children: [
          worker.uptimeHours,
          "h"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground", children: [
      "heartbeat · ",
      formatDistanceToNow(new Date(worker.lastHeartbeat), { addSuffix: true })
    ] })
  ] });
}
function Resource({ icon: Icon, label, value }) {
  const color = value > 85 ? "bg-destructive" : value > 70 ? "bg-warning" : "bg-success";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-0.5 flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
        " ",
        label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums", children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 overflow-hidden rounded bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: color, style: { width: `${value}%`, height: "100%" } }) })
  ] });
}
export {
  WorkerCard as W
};
