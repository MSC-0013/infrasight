import { useInspector } from "@/store/inspector-store";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JSONViewer } from "@/components/json-viewer";
import { StatusBadge } from "@/components/status-badge";
import { generateLogs, generateSpansForTrace } from "@/lib/mock-data";
import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Copy, Bell, GitBranch, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export function InspectorDrawer() {
  const { open, payload, close } = useInspector();

  const relatedLogs = useMemo(() => (payload ? generateLogs(6) : []), [payload]);
  const relatedSpans = useMemo(
    () => (payload?.relatedTraceId ? generateSpansForTrace(payload.relatedTraceId, 600).slice(0, 6) : []),
    [payload]
  );

  const copyId = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload.id);
    toast.success("ID copied", { description: payload.id });
  };

  return (
    <Sheet open={open} onOpenChange={(o) => !o && close()}>
      <SheetContent className="w-[520px] sm:max-w-[520px] p-0">
        {payload && (
          <div className="flex h-full flex-col">
            <SheetHeader className="border-b border-border p-4">
              <div className="flex items-center gap-2">
                <span className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground">
                  {payload.kind}
                </span>
                <button
                  onClick={copyId}
                  className="flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground"
                  title="Copy ID"
                >
                  {payload.id.slice(0, 12)} <Copy className="h-3 w-3" />
                </button>
              </div>
              <SheetTitle className="mt-1 text-sm font-semibold">{payload.title}</SheetTitle>
              {payload.subtitle && (
                <SheetDescription className="font-mono text-[11px]">{payload.subtitle}</SheetDescription>
              )}
            </SheetHeader>

            <Tabs defaultValue="metadata" className="flex min-h-0 flex-1 flex-col">
              <TabsList className="mx-4 mt-3 grid h-8 grid-cols-4 bg-muted/40">
                <TabsTrigger value="metadata" className="text-[11px]">Metadata</TabsTrigger>
                <TabsTrigger value="logs" className="text-[11px]">Logs</TabsTrigger>
                <TabsTrigger value="traces" className="text-[11px]">Traces</TabsTrigger>
                <TabsTrigger value="actions" className="text-[11px]">Actions</TabsTrigger>
              </TabsList>

              <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-4">
                <TabsContent value="metadata" className="m-0 space-y-3">
                  {payload.service && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] uppercase text-muted-foreground">Service</span>
                      <span className="font-mono">{payload.service}</span>
                    </div>
                  )}
                  <JSONViewer data={payload.data} />
                </TabsContent>

                <TabsContent value="logs" className="m-0 space-y-1.5">
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">
                    Related log lines · {relatedLogs.length}
                  </div>
                  {relatedLogs.map((l) => (
                    <div key={l.id} className="rounded border border-border/60 bg-card p-2 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-[10px]">
                        <StatusBadge tone={l.level === "error" || l.level === "critical" ? "error" : l.level === "warn" ? "warning" : "info"}>
                          {l.level}
                        </StatusBadge>
                        <span className="text-muted-foreground">{l.service}</span>
                      </div>
                      <p className="mt-1 truncate text-foreground/90">{l.message}</p>
                    </div>
                  ))}
                </TabsContent>

                <TabsContent value="traces" className="m-0 space-y-2">
                  {payload.relatedTraceId ? (
                    <>
                      <Link
                        to="/traces/$traceId"
                        params={{ traceId: payload.relatedTraceId }}
                        onClick={close}
                        className="flex items-center justify-between rounded border border-border bg-card p-2 text-xs hover:bg-accent"
                      >
                        <span className="font-mono">{payload.relatedTraceId.slice(0, 16)}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">Spans</div>
                      {relatedSpans.map((s) => (
                        <div key={s.id} className="flex items-center justify-between rounded border border-border/60 bg-card px-2 py-1.5 font-mono text-[11px]">
                          <span className="truncate">{s.service} · {s.operation}</span>
                          <span className="text-muted-foreground">{s.durationMs}ms</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">No trace correlation available.</p>
                  )}
                </TabsContent>

                <TabsContent value="actions" className="m-0 space-y-2">
                  <ActionButton icon={Bell} label="Create alert from this" onClick={() => toast.success("Alert rule drafted")} />
                  <ActionButton icon={GitBranch} label="Link to deployment" onClick={() => toast.info("Linked to latest deploy")} />
                  <ActionButton icon={MessageSquare} label="Add to incident" onClick={() => toast.success("Added to active incident")} />
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
