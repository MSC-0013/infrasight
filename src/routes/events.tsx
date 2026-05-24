import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { JSONViewer } from "@/components/json-viewer";
import { EmptyState } from "@/components/ui-states";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { generateEvents, type AppEvent } from "@/lib/mock-data";
import { format, formatDistanceToNow } from "date-fns";
import { Search, Pause, Play, ChevronRight, ChevronUp, ChevronDown, Columns3, Rows3, RotateCw, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type SortKey = "time" | "latency" | "retries" | "type";
type SortDir = "asc" | "desc";
type Density = "compact" | "comfortable";

interface EventsSearch {
  q: string;
  status: string;
  sev: string;
  org: string;
  sort: SortKey;
  dir: SortDir;
  density: Density;
}

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Event Explorer — Pulse" },
      { name: "description", content: "Search, filter and inspect distributed events in realtime." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): EventsSearch => ({
    q: typeof s.q === "string" ? s.q : "",
    status: typeof s.status === "string" ? s.status : "all",
    sev: typeof s.sev === "string" ? s.sev : "all",
    org: typeof s.org === "string" ? s.org : "all",
    sort: (["time", "latency", "retries", "type"] as const).includes(s.sort as SortKey) ? (s.sort as SortKey) : "time",
    dir: s.dir === "asc" ? "asc" : "desc",
    density: s.density === "comfortable" ? "comfortable" : "compact",
  }),
  component: EventsPage,
});

const STATUS_TONE = { success: "success", failed: "error", retrying: "warning", queued: "info", processing: "info" } as const;
const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" } as const;

const ALL_COLS = ["time", "id", "type", "org", "status", "severity", "queue", "worker", "latency", "retries"] as const;
type Col = (typeof ALL_COLS)[number];

function EventsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/events" });
  const setSearch = (patch: Partial<EventsSearch>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }) as EventsSearch, replace: true });

  const [events, setEvents] = useState<AppEvent[]>(useMemo(() => generateEvents(150), []));
  const [paused, setPaused] = useState(false);
  const [selected, setSelected] = useState<AppEvent | null>(null);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [cols, setCols] = useState<Set<Col>>(() => {
    try {
      const raw = localStorage.getItem("pulse-events-cols");
      if (raw) return new Set(JSON.parse(raw));
    } catch { /* noop */ }
    return new Set(ALL_COLS);
  });

  useEffect(() => {
    localStorage.setItem("pulse-events-cols", JSON.stringify(Array.from(cols)));
  }, [cols]);

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
    const q = search.q.toLowerCase();
    const out = events.filter((e) => {
      if (search.status !== "all" && e.status !== search.status) return false;
      if (search.sev !== "all" && e.severity !== search.sev) return false;
      if (search.org !== "all" && e.organization !== search.org) return false;
      if (q && !`${e.eventType} ${e.worker} ${e.queue} ${e.id}`.toLowerCase().includes(q)) return false;
      return true;
    });
    const dir = search.dir === "asc" ? 1 : -1;
    out.sort((a, b) => {
      switch (search.sort) {
        case "latency": return (a.latencyMs - b.latencyMs) * dir;
        case "retries": return (a.retries - b.retries) * dir;
        case "type": return a.eventType.localeCompare(b.eventType) * dir;
        default: return (new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()) * dir;
      }
    });
    return out;
  }, [events, search]);

  const allChecked = filtered.length > 0 && filtered.every((e) => checked.has(e.id));
  const someChecked = checked.size > 0 && !allChecked;
  const hasFilters = search.q || search.status !== "all" || search.sev !== "all" || search.org !== "all";

  const toggleAll = () => {
    if (allChecked) setChecked(new Set());
    else setChecked(new Set(filtered.map((e) => e.id)));
  };
  const toggleOne = (id: string) => {
    setChecked((cur) => {
      const next = new Set(cur);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const bulkRetry = () => {
    toast.success(`Queued retry for ${checked.size} event${checked.size > 1 ? "s" : ""}`);
    setChecked(new Set());
  };
  const bulkExport = () => {
    toast.success(`Exporting ${checked.size} events as CSV…`);
  };
  const clearFilters = () => setSearch({ q: "", status: "all", sev: "all", org: "all" });

  const toggleSort = (key: SortKey) => {
    if (search.sort === key) setSearch({ dir: search.dir === "asc" ? "desc" : "asc" });
    else setSearch({ sort: key, dir: "desc" });
  };

  const rowPad = search.density === "compact" ? "py-1" : "py-2.5";

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
            value={search.q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="event_type:user.signup AND status:failed"
            className="h-8 border-border bg-card pl-8 font-mono text-xs"
          />
        </div>
        <FilterSelect label="Status" value={search.status} onChange={(v) => setSearch({ status: v })} options={["all", "success", "failed", "retrying"]} />
        <FilterSelect label="Severity" value={search.sev} onChange={(v) => setSearch({ sev: v })} options={["all", "info", "warning", "error", "critical"]} />
        <FilterSelect label="Org" value={search.org} onChange={(v) => setSearch({ org: v })} options={["all", ...orgs]} />
        {hasFilters && (
          <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-muted-foreground" onClick={clearFilters}>
            <X className="h-3 w-3" /> Clear
          </Button>
        )}
        <div className="ml-auto flex items-center gap-1.5">
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0"
            title={search.density === "compact" ? "Comfortable rows" : "Compact rows"}
            onClick={() => setSearch({ density: search.density === "compact" ? "comfortable" : "compact" })}
          >
            <Rows3 className="h-3 w-3" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 gap-1.5 text-xs"><Columns3 className="h-3 w-3" />Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-xs">Visible columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {ALL_COLS.map((c) => (
                <DropdownMenuCheckboxItem
                  key={c}
                  checked={cols.has(c)}
                  onCheckedChange={(v) => {
                    setCols((cur) => {
                      const next = new Set(cur);
                      v ? next.add(c) : next.delete(c);
                      return next;
                    });
                  }}
                  className="text-xs capitalize"
                >
                  {c}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {checked.size > 0 && (
        <div className="flex items-center gap-2 border-b border-primary/30 bg-primary/5 px-6 py-2 text-xs">
          <span className="font-mono">{checked.size} selected</span>
          <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={bulkRetry}>
            <RotateCw className="h-3 w-3" /> Retry
          </Button>
          <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={bulkExport}>
            <Download className="h-3 w-3" /> Export
          </Button>
          <Button size="sm" variant="ghost" className="ml-auto h-7 gap-1.5 text-xs" onClick={() => setChecked(new Set())}>
            <X className="h-3 w-3" /> Clear
          </Button>
        </div>
      )}

      <div className="px-6 py-3 text-[11px] font-mono text-muted-foreground">
        {filtered.length.toLocaleString()} events · sorted by {search.sort} {search.dir}
      </div>

      <div className="mx-6 mb-6 overflow-hidden rounded-lg border border-border bg-card">
        {filtered.length === 0 ? (
          <EmptyState
            title="No events match your filters"
            description={hasFilters ? "Try clearing some filters or adjusting your query." : "Waiting for the next event to arrive."}
            icon={Search}
          />
        ) : (
          <div className="thin-scrollbar max-h-[calc(100vh-300px)] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 w-8 px-2">
                    <Checkbox checked={allChecked || (someChecked && "indeterminate")} onCheckedChange={toggleAll} />
                  </TableHead>
                  {cols.has("time") && <SortableHead label="Time" k="time" sort={search.sort} dir={search.dir} onClick={toggleSort} />}
                  {cols.has("id") && <TableHead className="h-8 text-[10px] font-mono uppercase">Event ID</TableHead>}
                  {cols.has("type") && <SortableHead label="Type" k="type" sort={search.sort} dir={search.dir} onClick={toggleSort} />}
                  {cols.has("org") && <TableHead className="h-8 text-[10px] font-mono uppercase">Org</TableHead>}
                  {cols.has("status") && <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>}
                  {cols.has("severity") && <TableHead className="h-8 text-[10px] font-mono uppercase">Severity</TableHead>}
                  {cols.has("queue") && <TableHead className="h-8 text-[10px] font-mono uppercase">Queue</TableHead>}
                  {cols.has("worker") && <TableHead className="h-8 text-[10px] font-mono uppercase">Worker</TableHead>}
                  {cols.has("latency") && <SortableHead label="Latency" k="latency" sort={search.sort} dir={search.dir} onClick={toggleSort} align="right" />}
                  {cols.has("retries") && <SortableHead label="Retries" k="retries" sort={search.sort} dir={search.dir} onClick={toggleSort} align="right" />}
                  <TableHead className="h-8 w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((e) => (
                  <TableRow key={e.id} className={cn("cursor-pointer border-border text-xs hover:bg-accent/40", checked.has(e.id) && "bg-primary/5")} onClick={() => setSelected(e)}>
                    <TableCell className={cn(rowPad, "px-2")} onClick={(ev) => ev.stopPropagation()}>
                      <Checkbox checked={checked.has(e.id)} onCheckedChange={() => toggleOne(e.id)} />
                    </TableCell>
                    {cols.has("time") && <TableCell className={cn(rowPad, "font-mono text-[11px] text-muted-foreground")}>{format(new Date(e.timestamp), "HH:mm:ss.SSS")}</TableCell>}
                    {cols.has("id") && <TableCell className={cn(rowPad, "font-mono text-[11px]")}>{e.id}</TableCell>}
                    {cols.has("type") && <TableCell className={cn(rowPad, "font-mono text-[11px]")}>{e.eventType}</TableCell>}
                    {cols.has("org") && <TableCell className={cn(rowPad, "text-[11px]")}>{e.organization}</TableCell>}
                    {cols.has("status") && <TableCell className={rowPad}><StatusBadge tone={STATUS_TONE[e.status]}>{e.status}</StatusBadge></TableCell>}
                    {cols.has("severity") && <TableCell className={rowPad}><StatusBadge tone={SEV_TONE[e.severity]}>{e.severity}</StatusBadge></TableCell>}
                    {cols.has("queue") && <TableCell className={cn(rowPad, "font-mono text-[11px] text-muted-foreground")}>{e.queue}</TableCell>}
                    {cols.has("worker") && <TableCell className={cn(rowPad, "font-mono text-[11px] text-muted-foreground")}>{e.worker.replace("worker-", "")}</TableCell>}
                    {cols.has("latency") && <TableCell className={cn(rowPad, "text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning")}>{e.latencyMs}ms</TableCell>}
                    {cols.has("retries") && <TableCell className={cn(rowPad, "text-right font-mono text-[11px] tabular-nums")}>{e.retries}</TableCell>}
                    <TableCell className={rowPad}><ChevronRight className="h-3 w-3 text-muted-foreground" /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
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

function SortableHead({ label, k, sort, dir, onClick, align }: {
  label: string; k: SortKey; sort: SortKey; dir: SortDir; onClick: (k: SortKey) => void; align?: "right";
}) {
  const active = sort === k;
  return (
    <TableHead className={cn("h-8 text-[10px] font-mono uppercase", align === "right" && "text-right")}>
      <button
        onClick={() => onClick(k)}
        className={cn("inline-flex items-center gap-1 hover:text-foreground", active ? "text-foreground" : "text-muted-foreground")}
      >
        {label}
        {active && (dir === "asc" ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />)}
      </button>
    </TableHead>
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
