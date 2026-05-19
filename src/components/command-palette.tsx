import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import {
  LayoutDashboard, Search, BarChart3, Layers, Cpu, Bell, Sparkles,
  Network, Building2, Settings, GitBranch, Activity, FileText, Workflow,
  AlertOctagon, ShieldCheck, Boxes, KeyRound, Users, Pause, Play,
} from "lucide-react";
import { useUIStore } from "@/store/ui-store";

const ROUTES: Array<{ to: string; label: string; icon: typeof LayoutDashboard; group: string }> = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Navigate" },
  { to: "/events", label: "Event Explorer", icon: Search, group: "Navigate" },
  { to: "/traces", label: "Traces", icon: Workflow, group: "Navigate" },
  { to: "/logs", label: "Logs", icon: FileText, group: "Navigate" },
  { to: "/services", label: "Service Health", icon: Activity, group: "Navigate" },
  { to: "/topology", label: "Topology", icon: Network, group: "Navigate" },
  { to: "/analytics", label: "Analytics", icon: BarChart3, group: "Navigate" },
  { to: "/queues", label: "Queues", icon: Layers, group: "Navigate" },
  { to: "/workers", label: "Workers", icon: Cpu, group: "Navigate" },
  { to: "/incidents", label: "Incidents", icon: AlertOctagon, group: "Navigate" },
  { to: "/alerts", label: "Alerts", icon: Bell, group: "Navigate" },
  { to: "/mlops", label: "MLOps", icon: Sparkles, group: "Navigate" },
  { to: "/deployments", label: "Deployments", icon: GitBranch, group: "Navigate" },
  { to: "/audit", label: "Audit log", icon: ShieldCheck, group: "Navigate" },
  { to: "/api", label: "API Monitoring", icon: Boxes, group: "Navigate" },
  { to: "/organizations", label: "Organizations", icon: Building2, group: "Navigate" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Navigate" },
  { to: "/settings", label: "API keys", icon: KeyRound, group: "Settings" },
  { to: "/settings", label: "Team & roles", icon: Users, group: "Settings" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { realtimeConnected, setRealtimeConnected } = useUIStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("pulse:open-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pulse:open-palette", onOpen as EventListener);
    };
  }, []);

  const go = (to: string) => {
    setOpen(false);
    navigate({ to: to as never });
  };

  const groups = Array.from(new Set(ROUTES.map((r) => r.group)));

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search events, traces, services… or jump to a page" />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {groups.map((g) => (
          <CommandGroup key={g} heading={g}>
            {ROUTES.filter((r) => r.group === g).map((r) => (
              <CommandItem key={r.to + r.label} onSelect={() => go(r.to)}>
                <r.icon className="h-4 w-4 text-muted-foreground" />
                <span>{r.label}</span>
                <CommandShortcut className="font-mono text-[10px]">{r.to}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Quick actions">
          <CommandItem onSelect={() => { setRealtimeConnected(!realtimeConnected); setOpen(false); }}>
            {realtimeConnected ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            <span>{realtimeConnected ? "Pause realtime stream" : "Resume realtime stream"}</span>
            <CommandShortcut>⌘ .</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => go("/incidents")}>
            <AlertOctagon className="h-4 w-4 text-destructive" />
            <span>Declare incident</span>
          </CommandItem>
          <CommandItem onSelect={() => go("/deployments")}>
            <GitBranch className="h-4 w-4" />
            <span>View deployments</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
