import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { PageHeader } from "@/components/page-header";
import { WorkerCard } from "@/components/worker-card";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { generateWorkers, generateTimeSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/workers")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:workers")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "Worker Monitoring — Pulse" },
      { name: "description", content: "Realtime worker fleet health, CPU, memory and throughput." },
    ],
  }),
  component: WorkersPage,
});

function WorkersPage() {
  const workers = useMemo(() => generateWorkers(), []);
  const cpu = useMemo(() => generateTimeSeries(60, 45, 18), []);
  const mem = useMemo(() => generateTimeSeries(60, 58, 12), []);
  const jobs = useMemo(() => generateTimeSeries(60, 1200, 280), []);
  const spark = useMemo(() => generateTimeSeries(20, 80, 10), []);

  return (
    <div className="flex flex-col">
      <PageHeader title="Worker Monitoring" description="Distributed worker fleet across regions." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Total workers" value={workers.length.toString()} series={spark} trend={0} status="info" />
        <MetricCard label="Online" value={workers.filter(w => w.status === "online").length.toString()} series={spark} trend={1.2} status="success" />
        <MetricCard label="Degraded" value={workers.filter(w => w.status === "degraded").length.toString()} series={spark} trend={0} status="warning" />
        <MetricCard label="Offline" value={workers.filter(w => w.status === "offline").length.toString()} series={spark} trend={0} status="error" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-3">
        <ChartCard title="Fleet CPU" description="% average">
          <Spark data={cpu} color="var(--color-chart-1)" />
        </ChartCard>
        <ChartCard title="Fleet memory" description="% average">
          <Spark data={mem} color="var(--color-chart-3)" />
        </ChartCard>
        <ChartCard title="Jobs / sec" description="aggregate">
          <Spark data={jobs} color="var(--color-success)" />
        </ChartCard>
      </div>

      <div className="px-6 py-4">
        <h2 className="mb-2 text-sm font-semibold">Worker fleet</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {workers.map((w) => <WorkerCard key={w.id} worker={w} />)}
        </div>
      </div>

      <div className="px-6 pb-6">
        <ChartCard title="Worker logs (preview)">
          <pre className="thin-scrollbar max-h-64 overflow-auto rounded-md bg-background p-3 font-mono text-[11px] leading-relaxed text-foreground/80">
{`[2026-05-16T14:08:21Z] INFO  worker-us-east-1a started job=job_a83c2f queue=events.high
[2026-05-16T14:08:21Z] INFO  worker-us-east-1a processed event_type=user.signup latency=42ms
[2026-05-16T14:08:22Z] WARN  worker-eu-west-1b heartbeat missed (1/3)
[2026-05-16T14:08:23Z] INFO  worker-us-west-2a processed event_type=payment.processed latency=128ms
[2026-05-16T14:08:24Z] ERROR worker-eu-west-1b connection refused upstream=postgres-primary retry=2
[2026-05-16T14:08:25Z] INFO  worker-ap-south-1a processed event_type=webhook.delivered latency=88ms
[2026-05-16T14:08:26Z] INFO  worker-us-east-1b processed event_type=email.sent latency=51ms`}
          </pre>
        </ChartCard>
      </div>
    </div>
  );
}

function Spark({ data, color }: { data: Array<{ value: number; label: string }>; color: string }) {
  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
          <defs><linearGradient id={color} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.3} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
          <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} tickLine={false} axisLine={false} interval={12} />
          <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 9 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 }} />
          <Area dataKey="value" stroke={color} fill={`url(#${color})`} strokeWidth={1.5} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
