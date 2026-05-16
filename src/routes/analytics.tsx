import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import {
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell,
} from "recharts";
import { PageHeader } from "@/components/page-header";
import { ChartCard } from "@/components/chart-card";
import { MetricCard } from "@/components/metric-card";
import {
  generateThroughputSeries, generateLatencySeries, generateQueueLagSeries,
  generateEventDistribution, generateOrganizations, generateWorkers, generateTimeSeries,
} from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — Pulse" },
      { name: "description", content: "Throughput, latency, distribution and organization analytics." },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const throughput = useMemo(() => generateThroughputSeries(80), []);
  const latency = useMemo(() => generateLatencySeries(80), []);
  const lag = useMemo(() => generateQueueLagSeries(80), []);
  const dist = useMemo(() => generateEventDistribution(), []);
  const orgs = useMemo(() => generateOrganizations(), []);
  const workers = useMemo(() => generateWorkers(), []);
  const spark = useMemo(() => generateTimeSeries(20, 100, 20), []);

  const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

  return (
    <div className="flex flex-col">
      <PageHeader title="Analytics" description="Throughput, latency and distribution across the platform." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Total events (24h)" value="14.3M" series={spark} trend={6.2} status="info" />
        <MetricCard label="Avg latency" value="84" unit="ms" series={spark} trend={-2.4} trendInverted status="success" />
        <MetricCard label="Peak RPS" value="2,421" series={spark} trend={11.2} status="info" />
        <MetricCard label="SLA compliance" value="99.94" unit="%" series={spark} trend={0.05} status="success" />
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
            <BarChart data={orgs.map((o, i) => ({ name: o.slug, events: 200000 - i * 28000 + Math.round(Math.random() * 20000) }))} margin={chartMargin}>
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
