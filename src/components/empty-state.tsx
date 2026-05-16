import { cn } from "@/lib/utils";
import { Inbox } from "lucide-react";

export function EmptyState({ title, description, icon: Icon = Inbox, className }: {
  title: string; description?: string; icon?: React.ComponentType<{ className?: string }>; className?: string;
}) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card/40 px-6 py-12 text-center", className)}>
      <Icon className="h-6 w-6 text-muted-foreground" />
      <p className="text-sm font-medium">{title}</p>
      {description && <p className="max-w-sm text-xs text-muted-foreground">{description}</p>}
    </div>
  );
}
