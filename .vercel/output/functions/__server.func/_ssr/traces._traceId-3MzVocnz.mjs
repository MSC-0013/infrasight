import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { e as Route$2, P as generateSpansForTrace, l as StatusBadge, p as cn } from "./router-F21aWjaR.mjs";
import "../_libs/sonner.mjs";
import { j as ChevronLeft } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
const SERVICE_COLOR = {
  "api-gateway": "bg-primary/70",
  "auth-service": "bg-chart-2/80",
  "event-service": "bg-chart-3/80",
  "redis-cluster": "bg-chart-4/80",
  "worker-service": "bg-chart-5/80",
  "ml-service": "bg-warning/80",
  "postgres-primary": "bg-chart-1/80",
  "analytics-service": "bg-success/70"
};
function TraceWaterfall({ spans }) {
  const total = reactExports.useMemo(
    () => Math.max(...spans.map((s) => s.startMs + s.durationMs), 1),
    [spans]
  );
  const [selected, setSelected] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_320px] gap-0 rounded-md border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thin-scrollbar overflow-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-10 grid grid-cols-[220px_1fr_80px] border-b border-border bg-card px-3 py-1.5 text-[10px] font-mono uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service · Op" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Waterfall · ",
          total,
          "ms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Duration" })
      ] }),
      spans.map((s) => {
        const left = s.startMs / total * 100;
        const width = Math.max(0.5, s.durationMs / total * 100);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => setSelected(s),
            className: cn(
              "grid w-full grid-cols-[220px_1fr_80px] items-center gap-2 border-b border-border/60 px-3 py-1.5 text-left text-xs hover:bg-accent/50",
              selected?.id === s.id && "bg-accent/50"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-medium", children: s.service }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate font-mono text-[10px] text-muted-foreground", children: s.operation })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "absolute top-1 h-2 rounded-sm",
                    SERVICE_COLOR[s.service] ?? "bg-primary/70",
                    s.status === "error" && "ring-1 ring-destructive"
                  ),
                  style: { left: `${left}%`, width: `${width}%` }
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right font-mono text-[11px]", children: [
                s.durationMs,
                "ms"
              ] })
            ]
          },
          s.id
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-l border-border p-3", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Span" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: selected.operation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[11px] text-muted-foreground", children: selected.service })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { k: "kind", v: selected.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { k: "status", v: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: selected.status === "error" ? "error" : "success", children: selected.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { k: "start", v: `${selected.startMs}ms` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { k: "duration", v: `${selected.durationMs}ms` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-1 text-[10px] font-mono uppercase text-muted-foreground", children: "Attributes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "thin-scrollbar max-h-64 overflow-auto rounded border border-border bg-background p-2 font-mono text-[10px] leading-relaxed", children: JSON.stringify(selected.attributes, null, 2) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full items-center justify-center text-center text-xs text-muted-foreground", children: "Select a span to inspect." }) })
  ] });
}
function Field({ k, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 font-mono text-[11px]", children: v })
  ] });
}
function TracePage() {
  const {
    traceId
  } = Route$2.useParams();
  const spans = reactExports.useMemo(() => generateSpansForTrace(traceId, 1200 + traceId.length % 7 * 200), [traceId]);
  const total = spans.reduce((m, s) => Math.max(m, s.startMs + s.durationMs), 0);
  const errors = spans.filter((s) => s.status === "error").length;
  const services = Array.from(new Set(spans.map((s) => s.service)));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: `Trace ${traceId.slice(0, 12)}`, description: `${services.length} services · ${spans.length} spans · ${total}ms total`, actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/traces", className: "inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-3.5 w-3.5" }),
      " Back"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Status", value: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: errors ? "error" : "success", children: errors ? "error" : "ok" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Duration", value: `${total}ms` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Spans", value: spans.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { label: "Error spans", value: errors })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TraceWaterfall, { spans })
    ] })
  ] });
}
function Card({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-lg font-semibold", children: value })
  ] });
}
export {
  TracePage as component
};
