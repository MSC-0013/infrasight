import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Search, BarChart3, Layers, Cpu, Bell,
  Sparkles, Network, Building2, Settings, ChevronsLeft, ChevronsRight, Activity,
} from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const NAV: readonly NavItem[] = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/events", label: "Event Explorer", icon: Search },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/queues", label: "Queue Monitoring", icon: Layers },
  { to: "/workers", label: "Worker Monitoring", icon: Cpu },
  { to: "/alerts", label: "Alerts", icon: Bell },
  { to: "/ml-insights", label: "ML Insights", icon: Sparkles },
  { to: "/api", label: "API Monitoring", icon: Network },
  { to: "/organizations", label: "Organizations", icon: Building2 },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out",
        sidebarCollapsed ? "w-14" : "w-60"
      )}
    >
      <div className="flex h-12 items-center justify-between border-b border-sidebar-border px-3">
        <Link to="/" className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground">
            <Activity className="h-3.5 w-3.5" strokeWidth={2.5} />
          </div>
          {!sidebarCollapsed && <span className="truncate text-sm font-semibold tracking-tight">Pulse</span>}
        </Link>
        <button
          onClick={toggleSidebar}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Toggle sidebar"
        >
          {sidebarCollapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex flex-col gap-0.5 px-2 py-2">
        {NAV.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
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
      </nav>

      {!sidebarCollapsed && (
        <div className="absolute inset-x-0 bottom-0 border-t border-sidebar-border p-3">
          <div className="rounded-md border border-sidebar-border bg-sidebar-accent/40 p-2.5">
            <p className="text-[11px] font-medium text-muted-foreground">Cluster region</p>
            <p className="mt-0.5 font-mono text-xs">us-east-1 · prod</p>
          </div>
        </div>
      )}
    </aside>
  );
}
