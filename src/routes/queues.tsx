import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from "recharts";
import { PageHeader } from "@/components/page-header";
import { ChartCard } from "@/components/chart-card";
import { QueueCard } from "@/components/queue-card";
import { MetricCard } from "@/components/metric-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { JSONViewer } from "@/components/json-viewer";
import { generateQueues, generateQueueLagSeries, generateTimeSeries, type Queue } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";

export const Route = createFileRoute("/queues")({
  head: () => ({
    meta: [
      { title: "Queue Monitoring — Pulse" },
      { name: "description", content: "Monitor queue depth, lag, throughput and DLQ in realtime." },
    ],
  }),
  component: QueuesPage,
});

function QueuesPage() {
  const queues = useMemo(() => generateQueues(), []);
  const lag = useMemo(() => generateQueueLagSeries(60), []);
  const tput = useMemo(() => generateTimeSeries(60, 1200, 300), []);
  const retries = useMemo(() => generateTimeSeries(60, 40, 20), []);
  const [selected, setSelected] = useState<Queue | null>(null);
  const spark = useMemo(() => generateTimeSeries(20, 100, 30), []);

  const totalMsgs = queues.reduce((a, q) => a + q.messages, 0);
  const totalDlq = queues.reduce((a, q) => a + q.dlq, 0);
  const totalThroughput = queues.reduce((a, q) => a + q.throughput, 0);

  return (
    <div className="flex flex-col">
      <PageHeader title="Queue Monitoring" description="Realtime visibility into every queue and DLQ." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Total queues" value={queues.length.toString()} series={spark} trend={0} status="info" />
        <MetricCard label="Messages in flight" value={totalMsgs.toLocaleString()} series={spark} trend={3.4} status="info" />
        <MetricCard label="Throughput" value={`${totalThroughput.toLocaleString()}/s`} series={spark} trend={5.1} status="success" />
        <MetricCard label="Dead-letter total" value={totalDlq.toString()} series={spark} trend={-8.2} trendInverted status="warning" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-3">
        <ChartCard title="Average lag" description="ms across all queues">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={lag} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs><linearGradient id="lg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-warning)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--color-warning)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Area dataKey="lag" stroke="var(--color-warning)" fill="url(#lg)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Throughput" description="Messages / sec">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tput} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Line dataKey="value" stroke="var(--color-primary)" dot={false} strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Retry rate" description="Retries / min">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retries} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} cursor={{ fill: "var(--color-accent)" }} />
                <Bar dataKey="value" fill="var(--color-destructive)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="px-6 py-4">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Queues</h2>
          <StatusBadge tone="success">all reachable</StatusBadge>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {queues.map((q) => (
            <button key={q.id} className="text-left" onClick={() => setSelected(q)}>
              <QueueCard queue={q} />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-mono text-sm">{selected.name}</DialogTitle>
                <DialogDescription className="text-xs">Health score: {Math.round(100 - (selected.messages / 14000) * 60)} / 100</DialogDescription>
              </DialogHeader>
              <JSONViewer data={selected} />
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

const tick = { fill: "var(--color-muted-foreground)", fontSize: 10 };
const ttStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
