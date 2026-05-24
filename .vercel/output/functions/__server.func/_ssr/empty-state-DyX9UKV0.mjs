import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as cn } from "./router--DYUD3CX.mjs";
import { I as Inbox } from "../_libs/lucide-react.mjs";
function EmptyState({ title, description, icon: Icon = Inbox, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card/40 px-6 py-12 text-center", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6 text-muted-foreground" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-sm text-xs text-muted-foreground", children: description })
  ] });
}
export {
  EmptyState as E
};
