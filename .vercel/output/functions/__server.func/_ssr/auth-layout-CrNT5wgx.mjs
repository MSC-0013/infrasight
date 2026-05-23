import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as Activity } from "../_libs/lucide-react.mjs";
function AuthLayout({ children, title, subtitle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen w-full grid-cols-1 bg-background lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "mb-10 inline-flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold tracking-tight", children: "Pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: subtitle }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8", children })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-10 max-w-sm text-center font-mono text-[10px] text-muted-foreground", children: "Protected by SSO · SOC 2 Type II · GDPR compliant" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden border-l border-border bg-card/40 lg:flex lg:flex-col lg:justify-between lg:p-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: "pulse.io / observability" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "max-w-md text-2xl font-semibold leading-tight tracking-tight", children: "Realtime insight into every event, trace, and deploy across your fleet." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 font-mono text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "events ingested", value: "14.3B", sub: "last 30d" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "p95 query", value: "42ms", sub: "globally" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "services monitored", value: "284", sub: "across 12 regions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "MTTR", value: "6m 41s", sub: "this quarter" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground", children: "v2.14.3 · us-east-1 · build #18472" })
    ] })
  ] });
}
function Stat({ label, value, sub }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background/40 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-lg font-semibold tracking-tight text-foreground", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: sub })
  ] });
}
export {
  AuthLayout as A
};
