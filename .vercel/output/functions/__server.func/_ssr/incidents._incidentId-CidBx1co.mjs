import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-9rBCoVTg.mjs";
import { t as Route, Y as generateIncidents, U as generateDeployments, $ as generateLogs, ae as generateTraces, ai as useInspector, y as StatusBadge, G as formatDistanceToNow, I as Input } from "./router-C7vl9p1Y.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { aa as UserPlus, b as ArrowLeft, G as GitBranch, ac as Workflow, F as FileText, B as Bell } from "../_libs/lucide-react.mjs";
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
const sevTone = {
  sev1: "critical",
  sev2: "error",
  sev3: "warning",
  sev4: "info"
};
const statusTone = {
  investigating: "error",
  identified: "warning",
  monitoring: "info",
  resolved: "success"
};
const RESPONDERS = [{
  name: "Alex Chen",
  role: "Incident Commander",
  avatar: "AC"
}, {
  name: "Maria Lopez",
  role: "SRE on-call",
  avatar: "ML"
}, {
  name: "Dan Park",
  role: "Service owner",
  avatar: "DP"
}];
function IncidentDetailPage() {
  const {
    incidentId
  } = Route.useParams();
  const all = reactExports.useMemo(() => generateIncidents(), []);
  const incident = reactExports.useMemo(() => all.find((i) => i.id === incidentId) ?? all[0], [all, incidentId]);
  const deploys = reactExports.useMemo(() => generateDeployments().slice(0, 3), []);
  const logs = reactExports.useMemo(() => generateLogs(8), []);
  const traces = reactExports.useMemo(() => generateTraces(4), []);
  const inspect = useInspector((s) => s.inspect);
  const [comment, setComment] = reactExports.useState("");
  const [comments, setComments] = reactExports.useState([{
    author: "Alex Chen",
    at: new Date(Date.now() - 8 * 6e4).toISOString(),
    text: "Rolling back deploy a3f2c91 to verify hypothesis."
  }, {
    author: "Maria Lopez",
    at: new Date(Date.now() - 22 * 6e4).toISOString(),
    text: "Error rate localized to event-service in eu-west-1."
  }]);
  const post = () => {
    if (!comment.trim()) return;
    setComments((c) => [...c, {
      author: "You",
      at: (/* @__PURE__ */ new Date()).toISOString(),
      text: comment
    }]);
    setComment("");
    toast.success("Comment posted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/incidents", className: "text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-muted-foreground", children: incident.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: incident.title })
    ] }), description: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: sevTone[incident.severity], children: incident.severity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: statusTone[incident.status], children: incident.status }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-muted-foreground", children: [
        "opened ",
        formatDistanceToNow(incident.openedAt)
      ] })
    ] }), actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }),
        " Add responder"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90", children: "Mark resolved" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "relative space-y-3 border-l border-border pl-4", children: incident.updates.map((u, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold uppercase", children: u.status }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: formatDistanceToNow(u.at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-foreground/85", children: u.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground", children: u.author })
        ] }, i)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Root cause analysis", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-foreground/85", children: incident.rootCause ?? "Investigation ongoing. Hypothesis: increased fan-out from event-service after deploy a3f2c91 exhausted Redis connection pool, causing cascade rate-limiting upstream." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 font-mono text-[10px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Started", v: formatDistanceToNow(incident.openedAt) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Detection", v: "92s (auto)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Acknowledged", v: incident.acknowledgedBy ?? "—" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "Comments & activity", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: comments.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-card p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: c.author }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: formatDistanceToNow(c.at) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-foreground/85", children: c.text })
          ] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: comment, onChange: (e) => setComment(e.target.value), onKeyDown: (e) => e.key === "Enter" && post(), placeholder: "Add an update or @mention a responder…", className: "h-9 bg-card text-xs" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: post, className: "rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90", children: "Post" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 md:grid-cols-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Related deployments", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-3.5 w-3.5" }), children: deploys.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono", children: [
                d.service,
                "@",
                d.version
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground", children: [
                d.commit.slice(0, 7),
                " · ",
                d.author
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning", children: d.status })
          ] }, d.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Related traces", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "h-3.5 w-3.5" }), children: traces.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/traces/$traceId", params: {
            traceId: t.id
          }, className: "flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0 hover:text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: t.rootOperation }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
              t.durationMs,
              "ms"
            ] })
          ] }, t.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Related logs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3.5 w-3.5" }), children: logs.slice(0, 5).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => inspect({
          kind: "log",
          id: l.id,
          title: l.message,
          subtitle: l.service,
          data: l.attrs,
          relatedTraceId: l.traceId,
          service: l.service
        }), className: "flex w-full items-center gap-2 border-b border-border/60 py-1.5 text-left text-xs last:border-0 hover:bg-accent/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: l.level === "error" || l.level === "critical" ? "error" : l.level === "warn" ? "warning" : "info", children: l.level }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: l.service }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: l.message })
        ] }, l.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Responders", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "h-3.5 w-3.5" }), children: RESPONDERS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-border/60 py-1.5 last:border-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary", children: r.avatar }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground", children: r.role })
          ] })
        ] }, r.name)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Affected services", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: incident.impactedServices.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]", children: s }, s)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Impact summary", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-2 font-mono text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "users affected", v: "~12.4K" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "error rate", v: "4.8%" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "region", v: "eu-west-1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { k: "SLO burn", v: "32%" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "Notifications", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5 text-[11px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "#incidents-prod" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "delivered" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "pagerduty" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success", children: "delivered" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between font-mono", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "status page" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warning", children: "queued" })
          ] })
        ] }) })
      ] })
    ] })
  ] });
}
function Section({
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-md border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 border-b border-border px-3 py-2 text-[11px] font-medium", children: [
      icon,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3", children })
  ] });
}
function Kv({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-border bg-background p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: v })
  ] });
}
function Stat({
  k,
  v
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "text-right", children: v })
  ] });
}
export {
  IncidentDetailPage as component
};
