import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { JSONViewer } from "@/components/json-viewer";
import { QueryBoundary } from "@/components/data-state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePulseEvents } from "@/lib/pulse-hooks";
import type { AppEvent } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";
import { Search, Pause, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:events")) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Event Explorer — Pulse" }] }),
  component: EventsPage,
});

const STATUS_TONE = { success: "success", failed: "error", retrying: "warning", queued: "info", processing: "info" } as const;
const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" } as const;

function EventsPage() {
  const { data: events = [], isLoading, isError, error, refetch } = usePulseEvents(200);
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<AppEvent | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const lower = q.toLowerCase();
    if (!lower) return events;
    return events.filter((e) =>
      `${e.eventType} ${e.worker} ${e.queue} ${e.id}`.toLowerCase().includes(lower),
    );
  }, [events, q]);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Event Explorer"
        description={`${events.length} events from database`}
        actions={
          <Button size="sm" variant="outline" className="h-7 gap-1 text-xs" onClick={() => refetch()}>
            Refresh
          </Button>
        }
      />
      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
        <div className="space-y-3 px-6 py-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} className="h-8 pl-8 font-mono text-xs" placeholder="Search…" />
            </div>
            <Button size="sm" variant="outline" className="h-8" onClick={() => setPaused(!paused)}>
              {paused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
            </Button>
          </div>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Queue</TableHead>
                  <TableHead className="text-right">Latency</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id} className="cursor-pointer" onClick={() => setSelected(e)}>
                    <TableCell className="font-mono text-[10px]">{formatDistanceToNow(new Date(e.timestamp), { addSuffix: true })}</TableCell>
                    <TableCell className="font-mono text-xs">{e.eventType}</TableCell>
                    <TableCell><StatusBadge tone={STATUS_TONE[e.status]}>{e.status}</StatusBadge></TableCell>
                    <TableCell className="font-mono text-[10px]">{e.queue}</TableCell>
                    <TableCell className="text-right font-mono text-xs">{e.latencyMs}ms</TableCell>
                    <TableCell><ChevronRight className="h-3.5 w-3.5" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
          <SheetContent className="w-[480px] sm:max-w-[480px]">
            {selected && (
              <>
                <SheetHeader>
                  <SheetTitle className="font-mono text-sm">{selected.eventType}</SheetTitle>
                </SheetHeader>
                <div className="mt-4 space-y-3 text-xs">
                  <p><span className="text-muted-foreground">ID:</span> {selected.id}</p>
                  <p><span className="text-muted-foreground">Time:</span> {format(new Date(selected.timestamp), "PPpp")}</p>
                  <StatusBadge tone={SEV_TONE[selected.severity]}>{selected.severity}</StatusBadge>
                  <JSONViewer data={selected.payload} />
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </QueryBoundary>
    </div>
  );
}
