import { type Alert } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";
import { AlertTriangle, Check } from "lucide-react";

const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" } as const;

export function AlertCard({ alert, onAck }: { alert: Alert; onAck?: (id: string) => void }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded border border-border bg-background text-muted-foreground">
        <AlertTriangle className="h-3.5 w-3.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium">{alert.title}</p>
          <StatusBadge tone={SEV_TONE[alert.severity]}>{alert.severity}</StatusBadge>
          {alert.acknowledged && <StatusBadge tone="neutral">acked</StatusBadge>}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{alert.description}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase text-muted-foreground">
          <span>{alert.service}</span>
          <span>·</span>
          <span>{alert.source}</span>
          <span>·</span>
          <span>{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
        </div>
      </div>
      {!alert.acknowledged && onAck && (
        <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => onAck(alert.id)}>
          <Check className="h-3 w-3" /> Ack
        </Button>
      )}
    </div>
  );
}
