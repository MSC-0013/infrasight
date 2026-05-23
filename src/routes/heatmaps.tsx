import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import {
  generateLatencyHeatmap, generateEndpointHeatmap,
  generateServiceDependencyHeatmap, generateTimeSeries,
  type HeatmapData,
} from "@/lib/mock-data";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/heatmaps")({
  head: () => ({ meta: [{ title: "Heatmaps — Pulse" }] }),
  component: HeatmapsPage,
});

function HeatmapsPage() {
  const latency = useMemo(() => generateLatencyHeatmap(), []);
  const endpoint = useMemo(() => generateEndpointHeatmap(), []);
  const dependency = useMemo(() => generateServiceDependencyHeatmap(), []);
  const spark = useMemo(() => generateTimeSeries(20, 100, 30), []);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Heatmaps"
        description="Visualize latency, error distribution and service dependency patterns."
      />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Peak latency cell" value="480ms" series={spark} trend={3.2} status="warning" />
        <MetricCard label="Avg endpoint errors" value="12.4" series={spark} trend={-2.1} trendInverted status="success" />
        <MetricCard label="Top dependency RPS" value="780" series={spark} trend={5.4} status="info" />
        <MetricCard label="Services mapped" value="6" series={spark} trend={0} status="info" />
      </div>

      <div className="px-6 pb-6">
        <Tabs defaultValue="latency">
          <TabsList className="h-9">
            <TabsTrigger value="latency" className="text-xs">Latency x Hour</TabsTrigger>
            <TabsTrigger value="endpoint" className="text-xs">Endpoint x Status</TabsTrigger>
            <TabsTrigger value="dependency" className="text-xs">Service Dependency</TabsTrigger>
          </TabsList>

          <TabsContent value="latency" className="mt-4">
            <HeatmapGrid data={latency} yLabels={["api-gateway", "auth-service", "event-service", "worker-service", "ml-service", "analytics-service"]} colorScale="latency" unit="ms" />
          </TabsContent>

          <TabsContent value="endpoint" className="mt-4">
            <HeatmapGrid data={endpoint} yLabels={["200", "400", "401", "404", "500", "503"]} colorScale="requests" unit="reqs" />
          </TabsContent>

          <TabsContent value="dependency" className="mt-4">
            <HeatmapGrid data={dependency} yLabels={["api-gw", "auth", "events", "worker", "ml", "postgres"]} colorScale="rps" unit="rps" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function HeatmapGrid({
  data, yLabels, colorScale, unit,
}: {
  data: HeatmapData;
  yLabels: string[];
  colorScale: "latency" | "requests" | "rps";
  unit: string;
}) {
  const [hovered, setHovered] = useState<{ x: number; y: number } | null>(null);
  const maxVal = data.maxValue;

  const xLabels = Array.from(
    new Set(data.cells.map((c) => c.label ?? String(c.x)))
  );

  const cellMap = new Map<string, number>();
  data.cells.forEach((c) => cellMap.set(`${c.x},${c.y}`, c.value));

  const getColor = (v: number) => {
    const pct = v / maxVal;
    if (colorScale === "latency") {
      if (pct < 0.2) return "bg-success/40";
      if (pct < 0.4) return "bg-success/70";
      if (pct < 0.6) return "bg-warning/60";
      if (pct < 0.8) return "bg-warning/80";
      return "bg-destructive/70";
    }
    if (colorScale === "rps") {
      if (pct < 0.1) return "bg-primary/10";
      if (pct < 0.3) return "bg-primary/30";
      if (pct < 0.5) return "bg-primary/50";
      if (pct < 0.7) return "bg-primary/70";
      return "bg-primary/90";
    }
    // requests
    if (pct < 0.05) return "bg-muted/40";
    if (pct < 0.2) return "bg-success/40";
    if (pct < 0.5) return "bg-chart-2/60";
    if (pct < 0.8) return "bg-warning/60";
    return "bg-destructive/60";
  };

  const hoveredValue = hovered ? cellMap.get(`${hovered.x},${hovered.y}`) : null;

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-2.5">
        <h3 className="text-sm font-semibold">{data.title}</h3>
        <p className="text-xs text-muted-foreground">
          {data.xLabel} x {data.yLabel} · hover for details
        </p>
      </div>

      <div className="p-4">
        {/* Tooltip */}
        {hovered && hoveredValue !== undefined && (
          <div className="mb-3 rounded-md border border-border bg-muted/50 px-3 py-2 font-mono text-xs">
            {yLabels[hovered.y]} · {xLabels[hovered.x]} = <span className="font-semibold text-foreground">{hoveredValue} {unit}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <div className="inline-block min-w-fit">
            {/* Column headers */}
            <div className="grid gap-px" style={{ gridTemplateColumns: `120px repeat(${xLabels.length}, minmax(32px, 1fr))` }}>
              <div />
              {xLabels.map((l) => (
                <div key={l} className="flex items-center justify-center py-1 font-mono text-[10px] text-muted-foreground">
                  <span className="truncate px-0.5">{l}</span>
                </div>
              ))}

              {/* Rows */}
              {yLabels.map((yLabel, yIdx) => (
                <Fragment key={yIdx}>
                  <div className="flex items-center justify-end pr-2 font-mono text-[10px] text-muted-foreground truncate">
                    {yLabel}
                  </div>
                  {xLabels.map((_, xIdx) => {
                    const val = cellMap.get(`${xIdx},${yIdx}`) ?? 0;
                    const isHovered = hovered?.x === xIdx && hovered?.y === yIdx;
                    return (
                      <div
                        key={`${xIdx}-${yIdx}`}
                        onMouseEnter={() => setHovered({ x: xIdx, y: yIdx })}
                        onMouseLeave={() => setHovered(null)}
                        className={cn(
                          "flex h-7 min-w-[32px] items-center justify-center rounded-sm text-[9px] font-mono tabular-nums transition-all cursor-default",
                          getColor(val),
                          val === 0 && "bg-muted/20",
                          isHovered && "ring-1 ring-foreground scale-110 z-10",
                        )}
                      >
                        {val > 0 ? val : ""}
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Color scale legend */}
        <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
          <span>Less</span>
          {colorScale === "latency" ? (
            <div className="flex gap-0.5">
              <span className="h-3 w-6 rounded-sm bg-success/40" />
              <span className="h-3 w-6 rounded-sm bg-success/70" />
              <span className="h-3 w-6 rounded-sm bg-warning/60" />
              <span className="h-3 w-6 rounded-sm bg-warning/80" />
              <span className="h-3 w-6 rounded-sm bg-destructive/70" />
            </div>
          ) : colorScale === "rps" ? (
            <div className="flex gap-0.5">
              <span className="h-3 w-6 rounded-sm bg-primary/10" />
              <span className="h-3 w-6 rounded-sm bg-primary/30" />
              <span className="h-3 w-6 rounded-sm bg-primary/50" />
              <span className="h-3 w-6 rounded-sm bg-primary/70" />
              <span className="h-3 w-6 rounded-sm bg-primary/90" />
            </div>
          ) : (
            <div className="flex gap-0.5">
              <span className="h-3 w-6 rounded-sm bg-muted/40" />
              <span className="h-3 w-6 rounded-sm bg-success/40" />
              <span className="h-3 w-6 rounded-sm bg-chart-2/60" />
              <span className="h-3 w-6 rounded-sm bg-warning/60" />
              <span className="h-3 w-6 rounded-sm bg-destructive/60" />
            </div>
          )}
          <span>More</span>
          <span className="ml-2">({unit})</span>
        </div>
      </div>
    </div>
  );
}
