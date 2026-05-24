import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { ShieldCheck, Building2, KeyRound, FileText } from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  generateOrganizations, generateAuditLogs, generateApiKeys,
  generateTimeSeries, type Organization, type AuditLog, type ApiKey,
} from "@/lib/mock-data";
import { formatDistanceToNow } from "date-fns";

export function SuperAdminDashboard() {
  const orgs = useMemo(() => generateOrganizations(), []);
  const auditLogs = useMemo(() => generateAuditLogs(15), []);
  const apiKeys = useMemo(() => generateApiKeys(), []);

  const sparkA = useMemo(() => generateTimeSeries(20, 12, 2), []);
  const sparkB = useMemo(() => generateTimeSeries(20, 248, 30), []);
  const sparkC = useMemo(() => generateTimeSeries(20, 14, 4), []);
  const sparkD = useMemo(() => generateTimeSeries(20, 8400, 800), []);

  const totalOrgs = orgs.length;
  const totalMembers = 248;
  const totalApiKeys = apiKeys.filter(k => k.status === "active").length;
  const auditEvents24h = auditLogs.length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Global Control Plane"
        description="Org governance, billing posture, audit trail and security signals across every workspace."
        actions={
          <>
            <Link to="/organizations"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Building2 className="h-3 w-3" />New Org</Button></Link>
            <Link to="/audit"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><FileText className="h-3 w-3" />Audit</Button></Link>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Workspaces" value={totalOrgs} series={sparkA} trend={4.2} status="info" variant="area" />
        <MetricCard label="Total members" value={totalMembers} series={sparkB} trend={6.1} status="info" />
        <MetricCard label="Active API keys" value={totalApiKeys} series={sparkC} trend={2.3} status="success" />
        <MetricCard label="Audit 24h" value={auditEvents24h} series={sparkD} trend={-3.2} trendInverted status="info" />
        <MetricCard label="Security findings" value="0 high" series={generateTimeSeries(20, 0, 0)} trend={0} status="success" />
        <MetricCard label="Seats used" value="248 / 400" series={sparkB} trend={1.8} status="warning" />
        <MetricCard label="MRR" value="$18.4k" series={generateTimeSeries(20, 18400, 1200)} trend={7.2} status="success" variant="area" />
        <MetricCard label="Regions" value="5" series={generateTimeSeries(20, 5, 0)} trend={0} status="info" />
      </div>

      {/* Orgs + Audit */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Building2 className="h-3.5 w-3.5 text-primary" />Organizations</h3>
              <p className="text-xs text-muted-foreground">{orgs.length} workspaces</p>
            </div>
            <Link to="/organizations" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Name</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Plan</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Region</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orgs.slice(0, 8).map((o) => (
                  <TableRow key={o.id} className="cursor-pointer border-border text-xs hover:bg-accent/40">
                    <TableCell className="py-1.5 font-medium">{o.name}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={o.plan === "enterprise" ? "info" : o.plan === "pro" ? "success" : "warning"}>{o.plan}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">us-east-1</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><ShieldCheck className="h-3.5 w-3.5 text-primary" />Audit Trail</h3>
              <p className="text-xs text-muted-foreground">{auditLogs.length} recent events</p>
            </div>
            <Link to="/audit" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Time</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Actor</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Action</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Entity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditLogs.map((a) => (
                  <TableRow key={a.id} className="border-border text-xs">
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(new Date(a.timestamp), { addSuffix: true })}</TableCell>
                    <TableCell className="py-1.5">{a.actor}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px]">{a.action}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{a.entity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* API Keys */}
      <div className="px-6 py-3">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><KeyRound className="h-3.5 w-3.5 text-primary" />API Keys</h3>
              <p className="text-xs text-muted-foreground">{totalApiKeys} active</p>
            </div>
            <Link to="/settings" className="text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
            {apiKeys.slice(0, 6).map((k) => (
              <div key={k.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{k.name}</span>
                  <StatusBadge tone={k.status === "active" ? "success" : "error"}>{k.status}</StatusBadge>
                </div>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">{k.prefix}…</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{k.requests24h} req/24h</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
