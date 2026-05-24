import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { ChartCard } from "@/components/chart-card";
import { MetricCard } from "@/components/metric-card";
import { StatusBadge } from "@/components/status-badge";
import { generateMLInsights, generateTimeSeries } from "@/lib/mock-data";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Sparkles, TrendingUp, OctagonAlert as AlertOctagon, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/ml-insights")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("view:mlops")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "ML Insights — Pulse" },
      { name: "description", content: "Anomaly detection, predictions and AI summaries." },
    ],
  }),
  component: MLPage,
});

const TYPE_TONE = { anomaly: "warning", prediction: "info", summary: "neutral" } as const;
const TYPE_ICON = { anomaly: AlertOctagon, prediction: TrendingUp, summary: FileText } as const;

function MLPage() {
  const insights = useMemo(() => generateMLInsights(), []);
  const anomalies = useMemo(() => generateTimeSeries(60, 5, 3), []);
  const confidence = useMemo(() => generateTimeSeries(60, 88, 6), []);
  const spark = useMemo(() => generateTimeSeries(20, 90, 5), []);

  return (
    <div className="flex flex-col">
      <PageHeader title="ML Insights" description="AI-powered anomaly detection, predictions and operational summaries." />

      <div className="grid grid-cols-2 gap-3 px-6 py-4 md:grid-cols-4">
        <MetricCard label="Anomalies detected (24h)" value="14" series={spark} trend={-12.2} trendInverted status="warning" />
        <MetricCard label="Avg confidence" value="91.2" unit="%" series={spark} trend={1.4} status="success" />
        <MetricCard label="Predictions today" value="328" series={spark} trend={4.6} status="info" />
        <MetricCard label="Models running" value="6" series={spark} trend={0} status="info" />
      </div>

      <div className="grid grid-cols-1 gap-3 px-6 lg:grid-cols-2">
        <ChartCard title="Anomaly count" description="Per minute, last 60m">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={anomalies} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={ttStyle} />
                <Line dataKey="value" stroke="var(--color-warning)" dot={false} strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
        <ChartCard title="Model confidence" description="% rolling average">
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={confidence} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="label" tick={tick} tickLine={false} axisLine={false} interval={10} />
                <YAxis tick={tick} tickLine={false} axisLine={false} domain={[60, 100]} />
                <Tooltip contentStyle={ttStyle} />
                <Line dataKey="value" stroke="var(--color-primary)" dot={false} strokeWidth={1.5} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="px-6 py-4">
        <h2 className="mb-2 text-sm font-semibold">Insights feed</h2>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {insights.map((i) => {
            const Icon = TYPE_ICON[i.type];
            return (
              <div key={i.id} className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border border-border bg-background">
                  <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium">{i.title}</p>
                    <StatusBadge tone={TYPE_TONE[i.type]}>{i.type}</StatusBadge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{i.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="flex items-center gap-1"><Sparkles className="h-3 w-3" /> {i.confidence}% conf</span>
                    <span>{i.service}</span>
                    <span>{formatDistanceToNow(new Date(i.timestamp), { addSuffix: true })}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const tick = { fill: "var(--color-muted-foreground)", fontSize: 10 };
const ttStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 6, fontSize: 11 };
