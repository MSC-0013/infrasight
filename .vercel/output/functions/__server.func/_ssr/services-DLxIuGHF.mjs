import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-Bz_zc9qw.mjs";
import { a8 as generateServices, y as StatusBadge, G as formatDistanceToNow, H as formatNumber } from "./router-BDT-YXA5.mjs";
import "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
const tone = (s) => s === "healthy" ? "success" : s === "degraded" ? "warning" : "error";
function ServicesPage() {
  const services = reactExports.useMemo(() => generateServices(), []);
  const healthy = services.filter((s) => s.status === "healthy").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Service health", description: `${healthy}/${services.length} services healthy · uptime tracked from last 30 days` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 px-6 py-4 lg:grid-cols-2", children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/services/$serviceName", params: {
      serviceName: s.name
    }, className: "rounded-md border border-border bg-card p-4 hover:border-primary/30 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tone(s.status), children: s.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-0.5 font-mono text-[11px] text-muted-foreground", children: [
            s.version,
            " · ",
            s.region,
            " · deployed ",
            formatDistanceToNow(s.lastDeploy)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: "uptime" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm", children: [
            s.uptimePct,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-4 gap-2 border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "RPS", v: formatNumber(s.rps) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "P95", v: `${s.p95Ms}ms` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "Errors", v: `${s.errorRate}%`, tone: s.errorRate > 2 ? "destructive" : void 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "CPU", v: `${s.cpu}%` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-1.5 border-t border-border pt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: "depends on" }),
        s.dependsOn.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/$serviceName", params: {
          serviceName: d
        }, className: "rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] hover:bg-accent", children: d }, d))
      ] })
    ] }, s.id)) })
  ] });
}
function Stat({
  k,
  v,
  tone: tone2
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-mono text-xs " + (tone2 === "destructive" ? "text-destructive" : ""), children: v })
  ] });
}
export {
  ServicesPage as component
};
