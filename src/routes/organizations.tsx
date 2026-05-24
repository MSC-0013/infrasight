import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { generateOrganizations } from "@/lib/mock-data";

export const Route = createFileRoute("/organizations")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("manage:org")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "Organizations — Pulse" },
      { name: "description", content: "Manage tenant organizations on the platform." },
    ],
  }),
  component: OrgsPage,
});

const PLAN_TONE = { free: "neutral", pro: "info", enterprise: "success" } as const;

function OrgsPage() {
  const orgs = useMemo(() => generateOrganizations(), []);

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Organizations"
        description="Tenant organizations and their usage."
        actions={<Button size="sm" className="h-7 gap-1.5 text-xs"><Plus className="h-3 w-3" />New organization</Button>}
      />

      <div className="px-6 py-4">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="h-8 text-[10px] font-mono uppercase">Organization</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Slug</TableHead>
                <TableHead className="h-8 text-[10px] font-mono uppercase">Plan</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Events / 24h</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Members</TableHead>
                <TableHead className="h-8 text-right text-[10px] font-mono uppercase">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orgs.map((o, i) => (
                <TableRow key={o.id} className="border-border text-xs hover:bg-accent/40">
                  <TableCell className="py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-primary/15 text-[10px] font-semibold uppercase text-primary">
                        {o.name.slice(0, 2)}
                      </div>
                      <span className="font-medium">{o.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{o.slug}</TableCell>
                  <TableCell className="py-2"><StatusBadge tone={PLAN_TONE[o.plan]} dot={false}>{o.plan}</StatusBadge></TableCell>
                  <TableCell className="py-2 text-right font-mono tabular-nums">{(2.1 - i * 0.3).toFixed(1)}M</TableCell>
                  <TableCell className="py-2 text-right font-mono tabular-nums">{42 - i * 5}</TableCell>
                  <TableCell className="py-2 text-right"><StatusBadge tone="success">active</StatusBadge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
