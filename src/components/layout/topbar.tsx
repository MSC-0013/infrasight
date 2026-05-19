import { Search, ChevronDown, Sun, Moon, Check } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RealtimeIndicator } from "@/components/realtime-indicator";
import { NotificationCenter } from "@/components/notification-center";
import { useUIStore } from "@/store/ui-store";
import { generateOrganizations } from "@/lib/mock-data";
import { useMemo, useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export function Topbar() {
  const { organization, setOrganization } = useUIStore();
  const orgs = useMemo(() => generateOrganizations(), []);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  const current = orgs.find((o) => o.slug === organization) ?? orgs[0];

  return (
    <header className="sticky top-0 z-30 flex h-12 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <button
        onClick={() => {
          const evt = new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true });
          window.dispatchEvent(evt);
        }}
        className="group relative flex h-8 max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="font-mono">Search events, traces, services…</span>
        <span className="ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px]">⌘K</span>
      </button>

      <div className="ml-auto flex items-center gap-2">
        <RealtimeIndicator />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent">
            <span className="font-medium">{current.name}</span>
            <Badge variant="outline" className="h-4 border-border px-1 text-[10px] font-mono uppercase">
              {current.plan}
            </Badge>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="text-xs">Switch organization</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {orgs.map((o) => (
              <DropdownMenuItem
                key={o.id}
                className="text-xs"
                onSelect={() => setOrganization(o.slug)}
              >
                <span className="flex-1 truncate">{o.name}</span>
                {o.slug === current.slug && <Check className="ml-2 h-3 w-3" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          onClick={() => setDark(!dark)}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Toggle theme"
        >
          {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </button>

        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1 hover:bg-accent">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold uppercase text-primary">
              SE
            </div>
            <span className="hidden text-xs font-medium md:inline">Sam Eng</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="text-xs">
              <div>Sam Engineer</div>
              <div className="font-mono text-[10px] text-muted-foreground">sam@pulse.io</div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs">Profile</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">Team</DropdownMenuItem>
            <DropdownMenuItem className="text-xs">API keys</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-destructive">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
