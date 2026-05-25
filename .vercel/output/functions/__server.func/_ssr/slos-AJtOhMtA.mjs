import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-Bz_zc9qw.mjs";
import { a6 as generateSLOs, F as cn, y as StatusBadge } from "./router-BDT-YXA5.mjs";
import "../_libs/sonner.mjs";
import { j as ChevronRight, a1 as ShieldCheck, u as Flame, a7 as TriangleAlert, a5 as TrendingDown, a6 as TrendingUp } from "../_libs/lucide-react.mjs";
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
const STATUS_TONE = {
  healthy: "success",
  at_risk: "warning",
  breached: "error"
};
function SLOsPage() {
  const slos = reactExports.useMemo(() => generateSLOs(), []);
  const healthy = slos.filter((s) => s.status === "healthy").length;
  const atRisk = slos.filter((s) => s.status === "at_risk").length;
  const breached = slos.filter((s) => s.status === "breached").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "SLOs & Error Budgets", description: `${slos.length} SLOs · ${healthy} healthy · ${atRisk} at risk · ${breached} breached` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Total SLOs", value: slos.length.toString(), tone: "info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Healthy", value: healthy.toString(), tone: "success" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "At risk", value: atRisk.toString(), tone: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryCard, { label: "Breached", value: breached.toString(), tone: "error" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4 px-6 py-2", children: slos.map((slo) => /* @__PURE__ */ jsxRuntimeExports.jsx(SLOCard, { slo }, slo.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6" })
  ] });
}
function SLOCard({
  slo
}) {
  const budgetPct = slo.budgetRemaining;
  const budgetColor = budgetPct > 50 ? "bg-success" : budgetPct > 20 ? "bg-warning" : "bg-destructive";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: slo.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[slo.status], children: slo.status.replace("_", " ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]", children: slo.service })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 font-mono text-[11px] text-muted-foreground", children: [
          "Period: ",
          slo.period,
          " · Burn rate window: ",
          slo.burnRateWindow
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/$serviceName", params: {
        serviceName: slo.service
      }, className: "shrink-0 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }),
          "Error budget remaining"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("font-mono text-sm tabular-nums", budgetPct > 50 ? "text-success" : budgetPct > 20 ? "text-warning" : "text-destructive"), children: [
          budgetPct,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 h-2 overflow-hidden rounded-full bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("h-full rounded-full transition-all", budgetColor), style: {
        width: `${budgetPct}%`
      } }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-px border-b border-border bg-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Flame, { className: "h-3.5 w-3.5 text-warning" }),
          "Burn rate"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("mt-1 font-mono text-lg tabular-nums", slo.burnRate > 3 ? "text-destructive" : slo.burnRate > 1 ? "text-warning" : "text-success"), children: [
          slo.burnRate,
          "x"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: [
          "over ",
          slo.burnRateWindow
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card px-4 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs font-medium", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3.5 w-3.5 text-muted-foreground" }),
          "Budget exhaustion"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-mono text-lg tabular-nums", children: slo.burnRate > 0 ? formatExhaustion(slo.budgetRemaining, slo.burnRate) : "--" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: "at current burn rate" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: "Service Level Indicators" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4", children: slo.slis.map((sli) => /* @__PURE__ */ jsxRuntimeExports.jsx(SLICard, { sli }, sli.name)) })
    ] })
  ] });
}
function SLICard({
  sli
}) {
  const isBreached = sli.type === "error_rate" ? sli.current > sli.target : sli.type === "latency" ? sli.current > sli.target : sli.current < sli.target;
  const gap = sli.type === "error_rate" || sli.type === "latency" ? sli.current - sli.target : sli.target - sli.current;
  const gapAbs = Math.abs(gap);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: sli.name }),
      isBreached ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "h-3.5 w-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-3.5 w-3.5 text-success" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-1 font-mono text-base tabular-nums", isBreached ? "text-destructive" : "text-foreground"), children: formatSLIValue(sli.current, sli.unit) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 flex items-center justify-between font-mono text-[10px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        "target: ",
        formatSLIValue(sli.target, sli.unit)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(isBreached ? "text-destructive" : "text-success"), children: [
        isBreached ? "+" : "-",
        formatSLIValue(gapAbs, sli.unit)
      ] })
    ] })
  ] });
}
function SummaryCard({
  label,
  value,
  tone
}) {
  const TONE_STYLE = {
    info: "border-info/30 bg-info/5",
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    error: "border-destructive/30 bg-destructive/5"
  };
  const VALUE_COLOR = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("rounded-lg border p-3", TONE_STYLE[tone]), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-1 font-mono text-2xl tabular-nums", VALUE_COLOR[tone]), children: value })
  ] });
}
function formatSLIValue(value, unit) {
  if (unit === "%") return `${value.toFixed(value >= 99 ? 3 : 1)}%`;
  if (unit === "ms") return `${Math.round(value)}ms`;
  if (unit === "rps") return `${value.toLocaleString()} rps`;
  return `${value} ${unit}`;
}
function formatExhaustion(budgetRemaining, burnRate) {
  if (burnRate <= 0) return "N/A";
  const hoursLeft = budgetRemaining / 100 / burnRate * (30 * 24);
  if (hoursLeft < 1) return `${Math.round(hoursLeft * 60)}m`;
  if (hoursLeft < 48) return `${Math.round(hoursLeft)}h`;
  return `${(hoursLeft / 24).toFixed(1)}d`;
}
export {
  SLOsPage as component
};
