import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function ChartCard({ title, description, actions, children, className }: Props) {
  return (
    <div className={cn("flex flex-col rounded-lg border border-border bg-card", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-2.5">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-1.5">{actions}</div>}
      </div>
      <div className="flex-1 p-3">{children}</div>
    </div>
  );
}
