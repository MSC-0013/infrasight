import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { AlertCard } from "@/components/alert-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { generateAlerts, type Alert } from "@/lib/mock-data";
import { MetricCard } from "@/components/metric-card";
import { generateTimeSeries } from "@/lib/mock-data";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — Pulse" },
      { name: "description", content: "Active alerts across services, queues, workers and ML." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(useMemo(() => generateAlerts(24), []));
  const [query, setQuery] = useState("");
  const [sev, setSev] = useState("all");
  const [scope, setScope] = useState("all");
  const spark = useMemo(() => generateTimeSeries(20, 12, 6), []);

  const filtered = alerts.filter((a) => {
    if (sev !== "all" && a.severity !== sev) return false;
    if (scope === "active" && a.acknowledged) return false;
    if (scope === "acked" && !a.acknowledged) return false;
    if (query && !a.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const ack = (id: string) => setAlerts((prev) => prev.map((a) => a.id === id ? { ...a, acknowledged: true } : a));

  const counts = {
    critical: alerts.filter(a => a.severity === "critical" && !a.acknowledged).length,
    error: alerts.filter(a => a.severity === "error" && !a.acknowledged).length,
    warning: alerts.filter(a => a.severity === "warning" && !a.acknowledged).length,
    info: alerts.filter(a => a.severity === "info" && !a.acknowledged).length,
  };

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
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search alerts…" className="h-8 border-border bg-card pl-8 text-xs" />
        </div>
        <Select value={sev} onValueChange={setSev}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-card text-xs"><span className="text-muted-foreground">Severity:</span><SelectValue /></SelectTrigger>
          <SelectContent>
            {["all", "info", "warning", "error", "critical"].map((s) => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={scope} onValueChange={setScope}>
          <SelectTrigger className="h-8 w-[140px] border-border bg-card text-xs"><span className="text-muted-foreground">Scope:</span><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-xs">All</SelectItem>
            <SelectItem value="active" className="text-xs">Active</SelectItem>
            <SelectItem value="acked" className="text-xs">Acknowledged</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 px-6 py-4">
        {filtered.map((a) => <AlertCard key={a.id} alert={a} onAck={ack} />)}
      </div>
    </div>
  );
}
