import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput,
  CommandItem, CommandList, CommandSeparator, CommandShortcut,
} from "@/components/ui/command";
import { LayoutDashboard, Search, ChartBar as BarChart3, Layers, Cpu, Bell, Sparkles, Network, Building2, Settings, GitBranch, Activity, FileText, Workflow, OctagonAlert as AlertOctagon, ShieldCheck, Boxes, KeyRound, Users, Pause, Play, Flame, Grid3x2 as Grid3X3, Globe, Clock, X } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import {
  generateSearchIndex,
  type SearchableEntity,
  type SearchableEntityKind,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ROUTES: Array<{ to: string; label: string; icon: typeof LayoutDashboard; group: string }> = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Navigate" },
  { to: "/events", label: "Event Explorer", icon: Search, group: "Navigate" },
  { to: "/traces", label: "Traces", icon: Workflow, group: "Navigate" },
  { to: "/logs", label: "Logs", icon: FileText, group: "Navigate" },
  { to: "/services", label: "Service Health", icon: Activity, group: "Navigate" },
  { to: "/topology", label: "Topology", icon: Network, group: "Navigate" },
  { to: "/analytics", label: "Analytics", icon: BarChart3, group: "Navigate" },
  { to: "/slos", label: "SLOs & Budgets", icon: Flame, group: "Navigate" },
  { to: "/queues", label: "Queues", icon: Layers, group: "Navigate" },
  { to: "/workers", label: "Workers", icon: Cpu, group: "Navigate" },
  { to: "/incidents", label: "Incidents", icon: AlertOctagon, group: "Navigate" },
  { to: "/alerts", label: "Alerts", icon: Bell, group: "Navigate" },
  { to: "/mlops", label: "MLOps", icon: Sparkles, group: "Navigate" },
  { to: "/deployments", label: "Deployments", icon: GitBranch, group: "Navigate" },
  { to: "/audit", label: "Audit log", icon: ShieldCheck, group: "Navigate" },
  { to: "/api", label: "API Monitoring", icon: Boxes, group: "Navigate" },
  { to: "/heatmaps", label: "Heatmaps", icon: Grid3X3, group: "Navigate" },
  { to: "/organizations", label: "Organizations", icon: Building2, group: "Navigate" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Navigate" },
  { to: "/settings", label: "API keys", icon: KeyRound, group: "Settings" },
  { to: "/settings", label: "Team & roles", icon: Users, group: "Settings" },
];

const KIND_ICON: Record<SearchableEntityKind, typeof LayoutDashboard> = {
  trace: Workflow,
  incident: AlertOctagon,
  service: Activity,
  deployment: GitBranch,
  endpoint: Boxes,
  log: FileText,
  alert: Bell,
  queue: Layers,
  worker: Cpu,
  api_key: KeyRound,
  member: Users,
  region: Globe,
};

const KIND_LABEL: Record<SearchableEntityKind, string> = {
  trace: "Traces",
  incident: "Incidents",
  service: "Services",
  deployment: "Deployments",
  endpoint: "Endpoints",
  log: "Logs",
  alert: "Alerts",
  queue: "Queues",
  worker: "Workers",
  api_key: "API Keys",
  member: "Members",
  region: "Regions",
};

const TONE_CLASS: Record<string, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  critical: "text-destructive",
  info: "text-primary",
  neutral: "text-muted-foreground",
};

const MAX_RECENT = 8;
const STORAGE_KEY = "pulse-recent-searches";

function loadRecent(): SearchableEntity[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch { return []; }
}

function saveRecent(items: SearchableEntity[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT)));
}

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { realtimeConnected, setRealtimeConnected } = useUIStore();

  const searchIndex = useMemo(() => generateSearchIndex(), []);
  const [recent, setRecent] = useState<SearchableEntity[]>(loadRecent);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => { setOpen(true); setQuery(""); };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pulse:open-palette", onOpen as EventListener);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pulse:open-palette", onOpen as EventListener);
    };
  }, []);

  const go = useCallback((to: string) => {
    setOpen(false);
    setQuery("");
    navigate({ to: to as never });
  }, [navigate]);

  const selectEntity = useCallback((entity: SearchableEntity) => {
    setRecent((prev) => {
      const next = [entity, ...prev.filter((r) => !(r.kind === entity.kind && r.id === entity.id))].slice(0, MAX_RECENT);
      saveRecent(next);
      return next;
    });
    go(entity.route);
  }, [go]);

  const clearRecent = useCallback(() => {
    setRecent([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const entityResults = useMemo(() => {
    if (!query.trim()) return [] as SearchableEntity[];
    return searchIndex.filter(
      (e) => fuzzyMatch(query, e.title) || (e.subtitle && fuzzyMatch(query, e.subtitle))
    ).slice(0, 30);
  }, [query, searchIndex]);

  const groupedResults = useMemo(() => {
    const map = new Map<SearchableEntityKind, SearchableEntity[]>();
    entityResults.forEach((e) => {
      const list = map.get(e.kind) || [];
      list.push(e);
      map.set(e.kind, list);
    });
    return map;
  }, [entityResults]);

  const navGroups = useMemo(
    () => Array.from(new Set(ROUTES.map((r) => r.group))),
    []
  );

  const hasQuery = query.trim().length > 0;

  return (
    <CommandDialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQuery(""); }}>
      <CommandInput
        placeholder="Search traces, incidents, services, endpoints… or jump to a page"
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Entity search results */}
        {hasQuery && Array.from(groupedResults.entries()).map(([kind, items]) => {
          const Icon = KIND_ICON[kind];
          return (
            <CommandGroup key={kind} heading={KIND_LABEL[kind]}>
              {items.map((e) => (
                <CommandItem
                  key={`${e.kind}:${e.id}`}
                  onSelect={() => selectEntity(e)}
                  className="flex items-center gap-2"
                >
                  <Icon className={cn("h-4 w-4 shrink-0", e.tone ? TONE_CLASS[e.tone] : "text-muted-foreground")} />
                  <span className="truncate flex-1">{e.title}</span>
                  {e.subtitle && (
                    <span className="truncate font-mono text-[10px] text-muted-foreground">{e.subtitle}</span>
                  )}
                  <CommandShortcut className="font-mono text-[10px]">{e.route}</CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}

        {hasQuery && entityResults.length > 0 && <CommandSeparator />}

        {/* Recent searches (no query) */}
        {!hasQuery && recent.length > 0 && (
          <CommandGroup heading="Recent">
            {recent.map((e) => {
              const Icon = KIND_ICON[e.kind];
              return (
                <CommandItem
                  key={`recent:${e.kind}:${e.id}`}
                  onSelect={() => selectEntity(e)}
                  className="flex items-center gap-2"
                >
                  <Icon className={cn("h-4 w-4 shrink-0", e.tone ? TONE_CLASS[e.tone] : "text-muted-foreground")} />
                  <span className="truncate flex-1">{e.title}</span>
                  {e.subtitle && (
                    <span className="truncate font-mono text-[10px] text-muted-foreground">{e.subtitle}</span>
                  )}
                </CommandItem>
              );
            })}
            <CommandItem onSelect={clearRecent} className="flex items-center gap-2 text-muted-foreground">
              <X className="h-3.5 w-3.5" />
              <span className="text-xs">Clear recent</span>
            </CommandItem>
          </CommandGroup>
        )}

        {!hasQuery && recent.length > 0 && <CommandSeparator />}

        {/* Page navigation */}
        {navGroups.map((g) => (
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
