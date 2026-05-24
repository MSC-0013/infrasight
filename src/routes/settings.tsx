import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Copy, Trash2, Check } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore, ROLE_LABEL, ROLE_TONE } from "@/store/auth-store";
import { generateMembers, type Member } from "@/lib/mock-data";

export const Route = createFileRoute("/settings")({
  beforeLoad: () => {
    const { isAuthenticated, can } = useAuthStore.getState();
    if (!isAuthenticated) throw redirect({ to: "/login" });
    if (!can("manage:settings")) throw redirect({ to: "/dashboard" });
  },
  
  head: () => ({
    meta: [
      { title: "Settings — Pulse" },
      { name: "description", content: "Account, organization, API keys, webhooks and notification settings." },
    ],
  }),
  component: SettingsPage,
});

interface ApiKey { id: string; name: string; token: string; scope: "read" | "write" | "admin"; createdAt: string }
interface Webhook { id: string; url: string; events: string[]; secret: string; enabled: boolean }

const DEFAULT_KEYS: ApiKey[] = [
  { id: "k1", name: "ingest-prod", token: "pk_live_4d2f••••8a91", scope: "write", createdAt: "2026-04-12" },
  { id: "k2", name: "dashboard-ro", token: "pk_live_91ac••••22ef", scope: "read", createdAt: "2026-03-08" },
  { id: "k3", name: "ci-runner", token: "pk_live_77be••••0c1d", scope: "admin", createdAt: "2026-02-14" },
];

const DEFAULT_WEBHOOKS: Webhook[] = [
  { id: "w1", url: "https://hooks.example.com/pulse", events: ["event.failed", "alert.triggered"], secret: "whsec_••••a91", enabled: true },
];

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

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
            <ProfileSection />
          </TabsContent>

          <TabsContent value="organization" className="mt-4">
            <OrgSection />
          </TabsContent>

          <TabsContent value="api-keys" className="mt-4">
            <ApiKeysSection />
          </TabsContent>

          <TabsContent value="webhooks" className="mt-4">
            <WebhooksSection />
          </TabsContent>

          <TabsContent value="rbac" className="mt-4">
            <RBACSection />
          </TabsContent>

          <TabsContent value="notifications" className="mt-4">
            <NotificationsSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ProfileSection() {
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [tz, setTz] = useState("UTC");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => { setDirty(true); }, [name, email, tz]);

  const save = async () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setDirty(false);
    toast.success("Profile updated");
  };

  return (
    <Card title="Profile" description="Your personal information">
      <div className="flex items-center gap-4 rounded-md border border-border bg-background p-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-base font-semibold uppercase text-primary">
          {user?.avatar ?? "—"}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold">{user?.name ?? "Guest"}</span>
            {user && <StatusBadge tone={ROLE_TONE[user.role]}>{ROLE_LABEL[user.role]}</StatusBadge>}
          </div>
          <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} className="h-8 max-w-md text-xs" /></Field>
      <Field label="Email"><Input value={email} onChange={(e) => setEmail(e.target.value)} className="h-8 max-w-md font-mono text-xs" /></Field>
      <Field label="Timezone"><Input value={tz} onChange={(e) => setTz(e.target.value)} className="h-8 max-w-md font-mono text-xs" /></Field>

      <Field label="Role (demo)">
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(ROLE_LABEL) as Array<keyof typeof ROLE_LABEL>).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded border px-2.5 py-1 text-xs ${user?.role === r ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}
            >
              {ROLE_LABEL[r]}
            </button>
          ))}
        </div>
      </Field>

      <div className="flex items-center justify-end gap-2">
        {dirty && <span className="text-[11px] font-mono text-warning">Unsaved changes</span>}
        <Button size="sm" className="h-7 gap-1.5 text-xs" disabled={!dirty || saving} onClick={save}>
          {saving ? "Saving…" : (<><Check className="h-3 w-3" />Save changes</>)}
        </Button>
      </div>
    </Card>
  );
}

function OrgSection() {
  const [org, setOrg] = useState({ name: "Acme Production", slug: "acme-prod", region: "us-east-1", retention: "30" });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!/^[a-z0-9-]+$/.test(org.slug)) return toast.error("Slug must be lowercase letters, numbers, hyphens");
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Organization settings saved");
  };

  return (
    <Card title="Organization" description="Tenant-wide configuration" actions={
      <Button size="sm" className="h-7 gap-1.5 text-xs" disabled={saving} onClick={save}>{saving ? "Saving…" : "Save"}</Button>
    }>
      <Field label="Name"><Input value={org.name} onChange={(e) => setOrg({ ...org, name: e.target.value })} className="h-8 max-w-md text-xs" /></Field>
      <Field label="Slug"><Input value={org.slug} onChange={(e) => setOrg({ ...org, slug: e.target.value })} className="h-8 max-w-md font-mono text-xs" /></Field>
      <Field label="Data region"><Input value={org.region} onChange={(e) => setOrg({ ...org, region: e.target.value })} className="h-8 max-w-md font-mono text-xs" /></Field>
      <Field label="Retention (days)"><Input value={org.retention} onChange={(e) => setOrg({ ...org, retention: e.target.value })} className="h-8 max-w-md font-mono text-xs" /></Field>
    </Card>
  );
}

function ApiKeysSection() {
  const [keys, setKeys] = useState<ApiKey[]>(() => load("pulse-api-keys", DEFAULT_KEYS));
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newScope, setNewScope] = useState<"read" | "write" | "admin">("read");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("pulse-api-keys", JSON.stringify(keys)); }, [keys]);

  const create = () => {
    if (!newName.trim()) return toast.error("Name is required");
    const token = `pk_live_${Math.random().toString(36).slice(2, 6)}••••${Math.random().toString(36).slice(2, 6)}`;
    const item: ApiKey = {
      id: Math.random().toString(36).slice(2, 8),
      name: newName.trim(),
      token,
      scope: newScope,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setKeys((prev) => [item, ...prev]);
    setOpen(false);
    setNewName("");
    setNewScope("read");
    toast.success("API key created", { description: token });
  };

  const remove = (id: string) => {
    const key = keys.find((k) => k.id === id);
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setConfirmId(null);
    if (key) toast.success(`Revoked "${key.name}"`);
  };

  return (
    <Card title="API Keys" description="Generate and revoke service keys" actions={
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-7 gap-1.5 text-xs"><Plus className="h-3 w-3" />Create key</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create API key</DialogTitle>
            <DialogDescription>Keys are shown once. Store them securely.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Name"><Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="ingest-prod" className="h-8 text-xs" /></Field>
            <Field label="Scope">
              <div className="flex gap-1.5">
                {(["read", "write", "admin"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setNewScope(s)}
                    className={`rounded border px-2.5 py-1 text-xs ${newScope === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </Field>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" className="h-7 text-xs" onClick={create}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }>
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
          {keys.length === 0 && (
            <TableRow><TableCell colSpan={5} className="py-6 text-center text-xs text-muted-foreground">No API keys yet</TableCell></TableRow>
          )}
          {keys.map((k) => (
            <TableRow key={k.id} className="border-border text-xs">
              <TableCell className="py-2 font-medium">{k.name}</TableCell>
              <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{k.token}</TableCell>
              <TableCell className="py-2"><StatusBadge tone="info" dot={false}>{k.scope}</StatusBadge></TableCell>
              <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{k.createdAt}</TableCell>
              <TableCell className="py-2 text-right">
                <Button
                  size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground"
                  onClick={() => { navigator.clipboard?.writeText(k.token); toast.success("Token copied"); }}
                  title="Copy"
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  size="sm" variant="ghost" className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  onClick={() => setConfirmId(k.id)}
                  title="Revoke"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Revoke API key?</AlertDialogTitle>
            <AlertDialogDescription>
              Any service using this key will immediately lose access. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction className="h-8 bg-destructive text-xs text-destructive-foreground hover:bg-destructive/90" onClick={() => confirmId && remove(confirmId)}>
              Revoke
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function WebhooksSection() {
  const [hooks, setHooks] = useState<Webhook[]>(() => load("pulse-webhooks", DEFAULT_WEBHOOKS));
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [events, setEvents] = useState("event.failed\nalert.triggered");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  useEffect(() => { localStorage.setItem("pulse-webhooks", JSON.stringify(hooks)); }, [hooks]);

  const create = () => {
    try { new URL(url); } catch { return toast.error("Enter a valid URL"); }
    const item: Webhook = {
      id: Math.random().toString(36).slice(2, 8),
      url,
      events: events.split("\n").map((s) => s.trim()).filter(Boolean),
      secret: `whsec_${Math.random().toString(36).slice(2, 10)}`,
      enabled: true,
    };
    setHooks((prev) => [item, ...prev]);
    setOpen(false);
    setUrl(""); setEvents("event.failed\nalert.triggered");
    toast.success("Webhook created");
  };

  const toggle = (id: string) => {
    setHooks((prev) => prev.map((h) => (h.id === id ? { ...h, enabled: !h.enabled } : h)));
  };

  const remove = (id: string) => {
    setHooks((prev) => prev.filter((h) => h.id !== id));
    setConfirmId(null);
    toast.success("Webhook deleted");
  };

  return (
    <Card title="Webhooks" description="Forward events to external endpoints" actions={
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-7 gap-1.5 text-xs"><Plus className="h-3 w-3" />Add webhook</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add webhook</DialogTitle>
            <DialogDescription>We'll POST a JSON payload to your endpoint for matching events.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Endpoint URL"><Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://hooks.example.com/pulse" className="h-8 font-mono text-xs" /></Field>
            <Field label="Events (one per line)"><Textarea value={events} onChange={(e) => setEvents(e.target.value)} className="font-mono text-xs" rows={4} /></Field>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setOpen(false)}>Cancel</Button>
            <Button size="sm" className="h-7 text-xs" onClick={create}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    }>
      <div className="space-y-2">
        {hooks.length === 0 && (
          <p className="py-6 text-center text-xs text-muted-foreground">No webhooks configured yet</p>
        )}
        {hooks.map((h) => (
          <div key={h.id} className="rounded-md border border-border bg-background p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-xs">{h.url}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Secret: <span className="font-mono">{h.secret}</span> · {h.events.length} event{h.events.length !== 1 ? "s" : ""}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {h.events.map((e) => (
                    <span key={e} className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{e}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={h.enabled} onCheckedChange={() => toggle(h.id)} />
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive" onClick={() => setConfirmId(h.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertDialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete webhook?</AlertDialogTitle>
            <AlertDialogDescription>Events will no longer be forwarded to this endpoint.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-8 text-xs">Cancel</AlertDialogCancel>
            <AlertDialogAction className="h-8 bg-destructive text-xs text-destructive-foreground hover:bg-destructive/90" onClick={() => confirmId && remove(confirmId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

function NotificationsSection() {
  const items = [
    { k: "critical", t: "Critical alerts", d: "Page on-call immediately", on: true },
    { k: "offline", t: "Worker offline", d: "Send to Slack #ops", on: true },
    { k: "digest", t: "Daily digest", d: "8am UTC summary email", on: false },
    { k: "ml", t: "Weekly ML insights", d: "Monday 9am UTC", on: true },
  ];
  const [state, setState] = useState<Record<string, boolean>>(() => load("pulse-notifications", Object.fromEntries(items.map((i) => [i.k, i.on]))));

  useEffect(() => { localStorage.setItem("pulse-notifications", JSON.stringify(state)); }, [state]);

  return (
    <Card title="Notification preferences">
      {items.map((i) => (
        <div key={i.k} className="flex items-center justify-between border-b border-border py-2 last:border-0">
          <div>
            <p className="text-sm font-medium">{i.t}</p>
            <p className="text-xs text-muted-foreground">{i.d}</p>
          </div>
          <Switch
            checked={state[i.k] ?? i.on}
            onCheckedChange={(v) => {
              setState((p) => ({ ...p, [i.k]: v }));
              toast.success(`${i.t} ${v ? "enabled" : "disabled"}`);
            }}
          />
        </div>
      ))}
    </Card>
  );
}

function RBACSection() {
  const members = useMemo(() => generateMembers(), []);

  const ROLE_TONE_MAP: Record<string, "info" | "success" | "warning" | "error" | "critical"> = {
    admin: "error",
    engineer: "info",
    viewer: "success",
    analyst: "warning",
  };

  return (
    <Card title="Roles & Permissions" description={`${members.length} members in this workspace`}>
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="h-8 text-[10px] font-mono uppercase">Member</TableHead>
            <TableHead className="h-8 text-[10px] font-mono uppercase">Email</TableHead>
            <TableHead className="h-8 text-[10px] font-mono uppercase">Role</TableHead>
            <TableHead className="h-8 text-[10px] font-mono uppercase">Team</TableHead>
            <TableHead className="h-8 text-[10px] font-mono uppercase">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id} className="border-border text-xs">
              <TableCell className="py-2 font-medium">{m.name}</TableCell>
              <TableCell className="py-2 font-mono text-[11px] text-muted-foreground">{m.email}</TableCell>
              <TableCell className="py-2"><StatusBadge tone={ROLE_TONE_MAP[m.role] ?? "info"}>{m.role}</StatusBadge></TableCell>
              <TableCell className="py-2 text-[11px]">{m.team}</TableCell>
              <TableCell className="py-2"><StatusBadge tone={m.status === "active" ? "success" : m.status === "invited" ? "warning" : "error"}>{m.status}</StatusBadge></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
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
