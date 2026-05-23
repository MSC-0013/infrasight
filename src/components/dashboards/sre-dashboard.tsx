import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { OctagonAlert as AlertOctagon, GitBranch, Network, ShieldCheck, Flame, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  fetchSREMetrics, fetchIncidents, fetchDeployments, fetchSLOs,
} from "@/lib/supabase-queries";
import { generateTimeSeries } from "@/lib/mock-data";
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

interface IncidentRow {
  id: string;
  title: string;
  severity: string;
  status: string;
  opened_at: string;
  impacted_services: string[];
}

interface DeploymentRow {
  id: string;
  service: string;
  version: string;
  author: string;
  status: string;
  environment: string;
  started_at: string;
}

export function SREDashboard() {
  const [metrics, setMetrics] = useState<Awaited<ReturnType<typeof fetchSREMetrics>> | null>(null);
  const [incidents, setIncidents] = useState<IncidentRow[]>([]);
  const [deployments, setDeployments] = useState<DeploymentRow[]>([]);
  const [slos, setSlos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [m, i, d, s] = await Promise.all([
        fetchSREMetrics(),
        fetchIncidents(),
        fetchDeployments(10),
        fetchSLOs(),
      ]);
      setMetrics(m);
      setIncidents(i as IncidentRow[]);
      setDeployments(d as DeploymentRow[]);
      setSlos(s);
      setLoading(false);
    }
    load();
  }, []);

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
        <MetricCard label="Open incidents" value={metrics?.openIncidents ?? "—"} series={generateTimeSeries(20, 3, 1)} trend={-14.2} trendInverted status="warning" />
        <MetricCard label="SEV1 incidents" value={metrics?.sev1Incidents ?? "—"} series={generateTimeSeries(20, 1, 0)} trend={0} status={metrics?.sev1Incidents ? "critical" : "success"} />
        <MetricCard label="Error budget" value={`${metrics?.avgErrorBudget ?? 100}%`} series={generateTimeSeries(20, 82, 5)} trend={-2.1} trendInverted status={metrics?.avgErrorBudget && metrics.avgErrorBudget < 50 ? "error" : "warning"} />
        <MetricCard label="Deploys 24h" value={metrics?.deploys24h ?? "—"} series={generateTimeSeries(20, 14, 3)} trend={8.4} status="info" />
        <MetricCard label="MTTR (7d)" value="18m" series={generateTimeSeries(20, 18, 6)} trend={-5.2} trendInverted status="success" />
        <MetricCard label="At-risk SLOs" value={slos.filter(s => s.status === "at_risk").length} series={generateTimeSeries(20, 2, 1)} trend={0} status="warning" />
        <MetricCard label="Breached SLOs" value={slos.filter(s => s.status === "breached").length} series={generateTimeSeries(20, 0, 0)} trend={0} status={slos.some(s => s.status === "breached") ? "error" : "success"} />
        <MetricCard label="Uptime" value="99.992%" series={generateTimeSeries(20, 99.992, 0.008)} trend={0.01} status="success" />
      </div>

      {/* Incidents + Deployments */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><AlertOctagon className="h-3.5 w-3.5 text-destructive" />Active Incidents</h3>
              <p className="text-xs text-muted-foreground">{incidents.filter(i => i.status !== "resolved").length} open</p>
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
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(new Date(inc.opened_at), { addSuffix: true })}</TableCell>
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
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(new Date(d.started_at), { addSuffix: true })}</TableCell>
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
                  <div className={cn("h-full rounded-full transition-all", slo.budget_remaining > 50 ? "bg-success" : slo.budget_remaining > 20 ? "bg-warning" : "bg-destructive")} style={{ width: `${slo.budget_remaining}%` }} />
                </div>
                <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Budget: {slo.budget_remaining}%</span>
                  <span>Burn rate: {slo.burn_rate}x</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
