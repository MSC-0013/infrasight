import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useMemo, useEffect, useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { StatusBadge } from "@/components/status-badge";
import { AlertCard } from "@/components/alert-card";
import { QueueCard } from "@/components/queue-card";
import { WorkerCard } from "@/components/worker-card";
import { JSONViewer } from "@/components/json-viewer";
import { RoleDashboardHeader } from "@/components/role-dashboard-header";
import { SuperAdminDashboard } from "@/components/dashboards/super-admin-dashboard";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { SREDashboard } from "@/components/dashboards/sre-dashboard";
import { DeveloperDashboard } from "@/components/dashboards/developer-dashboard";
import { ViewerDashboard } from "@/components/dashboards/viewer-dashboard";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  generateEvents, generateAlerts, generateWorkers, generateQueues,
  generateThroughputSeries, generateLatencySeries, generateQueueLagSeries,
  generateEventDistribution, generateTimeSeries, generateTimelineEvents, type AppEvent,
} from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth-store";
import { UnifiedTimeline } from "@/components/unified-timeline";
import { formatDistanceToNow, format } from "date-fns";
import { ChevronRight, RefreshCw, ListFilter as Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Pulse" },
      { name: "description", content: "Realtime overview of events, queues, workers and ML insights." },
    ],
  }),
  component: DashboardPage,
});

const STATUS_TONE = {
  success: "success", failed: "error", retrying: "warning", queued: "info", processing: "info",
} as const;
const SEV_TONE = { info: "info", warning: "warning", error: "error", critical: "critical" } as const;

function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const role = user?.role;

  if (!user) return <Navigate to="/login" />;

  if (role === "super_admin") return <><RoleDashboardHeader /><SuperAdminDashboard /></>;
  if (role === "admin") return <><RoleDashboardHeader /><AdminDashboard /></>;
  if (role === "sre") return <><RoleDashboardHeader /><SREDashboard /></>;
  if (role === "developer") return <><RoleDashboardHeader /><DeveloperDashboard /></>;
  if (role === "viewer") return <><RoleDashboardHeader /><ViewerDashboard /></>;

  return <OverviewDashboard />;
}

function OverviewDashboard() {
  const initialEvents = useMemo(() => generateEvents(40), []);
  const [events, setEvents] = useState<AppEvent[]>(initialEvents);
  const [alerts, setAlerts] = useState(useMemo(() => generateAlerts(6), []));
  const workers = useMemo(() => generateWorkers(), []);
  const queues = useMemo(() => generateQueues(), []);
  const throughput = useMemo(() => generateThroughputSeries(40), []);
  const latency = useMemo(() => generateLatencySeries(40), []);
  const queueLag = useMemo(() => generateQueueLagSeries(40), []);
  const eventDist = useMemo(() => generateEventDistribution(), []);
  const sparkA = useMemo(() => generateTimeSeries(20, 800, 80), []);
  const sparkB = useMemo(() => generateTimeSeries(20, 40, 12), []);
  const sparkC = useMemo(() => generateTimeSeries(20, 450, 100), []);
  const sparkD = useMemo(() => generateTimeSeries(20, 92, 8), []);
  const sparkE = useMemo(() => generateTimeSeries(20, 1.2, 0.6), []);
  const sparkF = useMemo(() => generateTimeSeries(20, 99.4, 0.4), []);
  const sparkG = useMemo(() => generateTimeSeries(20, 1240, 200), []);
  const sparkH = useMemo(() => generateTimeSeries(20, 8, 1), []);
  const timelineEvents = useMemo(() => generateTimelineEvents(40), []);
  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      const [next] = generateEvents(1);
      setEvents((prev) => [{ ...next, timestamp: new Date().toISOString() }, ...prev].slice(0, 50));
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const ackAlert = (id: string) =>
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

  return (
    <div className="flex flex-col">
      <RoleDashboardHeader />
      <PageHeader
        title="Overview"
        description="Realtime health across events, queues, workers and ML."
        actions={
          <>
            <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Filter className="h-3 w-3" />Filter</Button>
            <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><RefreshCw className="h-3 w-3" />Refresh</Button>
            <Button size="sm" className="h-7 gap-1.5 text-xs"><Download className="h-3 w-3" />Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Events / sec" value="847" series={sparkA} trend={4.2} status="info" variant="area" />
        <MetricCard label="API latency p95" value="142" unit="ms" series={sparkB} trend={-3.1} trendInverted status="info" />
        <MetricCard label="Queue lag" value="412" unit="ms" series={sparkC} trend={9.8} trendInverted status="warning" />
        <MetricCard label="Active workers" value="92" series={sparkD} trend={1.2} status="success" />
        <MetricCard label="Error rate" value="1.24" unit="%" series={sparkE} trend={-12.4} trendInverted status="success" />
        <MetricCard label="Success rate" value="98.76" unit="%" series={sparkF} trend={0.3} status="success" />
        <MetricCard label="Active users" value="12.4k" series={sparkG} trend={6.7} status="info" variant="area" />
        <MetricCard label="System uptime" value="99.992" unit="%" series={sparkH} trend={0.01} status="success" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Event throughput" description="Successful vs failed events per minute">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughput} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-success" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g-failed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} interval={6} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "var(--color-border)" }} />
                <Area type="monotone" dataKey="success" stroke="var(--color-success)" strokeWidth={1.5} fill="url(#g-success)" />
                <Area type="monotone" dataKey="failed" stroke="var(--color-destructive)" strokeWidth={1.5} fill="url(#g-failed)" />
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

      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3">
        <ChartCard title="Queue lag" description="Average lag (ms)">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={queueLag} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="g-lag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} interval={8} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="lag" stroke="var(--color-warning)" strokeWidth={1.5} fill="url(#g-lag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Event distribution" description="By event type">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={eventDist} dataKey="value" nameKey="name" innerRadius={36} outerRadius={62} paddingAngle={2}>
                  {eventDist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--color-card)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 10, color: "var(--color-muted-foreground)" }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Worker performance" description="Jobs / min per worker">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workers.map((w) => ({ name: w.name.replace("worker-", ""), jobs: Math.round(w.jobsProcessed / 1000) }))} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} tickLine={false} axisLine={false} interval={0} angle={-20} textAnchor="end" height={40} />
                <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent)" }} />
                <Bar dataKey="jobs" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight">Realtime event stream</h3>
              <p className="text-xs text-muted-foreground">Updates every 2.5s · {events.length} events buffered</p>
            </div>
            <StatusBadge tone="success">live</StatusBadge>
          </div>
          <div className="thin-scrollbar max-h-[460px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Time</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Event</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Org</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Queue</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Worker</TableHead>
                  <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Latency</TableHead>
                  <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Retries</TableHead>
                  <TableHead className="h-8 w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.slice(0, 30).map((e) => (
                  <TableRow key={e.id} className="cursor-pointer border-border text-xs hover:bg-accent/40" onClick={() => setSelectedEvent(e)}>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{format(new Date(e.timestamp), "HH:mm:ss")}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px]">{e.eventType}</TableCell>
                    <TableCell className="py-1.5 text-[11px]">{e.organization}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={STATUS_TONE[e.status]}>{e.status}</StatusBadge></TableCell>
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

        <div className="flex flex-col gap-3">
          <UnifiedTimeline events={timelineEvents} title="Unified timeline" description="Deploys, alerts, incidents, SLO breaches — in chronological order" compact maxVisible={12} />
          <div className="rounded-lg border border-border bg-card">
            <div className="border-b border-border px-4 py-2.5">
              <h3 className="text-sm font-semibold tracking-tight">Active alerts</h3>
              <p className="text-xs text-muted-foreground">{alerts.filter((a) => !a.acknowledged).length} unacknowledged</p>
            </div>
            <div className="flex flex-col gap-2 p-3">
              {alerts.slice(0, 4).map((a) => (
                <AlertCard key={a.id} alert={a} onAck={ackAlert} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 py-3 lg:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Queues</h2>
            <p className="text-xs text-muted-foreground">{queues.length} active</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {queues.slice(0, 4).map((q) => <QueueCard key={q.id} queue={q} />)}
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Workers</h2>
            <p className="text-xs text-muted-foreground">{workers.filter(w => w.status === "online").length}/{workers.length} online</p>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {workers.slice(0, 4).map((w) => <WorkerCard key={w.id} worker={w} />)}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={(o) => !o && setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-mono text-sm">
                  {selectedEvent.eventType}
                  <StatusBadge tone={STATUS_TONE[selectedEvent.status]}>{selectedEvent.status}</StatusBadge>
                  <StatusBadge tone={SEV_TONE[selectedEvent.severity]}>{selectedEvent.severity}</StatusBadge>
                </DialogTitle>
                <DialogDescription className="font-mono text-[11px]">
                  id: {selectedEvent.id} · {formatDistanceToNow(new Date(selectedEvent.timestamp), { addSuffix: true })}
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="payload" className="mt-2">
                <TabsList className="h-8">
                  <TabsTrigger value="payload" className="text-xs">Payload</TabsTrigger>
                  <TabsTrigger value="timeline" className="text-xs">Timeline</TabsTrigger>
                  <TabsTrigger value="context" className="text-xs">Context</TabsTrigger>
                </TabsList>
                <TabsContent value="payload">
                  <JSONViewer data={selectedEvent.payload} />
                </TabsContent>
                <TabsContent value="timeline">
                  <div className="space-y-2 text-xs">
                    {[
                      ["ingested", "0ms", "api-gateway"],
                      ["enqueued", "4ms", selectedEvent.queue],
                      ["picked up", "18ms", selectedEvent.worker],
                      ["processed", `${selectedEvent.latencyMs}ms`, selectedEvent.worker],
                    ].map(([k, t, src]) => (
                      <div key={k} className="flex items-center gap-3 rounded-md border border-border bg-background px-3 py-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="flex-1 font-medium">{k}</span>
                        <span className="font-mono text-[11px] text-muted-foreground">{src}</span>
                        <span className="font-mono text-[11px] tabular-nums">{t}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="context">
                  <JSONViewer data={{ org: selectedEvent.organization, queue: selectedEvent.queue, worker: selectedEvent.worker, retries: selectedEvent.retries, latencyMs: selectedEvent.latencyMs }} />
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
