import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area } from "recharts";

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  trend?: number; // percent
  trendInverted?: boolean; // if true, negative = good (e.g. latency)
  series?: Array<{ value: number }>;
  status?: "success" | "warning" | "error" | "info" | "critical";
  variant?: "line" | "area";
}

const statusToColor: Record<NonNullable<Props["status"]>, string> = {
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  error: "var(--color-destructive)",
  critical: "var(--color-destructive)",
  info: "var(--color-primary)",
};

export function MetricCard({
  label, value, unit, trend, trendInverted, series, status = "info", variant = "line",
}: Props) {
  const isPos = trend !== undefined && trend >= 0;
  const isGood = trendInverted ? !isPos : isPos;
  const color = statusToColor[status];

  return (
    <div className="group relative flex flex-col gap-2 rounded-lg border border-border bg-card p-3 transition-colors hover:border-border/80">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      </div>

      <div className="flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-semibold tracking-tight tabular-nums">{value}</span>
            {unit && <span className="text-xs font-mono text-muted-foreground">{unit}</span>}
          </div>
          {trend !== undefined && (
            <div
              className={cn(
                "mt-0.5 flex items-center gap-0.5 text-[11px] font-mono",
                isGood ? "text-success" : "text-destructive"
              )}
            >
              {isPos ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(trend).toFixed(1)}%
              <span className="ml-1 text-muted-foreground">24h</span>
            </div>
          )}
        </div>

        {series && series.length > 0 && (
          <div className="h-9 w-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              {variant === "area" ? (
                <AreaChart data={series}>
                  <defs>
                    <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={color} stopOpacity={0.5} />
                      <stop offset="100%" stopColor={color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill={`url(#grad-${label})`} />
                </AreaChart>
              ) : (
                <LineChart data={series}>
                  <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
