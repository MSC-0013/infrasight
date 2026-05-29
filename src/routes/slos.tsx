import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import type { SLO, SLI } from "@/lib/mock-data";
import { usePulseSLOs } from "@/lib/pulse-hooks";
import { cn } from "@/lib/utils";
import { ShieldCheck, TrendingUp, TrendingDown, TriangleAlert as AlertTriangle, Flame, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/slos")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:slos")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "SLOs & Error Budgets — Pulse" }] }),
  component: SLOsPage,
});

const STATUS_TONE: Record<SLO["status"], "success" | "warning" | "error"> = {
  healthy: "success",
  at_risk: "warning",
  breached: "error",
};

function SLOsPage() {
  const { data: slos = [] } = usePulseSLOs();
  const healthy = slos.filter((s) => s.status === "healthy").length;
  const atRisk = slos.filter((s) => s.status === "at_risk").length;
  const breached = slos.filter((s) => s.status === "breached").length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="SLOs & Error Budgets"
        description={`${slos.length} SLOs · ${healthy} healthy · ${atRisk} at risk · ${breached} breached`}
      />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <SummaryCard label="Total SLOs" value={slos.length.toString()} tone="info" />
        <SummaryCard label="Healthy" value={healthy.toString()} tone="success" />
        <SummaryCard label="At risk" value={atRisk.toString()} tone="warning" />
        <SummaryCard label="Breached" value={breached.toString()} tone="error" />
      </div>

      <div className="space-y-4 px-6 py-2">
        {slos.map((slo) => (
          <SLOCard key={slo.id} slo={slo} />
        ))}
      </div>

      <div className="h-6" />
    </div>
  );
}

function SLOCard({ slo }: { slo: SLO }) {
  const budgetPct = slo.budgetRemaining;
  const budgetColor =
    budgetPct > 50 ? "bg-success" :
    budgetPct > 20 ? "bg-warning" :
    "bg-destructive";

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* Header */}
      <div className="flex items-start justify-between border-b border-border px-4 py-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold">{slo.name}</h3>
            <StatusBadge tone={STATUS_TONE[slo.status]}>{slo.status.replace("_", " ")}</StatusBadge>
            <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              {slo.service}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            Period: {slo.period} · Burn rate window: {slo.burnRateWindow}
          </p>
        </div>
        <Link
          to="/services/$serviceName"
          params={{ serviceName: slo.service }}
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Error budget bar */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Error budget remaining
          </div>
          <span className={cn(
            "font-mono text-sm tabular-nums",
            budgetPct > 50 ? "text-success" : budgetPct > 20 ? "text-warning" : "text-destructive",
          )}>
            {budgetPct}%
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full transition-all", budgetColor)}
            style={{ width: `${budgetPct}%` }}
          />
        </div>
      </div>

      {/* Burn rate */}
      <div className="grid grid-cols-2 gap-px border-b border-border bg-border">
        <div className="bg-card px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Flame className="h-3.5 w-3.5 text-warning" />
            Burn rate
          </div>
          <div className={cn(
            "mt-1 font-mono text-lg tabular-nums",
            slo.burnRate > 3 ? "text-destructive" : slo.burnRate > 1 ? "text-warning" : "text-success",
          )}>
            {slo.burnRate}x
          </div>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            over {slo.burnRateWindow}
          </p>
        </div>
        <div className="bg-card px-4 py-3">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <AlertTriangle className="h-3.5 w-3.5 text-muted-foreground" />
            Budget exhaustion
          </div>
          <div className="mt-1 font-mono text-lg tabular-nums">
            {slo.burnRate > 0 ? formatExhaustion(slo.budgetRemaining, slo.burnRate) : "--"}
          </div>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            at current burn rate
          </p>
        </div>
      </div>

      {/* SLIs */}
      <div className="px-4 py-3">
        <div className="mb-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          Service Level Indicators
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {slo.slis.map((sli) => (
            <SLICard key={sli.name} sli={sli} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SLICard({ sli }: { sli: SLI }) {
  const isBreached =
    sli.type === "error_rate" ? sli.current > sli.target :
    sli.type === "latency" ? sli.current > sli.target :
    sli.current < sli.target;

  const gap = sli.type === "error_rate" || sli.type === "latency"
    ? sli.current - sli.target
    : sli.target - sli.current;

  const gapAbs = Math.abs(gap);

  return (
    <div className="rounded-md border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          {sli.name}
        </span>
        {isBreached ? (
          <TrendingDown className="h-3.5 w-3.5 text-destructive" />
        ) : (
          <TrendingUp className="h-3.5 w-3.5 text-success" />
        )}
      </div>
      <div className={cn(
        "mt-1 font-mono text-base tabular-nums",
        isBreached ? "text-destructive" : "text-foreground",
      )}>
        {formatSLIValue(sli.current, sli.unit)}
      </div>
      <div className="mt-1 flex items-center justify-between font-mono text-[10px]">
        <span className="text-muted-foreground">target: {formatSLIValue(sli.target, sli.unit)}</span>
        <span className={cn(isBreached ? "text-destructive" : "text-success")}>
          {isBreached ? "+" : "-"}{formatSLIValue(gapAbs, sli.unit)}
        </span>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, tone }: { label: string; value: string; tone: "info" | "success" | "warning" | "error" }) {
  const TONE_STYLE: Record<typeof tone, string> = {
    info: "border-info/30 bg-info/5",
    success: "border-success/30 bg-success/5",
    warning: "border-warning/30 bg-warning/5",
    error: "border-destructive/30 bg-destructive/5",
  };
  const VALUE_COLOR: Record<typeof tone, string> = {
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    error: "text-destructive",
  };
  return (
    <div className={cn("rounded-lg border p-3", TONE_STYLE[tone])}>
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-mono text-2xl tabular-nums", VALUE_COLOR[tone])}>{value}</p>
    </div>
  );
}

function formatSLIValue(value: number, unit: string): string {
  if (unit === "%") return `${value.toFixed(value >= 99 ? 3 : 1)}%`;
  if (unit === "ms") return `${Math.round(value)}ms`;
  if (unit === "rps") return `${value.toLocaleString()} rps`;
  return `${value} ${unit}`;
}

function formatExhaustion(budgetRemaining: number, burnRate: number): string {
  if (burnRate <= 0) return "N/A";
  const hoursLeft = (budgetRemaining / 100) / burnRate * (30 * 24);
  if (hoursLeft < 1) return `${Math.round(hoursLeft * 60)}m`;
  if (hoursLeft < 48) return `${Math.round(hoursLeft)}h`;
  return `${(hoursLeft / 24).toFixed(1)}d`;
}
