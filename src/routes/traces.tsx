import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { EmptyState } from "@/components/ui-states";
import { generateTraces, type Trace } from "@/lib/mock-data";
import { formatDistanceToNow } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Search, Workflow } from "lucide-react";

interface TracesSearch {
  q: string;
  status: string;
}

export const Route = createFileRoute("/traces")({
  head: () => ({ meta: [{ title: "Traces — Pulse" }, { name: "description", content: "Distributed trace explorer" }] }),
  validateSearch: (s: Record<string, unknown>): TracesSearch => ({
    q: typeof s.q === "string" ? s.q : "",
    status: typeof s.status === "string" ? s.status : "all",
  }),
  component: TracesPage,
});

const tone = (s: Trace["status"]) =>
  s === "ok" ? "success" : s === "degraded" ? "warning" : "error";

function TracesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/traces" });
  const setSearch = (patch: Partial<TracesSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) as TracesSearch, replace: true });

  const traces = useMemo(() => generateTraces(60), []);
  const filtered = traces.filter((t) => {
    if (search.status !== "all" && t.status !== search.status) return false;
    if (search.q && !(t.id.includes(search.q) || t.rootOperation.includes(search.q) || t.rootService.includes(search.q))) return false;
    return true;
  });

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Distributed traces"
        description="Trace requests across services. Click a trace to open the span waterfall."
      />
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search.q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="trace.id, service, operation… try: duration:>1000ms"
            className="h-8 border-border bg-card pl-8 font-mono text-xs"
          />
        </div>
        <div className="flex items-center gap-1">
          {(["all", "ok", "degraded", "error"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSearch({ status: s })}
              className={`rounded border px-2 py-1 font-mono text-[10px] uppercase ${
                search.status === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">{filtered.length} traces</span>
      </div>
      <div className="px-6 py-4">
        {filtered.length === 0 ? (
          <EmptyState title="No traces match" description="Adjust the query or status filter." icon={Workflow} />
        ) : (
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
        )}
      </div>
    </div>
  );
}
