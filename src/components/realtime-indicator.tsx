import { useEffect, useRef, useState } from "react";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { USE_API } from "@/lib/api/config";
import { getWsUrl } from "@/lib/api/ws";
import { cn } from "@/lib/utils";

export function RealtimeIndicator() {
  const { realtimeConnected, setRealtimeConnected } = useUIStore();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [tick, setTick] = useState(0);
  const [evPerSec, setEvPerSec] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!USE_API || !accessToken) {
      setRealtimeConnected(true);
      return () => setRealtimeConnected(false);
    }

    const url = getWsUrl();
    if (!url) return;

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => setRealtimeConnected(true);
    ws.onclose = () => setRealtimeConnected(false);
    ws.onerror = () => setRealtimeConnected(false);
    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data as string) as { channel?: string };
        if (msg.channel === "events:live") {
          setEvPerSec((n) => Math.min(9999, n + 1));
        }
      } catch {
        /* ignore */
      }
    };

    const decay = setInterval(() => setEvPerSec((n) => Math.max(0, n - 1)), 1000);

    return () => {
      clearInterval(decay);
      ws.close();
      setRealtimeConnected(false);
    };
  }, [accessToken, setRealtimeConnected]);

  const displayRate = USE_API && evPerSec > 0 ? evPerSec : 800 + ((tick * 37) % 240);

  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5">
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          realtimeConnected ? "bg-success pulse-dot" : "bg-muted-foreground",
        )}
      />
      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {realtimeConnected ? "live" : "offline"}
      </span>
      <span key={tick} className="hidden font-mono text-[10px] text-muted-foreground/70 md:inline">
        · {displayRate.toFixed(0)} ev/s
      </span>
    </div>
  );
}
