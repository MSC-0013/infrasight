import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { LogRow } from "@/components/log-row";
import { QueryBoundary } from "@/components/data-state";
import { usePulseLogs } from "@/lib/pulse-hooks";
import type { LogLevel } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/logs")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:logs")) throw redirect({ to: "/dashboard" });
  },
  head: () => ({ meta: [{ title: "Logs — Pulse" }] }),
  component: LogsPage,
});

const LEVELS: LogLevel[] = ["debug", "info", "warn", "error", "critical"];

function LogsPage() {
  const { data: logs = [], isLoading, isError, error, refetch } = usePulseLogs();
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => logs.filter((l) => !q || l.message.includes(q) || l.service.includes(q)),
    [logs, q],
  );

  return (
    <div className="flex flex-col">
      <PageHeader title="Logs" description={`${logs.length} log entries from database`} />
      <QueryBoundary isLoading={isLoading} isError={isError} error={error} refetch={refetch}>
        <div className="px-6 py-4">
          <Input value={q} onChange={(e) => setQ(e.target.value)} className="mb-3 h-8 max-w-md font-mono text-xs" placeholder="Search logs…" />
          <div className="divide-y divide-border rounded-lg border border-border">
            {filtered.map((l) => (
              <LogRow key={l.id} line={l} />
            ))}
          </div>
        </div>
      </QueryBoundary>
    </div>
  );
}
