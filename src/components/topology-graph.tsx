import { useState } from "react";
import type { TopologyEdge, TopologyNode } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const KIND_FILL: Record<TopologyNode["kind"], string> = {
  gateway: "fill-primary/20 stroke-primary",
  service: "fill-chart-2/15 stroke-chart-2",
  queue: "fill-warning/15 stroke-warning",
  worker: "fill-chart-3/15 stroke-chart-3",
  db: "fill-chart-4/15 stroke-chart-4",
  ml: "fill-chart-5/15 stroke-chart-5",
};

const STATUS_DOT: Record<TopologyNode["status"], string> = {
  healthy: "fill-success",
  degraded: "fill-warning",
  down: "fill-destructive",
};

export function TopologyGraph({
  nodes, edges,
}: { nodes: TopologyNode[]; edges: TopologyEdge[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const nodeById = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="rounded-md border border-border bg-card">
      <svg viewBox="0 0 920 400" className="h-[420px] w-full">
        <defs>
          <marker
            id="arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="6" markerHeight="6" orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-muted-foreground" />
          </marker>
        </defs>

        {edges.map((e, i) => {
          const a = nodeById[e.from];
          const b = nodeById[e.to];
          if (!a || !b) return null;
          const active = hover === e.from || hover === e.to;
          const stroke = e.errorRate > 1 ? "stroke-destructive/60" : "stroke-muted-foreground/40";
          return (
            <g key={i}>
              <line
                x1={a.x + 60} y1={a.y} x2={b.x} y2={b.y}
                className={cn(stroke, active && "stroke-primary")}
                strokeWidth={active ? 2 : 1}
                markerEnd="url(#arrow)"
              />
              {active && (
                <text
                  x={(a.x + b.x) / 2}
                  y={(a.y + b.y) / 2 - 4}
                  className="fill-foreground font-mono text-[9px]"
                  textAnchor="middle"
                >
                  {e.rps} rps · {e.errorRate}% err
                </text>
              )}
            </g>
          );
        })}

        {nodes.map((n) => (
          <g
            key={n.id}
            onMouseEnter={() => setHover(n.id)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer"
          >
            <rect
              x={n.x} y={n.y - 18} rx={6} ry={6} width={120} height={36}
              className={cn(KIND_FILL[n.kind], "stroke-[1.2]")}
            />
            <circle cx={n.x + 10} cy={n.y} r={3} className={STATUS_DOT[n.status]} />
            <text
              x={n.x + 20} y={n.y - 2}
              className="fill-foreground text-[11px] font-medium"
            >
              {n.label}
            </text>
            <text
              x={n.x + 20} y={n.y + 10}
              className="fill-muted-foreground font-mono text-[9px] uppercase"
            >
              {n.kind}
            </text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-3 border-t border-border px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground">
        {(["gateway", "service", "queue", "worker", "db", "ml"] as const).map((k) => (
          <span key={k} className="flex items-center gap-1">
            <span className={cn("inline-block h-2 w-3 rounded-sm border", KIND_FILL[k])} />
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}
