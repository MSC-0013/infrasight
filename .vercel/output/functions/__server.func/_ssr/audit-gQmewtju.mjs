import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-CNgl2mVR.mjs";
import { N as generateAuditLogs, I as Input, E as formatDistanceToNow } from "./router--DYUD3CX.mjs";
import "../_libs/sonner.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function AuditPage() {
  const all = reactExports.useMemo(() => generateAuditLogs(120), []);
  const [q, setQ] = reactExports.useState("");
  const filtered = all.filter((a) => !q || a.actor.includes(q) || a.action.includes(q) || a.entity.includes(q));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Audit log", description: "Immutable record of all configuration and operator actions." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-background px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), placeholder: "actor:sam action:created entity:api_key", className: "h-8 max-w-md border-border bg-card font-mono text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-md border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[140px_180px_120px_140px_1fr_120px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "When" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Actor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Action" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Entity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Metadata" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "IP" })
      ] }),
      filtered.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[140px_180px_120px_140px_1fr_120px] items-center border-b border-border/60 px-3 py-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: formatDistanceToNow(a.timestamp) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: a.actor }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 font-mono text-[10px] text-muted-foreground", children: a.actorEmail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: a.action }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: a.entity }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate font-mono text-[10px] text-muted-foreground", children: [
          Object.entries(a.metadata).map(([k, v]) => `${k}=${v}`).join(" "),
          " entity_id=",
          a.entityId.slice(0, 8)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: a.ip })
      ] }, a.id))
    ] }) })
  ] });
}
export {
  AuditPage as component
};
