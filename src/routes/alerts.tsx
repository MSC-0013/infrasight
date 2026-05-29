import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { AlertCard } from "@/components/alert-card";
import { EmptyState } from "@/components/ui-states";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bell, Check, X } from "lucide-react";
import type { Alert } from "@/lib/mock-data";
import { sparklineFromValue } from "@/lib/chart-helpers";
import { usePulseAlerts, useAcknowledgeAlert } from "@/lib/pulse-hooks";
import { QueryBoundary } from "@/components/data-state";
import { MetricCard } from "@/components/metric-card";
import { toast } from "sonner";

interface AlertsSearch {
  q?: string;
  sev?: string;
  scope?: string;
}

export const Route = createFileRoute("/alerts")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:alerts")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "Alerts — Pulse" },
      { name: "description", content: "Active alerts across services, queues, workers and ML." },
    ],
  }),
  validateSearch: (s: Record<string, unknown>): AlertsSearch => {
    const out: AlertsSearch = {};
    if (typeof s.q === "string" && s.q) out.q = s.q;
    if (typeof s.sev === "string" && s.sev && s.sev !== "all") out.sev = s.sev;
    if (typeof s.scope === "string" && s.scope && s.scope !== "all") out.scope = s.scope;
    return out;
  },
  component: AlertsPage,
});

function AlertsPage() {
  const rawSearch = Route.useSearch();
  const search = { q: rawSearch.q ?? "", sev: rawSearch.sev ?? "all", scope: rawSearch.scope ?? "all" };
  const navigate = useNavigate({ from: "/alerts" });
  const setSearch = (patch: Partial<typeof search>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch }), replace: true });

  const { data: apiAlerts = [] } = usePulseAlerts();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  useEffect(() => { setAlerts(apiAlerts); }, [apiAlerts]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const spark = useMemo(() => sparklineFromValue(alerts.filter((a) => !a.acknowledged).length, 20), [alerts]);

  const filtered = alerts.filter((a) => {
    if (search.sev !== "all" && a.severity !== search.sev) return false;
    if (search.scope === "active" && a.acknowledged) return false;
    if (search.scope === "acked" && !a.acknowledged) return false;
    if (search.q && !a.title.toLowerCase().includes(search.q.toLowerCase())) return false;
    return true;
  });

  const acknowledge = useAcknowledgeAlert();
  const ack = (id: string) => {
    acknowledge.mutate(id);
    setAlerts((prev) => prev.map((a) => (a.id === id ? { ...a, acknowledged: true } : a)));
  };

  const bulkAck = () => {
    checked.forEach((id) => acknowledge.mutate(id));
    setAlerts((prev) => prev.map((a) => (checked.has(a.id) ? { ...a, acknowledged: true } : a)));
    toast.success(`Acknowledged ${checked.size} alert${checked.size > 1 ? "s" : ""}`);
    setChecked(new Set());
  };

  const toggleOne = (id: string) => {
    setChecked((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const allChecked = filtered.length > 0 && filtered.every((a) => checked.has(a.id));
  const toggleAll = () => {
    if (allChecked) setChecked(new Set());
    else setChecked(new Set(filtered.map((a) => a.id)));
  };

  const counts = {
    critical: alerts.filter((a) => a.severity === "critical" && !a.acknowledged).length,
    error: alerts.filter((a) => a.severity === "error" && !a.acknowledged).length,
    warning: alerts.filter((a) => a.severity === "warning" && !a.acknowledged).length,
    info: alerts.filter((a) => a.severity === "info" && !a.acknowledged).length,
  };

  const hasFilters = search.q || search.sev !== "all" || search.scope !== "all";

  return (
    <div className="flex flex-col">
      <PageHeader title="Alert Center" description="Active and historical alerts across the platform." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Critical" value={counts.critical.toString()} series={spark} status="error" />
        <MetricCard label="Error" value={counts.error.toString()} series={spark} status="error" />
        <MetricCard label="Warning" value={counts.warning.toString()} series={spark} status="warning" />
        <MetricCard label="Info" value={counts.info.toString()} series={spark} status="info" />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-y border-border bg-background px-6 py-3">
        <div className="relative min-w-[260px] flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search.q}
            onChange={(e) => setSearch({ q: e.target.value })}
            placeholder="Search alerts…"
            className="h-8 border-border bg-card pl-8 text-xs"
          />
        </div>
        <Select value={search.sev} onValueChange={(v) => setSearch({ sev: v })}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-card text-xs"><span className="text-muted-foreground">Severity:</span><SelectValue /></SelectTrigger>
          <SelectContent>
            {["all", "info", "warning", "error", "critical"].map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={search.scope} onValueChange={(v) => setSearch({ scope: v })}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-card text-xs"><span className="text-muted-foreground">Scope:</span><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All</SelectItem>
            <SelectItem value="active" className="text-xs">Active</SelectItem>
            <SelectItem value="acked" className="text-xs">Acknowledged</SelectItem>
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button size="sm" variant="ghost" className="h-8 gap-1.5 text-xs text-muted-foreground" onClick={() => setSearch({ q: "", sev: "all", scope: "all" })}>
            <X className="h-3 w-3" /> Clear
          </Button>
        )}
      </div>

      {checked.size > 0 && (
        <div className="flex items-center gap-2 border-b border-primary/30 bg-primary/5 px-6 py-2 text-xs">
          <span className="font-mono">{checked.size} selected</span>
          <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs" onClick={bulkAck}>
            <Check className="h-3 w-3" /> Acknowledge
          </Button>
          <Button size="sm" variant="ghost" className="ml-auto h-7 gap-1.5 text-xs" onClick={() => setChecked(new Set())}>
            <X className="h-3 w-3" /> Clear
          </Button>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center gap-2 px-6 py-2 text-[11px] font-mono text-muted-foreground">
          <Checkbox checked={allChecked} onCheckedChange={toggleAll} />
          <span>Select all visible · {filtered.length} shown</span>
        </div>
      )}

      <div className="flex flex-col gap-2 px-6 pb-6">
        {filtered.length === 0 ? (
          <EmptyState
            title="No alerts match your filters"
            description={hasFilters ? "Try changing severity or scope." : "All quiet. No active alerts right now."}
            icon={Bell}
          />
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="flex items-start gap-2">
              <div className="pt-3"><Checkbox checked={checked.has(a.id)} onCheckedChange={() => toggleOne(a.id)} /></div>
              <div className="flex-1"><AlertCard alert={a} onAck={ack} /></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
