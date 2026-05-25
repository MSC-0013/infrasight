import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./page-header-Bz_zc9qw.mjs";
import { p as Route$a, X as generateEvents, B as Button, y as StatusBadge, I as Input, h as DropdownMenu, m as DropdownMenuTrigger, j as DropdownMenuContent, k as DropdownMenuLabel, l as DropdownMenuSeparator, i as DropdownMenuCheckboxItem, F as cn, S as Sheet, u as SheetContent, w as SheetHeader, x as SheetTitle, v as SheetDescription, T as Tabs, A as TabsList, C as TabsTrigger, z as TabsContent, J as JSONViewer } from "./router-BDT-YXA5.mjs";
import { E as EmptyState } from "./empty-state-BIeTCMUw.mjs";
import { C as Checkbox, S as Select, c as SelectTrigger, d as SelectValue, a as SelectContent, b as SelectItem } from "./select-DsQ7qI0z.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-B9PNYB9V.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { T as Play, R as Pause, $ as Search, ac as X, Z as Rows3, p as Columns3, Y as RotateCw, D as Download, j as ChevronRight, k as ChevronUp, h as ChevronDown } from "../_libs/lucide-react.mjs";
import { f as format, a as formatDistanceToNow } from "../_libs/date-fns.mjs";
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
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
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
const ALL_COLS = ["time", "id", "type", "org", "status", "severity", "queue", "worker", "latency", "retries"];
function EventsPage() {
  const rawSearch = Route$a.useSearch();
  const search = reactExports.useMemo(() => ({
    q: rawSearch.q ?? "",
    status: rawSearch.status ?? "all",
    sev: rawSearch.sev ?? "all",
    org: rawSearch.org ?? "all",
    sort: rawSearch.sort ?? "time",
    dir: rawSearch.dir ?? "desc",
    density: rawSearch.density ?? "compact"
  }), [rawSearch.q, rawSearch.status, rawSearch.sev, rawSearch.org, rawSearch.sort, rawSearch.dir, rawSearch.density]);
  const navigate = useNavigate({
    from: "/events"
  });
  const setSearch = (patch) => navigate({
    search: (prev) => ({
      ...prev,
      ...patch
    }),
    replace: true
  });
  const [events, setEvents] = reactExports.useState(reactExports.useMemo(() => generateEvents(150), []));
  const [paused, setPaused] = reactExports.useState(false);
  const [selected, setSelected] = reactExports.useState(null);
  const [checked, setChecked] = reactExports.useState(/* @__PURE__ */ new Set());
  const [cols, setCols] = reactExports.useState(() => {
    try {
      const raw = localStorage.getItem("pulse-events-cols");
      if (raw) return new Set(JSON.parse(raw));
    } catch {
    }
    return new Set(ALL_COLS);
  });
  reactExports.useEffect(() => {
    localStorage.setItem("pulse-events-cols", JSON.stringify(Array.from(cols)));
  }, [cols]);
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
    const q = search.q.toLowerCase();
    const out = events.filter((e) => {
      if (search.status !== "all" && e.status !== search.status) return false;
      if (search.sev !== "all" && e.severity !== search.sev) return false;
      if (search.org !== "all" && e.organization !== search.org) return false;
      if (q && !`${e.eventType} ${e.worker} ${e.queue} ${e.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = search.dir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      switch (search.sort) {
        case "latency":
          return (a.latencyMs - b.latencyMs) * dir;
        case "retries":
          return (a.retries - b.retries) * dir;
        case "type":
          return a.eventType.localeCompare(b.eventType) * dir;
        default:
          return (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) * dir;
      }
    });
    return out;
  }, [events, search]);
  const allChecked = filtered.length > 0 && filtered.every((e) => checked.has(e.id));
  const someChecked = checked.size > 0 && !allChecked;
  const hasFilters = search.q || search.status !== "all" || search.sev !== "all" || search.org !== "all";
  const toggleAll = () => {
    if (allChecked) setChecked(/* @__PURE__ */ new Set());
    else setChecked(new Set(filtered.map((e) => e.id)));
  };
  const toggleOne = (id) => {
    setChecked((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const bulkRetry = () => {
    toast.success(`Queued retry for ${checked.size} event${checked.size > 1 ? "s" : ""}`);
    setChecked(/* @__PURE__ */ new Set());
  };
  const bulkExport = () => {
    toast.success(`Exporting ${checked.size} events as CSV…`);
  };
  const clearFilters = () => setSearch({
    q: "",
    status: "all",
    sev: "all",
    org: "all"
  });
  const toggleSort = (key) => {
    if (search.sort === key) setSearch({
      dir: search.dir === "asc" ? "desc" : "asc"
    });
    else setSearch({
      sort: key,
      dir: "desc"
    });
  };
  const rowPad = search.density === "compact" ? "py-1" : "py-2.5";
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
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search.q, onChange: (e) => setSearch({
          q: e.target.value
        }), placeholder: "event_type:user.signup AND status:failed", className: "h-8 border-border bg-card pl-8 font-mono text-xs" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Status", value: search.status, onChange: (v) => setSearch({
        status: v
      }), options: ["all", "success", "failed", "retrying"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Severity", value: search.sev, onChange: (v) => setSearch({
        sev: v
      }), options: ["all", "info", "warning", "error", "critical"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterSelect, { label: "Org", value: search.org, onChange: (v) => setSearch({
        org: v
      }), options: ["all", ...orgs] }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "h-8 gap-1.5 text-xs text-muted-foreground", onClick: clearFilters, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
        " Clear"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "h-8 w-8 p-0", title: search.density === "compact" ? "Comfortable rows" : "Compact rows", onClick: () => setSearch({
          density: search.density === "compact" ? "comfortable" : "compact"
        }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rows3, { className: "h-3 w-3" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-8 gap-1.5 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Columns3, { className: "h-3 w-3" }),
            "Columns"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-44", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Visible columns" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            ALL_COLS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuCheckboxItem, { checked: cols.has(c), onCheckedChange: (v) => {
              setCols((cur) => {
                const next = new Set(cur);
                if (v) next.add(c);
                else next.delete(c);
                return next;
              });
            }, className: "text-xs capitalize", children: c }, c))
          ] })
        ] })
      ] })
    ] }),
    checked.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 border-b border-primary/30 bg-primary/5 px-6 py-2 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
        checked.size,
        " selected"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", onClick: bulkRetry, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { className: "h-3 w-3" }),
        " Retry"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "h-7 gap-1.5 text-xs", onClick: bulkExport, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3 w-3" }),
        " Export"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", className: "ml-auto h-7 gap-1.5 text-xs", onClick: () => setChecked(/* @__PURE__ */ new Set()), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3" }),
        " Clear"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3 text-[11px] font-mono text-muted-foreground", children: [
      filtered.length.toLocaleString(),
      " events · sorted by ",
      search.sort,
      " ",
      search.dir
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-6 mb-6 overflow-hidden rounded-lg border border-border bg-card", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "No events match your filters", description: hasFilters ? "Try clearing some filters or adjusting your query." : "Waiting for the next event to arrive.", icon: Search }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thin-scrollbar max-h-[calc(100vh-300px)] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { className: "sticky top-0 z-10 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 w-8 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: allChecked || someChecked && "indeterminate", onCheckedChange: toggleAll }) }),
        cols.has("time") && /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHead, { label: "Time", k: "time", sort: search.sort, dir: search.dir, onClick: toggleSort }),
        cols.has("id") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Event ID" }),
        cols.has("type") && /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHead, { label: "Type", k: "type", sort: search.sort, dir: search.dir, onClick: toggleSort }),
        cols.has("org") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Org" }),
        cols.has("status") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" }),
        cols.has("severity") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Severity" }),
        cols.has("queue") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Queue" }),
        cols.has("worker") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Worker" }),
        cols.has("latency") && /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHead, { label: "Latency", k: "latency", sort: search.sort, dir: search.dir, onClick: toggleSort, align: "right" }),
        cols.has("retries") && /* @__PURE__ */ jsxRuntimeExports.jsx(SortableHead, { label: "Retries", k: "retries", sort: search.sort, dir: search.dir, onClick: toggleSort, align: "right" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 w-8" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: cn("cursor-pointer border-border text-xs hover:bg-accent/40", checked.has(e.id) && "bg-primary/5"), onClick: () => setSelected(e), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "px-2"), onClick: (ev) => ev.stopPropagation(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: checked.has(e.id), onCheckedChange: () => toggleOne(e.id) }) }),
        cols.has("time") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "font-mono text-[11px] text-muted-foreground"), children: format(new Date(e.timestamp), "HH:mm:ss.SSS") }),
        cols.has("id") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "font-mono text-[11px]"), children: e.id }),
        cols.has("type") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "font-mono text-[11px]"), children: e.eventType }),
        cols.has("org") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "text-[11px]"), children: e.organization }),
        cols.has("status") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: rowPad, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: STATUS_TONE[e.status], children: e.status }) }),
        cols.has("severity") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: rowPad, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: SEV_TONE[e.severity], children: e.severity }) }),
        cols.has("queue") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "font-mono text-[11px] text-muted-foreground"), children: e.queue }),
        cols.has("worker") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "font-mono text-[11px] text-muted-foreground"), children: e.worker.replace("worker-", "") }),
        cols.has("latency") && /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: cn(rowPad, "text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning"), children: [
          e.latencyMs,
          "ms"
        ] }),
        cols.has("retries") && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: cn(rowPad, "text-right font-mono text-[11px] tabular-nums"), children: e.retries }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: rowPad, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" }) })
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
function SortableHead({
  label,
  k,
  sort,
  dir,
  onClick,
  align
}) {
  const active = sort === k;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: cn("h-8 text-[10px] font-mono uppercase", align === "right" && "text-right"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => onClick(k), className: cn("inline-flex items-center gap-1 hover:text-foreground", active ? "text-foreground" : "text-muted-foreground"), children: [
    label,
    active && (dir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3" }))
  ] }) });
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
