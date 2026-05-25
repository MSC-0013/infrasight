import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { y as StatusBadge, B as Button } from "./router-BDT-YXA5.mjs";
import { a7 as TriangleAlert, g as Check } from "../_libs/lucide-react.mjs";
import { a as formatDistanceToNow } from "../_libs/date-fns.mjs";
const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" };
function AlertCard({ alert, onAck }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-lg border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-border bg-background text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: alert.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: SEV_TONE[alert.severity], children: alert.severity }),
        alert.acknowledged && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "neutral", children: "acked" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: alert.description }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert.service }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: alert.source }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true }) })
      ] })
    ] }),
    !alert.acknowledged && onAck && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1 text-xs", onClick: () => onAck(alert.id), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
      " Ack"
    ] })
  ] });
}
export {
  AlertCard as A
};
