import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { MetricCard } from "@/components/metric-card";
import { ChartCard } from "@/components/chart-card";
import { JSONViewer } from "@/components/json-viewer";
import { sparklineFromValue } from "@/lib/chart-helpers";
import type { ServiceHealth, type SLO } from "@/lib/mock-data";
import {
  usePulseServiceByName,
  usePulseSLOs,
  usePulseDeployments,
  usePulseTraces,
  usePulseAlerts,
} from "@/lib/pulse-hooks";
import { QueryBoundary } from "@/components/data-state";
import { formatDistanceToNow, formatNumber } from "@/lib/format";
import { useInspector } from "@/store/inspector-store";
import { ChevronLeft, Activity, TriangleAlert as AlertTriangle, GitBranch, Workflow, FileText, Cpu, MemoryStick, Globe, Clock, TrendingUp, ShieldCheck, Layers, Boxes, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ResponsiveContainer, AreaChart, Area, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";

export const Route = createFileRoute("/services/$serviceName")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:services")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Service — Pulse" }] }),
  component: ServiceDetailPage,
});

const statusTone = (s: ServiceHealth["status"]) =>
  s === "healthy" ? "success" : s === "degraded" ? "warning" : "error";

const sloTone = (s: SLO["status"]) =>
  s === "healthy" ? "success" : s === "at_risk" ? "warning" : "error";

function ServiceDetailPage() {
  const { serviceName } = Route.useParams();
  const { data: service, isLoading, isError, error, refetch } = usePulseServiceByName(serviceName);
  const { data: allSlos = [] } = usePulseSLOs();
  const { data: allDeploys = [] } = usePulseDeployments(12);
  const { data: allTraces = [] } = usePulseTraces();
  const { data: allAlerts = [] } = usePulseAlerts();

  const slos = useMemo(() => allSlos.filter((s) => s.service === serviceName), [allSlos, serviceName]);
  const deploys = useMemo(() => allDeploys.filter((d) => d.service === serviceName), [allDeploys, serviceName]);
  const traces = useMemo(
    () => allTraces.filter((t) => t.rootService === serviceName || t.services.includes(serviceName)),
    [allTraces, serviceName],
  );
  const alerts = useMemo(() => allAlerts.filter((a) => a.service === serviceName), [allAlerts, serviceName]);

  const latency = useMemo(() => sparklineFromValue(service?.p95Ms ?? 50, 60, 0.2), [service?.p95Ms]);
  const throughput = useMemo(() => sparklineFromValue(service?.rps ?? 100, 40, 0.25), [service?.rps]);
  const errorSeries = useMemo(() => sparklineFromValue((service?.errorRate ?? 0) * 100, 60, 0.3), [service?.errorRate]);

  const cpuSeries = useMemo(() => sparklineFromValue(service?.cpu ?? 0, 60, 0.15), [service?.cpu]);
  const memSeries = useMemo(() => sparklineFromValue(service?.memory ?? 0, 60, 0.12), [service?.memory]);
  const sparkLatency = useMemo(() => sparklineFromValue(service?.p95Ms ?? 50, 20, 0.2), [service?.p95Ms]);
  const sparkRps = useMemo(() => sparklineFromValue(service?.rps ?? 100, 20, 0.25), [service?.rps]);
  const sparkErr = useMemo(() => sparklineFromValue((service?.errorRate ?? 0) * 100, 20, 0.3), [service?.errorRate]);
  const sparkUptime = useMemo(() => sparklineFromValue(service?.uptimePct ?? 99.9, 20, 0.01), [service?.uptimePct]);

  const inspect = useInspector((s) => s.inspect);

  if (!service && !isLoading) {
    return <div className="px-6 py-12 text-sm text-muted-foreground">Service not found</div>;
  }

  return (
    <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
    {!service ? null : (
    <div className="flex flex-col">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <Link to="/services" className="text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Link>
            <span>{service.name}</span>
            <StatusBadge tone={statusTone(service.status)}>{service.status}</StatusBadge>
          </span>
        }
        description={
          <span className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
            <span>{service.version}</span>
            <span className="text-muted-foreground">·</span>
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {service.region}</span>
            <span className="text-muted-foreground">·</span>
            <span>deployed {formatDistanceToNow(service.lastDeploy)}</span>
          </span>
        }
        actions={
          <button
            onClick={() => inspect({
              kind: "event", id: service.id, title: service.name,
              subtitle: `${service.status} · ${service.rps} rps`,
              data: { status: service.status, rps: service.rps, p95Ms: service.p95Ms, errorRate: service.errorRate, cpu: service.cpu, memory: service.memory, version: service.version, region: service.region },
              service: service.name,
            })}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent"
          >
            <Activity className="h-3.5 w-3.5" /> Inspect
          </button>
        }
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4 xl:grid-cols-8">
        <MetricCard label="RPS" value={formatNumber(service.rps)} series={sparkRps} trend={4.2} status="info" variant="area" />
        <MetricCard label="p95 Latency" value={`${service.p95Ms}`} unit="ms" series={sparkLatency} trend={-2.1} trendInverted status="info" />
        <MetricCard label="Error rate" value={`${service.errorRate}`} unit="%" series={sparkErr} trend={-8.4} trendInverted status="success" />
        <MetricCard label="Uptime" value={`${service.uptimePct}`} unit="%" series={sparkUptime} trend={0.01} status="success" />
        <MetricCard label="CPU" value={`${service.cpu}`} unit="%" series={cpuSeries.slice(0, 20)} trend={1.2} status={service.cpu > 80 ? "warning" : "info"} />
        <MetricCard label="Memory" value={`${service.memory}`} unit="%" series={memSeries.slice(0, 20)} trend={0.8} status={service.memory > 80 ? "warning" : "info"} />
        <MetricCard label="Deploys (7d)" value={deploys.length.toString()} series={sparkRps} status="info" />
        <MetricCard label="Active alerts" value={alerts.filter(a => !a.acknowledged).length.toString()} series={sparkErr} status={alerts.some(a => a.severity === "critical") ? "error" : "warning"} />
      </div>

      {/* SLO / Error Budget */}
      {slos.length > 0 && (
        <div className="px-6 pb-2">
          <h2 className="mb-2 text-sm font-semibold">SLOs & Error Budget</h2>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {slos.map((slo) => (
              <SLOCard key={slo.id} slo={slo} />
            ))}
          </div>
        </div>
      )}

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-3 px-6 pt-2 lg:grid-cols-3">
        <ChartCard className="lg:col-span-2" title="Latency" description="p50 / p95 / p99 (ms)">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latency} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Line type="monotone" dataKey="p50" stroke="var(--color-chart-2)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p99" stroke="var(--color-chart-4)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Throughput" description="Requests / minute">
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={throughput} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="svc-thru" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={8} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Area type="monotone" dataKey="success" stroke="var(--color-success)" fill="url(#svc-thru)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 pt-3 lg:grid-cols-2">
        <ChartCard title="Error rate" description="% over time">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={errorSeries} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="svc-err" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Area type="monotone" dataKey="value" stroke="var(--color-destructive)" fill="url(#svc-err)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Resource usage" description="CPU and Memory %">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuSeries.map((c, i) => ({ label: c.label, cpu: c.value, memory: memSeries[i]?.value ?? 0 }))} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip contentStyle={ttStyle} />
                <Line type="monotone" dataKey="cpu" stroke="var(--color-chart-1)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="memory" stroke="var(--color-chart-3)" strokeWidth={1.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Dependencies */}
      <div className="px-6 pt-4">
        <Section title="Dependencies" icon={Layers}>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <div>
              <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Depends on</p>
              <div className="flex flex-wrap gap-1.5">
                {service.dependsOn.map((d) => (
                  <Link
                    key={d}
                    to="/services/$serviceName"
                    params={{ serviceName: d }}
                    className="rounded border border-border bg-background px-2 py-1 font-mono text-[11px] hover:bg-accent hover:text-foreground"
                  >
                    {d}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Depended on by</p>
              <div className="flex flex-wrap gap-1.5">
                {services
                  .filter((s) => s.dependsOn.includes(service.name))
                  .map((s) => (
                    <Link
                      key={s.id}
                      to="/services/$serviceName"
                      params={{ serviceName: s.name }}
                      className="rounded border border-border bg-background px-2 py-1 font-mono text-[11px] hover:bg-accent hover:text-foreground"
                    >
                      {s.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </Section>
      </div>

      {/* Tabs for related entities */}
      <div className="px-6 py-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Deployments */}
          <Section title="Recent deployments" icon={GitBranch} count={deploys.length}>
            {deploys.length === 0 ? (
              <p className="text-xs text-muted-foreground">No recent deploys</p>
            ) : (
              deploys.slice(0, 6).map((d) => (
                <div key={d.id} className="flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0">
                  <div>
                    <span className="font-mono">{d.version}</span>
                    <span className="ml-2 font-mono text-[10px] text-muted-foreground">{d.commit.slice(0, 7)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{d.environment}</span>
                    <StatusBadge tone={d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning"} dot={false}>
                      {d.status.replace("_", " ")}
                    </StatusBadge>
                  </div>
                </div>
              ))
            )}
          </Section>

          {/* Active Alerts */}
          <Section title="Active alerts" icon={AlertTriangle} count={alerts.length}>
            {alerts.length === 0 ? (
              <p className="text-xs text-muted-foreground">No active alerts</p>
            ) : (
              alerts.slice(0, 6).map((a) => (
                <div key={a.id} className="flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0">
                  <span className="truncate flex-1">{a.title}</span>
                  <div className="flex items-center gap-2">
                    <StatusBadge tone={a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning"} dot={false}>
                      {a.severity}
                    </StatusBadge>
                    {a.acknowledged && <span className="font-mono text-[10px] text-muted-foreground">acked</span>}
                  </div>
                </div>
              ))
            )}
          </Section>

          {/* Related Traces */}
          <Section title="Recent traces" icon={Workflow} count={traces.length}>
            {traces.length === 0 ? (
              <p className="text-xs text-muted-foreground">No recent traces</p>
            ) : (
              traces.slice(0, 8).map((t) => (
                <Link
                  key={t.id}
                  to="/traces/$traceId"
                  params={{ traceId: t.id }}
                  className="flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0 hover:text-primary"
                >
                  <span className="truncate flex-1 font-mono">{t.rootOperation}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{t.durationMs}ms</span>
                    <StatusBadge tone={t.status === "ok" ? "success" : t.status === "error" ? "error" : "warning"} dot={false}>
                      {t.status}
                    </StatusBadge>
                  </div>
                </Link>
              ))
            )}
          </Section>

          {/* Service Info */}
          <Section title="Service info" icon={Boxes}>
            <JSONViewer data={{
              name: service.name,
              status: service.status,
              version: service.version,
              region: service.region,
              rps: service.rps,
              p95Ms: service.p95Ms,
              errorRate: service.errorRate,
              cpu: service.cpu,
              memory: service.memory,
              uptimePct: service.uptimePct,
              lastDeploy: service.lastDeploy,
              dependsOn: service.dependsOn,
            }} />
          </Section>
        </div>
      </div>
    </div>
  );
}

function SLOCard({ slo }: { slo: SLO }) {
  const budgetPct = slo.budgetRemaining;
  const budgetTone = budgetPct > 50 ? "success" : budgetPct > 20 ? "warning" : "error";
  const isBreached = slo.status === "breached";

  return (
    <div className={cn("rounded-lg border bg-card p-4", isBreached ? "border-destructive/40" : "border-border")}>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className={cn("h-4 w-4", isBreached ? "text-destructive" : "text-primary")} />
            <h3 className="text-sm font-semibold">{slo.name}</h3>
            <StatusBadge tone={sloTone(slo.status)}>{slo.status.replace("_", " ")}</StatusBadge>
          </div>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            Period: {slo.period} · Burn rate window: {slo.burnRateWindow}
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3">
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Budget left</p>
          <div className="mt-1 flex items-center gap-1">
            <span className={cn("text-lg font-semibold tabular-nums", budgetTone === "error" ? "text-destructive" : budgetTone === "warning" ? "text-warning" : "text-success")}>
              {budgetPct}%
            </span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded bg-muted">
            <div
              className={cn("h-full rounded", budgetTone === "error" ? "bg-destructive" : budgetTone === "warning" ? "bg-warning" : "bg-success")}
              style={{ width: `${Math.min(100, budgetPct)}%` }}
            />
          </div>
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase text-muted-foreground">Burn rate</p>
          <div className="mt-1 flex items-center gap-1">
            <span className={cn("text-lg font-semibold tabular-nums", slo.burnRate > 2 ? "text-destructive" : slo.burnRate > 1 ? "text-warning" : "text-foreground")}>
              {slo.burnRate}x
            </span>
            {slo.burnRate > 1 ? (
              <ArrowUpRight className={cn("h-3.5 w-3.5", slo.burnRate > 2 ? "text-destructive" : "text-warning")} />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-success" />
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          {slo.slis.map((sli) => (
            <div key={sli.name}>
              <p className="text-[10px] font-mono uppercase text-muted-foreground">{sli.name}</p>
              <div className="flex items-center gap-1 font-mono text-xs">
                <span className={cn(
                  sli.type === "error_rate" ? (sli.current > sli.target ? "text-destructive" : "text-success") :
                  sli.type === "latency" ? (sli.current > sli.target ? "text-destructive" : "text-success") :
                  (sli.current < sli.target ? "text-destructive" : "text-success")
                )}>
                  {sli.type === "availability" || sli.type === "throughput" ? sli.current : sli.current}
                  {sli.unit}
                </span>
                <span className="text-muted-foreground">/ {sli.target}{sli.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )}
    </QueryBoundary>
  );
}

function Section({ title, icon: Icon, count, children }: {
  title: string; icon: typeof Activity; count?: number; children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="text-[11px] font-medium">{title}</span>
        {count !== undefined && (
          <span className="font-mono text-[10px] text-muted-foreground">({count})</span>
        )}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

const tick = { fill: "var(--color-muted-foreground)", fontSize: 10 };
const ttStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
