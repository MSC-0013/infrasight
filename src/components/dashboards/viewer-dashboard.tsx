import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Activity, Bell, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip,
} from "recharts";
import type { ServiceHealth, Alert, MLInsight } from "@/lib/mock-data";
import { sparklineFromValue } from "@/lib/chart-helpers";
import { usePulseServices, usePulseAlerts, usePulseMLInsights, usePulseMLModels, usePulseDashboardMetrics } from "@/lib/pulse-hooks";

const COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)", "var(--color-primary)"];

export function ViewerDashboard() {
  const { data: metrics } = usePulseDashboardMetrics();
  const { data: services = [] } = usePulseServices();
  const { data: alerts = [] } = usePulseAlerts();
  const { data: mlInsights = [] } = usePulseMLInsights();
  const { data: mlModels = [] } = usePulseMLModels();

  const healthyServices = services.filter(s => s.status === "healthy").length;
  const totalServices = services.length;
  const uptime = totalServices
    ? +(services.reduce((a, s) => a + s.uptimePct, 0) / totalServices).toFixed(3)
    : 99.9;
  const activeAlerts = alerts.filter(a => !a.acknowledged).length;
  const eventsPerSec = services.reduce((a, s) => a + s.rps, 0);

  const serviceDist = useMemo(() =>
    services.reduce((acc: { name: string; value: number }[], s) => {
      const existing = acc.find(a => a.name === s.status);
      if (existing) existing.value++;
      else acc.push({ name: s.status, value: 1 });
      return acc;
    }, []),
    [services]
  );

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Read-only Dashboard"
        description="Live overview of platform health. You can browse but not modify configuration."
        actions={
          <>
            <Link to="/services"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Activity className="h-3 w-3" />Services</Button></Link>
            <Link to="/alerts"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Bell className="h-3 w-3" />Alerts</Button></Link>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="System uptime" value={`${uptime}%`} series={sparklineFromValue(uptime, 20, 0.01)} trend={0} status="success" />
        <MetricCard label="Healthy services" value={`${healthyServices}/${totalServices}`} series={sparklineFromValue(healthyServices, 20)} trend={0} status="success" />
        <MetricCard label="Active alerts" value={activeAlerts} series={sparklineFromValue(activeAlerts, 20)} trend={0} status="warning" />
        <MetricCard label="Total RPS" value={String(eventsPerSec)} series={sparklineFromValue(eventsPerSec, 20)} trend={0} status="info" variant="area" />
        <MetricCard label="API latency p95" value={`${metrics?.avgP95 ?? 0}ms`} series={sparklineFromValue(metrics?.avgP95 ?? 0, 20)} trend={0} status="info" />
        <MetricCard label="Error rate" value={`${metrics?.avgErrorRate ?? 0}%`} series={sparklineFromValue(metrics?.avgErrorRate ?? 0, 20)} trend={0} status="success" />
        <MetricCard label="ML Models" value={mlModels.length} series={sparklineFromValue(mlModels.length, 20)} trend={0} status="info" />
        <MetricCard label="Anomalies 24h" value={mlInsights.filter(m => m.type === "anomaly").length} series={sparklineFromValue(mlInsights.filter(m => m.type === "anomaly").length, 20)} trend={0} status="warning" />
      </div>

      {/* Service Distribution + ML Insights */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-3">
        <ChartCard title="Service distribution" description="By health status">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={serviceDist} dataKey="value" nameKey="name" innerRadius={36} outerRadius={62} paddingAngle={2}>
                  {serviceDist.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} stroke="var(--color-card)" />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 10, color: "var(--color-muted-foreground)" }} iconSize={8} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="lg:col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-primary" />ML Insights</h3>
              <p className="text-xs text-muted-foreground">{mlInsights.length} insights</p>
            </div>
            <Link to="/mlops" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[300px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Type</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Title</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Service</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mlInsights.slice(0, 10).map((m) => (
                  <TableRow key={m.id} className="border-border text-xs">
                    <TableCell className="py-1.5"><StatusBadge tone={m.type === "anomaly" ? "warning" : m.type === "prediction" ? "info" : "success"}>{m.type}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-medium">{m.title}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{m.service}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] tabular-nums">{m.confidence}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Active alerts */}
      <div className="px-6 py-3">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Bell className="h-3.5 w-3.5 text-warning" />Active Alerts</h3>
              <p className="text-xs text-muted-foreground">{activeAlerts} unacknowledged</p>
            </div>
            <Link to="/alerts" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
            {alerts.slice(0, 4).map((a) => (
              <div key={a.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{a.title}</span>
                  <StatusBadge tone={a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning"}>{a.severity}</StatusBadge>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">{a.description}</p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{a.service} · {a.source}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
