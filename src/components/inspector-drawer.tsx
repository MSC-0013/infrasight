import { useInspector } from "@/store/inspector-store";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSONViewer } from "@/components/json-viewer";
import { StatusBadge } from "@/components/status-badge";
import { buildCorrelatedContext, type CorrelationLink } from "@/lib/mock-data";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Copy, Bell, GitBranch, MessageSquare, Sparkles, TriangleAlert as AlertTriangle, Workflow, FileText, Layers, Cpu, Boxes, Globe, Rocket, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function InspectorDrawer() {
  const { open, payload, close } = useInspector();

  const ctx = useMemo(() => {
    if (!payload) return null;
    if (payload.correlation) return payload.correlation;
    return buildCorrelatedContext(
      payload.kind,
      payload.id,
      payload.title,
      payload.service,
    );
  }, [payload]);

  const copyId = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload.id);
    toast.success("ID copied", { description: payload.id });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && close()}>
      <SheetContent className="w-[600px] sm:max-w-[600px] p-0">
        {payload && ctx && (
          <div className="flex h-full flex-col">
            {/* Header */}
            <SheetHeader className="border-b border-border p-4">
              <div className="flex items-center gap-2">
                <KindBadge kind={payload.kind} />
                <button
                  onClick={copyId}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  title="Copy ID"
                >
                  {payload.id.slice(0, 12)} <Copy className="h-3 w-3" />
                </button>
                {ctx.service && (
                  <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">{ctx.service}</span>
                )}
                {ctx.region && (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                    <Globe className="h-3 w-3" /> {ctx.region}
                  </span>
                )}
                {ctx.environment && (
                  <span className="rounded border border-success/30 bg-success/10 px-1.5 py-0.5 font-mono text-[10px] text-success">
                    {ctx.environment}
                  </span>
                )}
              </div>
              <SheetTitle className="mt-1 text-sm font-semibold">{payload.title}</SheetTitle>
              {payload.subtitle && (
                <SheetDescription className="font-mono text-[11px]">{payload.subtitle}</SheetDescription>
              )}
            </SheetHeader>

            {/* AI Summary */}
            {ctx.aiSummary && (
              <div className="border-b border-border bg-primary/5 px-4 py-2.5">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <p className="text-[11px] leading-relaxed text-foreground/85">{ctx.aiSummary}</p>
                </div>
              </div>
            )}

            {/* Correlation context strip */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2">
              {ctx.deployment && <CorrelationChip link={ctx.deployment} icon={Rocket} />}
              {ctx.incident && <CorrelationChip link={ctx.incident} icon={ShieldCheck} />}
              {ctx.alerts.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <AlertTriangle className="h-3 w-3 text-warning" /> {ctx.alerts.length} alerts
                </span>
              )}
              {ctx.traces.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <Workflow className="h-3 w-3 text-info" /> {ctx.traces.length} traces
                </span>
              )}
              {ctx.logs.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <FileText className="h-3 w-3 text-muted-foreground" /> {ctx.logs.length} logs
                </span>
              )}
              {ctx.queues.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <Layers className="h-3 w-3 text-warning" /> {ctx.queues.length} queues
                </span>
              )}
              {ctx.workers.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <Cpu className="h-3 w-3 text-success" /> {ctx.workers.length} workers
                </span>
              )}
              {ctx.endpoints.length > 0 && (
                <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
                  <Boxes className="h-3 w-3 text-info" /> {ctx.endpoints.length} endpoints
                </span>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="context" className="flex min-h-0 flex-1 flex-col">
              <TabsList className="mx-4 mt-2 grid h-8 grid-cols-5 bg-muted/40">
                <TabsTrigger value="context" className="text-[11px]">Context</TabsTrigger>
                <TabsTrigger value="metadata" className="text-[11px]">Metadata</TabsTrigger>
                <TabsTrigger value="logs" className="text-[11px]">Logs</TabsTrigger>
                <TabsTrigger value="traces" className="text-[11px]">Traces</TabsTrigger>
                <TabsTrigger value="actions" className="text-[11px]">Actions</TabsTrigger>
              </TabsList>

              <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-4">
                {/* Context tab — full correlation view */}
                <TabsContent value="context" className="m-0 space-y-4">
                  {/* Deployment */}
                  {ctx.deployment && (
                    <CorrelationSection title="Deployment" icon={Rocket}>
                      <CorrelationRow link={ctx.deployment} />
                    </CorrelationSection>
                  )}

                  {/* Incident */}
                  {ctx.incident && (
                    <CorrelationSection title="Incident" icon={ShieldCheck}>
                      <CorrelationRow link={ctx.incident} />
                    </CorrelationSection>
                  )}

                  {/* Alerts */}
                  {ctx.alerts.length > 0 && (
                    <CorrelationSection title={`Alerts (${ctx.alerts.length})`} icon={AlertTriangle}>
                      {ctx.alerts.map((a) => <CorrelationRow key={a.id} link={a} />)}
                    </CorrelationSection>
                  )}

                  {/* Queues */}
                  {ctx.queues.length > 0 && (
                    <CorrelationSection title="Queues" icon={Layers}>
                      {ctx.queues.map((q) => <CorrelationRow key={q.id} link={q} />)}
                    </CorrelationSection>
                  )}

                  {/* Workers */}
                  {ctx.workers.length > 0 && (
                    <CorrelationSection title="Workers" icon={Cpu}>
                      {ctx.workers.map((w) => <CorrelationRow key={w.id} link={w} />)}
                    </CorrelationSection>
                  )}

                  {/* Endpoints */}
                  {ctx.endpoints.length > 0 && (
                    <CorrelationSection title="Endpoints" icon={Boxes}>
                      {ctx.endpoints.map((e) => <CorrelationRow key={e.id} link={e} />)}
                    </CorrelationSection>
                  )}

                  {/* Infrastructure */}
                  <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                    {ctx.service && <Kv k="Service" v={ctx.service} />}
                    {ctx.region && <Kv k="Region" v={ctx.region} />}
                    {ctx.environment && <Kv k="Environment" v={ctx.environment} />}
                  </div>
                </TabsContent>

                {/* Metadata tab */}
                <TabsContent value="metadata" className="m-0 space-y-3">
                  {payload.service && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">Service</span>
                      <span className="font-mono">{payload.service}</span>
                    </div>
                  )}
                  <JSONViewer data={payload.data} />
                </TabsContent>

                {/* Logs tab */}
                <TabsContent value="logs" className="m-0 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">
                    Related log lines · {ctx.logs.length}
                  </div>
                  {ctx.logs.map((l) => (
                    <div key={l.id} className="rounded border border-border/60 bg-card p-2 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-[10px]">
                        {l.tone && <StatusBadge tone={l.tone}>{l.kind}</StatusBadge>}
                        <span className="truncate text-foreground/90">{l.title}</span>
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* Traces tab */}
                <TabsContent value="traces" className="m-0 space-y-2">
                  {ctx.traces.length > 0 ? (
                    <>
                      {ctx.traces.map((t) => (
                        <Link
                          key={t.id}
                          to="/traces/$traceId"
                          params={{ traceId: t.id }}
                          onClick={close}
                          className="flex items-center justify-between rounded border border-border bg-card p-2 text-xs hover:bg-accent"
                        >
                          <span className="truncate font-mono">{t.title}</span>
                          <ExternalLink className="h-3 w-3 shrink-0 text-muted-foreground" />
                        </Link>
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">No trace correlation available.</p>
                  )}
                </TabsContent>

                {/* Actions tab */}
                <TabsContent value="actions" className="m-0 space-y-2">
                  <ActionButton icon={Bell} label="Create alert from this" onClick={() => toast.success("Alert rule drafted")} />
                  <ActionButton icon={GitBranch} label="Link to deployment" onClick={() => toast.info("Linked to latest deploy")} />
                  <ActionButton icon={MessageSquare} label="Add to incident" onClick={() => toast.success("Added to active incident")} />
                  <ActionButton icon={Sparkles} label="AI root cause analysis" onClick={() => toast.success("RCA draft generated")} />
                  <ActionButton icon={Copy} label="Copy as cURL" onClick={() => { navigator.clipboard.writeText(`curl https://api.pulse.io/v1/${payload.kind}/${payload.id}`); toast.success("Copied"); }} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function KindBadge({ kind }: { kind: string }) {
  const TONE: Record<string, "info" | "success" | "warning" | "error" | "neutral" | "critical"> = {
    trace: "info", log: "neutral", event: "info", incident: "error", alert: "warning", deployment: "success",
  };
  const ICON: Record<string, typeof Workflow> = {
    trace: Workflow, log: FileText, event: Boxes, incident: ShieldCheck, alert: AlertTriangle, deployment: Rocket,
  };
  const Icon = ICON[kind] ?? Boxes;
  return (
    <span className="inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
      <Icon className="h-3 w-3" />
      {kind}
    </span>
  );
}

function CorrelationChip({ link, icon: Icon }: { link: CorrelationLink; icon: typeof Rocket }) {
  return (
    <span className="inline-flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]">
      <Icon className={cn("h-3 w-3", link.tone === "error" || link.tone === "critical" ? "text-destructive" : link.tone === "warning" ? "text-warning" : link.tone === "success" ? "text-success" : "text-muted-foreground")} />
      <span className="truncate max-w-[120px]">{link.title}</span>
    </span>
  );
}

function CorrelationSection({ title, icon: Icon, children }: { title: string; icon: typeof Rocket; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3 w-3" /> {title}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function CorrelationRow({ link }: { link: CorrelationLink }) {
  return (
    <div className="flex items-center gap-2 rounded border border-border/60 bg-card px-2.5 py-1.5 text-xs">
      {link.tone && <StatusBadge tone={link.tone} dot={false}>{link.kind}</StatusBadge>}
      <span className="truncate flex-1">{link.title}</span>
      <span className="font-mono text-[10px] text-muted-foreground">{link.id.slice(0, 8)}</span>
    </div>
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

function ActionButton({ icon: Icon, label, onClick }: { icon: typeof Bell; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left text-xs hover:bg-accent"
    >
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      {label}
    </button>
  );
}
