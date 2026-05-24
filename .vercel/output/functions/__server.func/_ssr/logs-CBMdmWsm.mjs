import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-9rBCoVTg.mjs";
import { $ as generateLogs, aj as useUIStore, ai as useInspector, I as Input, F as cn, K as formatTime } from "./router-C7vl9p1Y.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a3 as Sparkles, S as Pause, U as Play, D as Download, $ as Save, T as Pin, a5 as Trash2, H as History } from "../_libs/lucide-react.mjs";
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
const LEVEL_COLOR = {
  debug: "text-muted-foreground",
  info: "text-info",
  warn: "text-warning",
  error: "text-destructive",
  critical: "text-destructive font-semibold"
};
function LogRow({ log, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      className: "grid w-full grid-cols-[88px_64px_140px_1fr] items-start gap-2 border-b border-border/50 px-3 py-1 text-left font-mono text-[11px] hover:bg-accent/40",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: formatTime(log.timestamp) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("uppercase", LEVEL_COLOR[log.level]), children: log.level }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground/80", children: log.service }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
          log.message,
          log.traceId && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground", children: [
            "trace=",
            log.traceId.slice(0, 12)
          ] })
        ] })
      ]
    }
  );
}
const LEVELS = ["debug", "info", "warn", "error", "critical"];
function LogsPage() {
  const [logs, setLogs] = reactExports.useState(() => generateLogs(300));
  const [q, setQ] = reactExports.useState("");
  const [lvl, setLvl] = reactExports.useState(new Set(LEVELS));
  const [pinned, setPinned] = reactExports.useState(/* @__PURE__ */ new Set());
  const [history, setHistory] = reactExports.useState([]);
  const [saved, setSaved] = reactExports.useState([]);
  const [showAi, setShowAi] = reactExports.useState(false);
  const {
    realtimeConnected,
    setRealtimeConnected
  } = useUIStore();
  const inspect = useInspector((s) => s.inspect);
  reactExports.useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("pulse-logs-saved") || "[]");
      const h = JSON.parse(localStorage.getItem("pulse-logs-history") || "[]");
      setSaved(s);
      setHistory(h);
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (!realtimeConnected) return;
    const t = setInterval(() => {
      setLogs((cur) => [...generateLogs(3), ...cur].slice(0, 800));
    }, 1500);
    return () => clearInterval(t);
  }, [realtimeConnected]);
  const filtered = reactExports.useMemo(() => logs.filter((l) => lvl.has(l.level) && (!q || l.message.includes(q) || l.service.includes(q))), [logs, q, lvl]);
  const pinnedLogs = reactExports.useMemo(() => logs.filter((l) => pinned.has(l.id)), [logs, pinned]);
  const toggle = (l) => setLvl((cur) => {
    const next = new Set(cur);
    next.has(l) ? next.delete(l) : next.add(l);
    return next;
  });
  const runQuery = () => {
    if (!q.trim()) return;
    const next = [q, ...history.filter((h) => h !== q)].slice(0, 8);
    setHistory(next);
    localStorage.setItem("pulse-logs-history", JSON.stringify(next));
  };
  const saveQuery = () => {
    if (!q.trim()) return toast.error("Enter a query first");
    const item = {
      id: Math.random().toString(36).slice(2, 8),
      name: q.slice(0, 40),
      q
    };
    const next = [item, ...saved];
    setSaved(next);
    localStorage.setItem("pulse-logs-saved", JSON.stringify(next));
    toast.success("Query saved");
  };
  const removeSaved = (id) => {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    localStorage.setItem("pulse-logs-saved", JSON.stringify(next));
  };
  const pin = (l) => {
    setPinned((cur) => {
      const next = new Set(cur);
      next.has(l.id) ? next.delete(l.id) : next.add(l.id);
      return next;
    });
  };
  const openInspector = (l) => {
    inspect({
      kind: "log",
      id: l.id,
      title: l.message,
      subtitle: `${l.service} · ${l.level}`,
      data: {
        ...l.attrs,
        timestamp: l.timestamp,
        level: l.level,
        service: l.service,
        traceId: l.traceId
      },
      relatedTraceId: l.traceId,
      service: l.service
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Logs", description: "Realtime structured logs from all services. Click a row to inspect, pin to follow, or save the query.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowAi(true), className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
        " AI summarize"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setRealtimeConnected(!realtimeConnected), className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
        realtimeConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-3.5 w-3.5" }),
        realtimeConnected ? "Pause stream" : "Resume stream"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
        " Export"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: q, onChange: (e) => setQ(e.target.value), onKeyDown: (e) => e.key === "Enter" && runQuery(), placeholder: "service:api-gateway level:error message:timeout", className: "h-8 max-w-md border-border bg-card font-mono text-xs" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveQuery, title: "Save query", className: "flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-xs hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3.5 w-3.5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1", children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggle(l), className: cn("rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase", lvl.has(l) ? "border-border bg-card text-foreground" : "border-border/40 bg-background text-muted-foreground/50"), children: l }, l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[11px] text-muted-foreground", children: [
        filtered.length,
        " lines ",
        realtimeConnected && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-success", children: "● live" })
      ] })
    ] }),
    showAi && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card/40 px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "AI summary · last 5 minutes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-muted-foreground", children: [
          "Detected ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-error", children: "42 error-level events" }),
          " concentrated in ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "event-service" }),
          " (eu-west-1). Pattern: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "redis.connection.timeout" }),
          " with rising frequency starting ~3min ago. Correlated with deploy ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "a3f2c91" }),
          ". Probable root cause: connection pool exhaustion."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setShowAi(false), className: "mt-2 font-mono text-[10px] text-muted-foreground hover:text-foreground", children: "dismiss" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_240px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        pinnedLogs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border bg-card/30", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-1.5 text-[10px] font-mono uppercase text-muted-foreground", children: [
            "Pinned · ",
            pinnedLogs.length
          ] }),
          pinnedLogs.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogRow, { log: l, onClick: () => openInspector(l) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
              e.stopPropagation();
              pin(l);
            }, className: "absolute right-2 top-1.5 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: "h-3 w-3 fill-current" }) })
          ] }, l.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", children: filtered.slice(0, 400).map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "group relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogRow, { log: l, onClick: () => openInspector(l) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: (e) => {
            e.stopPropagation();
            pin(l);
          }, className: "absolute right-2 top-1.5 text-muted-foreground opacity-0 hover:text-primary group-hover:opacity-100", title: "Pin log", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, { className: cn("h-3 w-3", pinned.has(l.id) && "fill-current text-primary opacity-100") }) })
        ] }, l.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "thin-scrollbar hidden border-l border-border bg-card/30 p-3 lg:block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "h-3 w-3" }),
            " Saved queries"
          ] }),
          saved.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70", children: "None yet" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: saved.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "group flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQ(s.q), className: "flex-1 truncate rounded px-1.5 py-1 text-left font-mono text-[11px] hover:bg-accent", children: s.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => removeSaved(s.id), className: "opacity-0 hover:text-destructive group-hover:opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
          ] }, s.id)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "h-3 w-3" }),
            " History"
          ] }),
          history.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground/70", children: "No recent queries" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: history.map((h, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQ(h), className: "block w-full truncate rounded px-1.5 py-1 text-left font-mono text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground", children: h }) }, i)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  LogsPage as component
};
