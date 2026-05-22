import { cn } from "@/lib/utils";

export function PageHeader({
  title, description, actions, className,
}: {
  title: React.ReactNode; description?: React.ReactNode; actions?: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3 border-b border-border bg-background px-6 py-4", className)}>
      <div className="min-w-0">
        <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
        {description && <div className="mt-0.5 text-xs text-muted-foreground">{description}</div>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
