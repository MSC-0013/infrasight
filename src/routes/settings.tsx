import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Copy } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Pulse" },
      { name: "description", content: "Account, organization, API keys, webhooks and notification settings." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="flex flex-col">
      <PageHeader title="Settings" description="Configure account, organization, integrations and access." />

      <div className="px-6 py-4">
        <Tabs defaultValue="profile">
          <TabsList className="h-9">
            <TabsTrigger value="profile" className="text-xs">Profile</TabsTrigger>
            <TabsTrigger value="organization" className="text-xs">Organization</TabsTrigger>
            <TabsTrigger value="api-keys" className="text-xs">API Keys</TabsTrigger>
            <TabsTrigger value="webhooks" className="text-xs">Webhooks</TabsTrigger>
            <TabsTrigger value="rbac" className="text-xs">RBAC</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs">Notifications</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <Card title="Profile" description="Your personal information">
              <Field label="Name"><Input defaultValue="Sam Engineer" className="h-8 max-w-md text-xs" /></Field>
              <Field label="Email"><Input defaultValue="sam@pulse.io" className="h-8 max-w-md font-mono text-xs" /></Field>
              <Field label="Timezone"><Input defaultValue="UTC" className="h-8 max-w-md font-mono text-xs" /></Field>
              <div className="flex justify-end"><Button size="sm" className="h-7 text-xs">Save changes</Button></div>
            </Card>
          </TabsContent>

          <TabsContent value="organization" className="mt-4">
            <Card title="Organization" description="Tenant-wide configuration">
              <Field label="Name"><Input defaultValue="Acme Production" className="h-8 max-w-md text-xs" /></Field>
              <Field label="Slug"><Input defaultValue="acme-prod" className="h-8 max-w-md font-mono text-xs" /></Field>
              <Field label="Data region"><Input defaultValue="us-east-1" className="h-8 max-w-md font-mono text-xs" /></Field>
              <Field label="Retention (days)"><Input defaultValue="30" className="h-8 max-w-md font-mono text-xs" /></Field>
            </Card>
          </TabsContent>

          <TabsContent value="api-keys" className="mt-4">
            <Card title="API Keys" description="Generate and revoke service keys" actions={<Button size="sm" className="h-7 gap-1.5 text-xs"><Plus className="h-3 w-3" />Create key</Button>}>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Name</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Token</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Scope</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Created</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ["ingest-prod", "pk_live_4d2f••••8a91", "write"],
                    ["dashboard-ro", "pk_live_91ac••••22ef", "read"],
                    ["ci-runner", "pk_live_77be••••0c1d", "admin"],
                  ].map(([n, t, s]) => (
                    <TableRow key={n} className="border-border text-xs">
                      <TableCell className="py-2 font-medium">{n}</TableCell>
                      <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{t}</TableCell>
                      <TableCell className="py-2"><StatusBadge tone="info" dot={false}>{s}</StatusBadge></TableCell>
                      <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">2026-04-12</TableCell>
                      <TableCell className="py-2 text-right">
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground"><Copy className="h-3 w-3" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="mt-4">
            <Card title="Webhooks" description="Forward events to external endpoints" actions={<Button size="sm" className="h-7 gap-1.5 text-xs"><Plus className="h-3 w-3" />Add webhook</Button>}>
              <Field label="Endpoint URL"><Input placeholder="https://hooks.example.com/pulse" className="h-8 max-w-md font-mono text-xs" /></Field>
              <Field label="Events">
                <Textarea defaultValue={"event.failed\nalert.triggered\nqueue.dlq"} className="max-w-md font-mono text-xs" rows={4} />
              </Field>
              <Field label="Secret"><Input defaultValue="whsec_••••••" className="h-8 max-w-md font-mono text-xs" /></Field>
            </Card>
          </TabsContent>

          <TabsContent value="rbac" className="mt-4">
            <Card title="Roles & Permissions">
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Member</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Role</TableHead>
                    <TableHead className="h-8 text-[10px] font-mono uppercase">Last active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[["Sam Engineer", "admin", "1m ago"], ["Riley Ops", "developer", "12m ago"], ["Jordan SRE", "viewer", "2h ago"]].map(([m, r, l]) => (
                    <TableRow key={m} className="border-border text-xs">
                      <TableCell className="py-2 font-medium">{m}</TableCell>
                      <TableCell className="py-2"><StatusBadge tone="info" dot={false}>{r}</StatusBadge></TableCell>
                      <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{l}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <Card title="Notification preferences">
              {[
                ["Critical alerts", "Page on-call immediately", true],
                ["Worker offline", "Send to Slack #ops", true],
                ["Daily digest", "8am UTC summary email", false],
                ["Weekly ML insights", "Monday 9am UTC", true],
              ].map(([t, d, on]) => (
                <div key={t as string} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{t as string}</p>
                    <p className="text-xs text-muted-foreground">{d as string}</p>
                  </div>
                  <Switch defaultChecked={on as boolean} />
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function Card({ title, description, children, actions }: { title: string; description?: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-start justify-between border-b border-border px-4 py-2.5">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
        </div>
        {actions}
      </div>
      <div className="space-y-3 p-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
