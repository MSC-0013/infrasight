import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { generateAuditLogs } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { formatDistanceToNow } from "@/lib/format";

export const Route = createFileRoute("/audit")({
  head: () => ({ meta: [{ title: "Audit log — Pulse" }] }),
  component: AuditPage,
});

function AuditPage() {
  const all = useMemo(() => generateAuditLogs(120), []);
  const [q, setQ] = useState("");
  const filtered = all.filter((a) => !q || a.actor.includes(q) || a.action.includes(q) || a.entity.includes(q));

  return (
    <div className="flex flex-col">
      <PageHeader title="Audit log" description="Immutable record of all configuration and operator actions." />
      <div className="border-b border-border bg-background px-6 py-3">
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="actor:sam action:created entity:api_key"
          className="h-8 max-w-md border-border bg-card font-mono text-xs"
        />
      </div>
      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-md border border-border bg-card">
          <div className="grid grid-cols-[140px_180px_120px_140px_1fr_120px] border-b border-border bg-muted/40 px-3 py-2 text-[10px] font-mono uppercase text-muted-foreground">
            <span>When</span><span>Actor</span><span>Action</span><span>Entity</span><span>Metadata</span><span>IP</span>
          </div>
          {filtered.map((a) => (
            <div key={a.id} className="grid grid-cols-[140px_180px_120px_140px_1fr_120px] items-center border-b border-border/60 px-3 py-1.5 text-xs">
              <span className="font-mono text-[11px] text-muted-foreground">{formatDistanceToNow(a.timestamp)}</span>
              <span className="truncate">
                <span className="font-medium">{a.actor}</span>
                <span className="ml-1 font-mono text-[10px] text-muted-foreground">{a.actorEmail}</span>
              </span>
              <span className="font-mono text-[11px]">{a.action}</span>
              <span className="font-mono text-[11px]">{a.entity}</span>
              <span className="truncate font-mono text-[10px] text-muted-foreground">
                {Object.entries(a.metadata).map(([k, v]) => `${k}=${v}`).join(" ")} entity_id={a.entityId.slice(0, 8)}
              </span>
              <span className="font-mono text-[11px]">{a.ip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
