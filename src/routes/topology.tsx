import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { TopologyGraph } from "@/components/topology-graph";
import { usePulseTopology } from "@/lib/pulse-hooks";

export const Route = createFileRoute("/topology")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:topology")) throw redirect({ to: "/dashboard" });
  },

  head: () => ({ meta: [{ title: "Topology — Pulse" }] }),
  component: TopologyPage,
});

function TopologyPage() {
  const { data } = usePulseTopology();
  const nodes = data?.nodes ?? [];
  const edges = data?.edges ?? [];
  const degraded = nodes.filter((n) => n.status !== "healthy").length;
  return (
    <div className="flex flex-col">
      <PageHeader
        title="System topology"
        description={`${nodes.length} components · ${edges.length} edges · ${degraded} degraded`}
      />
      <div className="space-y-3 px-6 py-4">
        <TopologyGraph nodes={nodes} edges={edges} />
        <p className="text-xs text-muted-foreground">
          Hover an edge to see RPS and error rate. Edges turn red when error rate exceeds 1%.
        </p>
      </div>
    </div>
  );
}
