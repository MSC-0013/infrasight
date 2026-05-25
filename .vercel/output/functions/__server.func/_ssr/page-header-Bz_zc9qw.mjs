import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { F as cn } from "./router-BDT-YXA5.mjs";
function PageHeader({
  title,
  description,
  actions,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("flex flex-wrap items-start justify-between gap-3 border-b border-border bg-background px-6 py-4", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold tracking-tight", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-xs text-muted-foreground", children: description })
    ] }),
    actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex shrink-0 items-center gap-2", children: actions })
  ] });
}
export {
  PageHeader as P
};
