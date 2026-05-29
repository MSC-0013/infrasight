import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { StatusBadge } from "@/components/status-badge";
import { QueryBoundary } from "@/components/data-state";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import type { ApiEndpoint } from "@/lib/mock-data";
import { sparklineFromValue, latencyFromThroughput, throughputToChart } from "@/lib/chart-helpers";
import { usePulseServices, usePulseThroughput, usePulseDashboardMetrics } from "@/lib/pulse-hooks";
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
  const { data: services = [], isLoading, isError, error, refetch } = usePulseServices();
  const { data: metrics } = usePulseDashboardMetrics();
  const { data: throughputRaw = [] } = usePulseThroughput(1);

  const endpoints: ApiEndpoint[] = useMemo(
    () =>
      services.map((s) => ({
        method: "GET" as const,
        path: `/api/v1/${s.name}`,
        p50: Math.round(s.p95Ms * 0.6),
        p95: s.p95Ms,
        p99: Math.round(s.p95Ms * 1.4),
        rps: s.rps,
        errorRate: +(s.errorRate * 100).toFixed(2),
      })),
    [services],
  );

  const latency = useMemo(() => latencyFromThroughput(throughputRaw), [throughputRaw]);
  const rps = useMemo(() => throughputToChart(throughputRaw), [throughputRaw]);
  const spark = useMemo(() => sparklineFromValue(metrics?.totalRps ?? 0, 20), [metrics?.totalRps]);

  return (
    <div className="flex flex-col">
      <PageHeader title="API Monitoring" description="Endpoint-level latency, throughput and errors (from services)." />

      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
        <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
          <MetricCard label="Requests / sec" value={String(metrics?.totalRps ?? 0)} series={spark} trend={0} status="info" />
          <MetricCard label="p95 latency" value={String(metrics?.avgP95 ?? 0)} unit="ms" series={sparklineFromValue(metrics?.avgP95 ?? 0, 20)} trend={0} status="success" />
          <MetricCard label="Error rate" value={String(metrics?.avgErrorRate ?? 0)} unit="%" series={sparklineFromValue(metrics?.avgErrorRate ?? 0, 20)} trend={0} status="success" />
          <MetricCard label="Endpoints" value={endpoints.length.toString()} series={sparklineFromValue(endpoints.length, 20)} trend={0} status="info" />
        </div>

        <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-2">
          <ChartCard title="Latency percentiles" description="Derived from event throughput">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={latency} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tt} />
                  <Line dataKey="p95" stroke="var(--color-chart-1)" dot={false} strokeWidth={1.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          <ChartCard title="Throughput" description="Success vs failed">
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={rps} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                  <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fill: "var(--color-muted-foreground)", fontSize: 10 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tt} />
                  <Area dataKey="success" stroke="var(--color-success)" fill="var(--color-success)" fillOpacity={0.2} strokeWidth={1.5} />
                  <Area dataKey="failed" stroke="var(--color-destructive)" fill="var(--color-destructive)" fillOpacity={0.2} strokeWidth={1.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        <div className="px-6 py-4">
          <div className="rounded-lg border border-border bg-card">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Method</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Path</TableHead>
                  <TableHead className="h-8 text-right text-[10px] font-mono uppercase">RPS</TableHead>
                  <TableHead className="h-8 text-right text-[10px] font-mono uppercase">p95</TableHead>
                  <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Errors</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {endpoints.map((e) => (
                  <TableRow key={e.path} className="border-border text-xs">
                    <TableCell className="py-1.5"><StatusBadge tone={METHOD_TONE[e.method]}>{e.method}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px]">{e.path}</TableCell>
                    <TableCell className="py-1.5 text-right font-mono tabular-nums">{e.rps}</TableCell>
                    <TableCell className={cn("py-1.5 text-right font-mono tabular-nums", e.p95 > 200 && "text-warning")}>{e.p95}ms</TableCell>
                    <TableCell className={cn("py-1.5 text-right font-mono tabular-nums", e.errorRate > 1 && "text-destructive")}>{e.errorRate}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </QueryBoundary>
    </div>
  );
}

const tt = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
