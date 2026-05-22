import { Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function AuthLayout({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-background lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-10 sm:px-12 lg:px-16">
        <Link to="/" className="mb-10 inline-flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold tracking-tight">Pulse</span>
        </Link>
        <div className="mx-auto w-full max-w-sm">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
        <p className="mx-auto mt-10 max-w-sm text-center font-mono text-[10px] text-muted-foreground">
          Protected by SSO · SOC 2 Type II · GDPR compliant
        </p>
      </div>

      <div className="relative hidden border-l border-border bg-card/40 lg:flex lg:flex-col lg:justify-between lg:p-10">
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">pulse.io / observability</p>
          <h2 className="max-w-md text-2xl font-semibold leading-tight tracking-tight">
            Realtime insight into every event, trace, and deploy across your fleet.
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 font-mono text-xs">
          <Stat label="events ingested" value="14.3B" sub="last 30d" />
          <Stat label="p95 query" value="42ms" sub="globally" />
          <Stat label="services monitored" value="284" sub="across 12 regions" />
          <Stat label="MTTR" value="6m 41s" sub="this quarter" />
        </div>

        <p className="font-mono text-[10px] text-muted-foreground">
          v2.14.3 · us-east-1 · build #18472
        </p>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-md border border-border bg-background/40 p-3">
      <p className="text-[10px] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">{value}</p>
      <p className="text-[10px] text-muted-foreground">{sub}</p>
    </div>
  );
}
