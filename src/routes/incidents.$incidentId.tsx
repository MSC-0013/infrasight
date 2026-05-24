import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { generateIncidents, generateDeployments, generateLogs, generateTraces, type Incident } from "@/lib/mock-data";
import { formatDistanceToNow } from "@/lib/format";
import { ArrowLeft, MessageSquare, GitBranch, FileText, Workflow, UserPlus, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useInspector } from "@/store/inspector-store";
import { toast } from "sonner";

export const Route = createFileRoute("/incidents/$incidentId")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:incidents")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "Incident — Pulse" }] }),
  component: IncidentDetailPage,
});

const sevTone: Record<Incident["severity"], "critical" | "error" | "warning" | "info"> = {
  sev1: "critical", sev2: "error", sev3: "warning", sev4: "info",
};
const statusTone: Record<Incident["status"], "warning" | "info" | "success" | "error"> = {
  investigating: "error", identified: "warning", monitoring: "info", resolved: "success",
};

const RESPONDERS = [
  { name: "Alex Chen", role: "Incident Commander", avatar: "AC" },
  { name: "Maria Lopez", role: "SRE on-call", avatar: "ML" },
  { name: "Dan Park", role: "Service owner", avatar: "DP" },
];

function IncidentDetailPage() {
  const { incidentId } = Route.useParams();
  const all = useMemo(() => generateIncidents(), []);
  const incident = useMemo(() => all.find((i) => i.id === incidentId) ?? all[0], [all, incidentId]);
  const deploys = useMemo(() => generateDeployments().slice(0, 3), []);
  const logs = useMemo(() => generateLogs(8), []);
  const traces = useMemo(() => generateTraces(4), []);
  const inspect = useInspector((s) => s.inspect);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Array<{ author: string; at: string; text: string }>>([
    { author: "Alex Chen", at: new Date(Date.now() - 8 * 60_000).toISOString(), text: "Rolling back deploy a3f2c91 to verify hypothesis." },
    { author: "Maria Lopez", at: new Date(Date.now() - 22 * 60_000).toISOString(), text: "Error rate localized to event-service in eu-west-1." },
  ]);

  const post = () => {
    if (!comment.trim()) return;
    setComments((c) => [...c, { author: "You", at: new Date().toISOString(), text: comment }]);
    setComment("");
    toast.success("Comment posted");
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title={
          <span className="flex items-center gap-3">
            <Link to="/incidents" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /></Link>
            <span className="font-mono text-sm text-muted-foreground">{incident.id}</span>
            <span>{incident.title}</span>
          </span>
        }
        description={
          <span className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={sevTone[incident.severity]}>{incident.severity}</StatusBadge>
            <StatusBadge tone={statusTone[incident.status]}>{incident.status}</StatusBadge>
            <span className="font-mono text-[11px] text-muted-foreground">opened {formatDistanceToNow(incident.openedAt)}</span>
          </span>
        }
        actions={
          <>
            <button className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1 text-xs hover:bg-accent">
              <UserPlus className="h-3.5 w-3.5" /> Add responder
            </button>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90">
              Mark resolved
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 px-6 py-4 lg:grid-cols-[1fr_320px]">
        {/* MAIN */}
        <div className="space-y-4">
          <Section title="Timeline">
            <ol className="relative space-y-3 border-l border-border pl-4">
              {incident.updates.map((u, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[21px] top-1 h-2 w-2 rounded-full bg-primary" />
                  <div className="flex items-baseline gap-2 text-xs">
                    <span className="font-semibold uppercase">{u.status}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{formatDistanceToNow(u.at)}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-foreground/85">{u.message}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{u.author}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section title="Root cause analysis">
            <p className="text-xs leading-relaxed text-foreground/85">
              {incident.rootCause ?? "Investigation ongoing. Hypothesis: increased fan-out from event-service after deploy a3f2c91 exhausted Redis connection pool, causing cascade rate-limiting upstream."}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-[10px]">
              <Kv k="Started" v={formatDistanceToNow(incident.openedAt)} />
              <Kv k="Detection" v="92s (auto)" />
              <Kv k="Acknowledged" v={incident.acknowledgedBy ?? "—"} />
            </div>
          </Section>

          <Section title="Comments & activity">
            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="rounded-md border border-border bg-card p-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-medium">{c.author}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">{formatDistanceToNow(c.at)}</span>
                  </div>
                  <p className="mt-1 text-xs text-foreground/85">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && post()}
                placeholder="Add an update or @mention a responder…"
                className="h-9 bg-card text-xs"
              />
              <button onClick={post} className="rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground hover:bg-primary/90">
                Post
              </button>
            </div>
          </Section>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Section title="Related deployments" icon={<GitBranch className="h-3.5 w-3.5" />}>
              {deploys.map((d) => (
                <div key={d.id} className="flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0">
                  <div>
                    <p className="font-mono">{d.service}@{d.version}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">{d.commit.slice(0, 7)} · {d.author}</p>
                  </div>
                  <StatusBadge tone={d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning"}>
                    {d.status}
                  </StatusBadge>
                </div>
              ))}
            </Section>

            <Section title="Related traces" icon={<Workflow className="h-3.5 w-3.5" />}>
              {traces.map((t) => (
                <Link
                  key={t.id}
                  to="/traces/$traceId"
                  params={{ traceId: t.id }}
                  className="flex items-center justify-between border-b border-border/60 py-1.5 text-xs last:border-0 hover:text-primary"
                >
                  <span className="truncate font-mono">{t.rootOperation}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">{t.durationMs}ms</span>
                </Link>
              ))}
            </Section>
          </div>

          <Section title="Related logs" icon={<FileText className="h-3.5 w-3.5" />}>
            {logs.slice(0, 5).map((l) => (
              <button
                key={l.id}
                onClick={() => inspect({ kind: "log", id: l.id, title: l.message, subtitle: l.service, data: l.attrs, relatedTraceId: l.traceId, service: l.service })}
                className="flex w-full items-center gap-2 border-b border-border/60 py-1.5 text-left text-xs last:border-0 hover:bg-accent/30"
              >
                <StatusBadge tone={l.level === "error" || l.level === "critical" ? "error" : l.level === "warn" ? "warning" : "info"}>{l.level}</StatusBadge>
                <span className="font-mono text-[10px] text-muted-foreground">{l.service}</span>
                <span className="truncate">{l.message}</span>
              </button>
            ))}
          </Section>
        </div>

        {/* SIDEBAR */}
        <div className="space-y-4">
          <Section title="Responders" icon={<UserPlus className="h-3.5 w-3.5" />}>
            {RESPONDERS.map((r) => (
              <div key={r.name} className="flex items-center gap-2 border-b border-border/60 py-1.5 last:border-0">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">{r.avatar}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium">{r.name}</p>
                  <p className="font-mono text-[10px] text-muted-foreground">{r.role}</p>
                </div>
              </div>
            ))}
          </Section>

          <Section title="Affected services">
            <div className="flex flex-wrap gap-1">
              {incident.impactedServices.map((s) => (
                <span key={s} className="rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px]">{s}</span>
              ))}
            </div>
          </Section>

          <Section title="Impact summary">
            <dl className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <Stat k="users affected" v="~12.4K" />
              <Stat k="error rate" v="4.8%" />
              <Stat k="region" v="eu-west-1" />
              <Stat k="SLO burn" v="32%" />
            </dl>
          </Section>

          <Section title="Notifications" icon={<Bell className="h-3.5 w-3.5" />}>
            <ul className="space-y-1.5 text-[11px]">
              <li className="flex items-center justify-between font-mono"><span>#incidents-prod</span><span className="text-success">delivered</span></li>
              <li className="flex items-center justify-between font-mono"><span>pagerduty</span><span className="text-success">delivered</span></li>
              <li className="flex items-center justify-between font-mono"><span>status page</span><span className="text-warning">queued</span></li>
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-md border border-border bg-card">
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2 text-[11px] font-medium">
        {icon}
        <span>{title}</span>
      </div>
      <div className="p-3">{children}</div>
    </section>
  );
}
function Kv({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded border border-border bg-background p-2">
      <p className="text-[10px] uppercase text-muted-foreground">{k}</p>
      <p className="mt-0.5">{v}</p>
    </div>
  );
}
function Stat({ k, v }: { k: string; v: string }) {
  return (
    <>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right">{v}</dd>
    </>
  );
}
