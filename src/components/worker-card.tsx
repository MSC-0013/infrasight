import { type Worker } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Cpu, MemoryStick } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const STATUS_TONE = { online: "success", offline: "error", degraded: "warning" } as const;

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-3">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-semibold">{worker.name}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{worker.region}</p>
        </div>
        <StatusBadge tone={STATUS_TONE[worker.status]}>{worker.status}</StatusBadge>
      </div>

      <div className="space-y-2">
        <Resource icon={Cpu} label="CPU" value={worker.cpu} />
        <Resource icon={MemoryStick} label="MEM" value={worker.memory} />
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-border pt-2 text-[11px]">
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Jobs</p>
          <p className="tabular-nums">{(worker.jobsProcessed / 1000).toFixed(1)}k</p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Retries</p>
          <p className="tabular-nums">{worker.retries}</p>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Uptime</p>
          <p className="tabular-nums">{worker.uptimeHours}h</p>
        </div>
      </div>

      <p className="font-mono text-[10px] text-muted-foreground">
        heartbeat · {formatDistanceToNow(new Date(worker.lastHeartbeat), { addSuffix: true })}
      </p>
    </div>
  );
}

function Resource({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number }) {
  const color = value > 85 ? "bg-destructive" : value > 70 ? "bg-warning" : "bg-success";
  return (
    <div>
      <div className="mb-0.5 flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground">
        <span className="flex items-center gap-1"><Icon className="h-3 w-3" /> {label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>
      <div className="h-1 overflow-hidden rounded bg-muted">
        <div className={color} style={{ width: `${value}%`, height: "100%" }} />
      </div>
    </div>
  );
}
