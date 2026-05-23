import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { A as generateEvents, l as StatusBadge, p as cn, S as Sheet, h as SheetContent, j as SheetHeader, k as SheetTitle, i as SheetDescription, T as Tabs, n as TabsList, o as TabsTrigger, m as TabsContent, J as JSONViewer } from "./router-F21aWjaR.mjs";
import { I as Input } from "./input-f80pHA3R.mjs";
import { B as Button } from "./button-DweqyZIN.mjs";
import { S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-CEfZ_rrX.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-BwJtVeP2.mjs";
import "../_libs/sonner.mjs";
import { R as Play, P as Pause, X as Search, t as Funnel, k as ChevronRight } from "../_libs/lucide-react.mjs";
import { f as format, a as formatDistanceToNow } from "../_libs/date-fns.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const STATUS_TONE = {
  success: "success",
  failed: "error",
  retrying: "warning",
  queued: "info",
  processing: "info"
};
const SEV_TONE = {
  info: "info",
  warning: "warning",
  error: "error",
  critical: "critical"
};
function EventsPage() {
  const [events, setEvents] = reactExports.useState(reactExports.useMemo(() => generateEvents(150), []));
  const [query, setQuery] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [sevFilter, setSevFilter] = reactExports.useState("all");
  const [orgFilter, setOrgFilter] = reactExports.useState("all");
  const [paused, setPaused] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const [next] = generateEvents(1);
      setEvents((p) => [{
        ...next,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }, ...p].slice(0, 250));
    }, 1800);
    return () => clearInterval(id);
  }, [paused]);
  const orgs = reactExports.useMemo(() => Array.from(new Set(events.map((e) => e.organization))), [events]);
  const filtered = reactExports.useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (sevFilter !== "all" && e.severity !== sevFilter) return false;
      if (orgFilter !== "all" && e.organization !== orgFilter) return false;
      if (q && !`${e.eventType} ${e.worker} ${e.queue} ${e.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [events, query, statusFilter, sevFilter, orgFilter]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Event Explorer", description: "Search and inspect every event flowing through the platform.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", onClick: () => setPaused(!paused), children: paused ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3 w-3" }),
        "Resume"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3 w-3" }),
        "Pause"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: paused ? "neutral" : "success", children: paused ? "paused" : "live" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-w-[280px] flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "event_type:user.signup AND status:failed", className: "h-8 border-border bg-card pl-8 font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Status", value: statusFilter, onChange: setStatusFilter, options: ["all", "success", "failed", "retrying"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Severity", value: sevFilter, onChange: setSevFilter, options: ["all", "info", "warning", "error", "critical"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Org", value: orgFilter, onChange: setOrgFilter, options: ["all", ...orgs] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-8 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-3 w-3" }),
        "More filters"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 text-[11px] font-mono text-muted-foreground", children: [
      filtered.length.toLocaleString(),
      " events · last 24h"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mb-6 overflow-hidden rounded-lg border border-border bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thin-scrollbar max-h-[calc(100vh-260px)] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 z-10 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Time" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Event ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Type" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Org" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Severity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Queue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Worker" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Latency" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-right text-[10px] font-mono uppercase", children: "Retries" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 w-8" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "cursor-pointer border-border text-xs hover:bg-accent/40", onClick: () => setSelected(e), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: format(new Date(e.timestamp), "HH:mm:ss.SSS") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: e.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px]", children: e.eventType }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-[11px]", children: e.organization }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[e.status], children: e.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: SEV_TONE[e.severity], children: e.severity }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: e.queue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 font-mono text-[11px] text-muted-foreground", children: e.worker.replace("worker-", "") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn("py-1.5 text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning"), children: [
          e.latencyMs,
          "ms"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5 text-right font-mono text-[11px] tabular-nums", children: e.retries }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }) })
      ] }, e.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!selected, onOpenChange: (o) => !o && setSelected(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { className: "w-full overflow-y-auto sm:max-w-xl", children: selected && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetTitle, { className: "flex items-center gap-2 font-mono text-sm", children: [
          selected.eventType,
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[selected.status], children: selected.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { className: "font-mono text-[11px]", children: [
          selected.id,
          " · ",
          formatDistanceToNow(new Date(selected.timestamp), {
            addSuffix: true
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Organization", value: selected.organization }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Queue", value: selected.queue }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Worker", value: selected.worker }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Latency", value: `${selected.latencyMs}ms` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Retries", value: selected.retries.toString() }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(KV, { label: "Severity", value: selected.severity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "payload", className: "mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "payload", className: "text-xs", children: "Payload" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "timeline", className: "text-xs", children: "Processing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "queue", className: "text-xs", children: "Queue history" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "retries", className: "text-xs", children: "Retries" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "payload", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: selected.payload }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "timeline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 text-xs", children: [["ingested", 0, "api-gateway"], ["validated", 3, "api-gateway"], ["enqueued", 5, selected.queue], ["dequeued", 14, selected.worker], ["processed", selected.latencyMs, selected.worker]].map(([k, t, src]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-md border border-border bg-background px-3 py-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-medium", children: k }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[11px] text-muted-foreground", children: src }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] tabular-nums", children: [
              "+",
              t,
              "ms"
            ] })
          ] }, k)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "queue", children: /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: {
            queue: selected.queue,
            partition: 3,
            offset: 184392018,
            consumer: selected.worker
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "retries", children: selected.retries === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-6 text-center text-xs text-muted-foreground", children: "No retries." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: Array.from({
            length: selected.retries
          }, (_, i) => ({
            attempt: i + 1,
            reason: "timeout",
            at: new Date(Date.now() - (i + 1) * 1500).toISOString()
          })) }) })
        ] })
      ] })
    ] }) }) })
  ] });
}
function KV({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background px-2.5 py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-xs", children: value })
  ] });
}
function FilterSelect({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value, onValueChange: onChange, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectTrigger, { className: "h-8 w-[140px] border-border bg-card text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        label,
        ":"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: o, className: "text-xs", children: o }, o)) })
  ] });
}
export {
  EventsPage as component
};
