import { createFileRoute, redirect, Navigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
import type { AppEvent } from "@/lib/mock-data";
import { useAuthStore } from "@/store/auth-store";
import { QueryBoundary } from "@/components/data-state";
import {
  usePulseDashboardMetrics,
  usePulseEvents,
  usePulseAlerts,
  usePulseWorkers,
  usePulseQueues,
  usePulseThroughput,
  usePulseIncidents,
  usePulseDeployments,
  usePulseSLOs,
  useAcknowledgeAlert,
} from "@/lib/pulse-hooks";
import {
  sparklineFromValue,
  throughputToChart,
  latencyFromThroughput,
  queueLagFromQueues,
  distributionFromEvents,
  buildTimelineFromApi,
} from "@/lib/chart-helpers";
import { UnifiedTimeline } from "@/components/unified-timeline";
import { formatDistanceToNow, format } from "date-fns";
import { ChevronRight, RefreshCw, ListFilter as Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
  },
  
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
  const { data: metrics, isLoading: metricsLoading, isError: metricsError, error: metricsErr, refetch: refetchMetrics } = usePulseDashboardMetrics();
  const { data: events = [], isLoading: eventsLoading, isError: eventsError, error: eventsErr, refetch: refetchEvents } = usePulseEvents(50);
  const { data: alerts = [], refetch: refetchAlerts } = usePulseAlerts();
  const { data: workers = [] } = usePulseWorkers();
  const { data: queues = [] } = usePulseQueues();
  const { data: throughputRaw = [] } = usePulseThroughput(1);
  const { data: incidents = [] } = usePulseIncidents();
  const { data: deployments = [] } = usePulseDeployments(20);
  const { data: slos = [] } = usePulseSLOs();
  const acknowledge = useAcknowledgeAlert();

  const throughput = useMemo(() => throughputToChart(throughputRaw), [throughputRaw]);
  const latency = useMemo(() => latencyFromThroughput(throughputRaw), [throughputRaw]);
  const queueLag = useMemo(() => queueLagFromQueues(queues), [queues]);
  const eventDist = useMemo(() => distributionFromEvents(events), [events]);
  const timelineEvents = useMemo(
    () => buildTimelineFromApi(incidents, deployments, alerts, slos),
    [incidents, deployments, alerts, slos],
  );

  const m = metrics;
  const sparkA = useMemo(() => sparklineFromValue(m?.totalRps ?? 0, 20, 0.2), [m?.totalRps]);
  const sparkB = useMemo(() => sparklineFromValue(m?.avgP95 ?? 0, 20, 0.15), [m?.avgP95]);
  const sparkC = useMemo(() => sparklineFromValue(m?.avgQueueLag ?? 0, 20, 0.2), [m?.avgQueueLag]);
  const sparkD = useMemo(() => sparklineFromValue(m?.onlineWorkers ?? 0, 20, 0.1), [m?.onlineWorkers]);
  const sparkE = useMemo(() => sparklineFromValue(m?.avgErrorRate ?? 0, 20, 0.25), [m?.avgErrorRate]);
  const sparkF = useMemo(() => sparklineFromValue(100 - (m?.avgErrorRate ?? 0), 20, 0.05), [m?.avgErrorRate]);
  const sparkG = useMemo(() => sparklineFromValue(m?.eventsPerHour ?? 0, 20, 0.2), [m?.eventsPerHour]);
  const sparkH = useMemo(() => sparklineFromValue(m?.avgUptime ?? 99.9, 20, 0.01), [m?.avgUptime]);

  const [selectedEvent, setSelectedEvent] = useState<AppEvent | null>(null);
  const isLoading = metricsLoading || eventsLoading;
  const isError = metricsError || eventsError;
  const error = metricsErr ?? eventsErr;
  const refetch = () => { refetchMetrics(); refetchEvents(); refetchAlerts(); };

  const ackAlert = (id: string) => acknowledge.mutate(id);

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

  return (
    <div className="flex flex-col">
      <RoleDashboardHeader />
      <PageHeader
        title="Overview"
        description="Realtime health across events, queues, workers and ML."
        actions={
          <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={refetch}>
            <RefreshCw className="h-3 w-3" />Refresh
          </Button>
        }
      />

      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Total RPS" value={String(m?.totalRps ?? 0)} series={sparkA} trend={0} status="info" variant="area" />
        <MetricCard label="API latency p95" value={String(m?.avgP95 ?? 0)} unit="ms" series={sparkB} trend={0} status="info" />
        <MetricCard label="Queue lag" value={String(m?.avgQueueLag ?? 0)} unit="ms" series={sparkC} trend={0} status="warning" />
        <MetricCard label="Active workers" value={`${m?.onlineWorkers ?? 0}/${m?.totalWorkers ?? 0}`} series={sparkD} trend={0} status="success" />
        <MetricCard label="Error rate" value={String(m?.avgErrorRate ?? 0)} unit="%" series={sparkE} trend={0} status="success" />
        <MetricCard label="Success rate" value={String(+(100 - (m?.avgErrorRate ?? 0)).toFixed(2))} unit="%" series={sparkF} trend={0} status="success" />
        <MetricCard label="Events / hour" value={String(m?.eventsPerHour ?? 0)} series={sparkG} trend={0} status="info" variant="area" />
        <MetricCard label="System uptime" value={String(m?.avgUptime ?? 0)} unit="%" series={sparkH} trend={0} status="success" />
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
              <p className="text-xs text-muted-foreground">{events.length} events from database</p>
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
      </QueryBoundary>
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
