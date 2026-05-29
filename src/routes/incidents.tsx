import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import type { Incident } from "@/lib/mock-data";
import { usePulseIncidents } from "@/lib/pulse-hooks";
import { formatDistanceToNow } from "@/lib/format";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/incidents")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:incidents")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Incidents — Pulse" }] }),
  component: IncidentsPage,
});

const sevTone: Record<Incident["severity"], "critical" | "error" | "warning" | "info"> = {
  sev1: "critical", sev2: "error", sev3: "warning", sev4: "info",
};
const statusTone: Record<Incident["status"], "warning" | "info" | "success" | "error"> = {
  investigating: "error", identified: "warning", monitoring: "info", resolved: "success",
};

function IncidentsPage() {
  const { data: incidents = [], isLoading } = usePulseIncidents();
  const active = incidents.filter((i) => i.status !== "resolved").length;

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Incidents"
        description={`${active} active · ${incidents.length - active} resolved (30d)`}
        actions={
          <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent">
            <Plus className="h-3.5 w-3.5" /> Declare incident
          </button>
        }
      />
      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="grid grid-cols-[100px_1fr_100px_120px_180px_120px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground">
            <span>ID</span><span>Title</span><span>Severity</span><span>Status</span><span>Impacted</span><span>Opened</span>
          </div>
          {incidents.map((i) => (
            <Link
              key={i.id}
              to="/incidents/$incidentId"
              params={{ incidentId: i.id }}
              className="grid w-full grid-cols-[100px_1fr_100px_120px_180px_120px] items-center border-b border-border/60 px-3 py-2 text-left text-xs hover:bg-accent/40"
            >
              <span className="font-mono">{i.id}</span>
              <span className="truncate font-medium">{i.title}</span>
              <span><StatusBadge tone={sevTone[i.severity]}>{i.severity}</StatusBadge></span>
              <span><StatusBadge tone={statusTone[i.status]}>{i.status}</StatusBadge></span>
              <span className="truncate font-mono text-[11px]">{i.impactedServices.join(", ")}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(i.openedAt)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
