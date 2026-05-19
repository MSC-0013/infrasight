import type { LogLine } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { formatTime } from "@/lib/format";

const LEVEL_COLOR: Record<LogLine["level"], string> = {
  debug: "text-muted-foreground",
  info: "text-info",
  warn: "text-warning",
  error: "text-destructive",
  critical: "text-destructive font-semibold",
};

export function LogRow({ log, onClick }: { log: LogLine; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="grid w-full grid-cols-[88px_64px_140px_1fr] items-start gap-2 border-b border-border/50 px-3 py-1 text-left font-mono text-[11px] hover:bg-accent/40"
    >
      <span className="text-muted-foreground">{formatTime(log.timestamp)}</span>
      <span className={cn("uppercase", LEVEL_COLOR[log.level])}>{log.level}</span>
      <span className="truncate text-foreground/80">{log.service}</span>
      <span className="truncate">
        {log.message}
        {log.traceId && (
          <span className="ml-2 text-muted-foreground">trace={log.traceId.slice(0, 12)}</span>
        )}
      </span>
    </button>
  );
}
