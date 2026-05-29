import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { OctagonAlert as AlertOctagon, GitBranch, Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Incident, Deployment, SLO } from "@/lib/mock-data";
import { sparklineFromValue } from "@/lib/chart-helpers";
import { usePulseIncidents, usePulseDeployments, usePulseSLOs, usePulseDashboardMetrics } from "@/lib/pulse-hooks";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const SEV_TONE: Record<string, "critical" | "error" | "warning" | "info"> = {
  sev1: "critical", sev2: "error", sev3: "warning", sev4: "info",
};
const STATUS_TONE: Record<string, "info" | "warning" | "success" | "error"> = {
  investigating: "warning", identified: "info", monitoring: "info", resolved: "success",
};
const DEPLOY_TONE: Record<string, "success" | "error" | "warning" | "info"> = {
  succeeded: "success", failed: "error", rolled_back: "warning", in_progress: "info",
};

export function SREDashboard() {
  const { data: metrics } = usePulseDashboardMetrics();
  const { data: incidents = [] } = usePulseIncidents();
  const { data: deployments = [] } = usePulseDeployments(10);
  const { data: slos = [] } = usePulseSLOs();

  const openIncidents = incidents.filter(i => i.status !== "resolved").length;
  const sev1Incidents = incidents.filter(i => i.severity === "sev1" && i.status !== "resolved").length;
  const avgErrorBudget = slos.length
    ? +(slos.reduce((a, s) => a + s.budgetRemaining, 0) / slos.length).toFixed(1)
    : 100;
  const deploys24h = deployments.filter(d => d.status !== "in_progress").length;
  const atRiskSLOs = slos.filter(s => s.status === "at_risk").length;
  const breachedSLOs = slos.filter(s => s.status === "breached").length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Reliability Cockpit"
        description="Incidents, on-call rotations, deployment posture and infrastructure health."
        actions={
          <>
            <Link to="/incidents"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><AlertOctagon className="h-3 w-3" />Declare Incident</Button></Link>
            <Link to="/deployments"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><GitBranch className="h-3 w-3" />Deployments</Button></Link>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Open incidents" value={openIncidents} series={sparklineFromValue(openIncidents, 20)} trend={0} status="warning" />
        <MetricCard label="SEV1 incidents" value={sev1Incidents} series={sparklineFromValue(sev1Incidents, 20)} trend={0} status={sev1Incidents > 0 ? "critical" : "success"} />
        <MetricCard label="Error budget" value={`${avgErrorBudget}%`} series={sparklineFromValue(avgErrorBudget, 20)} trend={0} status={avgErrorBudget < 50 ? "error" : "warning"} />
        <MetricCard label="Deploys 24h" value={deploys24h} series={sparklineFromValue(deploys24h, 20)} trend={0} status="info" />
        <MetricCard label="Active alerts" value={metrics?.activeAlerts ?? 0} series={sparklineFromValue(metrics?.activeAlerts ?? 0, 20)} trend={0} status="info" />
        <MetricCard label="At-risk SLOs" value={atRiskSLOs} series={sparklineFromValue(atRiskSLOs, 20)} trend={0} status="warning" />
        <MetricCard label="Breached SLOs" value={breachedSLOs} series={sparklineFromValue(breachedSLOs, 20)} trend={0} status={breachedSLOs > 0 ? "error" : "success"} />
        <MetricCard label="Uptime" value={`${metrics?.avgUptime ?? 99.9}%`} series={sparklineFromValue(metrics?.avgUptime ?? 99.9, 20, 0.01)} trend={0} status="success" />
      </div>

      {/* Incidents + Deployments */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><AlertOctagon className="h-3.5 w-3.5 text-destructive" />Active Incidents</h3>
              <p className="text-xs text-muted-foreground">{openIncidents} open</p>
            </div>
            <Link to="/incidents" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Severity</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Title</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Opened</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.filter(i => i.status !== "resolved").slice(0, 8).map((inc) => (
                  <TableRow key={inc.id} className="cursor-pointer border-border text-xs hover:bg-accent/40">
                    <TableCell className="py-1.5"><StatusBadge tone={SEV_TONE[inc.severity] ?? "info"}>{inc.severity}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-medium">{inc.title}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={STATUS_TONE[inc.status] ?? "info"}>{inc.status}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(new Date(inc.openedAt), { addSuffix: true })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><GitBranch className="h-3.5 w-3.5 text-primary" />Recent Deployments</h3>
              <p className="text-xs text-muted-foreground">{deployments.length} recent</p>
            </div>
            <Link to="/deployments" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Service</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Version</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Env</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">When</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deployments.map((d) => (
                  <TableRow key={d.id} className="border-border text-xs">
                    <TableCell className="py-1.5 font-mono text-[11px]">{d.service}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px]">{d.version}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={d.environment === "prod" ? "error" : d.environment === "staging" ? "warning" : "info"}>{d.environment}</StatusBadge></TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={DEPLOY_TONE[d.status] ?? "info"}>{d.status.replace("_", " ")}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(new Date(d.startedAt), { addSuffix: true })}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* SLOs summary */}
      <div className="px-6 py-3">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Flame className="h-3.5 w-3.5 text-warning" />SLO Error Budgets</h3>
              <p className="text-xs text-muted-foreground">{slos.length} SLOs</p>
            </div>
            <Link to="/slos" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {slos.slice(0, 6).map((slo) => (
              <div key={slo.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{slo.name}</span>
                  <StatusBadge tone={slo.status === "healthy" ? "success" : slo.status === "at_risk" ? "warning" : "error"}>{slo.status.replace("_", " ")}</StatusBadge>
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{slo.service}</p>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                  <div className={cn("h-full rounded-full transition-all", slo.budgetRemaining > 50 ? "bg-success" : slo.budgetRemaining > 20 ? "bg-warning" : "bg-destructive")} style={{ width: `${slo.budgetRemaining}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Budget: {slo.budgetRemaining}%</span>
                  <span>Burn rate: {slo.burnRate}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
