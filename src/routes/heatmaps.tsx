import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { MetricCard } from "@/components/metric-card";
import { QueryBoundary } from "@/components/data-state";
import type { HeatmapData } from "@/lib/mock-data";
import {
  latencyHeatmapFromServices,
  endpointHeatmapFromServices,
  dependencyHeatmapFromServices,
  sparklineFromValue,
} from "@/lib/chart-helpers";
import { usePulseServices } from "@/lib/pulse-hooks";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/heatmaps")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:heatmaps")) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Heatmaps — Pulse" }] }),
  component: HeatmapsPage,
});

function HeatmapsPage() {
  const { data: services = [], isLoading, isError, error, refetch } = usePulseServices();

  const latency = useMemo(() => latencyHeatmapFromServices(services), [services]);
  const endpoint = useMemo(() => endpointHeatmapFromServices(services), [services]);
  const dependency = useMemo(() => dependencyHeatmapFromServices(services), [services]);

  const peakLatency = useMemo(
    () => Math.max(...latency.cells.map((c) => c.value), 0),
    [latency],
  );
  const spark = useMemo(() => sparklineFromValue(peakLatency, 20), [peakLatency]);

  const yLabelsLatency = services.map((s) => s.name);
  const yLabelsEndpoint = ["200", "400", "401", "404", "500", "503"];
  const yLabelsDep = services.map((s) => s.name.slice(0, 12));

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Heatmaps"
        description="Latency, error distribution and service dependency patterns from live services."
      />

      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
        <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
          <MetricCard label="Peak latency cell" value={`${peakLatency}ms`} series={spark} trend={0} status="warning" />
          <MetricCard label="Services mapped" value={services.length} series={sparklineFromValue(services.length, 20)} trend={0} status="info" />
          <MetricCard label="Avg p95" value={`${services.length ? Math.round(services.reduce((a, s) => a + s.p95Ms, 0) / services.length) : 0}ms`} series={spark} trend={0} status="info" />
          <MetricCard label="Total RPS" value={String(Math.round(services.reduce((a, s) => a + s.rps, 0)))} series={sparklineFromValue(services.reduce((a, s) => a + s.rps, 0), 20)} trend={0} status="success" />
        </div>

        <div className="px-6 pb-6">
          <Tabs defaultValue="latency">
            <TabsList className="h-9">
              <TabsTrigger value="latency" className="text-xs">Latency x Hour</TabsTrigger>
              <TabsTrigger value="endpoint" className="text-xs">Service x Status</TabsTrigger>
              <TabsTrigger value="dependency" className="text-xs">Service Dependency</TabsTrigger>
            </TabsList>

            <TabsContent value="latency" className="mt-4">
              <HeatmapGrid data={latency} yLabels={yLabelsLatency} colorScale="latency" unit="ms" />
            </TabsContent>

            <TabsContent value="endpoint" className="mt-4">
              <HeatmapGrid data={endpoint} yLabels={yLabelsEndpoint} colorScale="requests" unit="reqs" />
            </TabsContent>

            <TabsContent value="dependency" className="mt-4">
              <HeatmapGrid data={dependency} yLabels={yLabelsDep} colorScale="rps" unit="rps" />
            </TabsContent>
          </Tabs>
        </div>
      </QueryBoundary>
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

  const cellColor = (v: number) => {
    const t = maxVal > 0 ? v / maxVal : 0;
    if (colorScale === "latency") {
      if (t > 0.8) return "bg-destructive/80";
      if (t > 0.5) return "bg-warning/70";
      return "bg-success/50";
    }
    if (t > 0.7) return "bg-primary/70";
    if (t > 0.3) return "bg-primary/40";
    return "bg-muted/60";
  };

  const xCount = Math.max(...data.cells.map((c) => c.x), 0) + 1;

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="mb-3 text-xs text-muted-foreground">{data.title}</p>
      <div className="overflow-x-auto">
        <div className="inline-grid gap-0.5" style={{ gridTemplateColumns: `80px repeat(${xCount}, 20px)` }}>
          <div />
          {Array.from({ length: xCount }, (_, x) => (
            <div key={x} className="text-center font-mono text-[9px] text-muted-foreground">{x}</div>
          ))}
          {yLabels.map((label, y) => (
            <Fragment key={label}>
              <div className="truncate pr-2 font-mono text-[9px] text-muted-foreground">{label}</div>
              {Array.from({ length: xCount }, (_, x) => {
                const cell = data.cells.find((c) => c.x === x && c.y === y);
                const v = cell?.value ?? 0;
                return (
                  <div
                    key={`${x}-${y}`}
                    className={cn("h-5 w-5 rounded-sm", cellColor(v))}
                    onMouseEnter={() => setHovered({ x, y })}
                    onMouseLeave={() => setHovered(null)}
                    title={`${v} ${unit}`}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>
      {hovered && (
        <p className="mt-2 font-mono text-[10px] text-muted-foreground">
          Cell ({hovered.x}, {hovered.y})
        </p>
      )}
    </div>
  );
}
