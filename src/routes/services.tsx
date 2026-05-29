import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import type { ServiceHealth } from "@/lib/mock-data";
import { usePulseServices } from "@/lib/pulse-hooks";
import { formatDistanceToNow, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:services")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Service Health — Pulse" }] }),
  component: ServicesPage,
});

const tone = (s: ServiceHealth["status"]) =>
  s === "healthy" ? "success" : s === "degraded" ? "warning" : "error";

function ServicesPage() {
  const { data: services = [] } = usePulseServices();
  const healthy = services.filter((s) => s.status === "healthy").length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Service health"
        description={`${healthy}/${services.length} services healthy · uptime tracked from last 30 days`}
      />
      <div className="grid gap-3 px-6 py-4 lg:grid-cols-2">
        {services.map((s) => (
          <Link
            key={s.id}
            to="/services/$serviceName"
            params={{ serviceName: s.name }}
            className="rounded-md border border-border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">{s.name}</h3>
                  <StatusBadge tone={tone(s.status)}>{s.status}</StatusBadge>
                </div>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {s.version} · {s.region} · deployed {formatDistanceToNow(s.lastDeploy)}
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-[10px] uppercase text-muted-foreground">uptime</div>
                <div className="font-mono text-sm">{s.uptimePct}%</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 border-t border-border pt-3">
              <Stat k="RPS" v={formatNumber(s.rps)} />
              <Stat k="P95" v={`${s.p95Ms}ms`} />
              <Stat k="Errors" v={`${s.errorRate}%`} tone={s.errorRate > 2 ? "destructive" : undefined} />
              <Stat k="CPU" v={`${s.cpu}%`} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border pt-3">
              <span className="font-mono text-[10px] uppercase text-muted-foreground">depends on</span>
              {s.dependsOn.map((d) => (
                <Link
                  key={d}
                  to="/services/$serviceName"
                  params={{ serviceName: d }}
                  className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] hover:bg-accent"
                >
                  {d}
                </Link>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "destructive" }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{k}</div>
      <div className={"mt-0.5 font-mono text-xs " + (tone === "destructive" ? "text-destructive" : "")}>{v}</div>
    </div>
  );
}
