import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { LogRow } from "@/components/log-row";
import { JSONViewer } from "@/components/json-viewer";
import { generateLogs, type LogLine, type LogLevel } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Pause, Play, Download } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/logs")({
  head: () => ({ meta: [{ title: "Logs — Pulse" }, { name: "description", content: "Structured log explorer" }] }),
  component: LogsPage,
});

const LEVELS: LogLevel[] = ["debug", "info", "warn", "error", "critical"];

function LogsPage() {
  const [logs, setLogs] = useState<LogLine[]>(() => generateLogs(300));
  const [q, setQ] = useState("");
  const [lvl, setLvl] = useState<Set<LogLevel>>(new Set(LEVELS));
  const [selected, setSelected] = useState<LogLine | null>(null);
  const { realtimeConnected, setRealtimeConnected } = useUIStore();

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

  const toggle = (l: LogLevel) =>
    setLvl((cur) => {
      const next = new Set(cur);
      next.has(l) ? next.delete(l) : next.add(l);
      return next;
    });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Logs"
        description="Realtime structured logs from all services. Click a row to inspect attributes."
        actions={
          <>
            <button
              onClick={() => setRealtimeConnected(!realtimeConnected)}
              className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent"
            >
              {realtimeConnected ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {realtimeConnected ? "Pause" : "Live"}
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
          placeholder="service:api-gateway level:error message:timeout"
          className="h-8 max-w-md border-border bg-card font-mono text-xs"
        />
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
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{filtered.length} lines</span>
      </div>
      <div className="overflow-hidden">
        {filtered.slice(0, 400).map((l) => (
          <LogRow key={l.id} log={l} onClick={() => setSelected(l)} />
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-[480px] sm:max-w-[480px]">
          <SheetHeader>
            <SheetTitle className="font-mono text-sm">Log entry</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-4 space-y-3">
              <div className="space-y-1 font-mono text-xs">
                <div><span className="text-muted-foreground">ts</span> {selected.timestamp}</div>
                <div><span className="text-muted-foreground">level</span> {selected.level}</div>
                <div><span className="text-muted-foreground">service</span> {selected.service}</div>
                {selected.traceId && (
                  <div><span className="text-muted-foreground">trace</span> {selected.traceId}</div>
                )}
              </div>
              <div className="rounded-md border border-border bg-background p-3 font-mono text-xs">
                {selected.message}
              </div>
              <JSONViewer data={selected.attrs} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
