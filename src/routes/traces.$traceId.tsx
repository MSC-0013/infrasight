import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { TraceWaterfall } from "@/components/trace-waterfall";
import { generateSpansForTrace } from "@/lib/mock-data";
import { StatusBadge } from "@/components/status-badge";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/traces/$traceId")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:traces")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Trace — Pulse" }] }),
  component: TracePage,
});

function TracePage() {
  const { traceId } = Route.useParams();
  const spans = useMemo(() => generateSpansForTrace(traceId, 1200 + (traceId.length % 7) * 200), [traceId]);
  const total = spans.reduce((m, s) => Math.max(m, s.startMs + s.durationMs), 0);
  const errors = spans.filter((s) => s.status === "error").length;
  const services = Array.from(new Set(spans.map((s) => s.service)));

  return (
    <div className="flex flex-col">
      <PageHeader
        title={`Trace ${traceId.slice(0, 12)}`}
        description={`${services.length} services · ${spans.length} spans · ${total}ms total`}
        actions={
          <Link to="/traces" className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent">
            <ChevronLeft className="h-3.5 w-3.5" /> Back
          </Link>
        }
      />
      <div className="space-y-4 px-6 py-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Card label="Status" value={
            <StatusBadge tone={errors ? "error" : "success"}>{errors ? "error" : "ok"}</StatusBadge>
          } />
          <Card label="Duration" value={`${total}ms`} />
          <Card label="Spans" value={spans.length} />
          <Card label="Error spans" value={errors} />
        </div>
        <TraceWaterfall spans={spans} />
      </div>
    </div>
  );
}

function Card({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{label}</div>
      <div className="mt-1 text-lg font-semibold">{value}</div>
    </div>
  );
}
