import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Search, ChartBar as BarChart3, Layers, Cpu, Bell, Sparkles, Network, Building2, Settings, ChevronsLeft, ChevronsRight, Activity, Workflow, FileText, OctagonAlert as AlertOctagon, GitBranch, ShieldCheck, Boxes, Flame, Grid3x2 as Grid3X3 } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean; perm: string };
type NavSection = { label: string; items: readonly NavItem[] };

const SECTIONS: readonly NavSection[] = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true, perm: "view:dashboard" },
      { to: "/topology", label: "Topology", icon: Network, perm: "view:topology" },
      { to: "/services", label: "Service Health", icon: Activity, perm: "view:services" },
    ],
  },
  {
    label: "Observability",
    items: [
      { to: "/events", label: "Events", icon: Search, perm: "view:events" },
      { to: "/traces", label: "Traces", icon: Workflow, perm: "view:traces" },
      { to: "/logs", label: "Logs", icon: FileText, perm: "view:logs" },
      { to: "/analytics", label: "Analytics", icon: BarChart3, perm: "view:analytics" },
      { to: "/slos", label: "SLOs & Budgets", icon: Flame, perm: "view:slos" },
      { to: "/api", label: "API Monitoring", icon: Boxes, perm: "view:api" },
      { to: "/heatmaps", label: "Heatmaps", icon: Grid3X3, perm: "view:heatmaps" },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { to: "/queues", label: "Queues", icon: Layers, perm: "view:queues" },
      { to: "/workers", label: "Workers", icon: Cpu, perm: "view:workers" },
      { to: "/deployments", label: "Deployments", icon: GitBranch, perm: "view:deployments" },
    ],
  },
  {
    label: "Operations",
    items: [
      { to: "/incidents", label: "Incidents", icon: AlertOctagon, perm: "view:incidents" },
      { to: "/alerts", label: "Alerts", icon: Bell, perm: "view:alerts" },
      { to: "/mlops", label: "MLOps", icon: Sparkles, perm: "view:mlops" },
      { to: "/audit", label: "Audit log", icon: ShieldCheck, perm: "manage:org" },
    ],
  },
  {
    label: "Admin",
    items: [
      { to: "/organizations", label: "Organizations", icon: Building2, perm: "manage:org" },
      { to: "/settings", label: "Settings", icon: Settings, perm: "manage:settings" },
    ],
  },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const can = useAuthStore((s) => s.can);

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out",
        sidebarCollapsed ? "w-14" : "w-60"
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-sidebar-border px-3">
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Activity className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          {!sidebarCollapsed && <span className="truncate text-sm font-semibold tracking-tight">Pulse</span>}
        </Link>
        <button onClick={toggleSidebar} className="text-muted-foreground hover:text-foreground" aria-label="Toggle sidebar">
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="thin-scrollbar flex h-[calc(100vh-3rem)] flex-col gap-3 overflow-y-auto px-2 py-3 pb-20">
        {SECTIONS.map((section) => {
          const visible = section.items.filter((i) => can(i.perm));
          if (visible.length === 0) return null;
          return (
            <div key={section.label} className="flex flex-col gap-0.5">
              {!sidebarCollapsed && (
                <div className="px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70">
                  {section.label}
                </div>
              )}
              {visible.map((item) => {
                const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.to}
                    to={item.to as never}
                    className={cn(
                      "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", active && "text-primary")} strokeWidth={2} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                    {active && !sidebarCollapsed && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-sidebar-border bg-sidebar p-3">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-2.5">
            <p className="text-[11px] font-medium text-muted-foreground">Cluster region</p>
            <p className="mt-0.5 font-mono text-xs">us-east-1 · prod</p>
          </div>
        </div>
      )}
    </aside>
  );
}
