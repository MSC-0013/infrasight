import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { A as AlertCard } from "./alert-card-BOwf2gIi.mjs";
import { I as Input } from "./input-f80pHA3R.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-CEfZ_rrX.mjs";
import { t as generateAlerts, U as generateTimeSeries } from "./router-F21aWjaR.mjs";
import { M as MetricCard } from "./metric-card-DIhW495_.mjs";
import "../_libs/sonner.mjs";
import { X as Search } from "../_libs/lucide-react.mjs";
import "./button-DweqyZIN.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
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
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/recharts.mjs";
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
function AlertsPage() {
  const [alerts, setAlerts] = reactExports.useState(reactExports.useMemo(() => generateAlerts(24), []));
  const [query, setQuery] = reactExports.useState("");
  const [sev, setSev] = reactExports.useState("all");
  const [scope, setScope] = reactExports.useState("all");
  const spark = reactExports.useMemo(() => generateTimeSeries(20, 12, 6), []);
  const filtered = alerts.filter((a) => {
    if (sev !== "all" && a.severity !== sev) return false;
    if (scope === "active" && a.acknowledged) return false;
    if (scope === "acked" && !a.acknowledged) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });
  const ack = (id) => setAlerts((prev) => prev.map((a) => a.id === id ? {
    ...a,
    acknowledged: true
  } : a));
  const counts = {
    critical: alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length,
    error: alerts.filter((a) => a.severity === "error" && !a.acknowledged).length,
    warning: alerts.filter((a) => a.severity === "warning" && !a.acknowledged).length,
    info: alerts.filter((a) => a.severity === "info" && !a.acknowledged).length
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Alert Center", description: "Active and historical alerts across the platform." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Critical", value: counts.critical.toString(), series: spark, status: "error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Error", value: counts.error.toString(), series: spark, status: "error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Warning", value: counts.warning.toString(), series: spark, status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MetricCard, { label: "Info", value: counts.info.toString(), series: spark, status: "info" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-y border-border bg-background px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[260px] flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search alerts…", className: "h-8 border-border bg-card pl-8 text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: sev, onValueChange: setSev, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-8 w-[140px] border-border bg-card text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Severity:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["all", "info", "warning", "error", "critical"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, className: "text-xs", children: s }, s)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: scope, onValueChange: setScope, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-8 w-[140px] border-border bg-card text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Scope:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", className: "text-xs", children: "All" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", className: "text-xs", children: "Active" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "acked", className: "text-xs", children: "Acknowledged" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 px-6 py-4", children: filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(AlertCard, { alert: a, onAck: ack }, a.id)) })
  ] });
}
export {
  AlertsPage as component
};
