import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { a3 as generateOrganizations, B as Button, y as StatusBadge } from "./router-BB8e-L7y.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-SoduSOgO.mjs";
import "../_libs/sonner.mjs";
import { V as Plus } from "../_libs/lucide-react.mjs";
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
const PLAN_TONE = {
  free: "neutral",
  pro: "info",
  enterprise: "success"
};
function OrgsPage() {
  const orgs = reactExports.useMemo(() => generateOrganizations(), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Organizations", description: "Tenant organizations and their usage.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
      "New organization"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Organization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Slug" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Events / 24h" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Members" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: orgs.map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs hover:bg-accent/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded bg-primary/15 text-[10px] font-semibold uppercase text-primary", children: o.name.slice(0, 2) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: o.name })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: o.slug }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: PLAN_TONE[o.plan], dot: false, children: o.plan }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-2 text-right font-mono tabular-nums", children: [
          (2.1 - i * 0.3).toFixed(1),
          "M"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 text-right font-mono tabular-nums", children: 42 - i * 5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "success", children: "active" }) })
      ] }, o.id)) })
    ] }) }) })
  ] });
}
export {
  OrgsPage as component
};
