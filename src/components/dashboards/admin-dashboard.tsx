import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Settings, Bell, Users, KeyRound, Plus,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Member, ApiKey, Alert } from "@/lib/mock-data";
import { sparklineFromValue } from "@/lib/chart-helpers";
import { usePulseMembers, usePulseAlerts, usePulseApiKeys, usePulseDashboardMetrics, usePulseIncidents } from "@/lib/pulse-hooks";
import { formatDistanceToNow } from "date-fns";

export function AdminDashboard() {
  const { data: members = [] } = usePulseMembers();
  const { data: apiKeys = [] } = usePulseApiKeys();
  const { data: alerts = [] } = usePulseAlerts();
  const { data: metrics } = usePulseDashboardMetrics();
  const { data: incidents = [] } = usePulseIncidents();

  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("developer");

  const activeMembers = members.filter(m => m.status === "active").length;
  const pendingInvites = members.filter(m => m.status === "invited").length;
  const activeKeys = apiKeys.filter(k => k.status === "active").length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Workspace Administration"
        description="Users, billing, integrations and platform settings for this organization."
        actions={
          <>
            <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={() => setInviteOpen(true)}><Plus className="h-3 w-3" />Invite</Button>
            <Link to="/settings"><Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs"><Settings className="h-3 w-3" />Settings</Button></Link>
          </>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="Team members" value={activeMembers} series={sparklineFromValue(activeMembers, 20)} trend={0} status="info" />
        <MetricCard label="Pending invites" value={pendingInvites} series={sparklineFromValue(pendingInvites, 20)} trend={0} status="warning" />
        <MetricCard label="Healthy services" value={`${metrics?.healthyServices ?? 0}/${metrics?.totalServices ?? 0}`} series={sparklineFromValue(metrics?.healthyServices ?? 0, 20)} trend={0} status="success" />
        <MetricCard label="API keys" value={activeKeys} series={sparklineFromValue(activeKeys, 20)} trend={0} status="info" />
        <MetricCard label="Active alerts" value={alerts.filter(a => !a.acknowledged).length} series={sparklineFromValue(alerts.filter(a => !a.acknowledged).length, 20)} trend={0} status="warning" />
        <MetricCard label="Open incidents" value={incidents.filter(i => i.status !== "resolved").length} series={sparklineFromValue(incidents.filter(i => i.status !== "resolved").length, 20)} trend={0} status="info" />
        <MetricCard label="Events / hour" value={String(metrics?.eventsPerHour ?? 0)} series={sparklineFromValue(metrics?.eventsPerHour ?? 0, 20)} trend={0} status="info" variant="area" />
        <MetricCard label="Uptime" value={`${metrics?.avgUptime ?? 99.9}%`} series={sparklineFromValue(metrics?.avgUptime ?? 99.9, 20, 0.01)} trend={0} status="success" />
      </div>

      {/* Members + API Keys */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Users className="h-3.5 w-3.5 text-primary" />Members</h3>
              <p className="text-xs text-muted-foreground">{activeMembers} active · {pendingInvites} pending</p>
            </div>
            <Link to="/organizations" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Name</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Email</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Role</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Team</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.slice(0, 10).map((m) => (
                  <TableRow key={m.id} className="border-border text-xs">
                    <TableCell className="py-1.5 font-medium">{m.name}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{m.email}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={m.role === "admin" ? "error" : m.role === "engineer" ? "info" : "success"}>{m.role}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 text-[11px]">{m.team}</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={m.status === "active" ? "success" : m.status === "invited" ? "warning" : "error"}>{m.status}</StatusBadge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><KeyRound className="h-3.5 w-3.5 text-primary" />API Keys</h3>
              <p className="text-xs text-muted-foreground">{activeKeys} active · {apiKeys.filter(k => k.status === "revoked").length} revoked</p>
            </div>
            <Link to="/settings" className="text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="max-h-[340px] overflow-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Name</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Prefix</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Req/24h</TableHead>
                  <TableHead className="h-8 text-[10px] font-mono uppercase">Expires</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.slice(0, 10).map((k) => (
                  <TableRow key={k.id} className="border-border text-xs">
                    <TableCell className="py-1.5 font-medium">{k.name}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{k.prefix}…</TableCell>
                    <TableCell className="py-1.5"><StatusBadge tone={k.status === "active" ? "success" : "error"}>{k.status}</StatusBadge></TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] tabular-nums">{k.requests24h}</TableCell>
                    <TableCell className="py-1.5 font-mono text-[11px] text-muted-foreground">{k.expiresAt ? formatDistanceToNow(new Date(k.expiresAt), { addSuffix: true }) : "Never"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Alert policies */}
      <div className="px-6 py-3">
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <div>
              <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2"><Bell className="h-3.5 w-3.5 text-warning" />Active Alerts</h3>
              <p className="text-xs text-muted-foreground">{alerts.filter(a => !a.acknowledged).length} unacknowledged</p>
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

      {/* Invite dialog */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invite team member</DialogTitle>
            <DialogDescription>Send an invitation to join your workspace.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Email address" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
            <select className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="sre">SRE</option>
              <option value="developer">Developer</option>
              <option value="viewer">Viewer</option>
            </select>
            <Button className="w-full" onClick={() => { setInviteOpen(false); setInviteEmail(""); }}>Send invitation</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
