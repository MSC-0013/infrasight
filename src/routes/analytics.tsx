import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { ChartCard } from "@/components/chart-card";
import { MetricCard } from "@/components/metric-card";
import { QueryBoundary } from "@/components/data-state";
import {
  sparklineFromValue,
  throughputToChart,
  latencyFromThroughput,
  queueLagFromQueues,
  distributionFromEvents,
} from "@/lib/chart-helpers";
import {
  usePulseThroughput,
  usePulseAnalyticsOverview,
  usePulseQueues,
  usePulseWorkers,
  usePulseOrganizations,
  usePulseEvents,
} from "@/lib/pulse-hooks";

export const Route = createFileRoute("/analytics")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:analytics")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "Analytics — Pulse" },
      { name: "description", content: "Throughput, latency, distribution and organization analytics." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const { data: overview, isLoading, isError, error, refetch } = usePulseAnalyticsOverview();
  const { data: throughputRaw = [] } = usePulseThroughput(24);
  const { data: queues = [] } = usePulseQueues();
  const { data: workers = [] } = usePulseWorkers();
  const { data: orgs = [] } = usePulseOrganizations();
  const { data: events = [] } = usePulseEvents(500);

  const throughput = useMemo(() => throughputToChart(throughputRaw), [throughputRaw]);
  const latency = useMemo(() => latencyFromThroughput(throughputRaw), [throughputRaw]);
  const lag = useMemo(() => queueLagFromQueues(queues), [queues]);
  const dist = useMemo(() => distributionFromEvents(events), [events]);
  const spark = useMemo(() => sparklineFromValue(overview?.eventsTotal ?? 0, 20), [overview?.eventsTotal]);

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

  return (
    <div className="flex flex-col">
      <PageHeader title="Analytics" description="Throughput, latency and distribution across the platform." />

      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Total events" value={String(overview?.eventsTotal ?? 0)} series={spark} trend={0} status="info" />
        <MetricCard label="Avg latency" value={String(overview?.latencyP95 ?? 0)} unit="ms" series={sparklineFromValue(overview?.latencyP95 ?? 0, 20)} trend={0} status="success" />
        <MetricCard label="Throughput RPS" value={String(Math.round(overview?.throughputRps ?? 0))} series={sparklineFromValue(overview?.throughputRps ?? 0, 20)} trend={0} status="info" />
        <MetricCard label="Error rate" value={String(overview?.errorRate ?? 0)} unit="%" series={sparklineFromValue(overview?.errorRate ?? 0, 20)} trend={0} status="success" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-2">
        <ChartCard title="Throughput" description="Events / minute">
          <Chart h={240}>
            <AreaChart data={throughput} margin={chartMargin}>
              <defs>
                <linearGradient id="a1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} /></linearGradient>
                <linearGradient id="a2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={false} interval={10} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="success" stroke="var(--color-success)" fill="url(#a1)" strokeWidth={1.5} />
              <Area dataKey="failed" stroke="var(--color-destructive)" fill="url(#a2)" strokeWidth={1.5} />
            </AreaChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Latency percentiles" description="p50 / p95 / p99">
          <Chart h={240}>
            <LineChart data={latency} margin={chartMargin}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={false} interval={10} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={legendStyle} iconSize={8} />
              <Line dataKey="p50" stroke="var(--color-chart-2)" dot={false} strokeWidth={1.5} />
              <Line dataKey="p95" stroke="var(--color-chart-1)" dot={false} strokeWidth={1.5} />
              <Line dataKey="p99" stroke="var(--color-chart-4)" dot={false} strokeWidth={1.5} />
            </LineChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Queue lag trend">
          <Chart h={220}>
            <AreaChart data={lag} margin={chartMargin}>
              <defs><linearGradient id="lag2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.3} /><stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="label" tick={axisTick} tickLine={false} axisLine={false} interval={10} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area dataKey="lag" stroke="var(--color-warning)" fill="url(#lag2)" strokeWidth={1.5} />
            </AreaChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Event distribution" description="Share by event type">
          <Chart h={220}>
            <PieChart>
              <Pie data={dist} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={2}>
                {dist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--color-card)" />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={legendStyle} iconSize={8} />
            </PieChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Top organizations" description="By event volume">
          <Chart h={220}>
            <BarChart data={orgs.map((o) => ({ name: o.slug, events: events.filter((e) => e.organization === o.slug || e.organization === o.name).length }))} margin={chartMargin}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="name" tick={axisTick} tickLine={false} axisLine={false} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent)" }} />
              <Bar dataKey="events" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </Chart>
        </ChartCard>

        <ChartCard title="Worker throughput" description="Jobs processed (k)">
          <Chart h={220}>
            <BarChart data={workers.map((w) => ({ name: w.name.replace("worker-", ""), jobs: Math.round(w.jobsProcessed / 1000) }))} margin={chartMargin}>
              <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
              <XAxis dataKey="name" tick={{ ...axisTick, fontSize: 9 }} tickLine={false} axisLine={false} angle={-20} textAnchor="end" height={40} interval={0} />
              <YAxis tick={axisTick} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-accent)" }} />
              <Bar dataKey="jobs" fill="var(--color-chart-2)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </Chart>
        </ChartCard>
      </div>
      </QueryBoundary>
      <div className="h-6" />
    </div>
  );
}

const axisTick = { fill: "var(--color-muted-foreground)", fontSize: 10 };
const tooltipStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
const legendStyle = { fontSize: 10, color: "var(--color-muted-foreground)" };
const chartMargin = { top: 4, right: 8, left: -16, bottom: 0 };

function Chart({ children, h }: { children: React.ReactElement; h: number }) {
  return <div style={{ height: h }}><ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer></div>;
}
