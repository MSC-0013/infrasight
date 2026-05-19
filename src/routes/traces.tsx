import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { generateTraces, type Trace } from "@/lib/mock-data";
import { formatDistanceToNow } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/traces")({
  head: () => ({ meta: [{ title: "Traces — Pulse" }, { name: "description", content: "Distributed trace explorer" }] }),
  component: TracesPage,
});

const tone = (s: Trace["status"]) =>
  s === "ok" ? "success" : s === "degraded" ? "warning" : "error";

function TracesPage() {
  const traces = useMemo(() => generateTraces(60), []);
  const [q, setQ] = useState("");
  const filtered = traces.filter((t) =>
    !q || t.id.includes(q) || t.rootOperation.includes(q) || t.rootService.includes(q)
  );

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Distributed traces"
        description="Trace requests across services. Click a trace to open the span waterfall."
      />
      <div className="flex items-center gap-2 border-b border-border bg-background px-6 py-3">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="trace.id, service, operation… try: duration:>1000ms"
            className="h-8 border-border bg-card pl-8 font-mono text-xs"
          />
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">{filtered.length} traces</span>
      </div>
      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="grid grid-cols-[160px_1fr_120px_120px_120px_100px_80px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground">
            <span>Trace ID</span>
            <span>Operation</span>
            <span>Root service</span>
            <span>Services</span>
            <span>Duration</span>
            <span>Spans</span>
            <span>Status</span>
          </div>
          {filtered.map((t) => (
            <Link
              key={t.id}
              to="/traces/$traceId"
              params={{ traceId: t.id }}
              className="grid grid-cols-[160px_1fr_120px_120px_120px_100px_80px] items-center border-b border-border/60 px-3 py-2 text-xs hover:bg-accent/40"
            >
              <span className="truncate font-mono text-[11px]">{t.id.slice(0, 16)}</span>
              <span className="truncate">
                <span className="font-medium">{t.rootOperation}</span>
                <span className="ml-2 font-mono text-[10px] text-muted-foreground">{formatDistanceToNow(t.startedAt)}</span>
              </span>
              <span className="truncate font-mono text-[11px]">{t.rootService}</span>
              <span className="font-mono text-[11px]">{t.services.length}</span>
              <span className="font-mono text-[11px]">{t.durationMs}ms</span>
              <span className="font-mono text-[11px]">{t.spanCount}</span>
              <span><StatusBadge tone={tone(t.status)}>{t.status}</StatusBadge></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
