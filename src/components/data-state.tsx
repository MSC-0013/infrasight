import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QueryLoading({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-16 text-sm text-muted-foreground">
      <Loader2 className="h-4 w-4 animate-spin" />
      {label}
    </div>
  );
}

export function QueryError({
  error,
  onRetry,
}: {
  error: Error | null;
  onRetry?: () => void;
}) {
  return (
    <div className="mx-6 my-8 rounded-lg border border-destructive/40 bg-destructive/10 p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
        <div className="flex-1">
          <p className="text-sm font-medium text-destructive">Failed to load data</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {error?.message ?? "Check that the API and database are running."}
          </p>
          {onRetry && (
            <Button size="sm" variant="outline" className="mt-3 h-7 text-xs" onClick={onRetry}>
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function QueryBoundary({
  isLoading,
  isError,
  error,
  refetch,
  children,
  loadingLabel,
}: {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch?: () => void;
  children: ReactNode;
  loadingLabel?: string;
}) {
  if (isLoading) return <QueryLoading label={loadingLabel} />;
  if (isError) return <QueryError error={error} onRetry={refetch} />;
  return <>{children}</>;
}
