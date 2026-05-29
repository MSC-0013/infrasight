import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { usePulseIncident, usePulseDeployments, usePulseLogs, usePulseTraces } from "@/lib/pulse-hooks";
import { formatDistanceToNow, format } from "date-fns";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/incidents/$incidentId")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:incidents")) throw redirect({ to: "/dashboard" });
  },
  component: IncidentDetailPage,
});

const SEV_TONE: Record<string, "critical" | "error" | "warning" | "info"> = {
  sev1: "critical", sev2: "error", sev3: "warning", sev4: "info",
};
const STATUS_TONE: Record<string, "info" | "warning" | "success" | "error"> = {
  investigating: "warning", identified: "info", monitoring: "info", resolved: "success",
};

function IncidentDetailPage() {
  const { incidentId } = Route.useParams();
  const { data: incident, isLoading } = usePulseIncident(incidentId);
  const { data: deploys = [] } = usePulseDeployments(10);
  const { data: logs = [] } = usePulseLogs();
  const { data: traces = [] } = usePulseTraces();

  const relatedDeploys = useMemo(
    () => deploys.filter((d) => incident?.impactedServices.includes(d.service)).slice(0, 3),
    [deploys, incident],
  );
  const relatedLogs = useMemo(() => logs.slice(0, 8), [logs]);
  const relatedTraces = useMemo(() => traces.slice(0, 4), [traces]);

  if (isLoading || !incident) {
    return (
      <div className="flex flex-col px-6 py-12 text-sm text-muted-foreground">
        {isLoading ? "Loading incident…" : "Incident not found"}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title={incident.title}
        description={`Opened ${formatDistanceToNow(new Date(incident.openedAt), { addSuffix: true })}`}
        actions={
          <Link to="/incidents" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
            <ArrowLeft className="h-3 w-3" /> Back to incidents
          </Link>
        }
      />
      <div className="grid gap-4 px-6 py-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={SEV_TONE[incident.severity] ?? "warning"}>{incident.severity}</StatusBadge>
            <StatusBadge tone={STATUS_TONE[incident.status] ?? "info"}>{incident.status}</StatusBadge>
          </div>
          {incident.rootCause && (
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="text-sm font-semibold">Root cause</h3>
              <p className="mt-2 text-sm text-muted-foreground">{incident.rootCause}</p>
            </div>
          )}
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Timeline</h3>
            <ul className="mt-3 space-y-3">
              {incident.updates.map((u, i) => (
                <li key={i} className="border-l-2 border-border pl-3">
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(u.at), "PPp")} · {u.author}
                  </p>
                  <p className="text-sm">{u.message}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="text-sm font-semibold">Impacted services</h3>
            <ul className="mt-2 space-y-1 text-xs font-mono">
              {incident.impactedServices.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4 text-xs text-muted-foreground">
            <p>{relatedDeploys.length} related deploys · {relatedLogs.length} logs · {relatedTraces.length} traces</p>
          </div>
        </div>
      </div>
    </div>
  );
}
