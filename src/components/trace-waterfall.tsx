import { useMemo, useState } from "react";
import type { TraceSpan } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { StatusBadge } from "@/components/status-badge";

const SERVICE_COLOR: Record<string, string> = {
  "api-gateway": "bg-primary/70",
  "auth-service": "bg-chart-2/80",
  "event-service": "bg-chart-3/80",
  "redis-cluster": "bg-chart-4/80",
  "worker-service": "bg-chart-5/80",
  "ml-service": "bg-warning/80",
  "postgres-primary": "bg-chart-1/80",
  "analytics-service": "bg-success/70",
};

export function TraceWaterfall({ spans }: { spans: TraceSpan[] }) {
  const total = useMemo(
    () => Math.max(...spans.map((s) => s.startMs + s.durationMs), 1),
    [spans]
  );
  const [selected, setSelected] = useState<TraceSpan | null>(null);

  return (
    <div className="grid grid-cols-[1fr_320px] gap-0 rounded-md border border-border bg-card">
      <div className="thin-scrollbar overflow-auto">
        <div className="sticky top-0 z-10 grid grid-cols-[220px_1fr_80px] border-b border-border bg-card px-3 py-1.5 text-[10px] font-mono uppercase text-muted-foreground">
          <span>Service · Op</span>
          <span>Waterfall · {total}ms</span>
          <span className="text-right">Duration</span>
        </div>
        {spans.map((s) => {
          const left = (s.startMs / total) * 100;
          const width = Math.max(0.5, (s.durationMs / total) * 100);
          return (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className={cn(
                "grid w-full grid-cols-[220px_1fr_80px] items-center gap-2 border-b border-border/60 px-3 py-1.5 text-left text-xs hover:bg-accent/50",
                selected?.id === s.id && "bg-accent/50"
              )}
            >
              <div className="min-w-0">
                <div className="truncate font-medium">{s.service}</div>
                <div className="truncate font-mono text-[10px] text-muted-foreground">{s.operation}</div>
              </div>
              <div className="relative h-4">
                <div
                  className={cn(
                    "absolute top-1 h-2 rounded-sm",
                    SERVICE_COLOR[s.service] ?? "bg-primary/70",
                    s.status === "error" && "ring-1 ring-destructive"
                  )}
                  style={{ left: `${left}%`, width: `${width}%` }}
                />
              </div>
              <div className="text-right font-mono text-[11px]">
                {s.durationMs}ms
              </div>
            </button>
          );
        })}
      </div>
      <div className="border-l border-border p-3">
        {selected ? (
          <div className="space-y-3">
            <div>
              <div className="text-[10px] font-mono uppercase text-muted-foreground">Span</div>
              <div className="text-sm font-semibold">{selected.operation}</div>
              <div className="font-mono text-[11px] text-muted-foreground">{selected.service}</div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Field k="kind" v={selected.kind} />
              <Field k="status" v={
                <StatusBadge tone={selected.status === "error" ? "error" : "success"}>{selected.status}</StatusBadge>
              } />
              <Field k="start" v={`${selected.startMs}ms`} />
              <Field k="duration" v={`${selected.durationMs}ms`} />
            </div>
            <div>
              <div className="mb-1 text-[10px] font-mono uppercase text-muted-foreground">Attributes</div>
              <pre className="thin-scrollbar max-h-64 overflow-auto rounded border border-border bg-background p-2 font-mono text-[10px] leading-relaxed">
                {JSON.stringify(selected.attributes, null, 2)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-xs text-muted-foreground">
            Select a span to inspect.
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{k}</div>
      <div className="mt-0.5 font-mono text-[11px]">{v}</div>
    </div>
  );
}
