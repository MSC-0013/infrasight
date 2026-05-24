import { useAuthStore, ROLE_LABEL, type Role } from "@/store/auth-store";
import { StatusBadge } from "@/components/status-badge";
import { Link } from "@tanstack/react-router";
import { OctagonAlert as AlertOctagon, GitBranch, Workflow, FileText, ShieldCheck, Bell, Sparkles, ChartBar as BarChart3, Network, Activity, Flame } from "lucide-react";

interface RoleQuickAction {
  to: string;
  label: string;
  icon: typeof Activity;
  hint: string;
}

const ROLE_VIEW: Record<Role, { headline: string; sub: string; tone: "info" | "success" | "warning" | "error" | "critical"; actions: RoleQuickAction[]; kpis: { label: string; value: string }[] }> = {
  super_admin: {
    headline: "Global control plane",
    sub: "Org governance, billing posture, audit trail and security signals across every workspace.",
    tone: "critical",
    actions: [
      { to: "/organizations", label: "Organizations", icon: ShieldCheck, hint: "12 workspaces" },
      { to: "/audit", label: "Audit log", icon: FileText, hint: "8.4k events / 24h" },
      { to: "/settings", label: "Platform settings", icon: Activity, hint: "SSO · SCIM · RLS" },
    ],
    kpis: [
      { label: "Workspaces", value: "12" },
      { label: "Seats in use", value: "248 / 400" },
      { label: "MRR", value: "$18.4k" },
      { label: "Security findings", value: "0 high" },
    ],
  },
  admin: {
    headline: "Workspace administration",
    sub: "Users, billing, integrations and platform settings for this organization.",
    tone: "error",
    actions: [
      { to: "/organizations", label: "Members", icon: ShieldCheck, hint: "24 active" },
      { to: "/settings", label: "Settings", icon: Activity, hint: "API keys · SSO" },
      { to: "/alerts", label: "Alert policies", icon: Bell, hint: "18 active" },
    ],
    kpis: [
      { label: "Team members", value: "24" },
      { label: "Pending invites", value: "3" },
      { label: "Active integrations", value: "9" },
      { label: "API keys", value: "14" },
    ],
  },
  sre: {
    headline: "Reliability cockpit",
    sub: "Incidents, on-call rotations, deployment posture and infrastructure health.",
    tone: "warning",
    actions: [
      { to: "/incidents", label: "Incidents", icon: AlertOctagon, hint: "3 open · 1 SEV1" },
      { to: "/deployments", label: "Deployments", icon: GitBranch, hint: "Last: 12m ago" },
      { to: "/topology", label: "Topology", icon: Network, hint: "32 services" },
    ],
    kpis: [
      { label: "Open incidents", value: "3" },
      { label: "MTTR (7d)", value: "18m" },
      { label: "Error budget", value: "82%" },
      { label: "Deploys (24h)", value: "14" },
    ],
  },
  developer: {
    headline: "Engineering workspace",
    sub: "Traces, logs, queues and the services you own. Jump straight into debugging.",
    tone: "info",
    actions: [
      { to: "/traces", label: "Traces", icon: Workflow, hint: "Search spans" },
      { to: "/logs", label: "Logs", icon: FileText, hint: "Live tail" },
      { to: "/services", label: "Service health", icon: BarChart3, hint: "Your services" },
    ],
    kpis: [
      { label: "Your services", value: "6" },
      { label: "Open issues", value: "2" },
      { label: "p95 latency", value: "142ms" },
      { label: "Error rate", value: "1.24%" },
    ],
  },
  viewer: {
    headline: "Read-only dashboard",
    sub: "Live overview of platform health. You can browse but not modify configuration.",
    tone: "success",
    actions: [
      { to: "/services", label: "Service health", icon: BarChart3, hint: "Live" },
      { to: "/alerts", label: "Alerts feed", icon: Bell, hint: "Read-only" },
      { to: "/slos", label: "SLOs & budgets", icon: Flame, hint: "Error budgets" },
    ],
    kpis: [
      { label: "System uptime", value: "99.992%" },
      { label: "Healthy services", value: "30/32" },
      { label: "Active alerts", value: "4" },
      { label: "Events / sec", value: "847" },
    ],
  },
};

export function RoleDashboardHeader() {
  const user = useAuthStore((s) => s.user);
  if (!user) return null;
  const view = ROLE_VIEW[user.role];

  return (
    <div className="border-b border-border bg-gradient-to-b from-card/40 to-transparent px-6 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <StatusBadge tone={view.tone}>{ROLE_LABEL[user.role]}</StatusBadge>
            <span className="text-[11px] font-mono text-muted-foreground">
              {user.email} · workspace · pulse-prod
            </span>
          </div>
          <h1 className="mt-2 text-xl font-semibold tracking-tight">{view.headline}</h1>
          <p className="mt-1 max-w-2xl text-xs text-muted-foreground">{view.sub}</p>
        </div>
        <div className="hidden gap-2 md:flex">
          {view.actions.map(({ to, label, icon: Icon, hint }) => (
            <Link
              key={to}
              to={to as never}
              className="group flex min-w-[140px] flex-col gap-0.5 rounded-md border border-border bg-card px-3 py-2 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium">{label}</span>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">{hint}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-4">
        {view.kpis.map((k) => (
          <div key={k.label} className="bg-card px-3 py-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k.label}</div>
            <div className="mt-0.5 font-mono text-base tabular-nums">{k.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
