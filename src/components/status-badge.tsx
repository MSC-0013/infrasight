import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "error" | "info" | "neutral" | "critical";

const styles: Record<Tone, string> = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  error: "border-destructive/30 bg-destructive/10 text-destructive",
  critical: "border-destructive/40 bg-destructive/15 text-destructive",
  info: "border-primary/30 bg-primary/10 text-primary",
  neutral: "border-border bg-muted text-muted-foreground",
};

export function StatusBadge({ tone = "neutral", children, dot = true, className }: {
  tone?: Tone; children: React.ReactNode; dot?: boolean; className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        styles[tone],
        className
      )}
    >
      {dot && <span className={cn("h-1 w-1 rounded-full", `bg-current`)} />}
      {children}
    </span>
  );
}
