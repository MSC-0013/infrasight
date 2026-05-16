import { useEffect, useState } from "react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function RealtimeIndicator() {
  const { realtimeConnected } = useUIStore();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          realtimeConnected ? "bg-success pulse-dot" : "bg-muted-foreground"
        )}
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {realtimeConnected ? "live" : "offline"}
      </span>
      <span key={tick} className="hidden font-mono text-[10px] text-muted-foreground/70 md:inline">
        · {(800 + ((tick * 37) % 240)).toFixed(0)} ev/s
      </span>
    </div>
  );
}
