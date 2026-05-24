import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { ad as generateTopology, F as cn } from "./router-BB8e-L7y.mjs";
import "../_libs/sonner.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
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
const KIND_FILL = {
  gateway: "fill-primary/20 stroke-primary",
  service: "fill-chart-2/15 stroke-chart-2",
  queue: "fill-warning/15 stroke-warning",
  worker: "fill-chart-3/15 stroke-chart-3",
  db: "fill-chart-4/15 stroke-chart-4",
  ml: "fill-chart-5/15 stroke-chart-5"
};
const STATUS_DOT = {
  healthy: "fill-success",
  degraded: "fill-warning",
  down: "fill-destructive"
};
function TopologyGraph({
  nodes,
  edges
}) {
  const [hover, setHover] = reactExports.useState(null);
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 920 400", className: "h-[420px] w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "marker",
        {
          id: "arrow",
          viewBox: "0 0 10 10",
          refX: "9",
          refY: "5",
          markerWidth: "6",
          markerHeight: "6",
          orient: "auto-start-reverse",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M 0 0 L 10 5 L 0 10 z", className: "fill-muted-foreground" })
        }
      ) }),
      edges.map((e, i) => {
        const a = nodeById[e.from];
        const b = nodeById[e.to];
        if (!a || !b) return null;
        const active = hover === e.from || hover === e.to;
        const stroke = e.errorRate > 1 ? "stroke-destructive/60" : "stroke-muted-foreground/40";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: a.x + 60,
              y1: a.y,
              x2: b.x,
              y2: b.y,
              className: cn(stroke, active && "stroke-primary"),
              strokeWidth: active ? 2 : 1,
              markerEnd: "url(#arrow)"
            }
          ),
          active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "text",
            {
              x: (a.x + b.x) / 2,
              y: (a.y + b.y) / 2 - 4,
              className: "fill-foreground font-mono text-[9px]",
              textAnchor: "middle",
              children: [
                e.rps,
                " rps · ",
                e.errorRate,
                "% err"
              ]
            }
          )
        ] }, i);
      }),
      nodes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "g",
        {
          onMouseEnter: () => setHover(n.id),
          onMouseLeave: () => setHover(null),
          className: "cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x: n.x,
                y: n.y - 18,
                rx: 6,
                ry: 6,
                width: 120,
                height: 36,
                className: cn(KIND_FILL[n.kind], "stroke-[1.2]")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: n.x + 10, cy: n.y, r: 3, className: STATUS_DOT[n.status] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: n.x + 20,
                y: n.y - 2,
                className: "fill-foreground text-[11px] font-medium",
                children: n.label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: n.x + 20,
                y: n.y + 10,
                className: "fill-muted-foreground font-mono text-[9px] uppercase",
                children: n.kind
              }
            )
          ]
        },
        n.id
      ))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-3 border-t border-border px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground", children: ["gateway", "service", "queue", "worker", "db", "ml"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block h-2 w-3 rounded-sm border", KIND_FILL[k]) }),
      k
    ] }, k)) })
  ] });
}
function TopologyPage() {
  const {
    nodes,
    edges
  } = reactExports.useMemo(() => generateTopology(), []);
  const degraded = nodes.filter((n) => n.status !== "healthy").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "System topology", description: `${nodes.length} components · ${edges.length} edges · ${degraded} degraded` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 px-6 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TopologyGraph, { nodes, edges }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Hover an edge to see RPS and error rate. Edges turn red when error rate exceeds 1%." })
    ] })
  ] });
}
export {
  TopologyPage as component
};
