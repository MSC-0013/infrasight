import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-9rBCoVTg.mjs";
import { T as Tabs, A as TabsList, C as TabsTrigger, z as TabsContent, ah as useAuthStore, y as StatusBadge, R as ROLE_LABEL, n as ROLE_TONE, I as Input, B as Button, a as Dialog, g as DialogTrigger, b as DialogContent, e as DialogHeader, f as DialogTitle, c as DialogDescription, d as DialogFooter, a2 as generateMembers, L as Label, F as cn, E as buttonVariants } from "./router-C7vl9p1Y.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-rQogMtfK.mjs";
import { R as Root2, P as Portal2, a as Content2, T as Title2, D as Description2, C as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { h as Check, r as Copy, a5 as Trash2, V as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zustand.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const Textarea = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      className: cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-card px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";
const Switch = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    className: cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    ),
    ...props,
    ref,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Thumb,
      {
        className: cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )
      }
    )
  }
));
Switch.displayName = Root.displayName;
const AlertDialog = Root2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const DEFAULT_KEYS = [{
  id: "k1",
  name: "ingest-prod",
  token: "pk_live_4d2f••••8a91",
  scope: "write",
  createdAt: "2026-04-12"
}, {
  id: "k2",
  name: "dashboard-ro",
  token: "pk_live_91ac••••22ef",
  scope: "read",
  createdAt: "2026-03-08"
}, {
  id: "k3",
  name: "ci-runner",
  token: "pk_live_77be••••0c1d",
  scope: "admin",
  createdAt: "2026-02-14"
}];
const DEFAULT_WEBHOOKS = [{
  id: "w1",
  url: "https://hooks.example.com/pulse",
  events: ["event.failed", "alert.triggered"],
  secret: "whsec_••••a91",
  enabled: true
}];
function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
function SettingsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { title: "Settings", description: "Configure account, organization, integrations and access." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "h-9", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "profile", className: "text-xs", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "organization", className: "text-xs", children: "Organization" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "api-keys", className: "text-xs", children: "API Keys" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "webhooks", className: "text-xs", children: "Webhooks" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "rbac", className: "text-xs", children: "RBAC" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "notifications", className: "text-xs", children: "Notifications" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "organization", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OrgSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-keys", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webhooks", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebhooksSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rbac", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RBACSection, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsSection, {}) })
    ] }) })
  ] });
}
function ProfileSection() {
  const user = useAuthStore((s) => s.user);
  const setRole = useAuthStore((s) => s.setRole);
  const [name, setName] = reactExports.useState(user?.name ?? "");
  const [email, setEmail] = reactExports.useState(user?.email ?? "");
  const [tz, setTz] = reactExports.useState("UTC");
  const [saving, setSaving] = reactExports.useState(false);
  const [dirty, setDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setDirty(true);
  }, [name, email, tz]);
  const save = async () => {
    if (!name.trim()) return toast.error("Name is required");
    if (!email.includes("@")) return toast.error("Enter a valid email");
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    setSaving(false);
    setDirty(false);
    toast.success("Profile updated");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Profile", description: "Your personal information", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 rounded-md border border-border bg-background p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-base font-semibold uppercase text-primary", children: user?.avatar ?? "—" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: user?.name ?? "Guest" }),
          user && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: ROLE_TONE[user.role], children: ROLE_LABEL[user.role] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-[11px] text-muted-foreground", children: user?.email })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value), className: "h-8 max-w-md text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), className: "h-8 max-w-md font-mono text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Timezone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: tz, onChange: (e) => setTz(e.target.value), className: "h-8 max-w-md font-mono text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Role (demo)", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: Object.keys(ROLE_LABEL).map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRole(r), className: `rounded border px-2.5 py-1 text-xs ${user?.role === r ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`, children: ROLE_LABEL[r] }, r)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
      dirty && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-warning", children: "Unsaved changes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", disabled: !dirty || saving, onClick: save, children: saving ? "Saving…" : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
        "Save changes"
      ] }) })
    ] })
  ] });
}
function OrgSection() {
  const [org, setOrg] = reactExports.useState({
    name: "Acme Production",
    slug: "acme-prod",
    region: "us-east-1",
    retention: "30"
  });
  const [saving, setSaving] = reactExports.useState(false);
  const save = async () => {
    if (!/^[a-z0-9-]+$/.test(org.slug)) return toast.error("Slug must be lowercase letters, numbers, hyphens");
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    setSaving(false);
    toast.success("Organization settings saved");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Organization", description: "Tenant-wide configuration", actions: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", disabled: saving, onClick: save, children: saving ? "Saving…" : "Save" }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: org.name, onChange: (e) => setOrg({
      ...org,
      name: e.target.value
    }), className: "h-8 max-w-md text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: org.slug, onChange: (e) => setOrg({
      ...org,
      slug: e.target.value
    }), className: "h-8 max-w-md font-mono text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data region", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: org.region, onChange: (e) => setOrg({
      ...org,
      region: e.target.value
    }), className: "h-8 max-w-md font-mono text-xs" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Retention (days)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: org.retention, onChange: (e) => setOrg({
      ...org,
      retention: e.target.value
    }), className: "h-8 max-w-md font-mono text-xs" }) })
  ] });
}
function ApiKeysSection() {
  const [keys, setKeys] = reactExports.useState(() => load("pulse-api-keys", DEFAULT_KEYS));
  const [open, setOpen] = reactExports.useState(false);
  const [newName, setNewName] = reactExports.useState("");
  const [newScope, setNewScope] = reactExports.useState("read");
  const [confirmId, setConfirmId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    localStorage.setItem("pulse-api-keys", JSON.stringify(keys));
  }, [keys]);
  const create = () => {
    if (!newName.trim()) return toast.error("Name is required");
    const token = `pk_live_${Math.random().toString(36).slice(2, 6)}••••${Math.random().toString(36).slice(2, 6)}`;
    const item = {
      id: Math.random().toString(36).slice(2, 8),
      name: newName.trim(),
      token,
      scope: newScope,
      createdAt: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
    };
    setKeys((prev) => [item, ...prev]);
    setOpen(false);
    setNewName("");
    setNewScope("read");
    toast.success("API key created", {
      description: token
    });
  };
  const remove = (id) => {
    const key = keys.find((k) => k.id === id);
    setKeys((prev) => prev.filter((k) => k.id !== id));
    setConfirmId(null);
    if (key) toast.success(`Revoked "${key.name}"`);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "API Keys", description: "Generate and revoke service keys", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
      "Create key"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create API key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "Keys are shown once. Store them securely." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: newName, onChange: (e) => setNewName(e.target.value), placeholder: "ingest-prod", className: "h-8 text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Scope", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: ["read", "write", "admin"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNewScope(s), className: `rounded border px-2.5 py-1 text-xs ${newScope === s ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground"}`, children: s }, s)) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-7 text-xs", onClick: () => setOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", onClick: create, children: "Create" })
      ] })
    ] })
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Token" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Scope" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
        keys.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 5, className: "py-6 text-center text-xs text-muted-foreground", children: "No API keys yet" }) }),
        keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-medium", children: k.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: k.token }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "info", dot: false, children: k.scope }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: k.createdAt }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "py-2 text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0 text-muted-foreground", onClick: () => {
              navigator.clipboard?.writeText(k.token);
              toast.success("Token copied");
            }, title: "Copy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0 text-muted-foreground hover:text-destructive", onClick: () => setConfirmId(k.id), title: "Revoke", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
          ] })
        ] }, k.id))
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!confirmId, onOpenChange: (o) => !o && setConfirmId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Revoke API key?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Any service using this key will immediately lose access. This action cannot be undone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "h-8 text-xs", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "h-8 bg-destructive text-xs text-destructive-foreground hover:bg-destructive/90", onClick: () => confirmId && remove(confirmId), children: "Revoke" })
      ] })
    ] }) })
  ] });
}
function WebhooksSection() {
  const [hooks, setHooks] = reactExports.useState(() => load("pulse-webhooks", DEFAULT_WEBHOOKS));
  const [open, setOpen] = reactExports.useState(false);
  const [url, setUrl] = reactExports.useState("");
  const [events, setEvents] = reactExports.useState("event.failed\nalert.triggered");
  const [confirmId, setConfirmId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    localStorage.setItem("pulse-webhooks", JSON.stringify(hooks));
  }, [hooks]);
  const create = () => {
    try {
      new URL(url);
    } catch {
      return toast.error("Enter a valid URL");
    }
    const item = {
      id: Math.random().toString(36).slice(2, 8),
      url,
      events: events.split("\n").map((s) => s.trim()).filter(Boolean),
      secret: `whsec_${Math.random().toString(36).slice(2, 10)}`,
      enabled: true
    };
    setHooks((prev) => [item, ...prev]);
    setOpen(false);
    setUrl("");
    setEvents("event.failed\nalert.triggered");
    toast.success("Webhook created");
  };
  const toggle = (id) => {
    setHooks((prev) => prev.map((h) => h.id === id ? {
      ...h,
      enabled: !h.enabled
    } : h));
  };
  const remove = (id) => {
    setHooks((prev) => prev.filter((h) => h.id !== id));
    setConfirmId(null);
    toast.success("Webhook deleted");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Webhooks", description: "Forward events to external endpoints", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
      "Add webhook"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add webhook" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "We'll POST a JSON payload to your endpoint for matching events." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endpoint URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://hooks.example.com/pulse", className: "h-8 font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Events (one per line)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: events, onChange: (e) => setEvents(e.target.value), className: "font-mono text-xs", rows: 4 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-7 text-xs", onClick: () => setOpen(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", onClick: create, children: "Create" })
      ] })
    ] })
  ] }), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      hooks.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-6 text-center text-xs text-muted-foreground", children: "No webhooks configured yet" }),
      hooks.map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-border bg-background p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate font-mono text-xs", children: h.url }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-[11px] text-muted-foreground", children: [
            "Secret: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: h.secret }),
            " · ",
            h.events.length,
            " event",
            h.events.length !== 1 ? "s" : ""
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 flex flex-wrap gap-1", children: h.events.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground", children: e }, e)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: h.enabled, onCheckedChange: () => toggle(h.id) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive", onClick: () => setConfirmId(h.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3" }) })
        ] })
      ] }) }, h.id))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!confirmId, onOpenChange: (o) => !o && setConfirmId(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete webhook?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "Events will no longer be forwarded to this endpoint." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { className: "h-8 text-xs", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { className: "h-8 bg-destructive text-xs text-destructive-foreground hover:bg-destructive/90", onClick: () => confirmId && remove(confirmId), children: "Delete" })
      ] })
    ] }) })
  ] });
}
function NotificationsSection() {
  const items = [{
    k: "critical",
    t: "Critical alerts",
    d: "Page on-call immediately",
    on: true
  }, {
    k: "offline",
    t: "Worker offline",
    d: "Send to Slack #ops",
    on: true
  }, {
    k: "digest",
    t: "Daily digest",
    d: "8am UTC summary email",
    on: false
  }, {
    k: "ml",
    t: "Weekly ML insights",
    d: "Monday 9am UTC",
    on: true
  }];
  const [state, setState] = reactExports.useState(() => load("pulse-notifications", Object.fromEntries(items.map((i) => [i.k, i.on]))));
  reactExports.useEffect(() => {
    localStorage.setItem("pulse-notifications", JSON.stringify(state));
  }, [state]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Notification preferences", children: items.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border py-2 last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: i.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: i.d })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: state[i.k] ?? i.on, onCheckedChange: (v) => {
      setState((p) => ({
        ...p,
        [i.k]: v
      }));
      toast.success(`${i.t} ${v ? "enabled" : "disabled"}`);
    } })
  ] }, i.k)) });
}
function RBACSection() {
  const members = reactExports.useMemo(() => generateMembers(), []);
  const ROLE_TONE_MAP = {
    admin: "error",
    engineer: "info",
    viewer: "success",
    analyst: "warning"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Roles & Permissions", description: `${members.length} members in this workspace`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Member" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Role" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Status" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: members.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-medium", children: m.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: m.email }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: ROLE_TONE_MAP[m.role] ?? "info", children: m.role }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 text-[11px]", children: m.team }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: m.status === "active" ? "success" : m.status === "invited" ? "warning" : "error", children: m.status }) })
    ] }, m.id)) })
  ] }) });
}
function Card({
  title,
  description,
  children,
  actions
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between border-b border-border px-4 py-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold", children: title }),
        description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-xs text-muted-foreground", children: description })
      ] }),
      actions
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 p-4", children })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground", children: label }),
    children
  ] });
}
export {
  SettingsPage as component
};
