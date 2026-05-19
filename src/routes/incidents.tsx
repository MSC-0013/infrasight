import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { generateIncidents, type Incident } from "@/lib/mock-data";
import { formatDistanceToNow } from "@/lib/format";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/incidents")({
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
  const incidents = useMemo(() => generateIncidents(), []);
  const [open, setOpen] = useState<Incident | null>(null);
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
            <button
              key={i.id}
              onClick={() => setOpen(i)}
              className="grid w-full grid-cols-[100px_1fr_100px_120px_180px_120px] items-center border-b border-border/60 px-3 py-2 text-left text-xs hover:bg-accent/40"
            >
              <span className="font-mono">{i.id}</span>
              <span className="truncate font-medium">{i.title}</span>
              <span><StatusBadge tone={sevTone[i.severity]}>{i.severity}</StatusBadge></span>
              <span><StatusBadge tone={statusTone[i.status]}>{i.status}</StatusBadge></span>
              <span className="truncate font-mono text-[11px]">{i.impactedServices.join(", ")}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(i.openedAt)}</span>
            </button>
          ))}
        </div>
      </div>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent className="w-[520px] sm:max-w-[520px]">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="font-mono text-sm">{open?.id}</span>
              <span className="text-sm font-semibold">{open?.title}</span>
            </SheetTitle>
          </SheetHeader>
          {open && (
            <div className="mt-4 space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge tone={sevTone[open.severity]}>{open.severity}</StatusBadge>
                <StatusBadge tone={statusTone[open.status]}>{open.status}</StatusBadge>
                <span className="font-mono text-[11px] text-muted-foreground">
                  ack {open.acknowledgedBy}
                </span>
              </div>
              <div>
                <div className="mb-1 text-[10px] font-mono uppercase text-muted-foreground">Impacted services</div>
                <div className="flex flex-wrap gap-1">
                  {open.impactedServices.map((s) => (
                    <span key={s} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">{s}</span>
                  ))}
                </div>
              </div>
              {open.rootCause && (
                <div>
                  <div className="mb-1 text-[10px] font-mono uppercase text-muted-foreground">Root cause</div>
                  <p className="text-xs text-foreground/90">{open.rootCause}</p>
                </div>
              )}
              <div>
                <div className="mb-2 text-[10px] font-mono uppercase text-muted-foreground">Timeline</div>
                <ol className="relative space-y-3 border-l border-border pl-4">
                  {open.updates.map((u, idx) => (
                    <li key={idx} className="relative">
                      <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                      <div className="text-xs">
                        <span className="font-medium uppercase">{u.status}</span>
                        <span className="ml-2 font-mono text-[10px] text-muted-foreground">{formatDistanceToNow(u.at)}</span>
                      </div>
                      <p className="mt-0.5 text-xs text-foreground/80">{u.message}</p>
                      <p className="font-mono text-[10px] text-muted-foreground">{u.author}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="flex gap-2 border-t border-border pt-3">
                <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                  Post update
                </button>
                <button className="rounded-md border border-border bg-card px-3 py-1.5 text-xs hover:bg-accent">
                  Mark resolved
                </button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
