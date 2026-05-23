import { useMemo, useState } from "react";
import type { TimelineEvent, TimelineEventType } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "@/lib/format";
import { Rocket, TriangleAlert as AlertTriangle, OctagonAlert as AlertOctagon, Layers, Cpu, Settings, ShieldCheck, Sparkles, ChevronDown, ChevronUp, ListFilter as Filter } from "lucide-react";
import { useInspector } from "@/store/inspector-store";
import { Button } from "@/components/ui/button";

const TYPE_CONFIG: Record<TimelineEventType, {
  icon: typeof Rocket;
  tone: "info" | "success" | "warning" | "error" | "critical";
  label: string;
}> = {
  deploy: { icon: Rocket, tone: "info", label: "Deploy" },
  alert: { icon: AlertTriangle, tone: "warning", label: "Alert" },
  incident: { icon: AlertOctagon, tone: "critical", label: "Incident" },
  queue_spike: { icon: Layers, tone: "error", label: "Queue Spike" },
  worker_restart: { icon: Cpu, tone: "warning", label: "Worker Restart" },
  config_change: { icon: Settings, tone: "info", label: "Config Change" },
  slo_breach: { icon: ShieldCheck, tone: "error", label: "SLO Breach" },
  ai_anomaly: { icon: Sparkles, tone: "warning", label: "AI Anomaly" },
};

const ALL_TYPES: TimelineEventType[] = [
  "deploy", "alert", "incident", "queue_spike", "worker_restart",
  "config_change", "slo_breach", "ai_anomaly",
];

interface UnifiedTimelineProps {
  events: TimelineEvent[];
  title?: string;
  description?: string;
  compact?: boolean;
  maxVisible?: number;
}

export function UnifiedTimeline({
  events,
  title,
  description,
  compact = false,
  maxVisible = 20,
}: UnifiedTimelineProps) {
  const [expanded, setExpanded] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Set<TimelineEventType>>(new Set(ALL_TYPES));
  const [showFilters, setShowFilters] = useState(false);
  const inspect = useInspector((s) => s.inspect);

  const filtered = useMemo(
    () => events.filter((e) => typeFilter.has(e.type)),
    [events, typeFilter],
  );

  const visible = expanded ? filtered : filtered.slice(0, maxVisible);
  const hidden = filtered.length - visible.length;

  const toggleType = (t: TimelineEventType) => {
    setTypeFilter((cur) => {
      const next = new Set(cur);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  };

  const handleClick = (e: TimelineEvent) => {
    inspect({
      kind: mapKind(e.type),
      id: e.id,
      title: e.title,
      subtitle: e.description,
      data: { type: e.type, service: e.service, severity: e.severity },
      service: e.service,
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card">
      {(title || description) && (
        <div className="flex items-start justify-between border-b border-border px-4 py-2.5">
          <div>
            {title && <h3 className="text-sm font-semibold tracking-tight">{title}</h3>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1 text-xs"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-3 w-3" /> Filter
          </Button>
        </div>
      )}

      {showFilters && (
        <div className="flex flex-wrap items-center gap-1 border-b border-border bg-muted/30 px-4 py-2">
          {ALL_TYPES.map((t) => {
            const cfg = TYPE_CONFIG[t];
            const active = typeFilter.has(t);
            return (
              <button
                key={t}
                onClick={() => toggleType(t)}
                className={cn(
                  "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase transition-colors",
                  active
                    ? "border-border bg-card text-foreground"
                    : "border-border/40 bg-transparent text-muted-foreground/40",
                )}
              >
                <cfg.icon className="h-3 w-3" />
                {cfg.label}
              </button>
            );
          })}
          <button
            onClick={() => setTypeFilter(new Set(ALL_TYPES))}
            className="ml-1 font-mono text-[10px] text-muted-foreground hover:text-foreground"
          >
            Reset
          </button>
        </div>
      )}

      <div className={cn("relative", !compact && "p-2")}>
        {/* Timeline spine */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

        <div className="space-y-0">
          {visible.map((e) => {
            const cfg = TYPE_CONFIG[e.type];
            const Icon = cfg.icon;
            return (
              <button
                key={e.id}
                onClick={() => handleClick(e)}
                className="group relative flex w-full items-start gap-3 px-2 py-2 text-left transition-colors hover:bg-accent/40 rounded-md"
              >
                {/* Node on spine */}
                <div className="relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-card">
                  <Icon className={cn(
                    "h-3.5 w-3.5",
                    cfg.tone === "critical" ? "text-destructive" :
                    cfg.tone === "error" ? "text-destructive" :
                    cfg.tone === "warning" ? "text-warning" :
                    cfg.tone === "success" ? "text-success" :
                    "text-info",
                  )} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <StatusBadge tone={cfg.tone} dot={false}>{cfg.label}</StatusBadge>
                    <span className="text-xs font-medium">{e.title}</span>
                  </div>
                  {!compact && (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{e.description}</p>
                  )}
                  <div className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[10px] text-muted-foreground">
                    <span>{formatDistanceToNow(e.timestamp)}</span>
                    {e.service && (
                      <>
                        <span>·</span>
                        <span>{e.service}</span>
                      </>
                    )}
                    {e.severity && e.severity !== "info" && (
                      <>
                        <span>·</span>
                        <span className={cn(
                          e.severity === "critical" ? "text-destructive" :
                          e.severity === "error" ? "text-destructive" :
                          "text-warning",
                        )}>{e.severity}</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {hidden > 0 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-1 flex w-full items-center justify-center gap-1 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            {expanded ? (
              <><ChevronUp className="h-3 w-3" /> Show less</>
            ) : (
              <><ChevronDown className="h-3 w-3" /> {hidden} more events</>
            )}
          </button>
        )}

        {filtered.length === 0 && (
          <div className="px-4 py-6 text-center text-xs text-muted-foreground">
            No events match current filters.
          </div>
        )}
      </div>
    </div>
  );
}

function mapKind(t: TimelineEventType): "log" | "event" | "trace" | "incident" | "alert" | "deployment" {
  switch (t) {
    case "deploy": return "deployment";
    case "alert": return "alert";
    case "incident": return "incident";
    default: return "event";
  }
}
