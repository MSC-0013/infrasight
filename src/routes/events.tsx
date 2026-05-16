import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { JSONViewer } from "@/components/json-viewer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { generateEvents, type AppEvent } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";
import { Search, Filter, Pause, Play, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Event Explorer — Pulse" },
      { name: "description", content: "Search, filter and inspect distributed events in realtime." },
    ],
  }),
  component: EventsPage,
});

const STATUS_TONE = { success: "success", failed: "error", retrying: "warning", queued: "info", processing: "info" } as const;
const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" } as const;

function EventsPage() {
  const [events, setEvents] = useState<AppEvent[]>(useMemo(() => generateEvents(150), []));
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sevFilter, setSevFilter] = useState<string>("all");
  const [orgFilter, setOrgFilter] = useState<string>("all");
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<AppEvent | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const [next] = generateEvents(1);
      setEvents((p) => [{ ...next, timestamp: new Date().toISOString() }, ...p].slice(0, 250));
    }, 1800);
    return () => clearInterval(id);
  }, [paused]);

  const orgs = useMemo(() => Array.from(new Set(events.map((e) => e.organization))), [events]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return events.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (sevFilter !== "all" && e.severity !== sevFilter) return false;
      if (orgFilter !== "all" && e.organization !== orgFilter) return false;
      if (q && !`${e.eventType} ${e.worker} ${e.queue} ${e.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [events, query, statusFilter, sevFilter, orgFilter]);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Event Explorer"
        description="Search and inspect every event flowing through the platform."
        actions={
          <>
            <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={() => setPaused(!paused)}>
              {paused ? <><Play className="h-3 w-3" />Resume</> : <><Pause className="h-3 w-3" />Pause</>}
            </Button>
            <StatusBadge tone={paused ? "neutral" : "success"}>{paused ? "paused" : "live"}</StatusBadge>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background px-6 py-3">
        <div className="relative min-w-[280px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="event_type:user.signup AND status:failed"
            className="h-8 border-border bg-card pl-8 font-mono text-xs"
          />
        </div>
        <FilterSelect label="Status" value={statusFilter} onChange={setStatusFilter} options={["all", "success", "failed", "retrying"]} />
        <FilterSelect label="Severity" value={sevFilter} onChange={setSevFilter} options={["all", "info", "warning", "error", "critical"]} />
        <FilterSelect label="Org" value={orgFilter} onChange={setOrgFilter} options={["all", ...orgs]} />
        <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs"><Filter className="h-3 w-3" />More filters</Button>
      </div>

      <div className="px-6 py-3 text-[11px] font-mono text-muted-foreground">
        {filtered.length.toLocaleString()} events · last 24h
      </div>

      <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border bg-card">
        <div className="thin-scrollbar max-h-[calc(100vh-260px)] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-card">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="h-8 text-[10px] font-mono uppercase">Time</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Event ID</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Type</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Org</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Severity</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Queue</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Worker</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Latency</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Retries</TableHead>
                <TableHead className="h-8 w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((e) => (
                <TableRow key={e.id} className="cursor-pointer border-border text-xs hover:bg-accent/40" onClick={() => setSelected(e)}>
                  <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{format(new Date(e.timestamp), "HH:mm:ss.SSS")}</TableCell>
                  <TableCell className="py-1.5 font-mono text-[11px]">{e.id}</TableCell>
                  <TableCell className="py-1.5 font-mono text-[11px]">{e.eventType}</TableCell>
                  <TableCell className="py-1.5 text-[11px]">{e.organization}</TableCell>
                  <TableCell className="py-1.5"><StatusBadge tone={STATUS_TONE[e.status]}>{e.status}</StatusBadge></TableCell>
                  <TableCell className="py-1.5"><StatusBadge tone={SEV_TONE[e.severity]}>{e.severity}</StatusBadge></TableCell>
                  <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{e.queue}</TableCell>
                  <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{e.worker.replace("worker-", "")}</TableCell>
                  <TableCell className={cn("py-1.5 text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning")}>{e.latencyMs}ms</TableCell>
                  <TableCell className="py-1.5 text-right font-mono text-[11px] tabular-nums">{e.retries}</TableCell>
                  <TableCell className="py-1.5"><ChevronRight className="h-3 w-3 text-muted-foreground" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 font-mono text-sm">
                  {selected.eventType}
                  <StatusBadge tone={STATUS_TONE[selected.status]}>{selected.status}</StatusBadge>
                </SheetTitle>
                <SheetDescription className="font-mono text-[11px]">
                  {selected.id} · {formatDistanceToNow(new Date(selected.timestamp), { addSuffix: true })}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-4 px-4">
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <KV label="Organization" value={selected.organization} />
                  <KV label="Queue" value={selected.queue} />
                  <KV label="Worker" value={selected.worker} />
                  <KV label="Latency" value={`${selected.latencyMs}ms`} />
                  <KV label="Retries" value={selected.retries.toString()} />
                  <KV label="Severity" value={selected.severity} />
                </div>

                <Tabs defaultValue="payload" className="mt-4">
                  <TabsList className="h-8">
                    <TabsTrigger value="payload" className="text-xs">Payload</TabsTrigger>
                    <TabsTrigger value="timeline" className="text-xs">Processing</TabsTrigger>
                    <TabsTrigger value="queue" className="text-xs">Queue history</TabsTrigger>
                    <TabsTrigger value="retries" className="text-xs">Retries</TabsTrigger>
                  </TabsList>
                  <TabsContent value="payload"><JSONViewer data={selected.payload} /></TabsContent>
                  <TabsContent value="timeline">
                    <div className="space-y-1.5 text-xs">
                      {[
                        ["ingested", 0, "api-gateway"],
                        ["validated", 3, "api-gateway"],
                        ["enqueued", 5, selected.queue],
                        ["dequeued", 14, selected.worker],
                        ["processed", selected.latencyMs, selected.worker],
                      ].map(([k, t, src]) => (
                        <div key={k as string} className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-1.5">
                          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="flex-1 font-medium">{k as string}</span>
                          <span className="font-mono text-[11px] text-muted-foreground">{src as string}</span>
                          <span className="font-mono text-[11px] tabular-nums">+{t as number}ms</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="queue">
                    <JSONViewer data={{ queue: selected.queue, partition: 3, offset: 184_392_018, consumer: selected.worker }} />
                  </TabsContent>
                  <TabsContent value="retries">
                    {selected.retries === 0 ? (
                      <p className="px-3 py-6 text-center text-xs text-muted-foreground">No retries.</p>
                    ) : (
                      <JSONViewer data={Array.from({ length: selected.retries }, (_, i) => ({ attempt: i + 1, reason: "timeout", at: new Date(Date.now() - (i + 1) * 1500).toISOString() }))} />
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-border bg-background px-2.5 py-1.5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="truncate font-mono text-xs">{value}</p>
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-[140px] border-border bg-card text-xs">
        <span className="text-muted-foreground">{label}:</span>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => <SelectItem key={o} value={o} className="text-xs">{o}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
