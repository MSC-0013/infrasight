import { type Queue } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Progress } from "@/components/ui/progress";

const STATUS_TONE = { healthy: "success", degraded: "warning", backlogged: "error" } as const;

export function QueueCard({ queue }: { queue: Queue }) {
  const pct = Math.min(100, (queue.messages / 14000) * 100);
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-xs font-semibold">{queue.name}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{queue.consumers} consumers</p>
        </div>
        <StatusBadge tone={STATUS_TONE[queue.status]}>{queue.status}</StatusBadge>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <Stat label="Messages" value={queue.messages.toLocaleString()} />
        <Stat label="Lag" value={`${queue.lagMs}ms`} />
        <Stat label="Throughput" value={`${queue.throughput}/s`} />
        <Stat label="Retries" value={queue.retries.toString()} />
        <Stat label="DLQ" value={queue.dlq.toString()} tone={queue.dlq > 80 ? "error" : undefined} />
        <Stat label="Backlog" value={`${pct.toFixed(0)}%`} />
      </div>

      <div>
        <div className="mb-1 flex justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <span>capacity</span><span>{pct.toFixed(0)}%</span>
        </div>
        <Progress value={pct} className="h-1" />
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "error" }) {
  return (
    <div>
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`tabular-nums ${tone === "error" ? "text-destructive" : ""}`}>{value}</p>
    </div>
  );
}
