import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { LogRow } from "@/components/log-row";
import { generateLogs, type LogLine, type LogLevel } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Pause, Play, Download, Pin, Save, History, Sparkles, Trash2 } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useInspector } from "@/store/inspector-store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/logs")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:logs")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Logs — Pulse" }, { name: "description", content: "Structured log explorer" }] }),
  component: LogsPage,
});

const LEVELS: LogLevel[] = ["debug", "info", "warn", "error", "critical"];

interface SavedQuery { id: string; name: string; q: string }

function LogsPage() {
  const [logs, setLogs] = useState<LogLine[]>(() => generateLogs(300));
  const [q, setQ] = useState("");
  const [lvl, setLvl] = useState<Set<LogLevel>>(new Set(LEVELS));
  const [pinned, setPinned] = useState<Set<string>>(new Set());
  const [history, setHistory] = useState<string[]>([]);
  const [saved, setSaved] = useState<SavedQuery[]>([]);
  const [showAi, setShowAi] = useState(false);
  const { realtimeConnected, setRealtimeConnected } = useUIStore();
  const inspect = useInspector((s) => s.inspect);

  // Load persisted
  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem("pulse-logs-saved") || "[]");
      const h = JSON.parse(localStorage.getItem("pulse-logs-history") || "[]");
      setSaved(s); setHistory(h);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!realtimeConnected) return;
    const t = setInterval(() => {
      setLogs((cur) => [...generateLogs(3), ...cur].slice(0, 800));
    }, 1500);
    return () => clearInterval(t);
  }, [realtimeConnected]);

  const filtered = useMemo(
    () => logs.filter((l) => lvl.has(l.level) && (!q || l.message.includes(q) || l.service.includes(q))),
    [logs, q, lvl]
  );

  const pinnedLogs = useMemo(() => logs.filter((l) => pinned.has(l.id)), [logs, pinned]);

  const toggle = (l: LogLevel) =>
    setLvl((cur) => {
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
    const item: SavedQuery = { id: Math.random().toString(36).slice(2, 8), name: q.slice(0, 40), q };
    const next = [item, ...saved];
    setSaved(next);
    localStorage.setItem("pulse-logs-saved", JSON.stringify(next));
    toast.success("Query saved");
  };

  const removeSaved = (id: string) => {
    const next = saved.filter((s) => s.id !== id);
    setSaved(next);
    localStorage.setItem("pulse-logs-saved", JSON.stringify(next));
  };

  const pin = (l: LogLine) => {
    setPinned((cur) => {
      const next = new Set(cur);
      next.has(l.id) ? next.delete(l.id) : next.add(l.id);
      return next;
    });
  };

  const openInspector = (l: LogLine) => {
    inspect({
      kind: "log",
      id: l.id,
      title: l.message,
      subtitle: `${l.service} · ${l.level}`,
      data: { ...l.attrs, timestamp: l.timestamp, level: l.level, service: l.service, traceId: l.traceId },
      relatedTraceId: l.traceId,
      service: l.service,
    });
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Logs"
        description="Realtime structured logs from all services. Click a row to inspect, pin to follow, or save the query."
        actions={
          <>
            <button
              onClick={() => setShowAi(true)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" /> AI summarize
            </button>
            <button
              onClick={() => setRealtimeConnected(!realtimeConnected)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent"
            >
              {realtimeConnected ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {realtimeConnected ? "Pause stream" : "Resume stream"}
            </button>
            <button className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && runQuery()}
          placeholder="service:api-gateway level:error message:timeout"
          className="h-8 max-w-md border-border bg-card font-mono text-xs"
        />
        <button onClick={saveQuery} title="Save query" className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-card px-2 text-xs hover:bg-accent">
          <Save className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-1">
          {LEVELS.map((l) => (
            <button
              key={l}
              onClick={() => toggle(l)}
              className={cn(
                "rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase",
                lvl.has(l) ? "border-border bg-card text-foreground" : "border-border/40 bg-background text-muted-foreground/50"
              )}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          {filtered.length} lines {realtimeConnected && <span className="ml-2 text-success">● live</span>}
        </span>
      </div>

      {showAi && (
        <div className="border-b border-border bg-card/40 px-6 py-3">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="flex-1 text-xs">
              <p className="font-medium">AI summary · last 5 minutes</p>
              <p className="mt-1 text-muted-foreground">
                Detected <span className="text-error">42 error-level events</span> concentrated in <span className="font-mono">event-service</span> (eu-west-1).
                Pattern: <span className="font-mono">redis.connection.timeout</span> with rising frequency starting ~3min ago.
                Correlated with deploy <span className="font-mono">a3f2c91</span>. Probable root cause: connection pool exhaustion.
              </p>
              <button onClick={() => setShowAi(false)} className="mt-2 font-mono text-[10px] text-muted-foreground hover:text-foreground">dismiss</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
        <div>
          {pinnedLogs.length > 0 && (
            <div className="border-b border-border bg-card/30">
              <div className="px-6 py-1.5 text-[10px] font-mono uppercase text-muted-foreground">Pinned · {pinnedLogs.length}</div>
              {pinnedLogs.map((l) => (
                <div key={l.id} className="relative">
                  <LogRow log={l} onClick={() => openInspector(l)} />
                  <button onClick={(e) => { e.stopPropagation(); pin(l); }} className="absolute right-2 top-1.5 text-primary">
                    <Pin className="h-3 w-3 fill-current" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="overflow-hidden">
            {filtered.slice(0, 400).map((l) => (
              <div key={l.id} className="group relative">
                <LogRow log={l} onClick={() => openInspector(l)} />
                <button
                  onClick={(e) => { e.stopPropagation(); pin(l); }}
                  className="absolute right-2 top-1.5 text-muted-foreground opacity-0 hover:text-primary group-hover:opacity-100"
                  title="Pin log"
                >
                  <Pin className={cn("h-3 w-3", pinned.has(l.id) && "fill-current text-primary opacity-100")} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <aside className="thin-scrollbar hidden border-l border-border bg-card/30 p-3 lg:block">
          <div className="mb-4">
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground">
              <Save className="h-3 w-3" /> Saved queries
            </div>
            {saved.length === 0 ? (
              <p className="text-[11px] text-muted-foreground/70">None yet</p>
            ) : (
              <ul className="space-y-1">
                {saved.map((s) => (
                  <li key={s.id} className="group flex items-center gap-1">
                    <button onClick={() => setQ(s.q)} className="flex-1 truncate rounded px-1.5 py-1 text-left font-mono text-[11px] hover:bg-accent">{s.name}</button>
                    <button onClick={() => removeSaved(s.id)} className="opacity-0 hover:text-destructive group-hover:opacity-100">
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase text-muted-foreground">
              <History className="h-3 w-3" /> History
            </div>
            {history.length === 0 ? (
              <p className="text-[11px] text-muted-foreground/70">No recent queries</p>
            ) : (
              <ul className="space-y-1">
                {history.map((h, i) => (
                  <li key={i}>
                    <button onClick={() => setQ(h)} className="block w-full truncate rounded px-1.5 py-1 text-left font-mono text-[11px] text-muted-foreground hover:bg-accent hover:text-foreground">{h}</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
