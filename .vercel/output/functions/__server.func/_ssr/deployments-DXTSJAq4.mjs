import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-Bz-M5EtW.mjs";
import { U as generateDeployments, G as formatDistanceToNow, y as StatusBadge } from "./router-BB8e-L7y.mjs";
import "../_libs/sonner.mjs";
import { G as GitBranch, Y as RotateCcw } from "../_libs/lucide-react.mjs";
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
const tone = {
  succeeded: "success",
  failed: "error",
  rolled_back: "warning",
  in_progress: "info"
};
function DeploymentsPage() {
  const deploys = reactExports.useMemo(() => generateDeployments(28), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Deployments", description: "Service deploy history across environments. Rollbacks and in-flight changes shown inline." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-md border border-border bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[140px_160px_120px_100px_140px_140px_100px_80px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Service" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Version" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Commit" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Env" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Author" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Started" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", {})
      ] }),
      deploys.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[140px_160px_120px_100px_140px_140px_100px_80px] items-center border-b border-border/60 px-3 py-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: d.service }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px]", children: d.version }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[11px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3 w-3" }),
          " ",
          d.commit
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase", children: d.environment }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[11px] text-muted-foreground", children: d.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: formatDistanceToNow(d.startedAt) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: tone[d.status], children: d.status.replace("_", " ") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d.status === "succeeded" && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "h-3 w-3" }),
          " rollback"
        ] }) })
      ] }, d.id))
    ] }) })
  ] });
}
export {
  DeploymentsPage as component
};
