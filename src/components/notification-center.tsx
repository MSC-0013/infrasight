import { useMemo } from "react";
import { Bell, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { Notification } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { formatDistanceToNow } from "@/lib/format";
import { usePulseNotifications, useMarkNotificationRead } from "@/lib/pulse-hooks";

const sevTone: Record<string, "info" | "warning" | "error" | "critical"> = {
  info: "info", warning: "warning", error: "error", critical: "critical",
};

export function NotificationCenter() {
  const { data: items = [] } = usePulseNotifications();
  const markRead = useMarkNotificationRead();
  const unread = useMemo(() => items.filter((i) => !i.read).length, [items]);

  const markAll = () => {
    items.filter((i) => !i.read).forEach((i) => markRead.mutate(i.id));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Notifications"
        >
          <Bell className="h-3.5 w-3.5" />
          {unread > 0 && (
            <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <div className="text-xs font-semibold">Notifications</div>
          <button
            onClick={markAll}
            className="flex items-center gap-1 text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground"
          >
            <Check className="h-3 w-3" /> mark all read
          </button>
        </div>
        <div className="thin-scrollbar max-h-[480px] divide-y divide-border overflow-auto">
          {items.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">No notifications</p>
          ) : (
            items.map((n: Notification) => (
              <div key={n.id} className={"flex flex-col gap-1 px-3 py-2 " + (n.read ? "opacity-70" : "")}>
                <div className="flex items-center gap-2">
                  <StatusBadge tone={sevTone[n.severity] ?? "info"}>{n.kind}</StatusBadge>
                  <span className="text-xs font-medium">{n.title}</span>
                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {formatDistanceToNow(n.timestamp)}
                  </span>
                </div>
                <p className="pl-1 text-[11px] text-muted-foreground">{n.body}</p>
              </div>
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
