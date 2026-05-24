import { cn } from "@/lib/utils";
import { AlertTriangle, Loader2, WifiOff, Clock, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export { EmptyState } from "./empty-state";

export function LoadingState({ label = "Loading", className }: { label?: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 px-6 py-12 text-center", className)}>
      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      <p className="text-xs font-mono text-muted-foreground">{label}…</p>
    </div>
  );
}

export function TableSkeleton({ rows = 8, cols = 6 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-1.5 p-3">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-2">
          {Array.from({ length: cols }).map((_, c) => (
            <Skeleton key={c} className="h-5 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-destructive/40 bg-destructive/5 px-6 py-12 text-center", className)}>
      <AlertTriangle className="h-6 w-6 text-destructive" />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-md text-xs text-muted-foreground">{description}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent"
        >
          <RefreshCw className="h-3 w-3" /> Retry
        </button>
      )}
    </div>
  );
}

export function OfflineBanner({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-warning/30 bg-warning/10 px-6 py-1.5 text-[11px] text-warning-foreground">
      <WifiOff className="h-3 w-3 text-warning" />
      <span className="font-mono">Realtime stream disconnected — data may be stale.</span>
      {onRetry && (
        <button onClick={onRetry} className="ml-auto underline hover:no-underline">
          Reconnect
        </button>
      )}
    </div>
  );
}

export function StaleBanner({ since, onRefresh }: { since: string; onRefresh?: () => void }) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-6 py-1.5 text-[11px] text-muted-foreground">
      <Clock className="h-3 w-3" />
      <span className="font-mono">Stale data · last updated {since}</span>
      {onRefresh && (
        <button onClick={onRefresh} className="ml-auto inline-flex items-center gap-1 underline hover:no-underline">
          <RefreshCw className="h-2.5 w-2.5" /> Refresh
        </button>
      )}
    </div>
  );
}
