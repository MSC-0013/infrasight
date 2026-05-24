import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { ChartCard } from "@/components/chart-card";
import { generateMLModels, generateMLInsights, generateConfidenceDistribution, generateTimeSeries } from "@/lib/mock-data";
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatDistanceToNow } from "@/lib/format";

export const Route = createFileRoute("/mlops")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:mlops")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({ meta: [{ title: "MLOps — Pulse" }, { name: "description", content: "Model serving, drift and inference monitoring" }] }),
  component: MLOpsPage,
});

function MLOpsPage() {
  const models = useMemo(() => generateMLModels(), []);
  const insights = useMemo(() => generateMLInsights(), []);
  const dist = useMemo(() => generateConfidenceDistribution(), []);
  const inferSeries = useMemo(() => generateTimeSeries(60, 220, 60), []);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="MLOps"
        description="Model serving health, drift detection and AI insights across the platform."
      />
      <div className="space-y-4 px-6 py-4">
        <div className="grid gap-3 lg:grid-cols-2">
          {models.map((m) => (
            <div key={m.id} className="rounded-md border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{m.name}</h3>
                    <span className="font-mono text-[10px] text-muted-foreground">v{m.version}</span>
                    <StatusBadge tone={m.status === "serving" ? "success" : m.status === "shadow" ? "info" : "neutral"}>
                      {m.status}
                    </StatusBadge>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                    deployed {formatDistanceToNow(m.deployedAt)}
                  </p>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2 border-t border-border pt-3">
                <Stat k="P95" v={`${m.inferenceP95}ms`} />
                <Stat k="Throughput" v={`${m.throughput}/s`} />
                <Stat k="Accuracy" v={`${(m.accuracy * 100).toFixed(1)}%`} />
                <Stat k="Drift" v={m.drift.toFixed(3)} tone={m.drift > 0.1 ? "warn" : undefined} />
                <Stat k="Conf" v={m.confidence.toFixed(2)} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <ChartCard title="Inference latency (P95)" description="Last 60 minutes, all models">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={inferSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Line type="monotone" dataKey="value" stroke="var(--chart-1)" dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
          <ChartCard title="Prediction confidence distribution" description="Bucketed across last 1h">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={dist}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="bucket" stroke="hsl(var(--muted-foreground))" fontSize={9} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)" }} />
                <Bar dataKey="value" fill="var(--chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI insights</div>
          <div className="grid gap-2 lg:grid-cols-2">
            {insights.map((i) => (
              <div key={i.id} className="rounded-md border border-border bg-card p-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-semibold">{i.title}</h4>
                  <StatusBadge tone={i.type === "anomaly" ? "warning" : i.type === "prediction" ? "info" : "neutral"}>
                    {i.type}
                  </StatusBadge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{i.description}</p>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-muted-foreground">
                  <span>{i.service}</span>
                  <span>confidence {i.confidence}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ k, v, tone }: { k: string; v: string; tone?: "warn" }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase text-muted-foreground">{k}</div>
      <div className={"mt-0.5 font-mono text-xs " + (tone === "warn" ? "text-warning" : "")}>{v}</div>
    </div>
  );
}
