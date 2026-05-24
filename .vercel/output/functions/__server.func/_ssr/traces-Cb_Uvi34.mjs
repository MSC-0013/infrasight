import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-CNgl2mVR.mjs";
import { m as Route$o, ac as generateTraces, I as Input, E as formatDistanceToNow, w as StatusBadge } from "./router--DYUD3CX.mjs";
import { E as EmptyState } from "./empty-state-DyX9UKV0.mjs";
import "../_libs/sonner.mjs";
import { _ as Search, aa as Workflow } from "../_libs/lucide-react.mjs";
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
const tone = (s) => s === "ok" ? "success" : s === "degraded" ? "warning" : "error";
function TracesPage() {
  const rawSearch = Route$o.useSearch();
  const search = {
    q: rawSearch.q ?? "",
    status: rawSearch.status ?? "all"
  };
  const navigate = useNavigate({
    from: "/traces"
  });
  const setSearch = (patch) => navigate({
    search: (prev) => ({
      ...prev,
      ...patch
    }),
    replace: true
  });
  const traces = reactExports.useMemo(() => generateTraces(60), []);
  const filtered = traces.filter((t) => {
    if (search.status !== "all" && t.status !== search.status) return false;
    if (search.q && !(t.id.includes(search.q) || t.rootOperation.includes(search.q) || t.rootService.includes(search.q))) return false;
    return true;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Distributed traces", description: "Trace requests across services. Click a trace to open the span waterfall." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search.q, onChange: (e) => setSearch({
          q: e.target.value
        }), placeholder: "trace.id, service, operation… try: duration:>1000ms", className: "h-8 border-border bg-card pl-8 font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: ["all", "ok", "degraded", "error"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSearch({
        status: s
      }), className: `rounded border px-2 py-1 font-mono text-[10px] uppercase ${search.status === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"}`, children: s }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[11px] text-muted-foreground", children: [
        filtered.length,
        " traces"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "No traces match", description: "Adjust the query or status filter.", icon: Workflow }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-md border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[160px_1fr_120px_120px_120px_100px_80px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Trace ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Operation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Root service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Duration" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Spans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" })
      ] }),
      filtered.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/traces/$traceId", params: {
        traceId: t.id
      }, className: "grid grid-cols-[160px_1fr_120px_120px_120px_100px_80px] items-center border-b border-border/60 px-3 py-2 text-xs hover:bg-accent/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[11px]", children: t.id.slice(0, 16) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: t.rootOperation }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 font-mono text-[10px] text-muted-foreground", children: formatDistanceToNow(t.startedAt) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[11px]", children: t.rootService }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: t.services.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px]", children: [
          t.durationMs,
          "ms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: t.spanCount }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tone(t.status), children: t.status }) })
      ] }, t.id))
    ] }) })
  ] });
}
export {
  TracesPage as component
};
