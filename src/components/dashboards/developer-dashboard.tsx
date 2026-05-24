import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Workflow, FileText, Activity,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from "recharts";
import {
  generateServices, generateIncidents, generateEvents,
  generateLatencySeries, generateThroughputSeries, generateTimeSeries,
  type ServiceHealth, type AppEvent,
} from "@/lib/mock-data";
import { formatDistanceToNow, format } from "date-fns";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<string, "success" | "error" | "warning" | "info"> = {
  success: "success", failed: "error", retrying: "warning", queued: "info", processing: "info",
};

export function DeveloperDashboard() {
  const services = useMemo(() => generateServices(), []);
  const incidents = useMemo(() => generateIncidents(), []);
  const events = useMemo(() => generateEvents(20), []);
  const throughput = useMemo(() => generateThroughputSeries(40), []);
  const latency = useMemo(() => generateLatencySeries(40), []);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  const serviceCount = services.length;
  const openIssues = incidents.filter(i => i.status === "investigating").length;
  const avgP95 = services.length
    ? Math.round(services.reduce((a, s) => a + s.p95Ms, 0) / services.length)
    : 0;
  const avgErrorRate = services.length
    ? +(services.reduce((a, s) => a + s.errorRate, 0) / services.length).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Engineering Workspace"
        description="Traces, logs, queues and the services you own. Jump straight into debugging."
        actions={
          <>
            <Link to="/traces"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Workflow className="h-3 w-3" />Traces</Button></Link>
            <Link to="/logs"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><FileText className="h-3 w-3" />Logs</Button></Link>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Your services" value={serviceCount} series={generateTimeSeries(20, 6, 1)} trend={0} status="info" />
        <MetricCard label="Open issues" value={openIssues} series={generateTimeSeries(20, 2, 1)} trend={-12} trendInverted status="warning" />
        <MetricCard label="p95 latency" value={`${avgP95}ms`} series={generateTimeSeries(20, 142, 20)} trend={-3.1} trendInverted status="info" />
        <MetricCard label="Error rate" value={`${avgErrorRate}%`} series={generateTimeSeries(20, 1.24, 0.4)} trend={-8.2} trendInverted status="success" />
        <MetricCard label="Events / sec" value="847" series={generateTimeSeries(20, 847, 80)} trend={4.2} status="info" variant="area" />
        <MetricCard label="Queue lag" value="412ms" series={generateTimeSeries(20, 412, 100)} trend={9.8} trendInverted status="warning" />
        <MetricCard label="Active workers" value="92" series={generateTimeSeries(20, 92, 8)} trend={1.2} status="success" />
        <MetricCard label="Success rate" value="98.76%" series={generateTimeSeries(20, 98.76, 0.4)} trend={0.3} status="success" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-2">
        <ChartCard title="Event throughput" description="Successful vs failed events per minute">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughput} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="dev-g-success" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="dev-g-failed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
                <Area type="monotone" dataKey="success" stroke="var(--color-success)" strokeWidth={1.5} fill="url(#dev-g-success)" />
                <Area type="monotone" dataKey="failed" stroke="var(--color-destructive)" strokeWidth={1.5} fill="url(#dev-g-failed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="API latency" description="p50 / p95 / p99 (ms)">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latency} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} interval={8} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="p50" stroke="var(--color-chart-2)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p99" stroke="var(--color-chart-4)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Service health + Events */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Activity className="h-3.5 w-3.5 text-primary" />Service Health</h3>
              <p className="text-xs text-muted-foreground">{services.length} services</p>
            </div>
            <Link to="/services" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Name</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">p95</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Err%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer border-border text-xs hover:bg-accent/40">
                    <TableCell className="py-1.5 font-mono text-[11px]">{s.name}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={s.status === "healthy" ? "success" : s.status === "degraded" ? "warning" : "error"}>{s.status}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] tabular-nums">{s.p95Ms}ms</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] tabular-nums">{s.errorRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight">Recent Events</h3>
              <p className="text-xs text-muted-foreground">{events.length} events</p>
            </div>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Time</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Event</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Latency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice(0, 15).map((e) => (
                  <TableRow key={e.id} className="cursor-pointer border-border text-xs hover:bg-accent/40" onClick={() => setSelectedEvent(e)}>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{format(new Date(e.timestamp), "HH:mm:ss")}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px]">{e.eventType}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={STATUS_TONE[e.status] ?? "info"}>{e.status}</StatusBadge></TableCell>
                    <TableCell className={cn("py-1.5 text-right font-mono text-[11px] tabular-nums", e.latencyMs > 300 && "text-warning")}>{e.latencyMs}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Event detail dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={(o) => !o && setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-mono text-sm">
                  {selectedEvent.eventType}
                  <StatusBadge tone={STATUS_TONE[selectedEvent.status] ?? "info"}>{selectedEvent.status}</StatusBadge>
                </DialogTitle>
                <DialogDescription className="font-mono text-[11px]">
                  id: {selectedEvent.id} · {formatDistanceToNow(new Date(selectedEvent.timestamp), { addSuffix: true })}
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="payload" className="mt-2">
                <TabsList className="h-8">
                  <TabsTrigger value="payload" className="text-xs">Payload</TabsTrigger>
                  <TabsTrigger value="context" className="text-xs">Context</TabsTrigger>
                </TabsList>
                <TabsContent value="payload">
                  <pre className="max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-xs">{JSON.stringify(selectedEvent.payload, null, 2)}</pre>
                </TabsContent>
                <TabsContent value="context">
                  <pre className="max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-xs">{JSON.stringify({ queue: selectedEvent.queue, worker: selectedEvent.worker, retries: selectedEvent.retries, latencyMs: selectedEvent.latencyMs }, null, 2)}</pre>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 6,
  fontSize: 11,
  padding: "6px 8px",
};
