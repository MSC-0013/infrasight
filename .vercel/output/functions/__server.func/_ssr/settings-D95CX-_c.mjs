import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./page-header-3cZY55Gm.mjs";
import { T as Tabs, n as TabsList, o as TabsTrigger, m as TabsContent, l as StatusBadge, p as cn } from "./router-F21aWjaR.mjs";
import { B as Button } from "./button-DweqyZIN.mjs";
import { I as Input } from "./input-f80pHA3R.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { R as Root, T as Thumb } from "../_libs/radix-ui__react-switch.mjs";
import { T as Table, d as TableHeader, e as TableRow, c as TableHead, a as TableBody, b as TableCell } from "./table-BwJtVeP2.mjs";
import "../_libs/sonner.mjs";
import { q as Copy, S as Plus } from "../_libs/lucide-react.mjs";
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
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = Root$1.displayName;
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
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Profile", description: "Your personal information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "Sam Engineer", className: "h-8 max-w-md text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "sam@pulse.io", className: "h-8 max-w-md font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Timezone", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "UTC", className: "h-8 max-w-md font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", children: "Save changes" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "organization", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Organization", description: "Tenant-wide configuration", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "Acme Production", className: "h-8 max-w-md text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Slug", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "acme-prod", className: "h-8 max-w-md font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Data region", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "us-east-1", className: "h-8 max-w-md font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Retention (days)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "30", className: "h-8 max-w-md font-mono text-xs" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-keys", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "API Keys", description: "Generate and revoke service keys", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
        "Create key"
      ] }), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Token" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Scope" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Created" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [["ingest-prod", "pk_live_4d2f••••8a91", "write"], ["dashboard-ro", "pk_live_91ac••••22ef", "read"], ["ci-runner", "pk_live_77be••••0c1d", "admin"]].map(([n, t, s]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-medium", children: n }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "info", dot: false, children: s }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: "2026-04-12" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", className: "h-6 w-6 p-0 text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }) }) })
        ] }, n)) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webhooks", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { title: "Webhooks", description: "Forward events to external endpoints", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "h-7 gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-3 w-3" }),
        "Add webhook"
      ] }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Endpoint URL", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "https://hooks.example.com/pulse", className: "h-8 max-w-md font-mono text-xs" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Events", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { defaultValue: "event.failed\nalert.triggered\nqueue.dlq", className: "max-w-md font-mono text-xs", rows: 4 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Secret", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "whsec_••••••", className: "h-8 max-w-md font-mono text-xs" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rbac", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Roles & Permissions", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border hover:bg-transparent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Member" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "h-8 text-[10px] font-mono uppercase", children: "Last active" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: [["Sam Engineer", "admin", "1m ago"], ["Riley Ops", "developer", "12m ago"], ["Jordan SRE", "viewer", "2h ago"]].map(([m, r, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "border-border text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-medium", children: m }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: "info", dot: false, children: r }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "py-2 font-mono text-[11px] text-muted-foreground", children: l })
        ] }, m)) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "notifications", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Notification preferences", children: [["Critical alerts", "Page on-call immediately", true], ["Worker offline", "Send to Slack #ops", true], ["Daily digest", "8am UTC summary email", false], ["Weekly ML insights", "Monday 9am UTC", true]].map(([t, d, on]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border py-2 last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: d })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: on })
      ] }, t)) }) })
    ] }) })
  ] });
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
