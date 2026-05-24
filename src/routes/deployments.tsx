import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { generateDeployments, type Deployment } from "@/lib/mock-data";
import { formatDistanceToNow } from "@/lib/format";
import { GitBranch, RotateCcw } from "lucide-react";

export const Route = createFileRoute("/deployments")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:deployments")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Deployments — Pulse" }] }),
  component: DeploymentsPage,
});

const tone: Record<Deployment["status"], "success" | "error" | "warning" | "info"> = {
  succeeded: "success", failed: "error", rolled_back: "warning", in_progress: "info",
};

function DeploymentsPage() {
  const deploys = useMemo(() => generateDeployments(28), []);
  return (
    <div className="flex flex-col">
      <PageHeader
        title="Deployments"
        description="Service deploy history across environments. Rollbacks and in-flight changes shown inline."
      />
      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="grid grid-cols-[140px_160px_120px_100px_140px_140px_100px_80px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground">
            <span>Service</span><span>Version</span><span>Commit</span><span>Env</span><span>Author</span><span>Started</span><span>Status</span><span></span>
          </div>
          {deploys.map((d) => (
            <div key={d.id} className="grid grid-cols-[140px_160px_120px_100px_140px_140px_100px_80px] items-center border-b border-border/60 px-3 py-1.5 text-xs">
              <span className="truncate font-medium">{d.service}</span>
              <span className="font-mono text-[11px]">{d.version}</span>
              <span className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
                <GitBranch className="h-3 w-3" /> {d.commit}
              </span>
              <span className="font-mono text-[10px] uppercase">{d.environment}</span>
              <span className="truncate font-mono text-[11px] text-muted-foreground">{d.author}</span>
              <span className="font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(d.startedAt)}</span>
              <span><StatusBadge tone={tone[d.status]}>{d.status.replace("_", " ")}</StatusBadge></span>
              <span>
                {d.status === "succeeded" && (
                  <button className="flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-3 w-3" /> rollback
                  </button>
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
