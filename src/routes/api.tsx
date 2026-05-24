import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { generateApiEndpoints, generateLatencySeries, generateTimeSeries } from "@/lib/mock-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/api")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:api")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "API Monitoring — Pulse" },
      { name: "description", content: "Latency, throughput and errors per endpoint." },
    ],
  }),
  component: ApiPage,
});

const METHOD_TONE: Record<string, "info" | "success" | "warning" | "error" | "neutral"> = {
  GET: "info", POST: "success", PUT: "warning", DELETE: "error", PATCH: "warning",
};

function ApiPage() {
  const endpoints = useMemo(() => generateApiEndpoints(), []);
  const latency = useMemo(() => generateLatencySeries(60), []);
  const rps = useMemo(() => generateTimeSeries(60, 1400, 320), []);
  const spark = useMemo(() => generateTimeSeries(20, 80, 12), []);

  return (
    <div className="flex flex-col">
      <PageHeader title="API Monitoring" description="Endpoint-level latency, throughput and errors." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Requests / sec" value="1,424" series={spark} trend={3.4} status="info" />
        <MetricCard label="p95 latency" value="142" unit="ms" series={spark} trend={-2.1} trendInverted status="success" />
        <MetricCard label="Error rate" value="0.84" unit="%" series={spark} trend={-1.2} trendInverted status="success" />
        <MetricCard label="Endpoints" value={endpoints.length.toString()} series={spark} trend={0} status="info" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-2">
        <ChartCard title="Latency (ms)" description="p50 / p95 / p99">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latency} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Line dataKey="p50" stroke="var(--color-chart-2)" dot={false} strokeWidth={1.5} />
                <Line dataKey="p95" stroke="var(--color-chart-1)" dot={false} strokeWidth={1.5} />
                <Line dataKey="p99" stroke="var(--color-chart-4)" dot={false} strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Throughput" description="Requests / sec">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={rps} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs><linearGradient id="rps" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Area dataKey="value" stroke="var(--color-primary)" fill="url(#rps)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-2.5">
            <h3 className="text-sm font-semibold">Endpoints</h3>
            <p className="text-xs text-muted-foreground">Sorted by request volume</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="h-8 text-[10px] font-mono uppercase">Method</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Path</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">RPS</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">p50</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">p95</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">p99</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Error %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.sort((a, b) => b.rps - a.rps).map((e) => (
                <TableRow key={e.method + e.path} className="border-border text-xs hover:bg-accent/40">
                  <TableCell className="py-1.5"><StatusBadge tone={METHOD_TONE[e.method]} dot={false}>{e.method}</StatusBadge></TableCell>
                  <TableCell className="py-1.5 font-mono text-[11px]">{e.path}</TableCell>
                  <TableCell className="py-1.5 text-right font-mono tabular-nums">{e.rps.toLocaleString()}</TableCell>
                  <TableCell className="py-1.5 text-right font-mono tabular-nums">{e.p50}ms</TableCell>
                  <TableCell className={cn("py-1.5 text-right font-mono tabular-nums", e.p95 > 250 && "text-warning")}>{e.p95}ms</TableCell>
                  <TableCell className={cn("py-1.5 text-right font-mono tabular-nums", e.p99 > 600 && "text-destructive")}>{e.p99}ms</TableCell>
                  <TableCell className={cn("py-1.5 text-right font-mono tabular-nums", e.errorRate > 1.5 && "text-destructive")}>{e.errorRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="px-6 pb-6">
        <ChartCard title="Request trace (preview)">
          <pre className="thin-scrollbar max-h-56 overflow-auto rounded-md bg-background p-3 font-mono text-[11px] leading-relaxed text-foreground/80">
{`trace_id=4d2f9b... POST /api/v1/events  201  84ms
  ├─ api-gateway        2ms   auth.verify
  ├─ events-ingest     12ms   schema.validate
  ├─ queue-processor    4ms   enqueue events.high
  └─ worker-us-east-1a 66ms   handler.run`}
          </pre>
        </ChartCard>
      </div>
    </div>
  );
}

const tick = { fill: "var(--color-muted-foreground)", fontSize: 10 };
const ttStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
