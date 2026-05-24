import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { b as createRouter, d as useRouter, a as createRootRoute, c as createFileRoute, l as lazyRouteComponent, H as HeadContent, S as Scripts, e as useRouterState, O as Outlet, L as Link, u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { T as Toaster$1, t as toast } from "../_libs/sonner.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { e as SubTrigger2, d as SubContent2, P as Portal2, a as Content2, I as Item2, C as CheckboxItem2, b as ItemIndicator2, R as RadioItem2, L as Label2, S as Separator2, c as Root2, T as Trigger$1 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { P as Portal, C as Content2$1, R as Root2$2, T as Trigger$2 } from "../_libs/radix-ui__react-popover.mjs";
import { O as Overlay, P as Portal$1, a as Content, C as Close, T as Title, D as Description, R as Root$1, b as Trigger$3 } from "../_libs/radix-ui__react-dialog.mjs";
import { R as Root } from "../_libs/radix-ui__react-label.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { _ as _e } from "../_libs/cmdk.mjs";
import { L as List, T as Trigger, C as Content$1, R as Root2$1 } from "../_libs/radix-ui__react-tabs.mjs";
import { k as ChevronRight, h as Check, o as Circle, ad as X, a0 as Search, A as Activity, n as ChevronsRight, m as ChevronsLeft, z as LayoutDashboard, Q as Network, ac as Workflow, F as FileText, C as ChartBar, v as Flame, e as Boxes, y as Grid3x2, L as Layers, s as Cpu, G as GitBranch, R as OctagonAlert, B as Bell, a3 as Sparkles, a2 as ShieldCheck, f as Building2, a1 as Settings, i as ChevronDown, P as Moon, a4 as Sun, a9 as User, M as LogOut, K as KeyRound, ab as Users, x as Globe, S as Pause, U as Play, r as Copy, X as Rocket, a8 as TriangleAlert, E as ExternalLink, O as MessageSquare, p as Clock } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  realtimeConnected: true,
  setRealtimeConnected: (v) => set({ realtimeConnected: v }),
  organization: "acme-prod",
  setOrganization: (v) => set({ organization: v }),
  environment: "prod",
  setEnvironment: (v) => set({ environment: v })
}));
const PERMISSIONS = {
  super_admin: ["*"],
  admin: [
    "view:*",
    "manage:users",
    "manage:org",
    "manage:billing",
    "manage:settings",
    "manage:incidents",
    "manage:deployments",
    "manage:alerts",
    "manage:api_keys"
  ],
  sre: [
    "view:*",
    "manage:incidents",
    "manage:alerts",
    "manage:deployments",
    "manage:queues",
    "manage:workers"
  ],
  developer: [
    "view:dashboard",
    "view:events",
    "view:traces",
    "view:logs",
    "view:services",
    "view:topology",
    "view:analytics",
    "view:api",
    "view:queues",
    "view:workers",
    "view:deployments",
    "view:mlops",
    "view:alerts",
    "view:incidents",
    "view:slos",
    "view:heatmaps",
    "manage:incidents"
  ],
  viewer: [
    "view:dashboard",
    "view:events",
    "view:traces",
    "view:logs",
    "view:services",
    "view:topology",
    "view:analytics",
    "view:api",
    "view:queues",
    "view:workers",
    "view:alerts",
    "view:incidents",
    "view:slos",
    "view:heatmaps"
  ]
};
const DEMO_ACCOUNTS = {
  "admin@pulse.io": { password: "admin123", role: "super_admin", name: "Alex Chen", avatar: "AC" },
  "ops@pulse.io": { password: "ops123", role: "admin", name: "Jordan Park", avatar: "JP" },
  "sre@pulse.io": { password: "sre123", role: "sre", name: "Priya Sharma", avatar: "PS" },
  "dev@pulse.io": { password: "dev123", role: "developer", name: "Sam Engineer", avatar: "SE" },
  "viewer@pulse.io": { password: "viewer123", role: "viewer", name: "Mia Analyst", avatar: "MA" }
};
const useAuthStore = create()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      signIn: (email, opts) => {
        const demo = DEMO_ACCOUNTS[email];
        const role = opts?.role ?? demo?.role ?? "viewer";
        const name = opts?.name ?? demo?.name ?? email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase());
        const avatar = demo?.avatar ?? name.slice(0, 2).toUpperCase();
        set({
          isAuthenticated: true,
          user: {
            id: "usr_" + Math.random().toString(36).slice(2, 8),
            name,
            email,
            avatar,
            role
          }
        });
      },
      signOut: () => set({ isAuthenticated: false, user: null }),
      setRole: (role) => {
        const u = get().user;
        if (u) set({ user: { ...u, role } });
      },
      can: (perm) => {
        const u = get().user;
        if (!u) return false;
        const grants = PERMISSIONS[u.role];
        if (grants.includes("*")) return true;
        if (grants.includes(perm)) return true;
        const [verb] = perm.split(":");
        return grants.includes(`${verb}:*`);
      }
    }),
    { name: "pulse-auth" }
  )
);
const ROLE_LABEL = {
  super_admin: "Super Admin",
  admin: "Admin",
  sre: "SRE",
  developer: "Developer",
  viewer: "Viewer"
};
const ROLE_TONE = {
  super_admin: "critical",
  admin: "error",
  sre: "warning",
  developer: "info",
  viewer: "success"
};
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const SECTIONS = [
  {
    label: "Overview",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true, perm: "view:dashboard" },
      { to: "/topology", label: "Topology", icon: Network, perm: "view:topology" },
      { to: "/services", label: "Service Health", icon: Activity, perm: "view:services" }
    ]
  },
  {
    label: "Observability",
    items: [
      { to: "/events", label: "Events", icon: Search, perm: "view:events" },
      { to: "/traces", label: "Traces", icon: Workflow, perm: "view:traces" },
      { to: "/logs", label: "Logs", icon: FileText, perm: "view:logs" },
      { to: "/analytics", label: "Analytics", icon: ChartBar, perm: "view:analytics" },
      { to: "/slos", label: "SLOs & Budgets", icon: Flame, perm: "view:slos" },
      { to: "/api", label: "API Monitoring", icon: Boxes, perm: "view:api" },
      { to: "/heatmaps", label: "Heatmaps", icon: Grid3x2, perm: "view:heatmaps" }
    ]
  },
  {
    label: "Infrastructure",
    items: [
      { to: "/queues", label: "Queues", icon: Layers, perm: "view:queues" },
      { to: "/workers", label: "Workers", icon: Cpu, perm: "view:workers" },
      { to: "/deployments", label: "Deployments", icon: GitBranch, perm: "view:deployments" }
    ]
  },
  {
    label: "Operations",
    items: [
      { to: "/incidents", label: "Incidents", icon: OctagonAlert, perm: "view:incidents" },
      { to: "/alerts", label: "Alerts", icon: Bell, perm: "view:alerts" },
      { to: "/mlops", label: "MLOps", icon: Sparkles, perm: "view:mlops" },
      { to: "/audit", label: "Audit log", icon: ShieldCheck, perm: "manage:org" }
    ]
  },
  {
    label: "Admin",
    items: [
      { to: "/organizations", label: "Organizations", icon: Building2, perm: "manage:org" },
      { to: "/settings", label: "Settings", icon: Settings, perm: "manage:settings" }
    ]
  }
];
function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useUIStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const can = useAuthStore((s) => s.can);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "aside",
    {
      className: cn(
        "sticky top-0 h-screen shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-out",
        sidebarCollapsed ? "w-14" : "w-60"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 items-center justify-between border-b border-sidebar-border px-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/dashboard", className: "flex items-center gap-2 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-3.5 w-3.5", strokeWidth: 2.5 }) }),
            !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-sm font-semibold tracking-tight", children: "Pulse" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: toggleSidebar, className: "text-muted-foreground hover:text-foreground", "aria-label": "Toggle sidebar", children: sidebarCollapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsRight, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsLeft, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "thin-scrollbar flex h-[calc(100vh-3rem)] flex-col gap-3 overflow-y-auto px-2 py-3 pb-20", children: SECTIONS.map((section) => {
          const visible = section.items.filter((i) => can(i.perm));
          if (visible.length === 0) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-0.5", children: [
            !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 pb-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70", children: section.label }),
            visible.map((item) => {
              const active = item.exact ? pathname === item.to : pathname === item.to || pathname.startsWith(item.to + "/");
              const Icon = item.icon;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: item.to,
                  className: cn(
                    "group flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors",
                    active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  ),
                  title: sidebarCollapsed ? item.label : void 0,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4 shrink-0", active && "text-primary"), strokeWidth: 2 }),
                    !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: item.label }),
                    active && !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto h-1.5 w-1.5 rounded-full bg-primary" })
                  ]
                },
                item.to
              );
            })
          ] }, section.label);
        }) }),
        !sidebarCollapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-x-0 bottom-0 border-t border-sidebar-border bg-sidebar p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-sidebar-border bg-sidebar-accent/40 p-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-muted-foreground", children: "Cluster region" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-xs", children: "us-east-1 · prod" })
        ] }) })
      ]
    }
  );
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger$1;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function RealtimeIndicator() {
  const { realtimeConnected } = useUIStore();
  const [tick, setTick] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const id2 = setInterval(() => setTick((t) => t + 1), 2e3);
    return () => clearInterval(id2);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2 py-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "h-1.5 w-1.5 rounded-full",
          realtimeConnected ? "bg-success pulse-dot" : "bg-muted-foreground"
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase tracking-wider text-muted-foreground", children: realtimeConnected ? "live" : "offline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden font-mono text-[10px] text-muted-foreground/70 md:inline", children: [
      "· ",
      (800 + tick * 37 % 240).toFixed(0),
      " ev/s"
    ] }, tick)
  ] });
}
const Popover = Root2$2;
const PopoverTrigger = Trigger$2;
const PopoverContent = reactExports.forwardRef(({ className, align = "center", sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    align,
    sideOffset,
    className: cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-popover-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
PopoverContent.displayName = Content2$1.displayName;
const EVENT_TYPES = [
  "user.signup",
  "order.created",
  "payment.processed",
  "email.sent",
  "webhook.delivered",
  "job.completed",
  "auth.login",
  "subscription.renewed",
  "file.uploaded",
  "ml.prediction",
  "alert.triggered",
  "session.expired"
];
const ORGS = ["acme-prod", "stripe-eu", "vercel-internal", "linear-app", "notion-co"];
const QUEUES = ["events.high", "events.low", "webhooks", "ml.jobs", "emails", "billing"];
const WORKERS_NAMES = [
  "worker-us-east-1a",
  "worker-us-east-1b",
  "worker-us-west-2a",
  "worker-eu-west-1a",
  "worker-eu-west-1b",
  "worker-ap-south-1a",
  "worker-ap-south-1b",
  "worker-sa-east-1a"
];
const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-south-1", "sa-east-1"];
const SERVICES = [
  "api-gateway",
  "auth-service",
  "event-service",
  "analytics-service",
  "worker-service",
  "ml-service",
  "postgres-primary",
  "redis-cluster"
];
let rnd = 1;
function r() {
  rnd = (rnd * 9301 + 49297) % 233280;
  return rnd / 233280;
}
const pick = (arr) => arr[Math.floor(r() * arr.length)];
const between = (min, max) => min + r() * (max - min);
const id = () => Math.random().toString(36).slice(2, 10);
function generateEvents(count = 80) {
  const now = Date.now();
  return Array.from({ length: count }, (_, i) => {
    const eventType = pick(EVENT_TYPES);
    const status = r() > 0.85 ? "failed" : r() > 0.92 ? "retrying" : "success";
    const severity = status === "failed" ? r() > 0.6 ? "error" : "critical" : r() > 0.85 ? "warning" : "info";
    return {
      id: id(),
      timestamp: new Date(now - i * 1500 - r() * 1e3).toISOString(),
      eventType,
      organization: pick(ORGS),
      status,
      queue: pick(QUEUES),
      worker: pick(WORKERS_NAMES),
      latencyMs: Math.round(between(8, 480)),
      retries: status === "retrying" ? Math.floor(between(1, 5)) : 0,
      severity,
      traceId: id() + id(),
      payload: {
        userId: `usr_${id()}`,
        requestId: `req_${id()}`,
        meta: { source: "api", ip: `10.0.${Math.floor(between(0, 255))}.${Math.floor(between(0, 255))}` },
        data: { type: eventType, value: Math.round(between(1, 9999)) }
      }
    };
  });
}
function generateAlerts(count = 14) {
  const titles = [
    "API latency spike detected",
    "Queue overflow on events.high",
    "Worker offline: worker-eu-west-1b",
    "Database connection pool saturated",
    "ML anomaly: unusual event volume",
    "Memory pressure on worker-us-east-1a",
    "DLQ growing: webhooks queue",
    "Authentication failures elevated",
    "Disk usage above 85%",
    "Replica lag exceeds 5s"
  ];
  return Array.from({ length: count }, (_, i) => {
    const sev = ["info", "warning", "error", "critical"][Math.floor(r() * 4)];
    return {
      id: id(),
      title: pick(titles),
      description: "Threshold exceeded for the configured time window. Investigate dependent services and recent deploys.",
      severity: sev,
      source: pick(SERVICES),
      service: pick(SERVICES),
      timestamp: new Date(Date.now() - i * 36e4 - r() * 6e4).toISOString(),
      acknowledged: r() > 0.7
    };
  });
}
function generateWorkers() {
  const POOLS = ["events-primary", "events-overflow", "ml-inference", "webhooks"];
  return WORKERS_NAMES.map((name, i) => {
    const status = i === 4 ? "offline" : i === 2 ? "degraded" : "online";
    return {
      id: id(),
      name,
      status,
      region: pick(REGIONS),
      pool: pick(POOLS),
      version: `v2.${Math.floor(between(8, 14))}.${Math.floor(between(0, 24))}`,
      cpu: Math.round(between(12, 92)),
      memory: Math.round(between(28, 88)),
      jobsProcessed: Math.floor(between(12e3, 48e4)),
      retries: Math.floor(between(0, 240)),
      uptimeHours: Math.round(between(2, 720)),
      lastHeartbeat: new Date(Date.now() - between(1e3, 6e4)).toISOString(),
      assignedQueues: [pick(QUEUES), pick(QUEUES)],
      heartbeats: Array.from({ length: 30 }, () => status === "offline" ? 0 : Math.round(between(40, 100)))
    };
  });
}
function generateQueues() {
  return QUEUES.map((name) => {
    const msgs = Math.floor(between(80, 14e3));
    const status = msgs > 9e3 ? "backlogged" : msgs > 5e3 ? "degraded" : "healthy";
    return {
      id: id(),
      name,
      messages: msgs,
      consumers: Math.floor(between(1, 12)),
      retries: Math.floor(between(0, 320)),
      dlq: Math.floor(between(0, 180)),
      lagMs: Math.floor(between(20, 4800)),
      throughput: Math.floor(between(40, 2200)),
      status
    };
  });
}
function generateOrganizations() {
  return ORGS.map((slug) => ({
    id: id(),
    slug,
    name: slug.split("-").map((s) => s[0].toUpperCase() + s.slice(1)).join(" "),
    plan: r() > 0.6 ? "enterprise" : r() > 0.3 ? "pro" : "free"
  }));
}
function generateMLInsights() {
  const items = [
    { title: "Anomalous traffic on events.high", type: "anomaly", description: "Volume 4.2σ above baseline for last 12 minutes." },
    { title: "Predicted DLQ overflow within 45m", type: "prediction", description: "Current ingestion rate exceeds drain rate by 18%." },
    { title: "Daily summary: 14.3M events processed", type: "summary", description: "P95 latency improved 8% week-over-week." },
    { title: "Suspected worker degradation in eu-west-1", type: "anomaly", description: "Job duration drift +220ms compared to fleet median." },
    { title: "Forecast: error rate to spike around 18:00 UTC", type: "prediction", description: "Pattern matches prior deploy-window incidents." },
    { title: "Weekly digest: top 5 noisy endpoints", type: "summary", description: "/api/v1/sync accounts for 38% of retries." }
  ];
  return items.map((x, i) => ({
    id: id(),
    title: x.title,
    type: x.type,
    description: x.description,
    confidence: Math.round(between(72, 98)),
    timestamp: new Date(Date.now() - i * 18e5).toISOString(),
    service: pick(SERVICES)
  }));
}
function generateApiEndpoints() {
  const paths = [
    ["POST", "/api/v1/events"],
    ["GET", "/api/v1/events"],
    ["POST", "/api/v1/ingest"],
    ["GET", "/api/v1/queues"],
    ["GET", "/api/v1/workers"],
    ["POST", "/api/v1/alerts/ack"],
    ["GET", "/api/v1/orgs"],
    ["PUT", "/api/v1/orgs/:id"],
    ["POST", "/api/v1/auth/login"],
    ["GET", "/api/v1/me"]
  ];
  return paths.map(([method, path]) => ({
    method,
    path,
    p50: Math.round(between(8, 90)),
    p95: Math.round(between(80, 380)),
    p99: Math.round(between(220, 980)),
    rps: Math.round(between(12, 2400)),
    errorRate: +between(0.01, 3.2).toFixed(2)
  }));
}
function generateTimeSeries(points = 30, base = 100, jitter = 30) {
  return Array.from({ length: points }, (_, i) => ({
    t: i,
    label: `${points - i}m`,
    value: Math.max(0, Math.round(base + Math.sin(i / 3) * jitter + (r() - 0.5) * jitter))
  }));
}
function generateThroughputSeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    t: new Date(Date.now() - (points - i) * 6e4).toISOString(),
    label: `${points - i}m`,
    success: Math.round(800 + Math.sin(i / 4) * 200 + r() * 120),
    failed: Math.round(20 + Math.cos(i / 5) * 12 + r() * 14)
  }));
}
function generateLatencySeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    label: `${points - i}m`,
    p50: Math.round(40 + Math.sin(i / 5) * 12 + r() * 8),
    p95: Math.round(140 + Math.sin(i / 4) * 30 + r() * 24),
    p99: Math.round(280 + Math.cos(i / 3) * 60 + r() * 48)
  }));
}
function generateQueueLagSeries(points = 60) {
  return Array.from({ length: points }, (_, i) => ({
    label: `${points - i}m`,
    lag: Math.round(400 + Math.sin(i / 6) * 200 + r() * 150)
  }));
}
function generateEventDistribution() {
  return EVENT_TYPES.slice(0, 6).map((name) => ({
    name,
    value: Math.round(between(200, 4200))
  }));
}
const TRACE_SERVICE_CHAIN = [
  ["api-gateway", "POST /v1/events", "server"],
  ["auth-service", "verify_token", "internal"],
  ["event-service", "validate_event", "internal"],
  ["redis-cluster", "rate_limit.check", "client"],
  ["event-service", "enqueue", "producer"],
  ["worker-service", "consume", "consumer"],
  ["ml-service", "predict", "client"],
  ["postgres-primary", "INSERT events", "client"],
  ["analytics-service", "rollup", "internal"]
];
function generateTraces(count = 40) {
  return Array.from({ length: count }, (_, i) => {
    const errCount = r() > 0.8 ? Math.floor(between(1, 4)) : 0;
    const status = errCount > 1 ? "error" : errCount === 1 ? "degraded" : "ok";
    const duration = Math.round(between(40, 2400));
    const root = TRACE_SERVICE_CHAIN[0];
    return {
      id: id() + id(),
      rootOperation: root[1],
      rootService: root[0],
      startedAt: new Date(Date.now() - i * 4200 - r() * 1e3).toISOString(),
      durationMs: duration,
      spanCount: TRACE_SERVICE_CHAIN.length,
      errorCount: errCount,
      services: Array.from(new Set(TRACE_SERVICE_CHAIN.map((s) => s[0]))),
      status
    };
  });
}
function generateSpansForTrace(traceId, totalMs = 800) {
  const spans = [];
  let cursor = 0;
  let parentId = null;
  TRACE_SERVICE_CHAIN.forEach(([service, operation, kind], i) => {
    const dur = Math.max(
      4,
      Math.round(totalMs / TRACE_SERVICE_CHAIN.length * (0.4 + r() * 1.4))
    );
    const start = i === 0 ? 0 : cursor + Math.round(between(0, 12));
    cursor = start + dur;
    const spanId = id();
    spans.push({
      id: spanId,
      parentId: i === 0 ? null : parentId,
      traceId,
      service,
      operation,
      kind,
      startMs: start,
      durationMs: dur,
      status: i === TRACE_SERVICE_CHAIN.length - 2 && r() > 0.7 ? "error" : "ok",
      attributes: {
        "http.method": kind === "server" ? "POST" : "—",
        "net.peer.name": `${service}.internal`,
        "span.kind": kind,
        retry: i === 4 ? Math.floor(between(0, 2)) : 0
      }
    });
    if (i === 0) parentId = spanId;
  });
  return spans;
}
const LOG_TEMPLATES = [
  { level: "info", msg: "request handled status=200" },
  { level: "info", msg: "event enqueued queue=events.high" },
  { level: "debug", msg: "cache hit key=org:settings:acme-prod" },
  { level: "warn", msg: "retry attempt=2 backoff_ms=420" },
  { level: "error", msg: "db connection refused upstream=postgres-primary" },
  { level: "info", msg: "worker heartbeat received" },
  { level: "warn", msg: "queue depth above soft limit messages=8120" },
  { level: "error", msg: "ml inference timeout deadline_exceeded=true" },
  { level: "critical", msg: "circuit breaker tripped target=payments-api" },
  { level: "info", msg: "deploy webhook accepted version=v2.14.3" }
];
function generateLogs(count = 200) {
  return Array.from({ length: count }, (_, i) => {
    const t = pick(LOG_TEMPLATES);
    return {
      id: id(),
      timestamp: new Date(Date.now() - i * 800 - r() * 400).toISOString(),
      level: t.level,
      service: pick(SERVICES),
      message: t.msg,
      traceId: r() > 0.3 ? id() + id() : void 0,
      attrs: {
        region: pick(REGIONS),
        host: `${pick(SERVICES)}-${Math.floor(between(1, 9))}`,
        pid: Math.floor(between(1e3, 9999))
      }
    };
  });
}
function generateServices() {
  const defs = [
    { name: "api-gateway", deps: ["auth-service", "event-service"] },
    { name: "auth-service", deps: ["postgres-primary", "redis-cluster"] },
    { name: "event-service", deps: ["redis-cluster", "worker-service"] },
    { name: "analytics-service", deps: ["postgres-primary"] },
    { name: "worker-service", deps: ["postgres-primary", "ml-service"] },
    { name: "ml-service", deps: ["postgres-primary"] }
  ];
  return defs.map((d, i) => {
    const status = i === 4 ? "degraded" : i === 2 && r() > 0.6 ? "degraded" : "healthy";
    return {
      id: id(),
      name: d.name,
      status,
      uptimePct: +between(99.2, 99.99).toFixed(3),
      rps: Math.round(between(40, 3200)),
      p95Ms: Math.round(between(40, 420)),
      errorRate: +between(0.02, status === "degraded" ? 4.4 : 1.2).toFixed(2),
      cpu: Math.round(between(18, 84)),
      memory: Math.round(between(30, 82)),
      version: `v2.${Math.floor(between(8, 16))}.${Math.floor(between(0, 30))}`,
      region: pick(REGIONS),
      lastDeploy: new Date(Date.now() - between(36e5, 7 * 864e5)).toISOString(),
      dependsOn: d.deps
    };
  });
}
function generateIncidents() {
  const items = [
    {
      title: "Elevated 5xx on api-gateway",
      severity: "sev2",
      status: "monitoring",
      impactedServices: ["api-gateway", "event-service"],
      rootCause: "Connection pool exhaustion after deploy v2.14.3 increased per-request DB allocation."
    },
    {
      title: "events.high queue backlog",
      severity: "sev1",
      status: "investigating",
      impactedServices: ["event-service", "worker-service"]
    },
    {
      title: "ml-service drift threshold exceeded",
      severity: "sev3",
      status: "identified",
      impactedServices: ["ml-service"],
      rootCause: "Input feature distribution shift on `user.country`."
    },
    {
      title: "Replica lag in eu-west-1",
      severity: "sev4",
      status: "resolved",
      impactedServices: ["postgres-primary"]
    }
  ];
  return items.map((x, i) => {
    const openedAt = new Date(Date.now() - (i + 1) * 36e5 * (2 + r() * 6));
    const updates = [
      { at: openedAt.toISOString(), status: "investigating", author: "on-call", message: "Incident opened. Paging primary." },
      { at: new Date(openedAt.getTime() + 12 * 6e4).toISOString(), status: "identified", author: "ana@pulse.io", message: "Identified suspected commit window." },
      { at: new Date(openedAt.getTime() + 28 * 6e4).toISOString(), status: "monitoring", author: "ana@pulse.io", message: "Mitigation rolled out, watching error rate." }
    ];
    if (x.status === "resolved") {
      updates.push({ at: new Date(openedAt.getTime() + 55 * 6e4).toISOString(), status: "resolved", author: "ana@pulse.io", message: "Resolved. Postmortem scheduled." });
    }
    return {
      id: "INC-" + (1e3 + i),
      title: x.title,
      severity: x.severity,
      status: x.status,
      openedAt: openedAt.toISOString(),
      resolvedAt: x.status === "resolved" ? updates[updates.length - 1].at : void 0,
      impactedServices: x.impactedServices,
      acknowledgedBy: "ana@pulse.io",
      rootCause: x.rootCause,
      updates
    };
  });
}
function generateAuditLogs(count = 60) {
  const actions = [
    ["created", "api_key"],
    ["revoked", "api_key"],
    ["updated", "rbac_role"],
    ["scaled", "worker_pool"],
    ["purged", "queue"],
    ["updated", "organization"],
    ["invited", "member"],
    ["rotated", "webhook_secret"],
    ["deployed", "service"]
  ];
  const actors = [
    ["Sam Engineer", "sam@pulse.io"],
    ["Ana Ops", "ana@pulse.io"],
    ["Priya SRE", "priya@pulse.io"],
    ["Leo Platform", "leo@pulse.io"]
  ];
  return Array.from({ length: count }, (_, i) => {
    const [action, entity] = pick(actions);
    const [name, email] = pick(actors);
    return {
      id: id(),
      timestamp: new Date(Date.now() - i * 54e4 - r() * 6e4).toISOString(),
      actor: name,
      actorEmail: email,
      action,
      entity,
      entityId: id(),
      metadata: { region: pick(REGIONS), ua: "pulse-cli/1.6" },
      ip: `10.0.${Math.floor(between(0, 255))}.${Math.floor(between(0, 255))}`
    };
  });
}
function generateApiKeys() {
  const names = ["ci-deploy", "metrics-reader", "events-writer-prod", "ml-trainer", "webhook-relay"];
  return names.map((n, i) => ({
    id: id(),
    name: n,
    prefix: `pk_live_${id().slice(0, 6)}`,
    createdAt: new Date(Date.now() - (i + 1) * 5 * 864e5).toISOString(),
    lastUsed: new Date(Date.now() - r() * 36e5).toISOString(),
    expiresAt: i === 1 ? null : new Date(Date.now() + (60 + i * 30) * 864e5).toISOString(),
    permissions: i === 0 ? ["deploy:write", "service:read"] : i === 1 ? ["metrics:read"] : ["events:write", "events:read"],
    requests24h: Math.floor(between(1200, 48e4)),
    status: i === 4 ? "revoked" : "active"
  }));
}
function generateMembers() {
  const ppl = [
    ["Sam Engineer", "sam@pulse.io", "admin", "platform"],
    ["Ana Ops", "ana@pulse.io", "engineer", "sre"],
    ["Priya SRE", "priya@pulse.io", "engineer", "sre"],
    ["Leo Platform", "leo@pulse.io", "admin", "platform"],
    ["Mia Analyst", "mia@pulse.io", "analyst", "data"],
    ["Owen Viewer", "owen@pulse.io", "viewer", "product"],
    ["Tess Eng", "tess@pulse.io", "engineer", "growth"]
  ];
  return ppl.map(([name, email, role, team], i) => ({
    id: id(),
    name,
    email,
    role,
    team,
    lastActive: new Date(Date.now() - i * 36e5 - r() * 6e5).toISOString(),
    status: i === 6 ? "invited" : "active"
  }));
}
function generateDeployments(count = 18) {
  const services = ["api-gateway", "event-service", "worker-service", "ml-service", "analytics-service"];
  const authors = ["sam@pulse.io", "ana@pulse.io", "priya@pulse.io", "leo@pulse.io"];
  return Array.from({ length: count }, (_, i) => {
    const started = new Date(Date.now() - i * 36e5 - r() * 6e5);
    const dur = Math.floor(between(6e4, 28e4));
    const status = i === 0 ? "in_progress" : i === 3 ? "rolled_back" : r() > 0.92 ? "failed" : "succeeded";
    return {
      id: id(),
      service: pick(services),
      version: `v2.${Math.floor(between(8, 16))}.${Math.floor(between(0, 50))}`,
      commit: id().slice(0, 7),
      author: pick(authors),
      startedAt: started.toISOString(),
      finishedAt: new Date(started.getTime() + dur).toISOString(),
      status,
      environment: i % 5 === 0 ? "staging" : "prod"
    };
  });
}
function generateMLModels() {
  const names = ["anomaly-detector", "event-classifier", "latency-forecaster", "fraud-scorer"];
  return names.map((n, i) => ({
    id: id(),
    name: n,
    version: `${1 + i}.${Math.floor(between(0, 9))}.${Math.floor(between(0, 9))}`,
    status: i === 3 ? "shadow" : i === 0 ? "serving" : "serving",
    inferenceP95: Math.round(between(18, 240)),
    accuracy: +between(0.86, 0.98).toFixed(3),
    drift: +between(0.01, i === 2 ? 0.18 : 0.08).toFixed(3),
    confidence: +between(0.7, 0.96).toFixed(2),
    throughput: Math.floor(between(40, 1800)),
    deployedAt: new Date(Date.now() - (i + 1) * 864e5).toISOString()
  }));
}
function generateConfidenceDistribution() {
  return Array.from({ length: 10 }, (_, i) => ({
    bucket: `${i * 10}-${i * 10 + 10}%`,
    value: Math.round(between(20, 1200) * (i > 5 ? 2 : 1))
  }));
}
function generateTopology() {
  const nodes = [
    { id: "gw", label: "api-gateway", kind: "gateway", status: "healthy", x: 60, y: 200 },
    { id: "auth", label: "auth-service", kind: "service", status: "healthy", x: 240, y: 80 },
    { id: "evt", label: "event-service", kind: "service", status: "healthy", x: 240, y: 200 },
    { id: "ana", label: "analytics-service", kind: "service", status: "healthy", x: 240, y: 320 },
    { id: "q1", label: "events.high", kind: "queue", status: "degraded", x: 440, y: 160 },
    { id: "q2", label: "ml.jobs", kind: "queue", status: "healthy", x: 440, y: 280 },
    { id: "wrk", label: "worker-pool", kind: "worker", status: "healthy", x: 620, y: 160 },
    { id: "ml", label: "ml-service", kind: "ml", status: "degraded", x: 620, y: 280 },
    { id: "pg", label: "postgres-primary", kind: "db", status: "healthy", x: 820, y: 120 },
    { id: "rd", label: "redis-cluster", kind: "db", status: "healthy", x: 820, y: 240 }
  ];
  const edges = [
    { from: "gw", to: "auth", rps: 420, errorRate: 0.1 },
    { from: "gw", to: "evt", rps: 2100, errorRate: 0.3 },
    { from: "gw", to: "ana", rps: 180, errorRate: 0 },
    { from: "evt", to: "q1", rps: 1900, errorRate: 0 },
    { from: "evt", to: "q2", rps: 240, errorRate: 0 },
    { from: "q1", to: "wrk", rps: 1800, errorRate: 0.2 },
    { from: "q2", to: "ml", rps: 220, errorRate: 1.4 },
    { from: "wrk", to: "pg", rps: 1700, errorRate: 0.1 },
    { from: "ml", to: "pg", rps: 200, errorRate: 0 },
    { from: "auth", to: "rd", rps: 410, errorRate: 0 },
    { from: "evt", to: "rd", rps: 1900, errorRate: 0 }
  ];
  return { nodes, edges };
}
function generateNotifications() {
  const items = [
    { title: "INC-1001 opened", body: "Elevated 5xx on api-gateway", kind: "incident", severity: "critical" },
    { title: "Queue events.high backlog", body: "Depth 12.4k, drain rate -18%", kind: "queue", severity: "error" },
    { title: "Worker offline", body: "worker-eu-west-1b heartbeat lost", kind: "worker", severity: "error" },
    { title: "Deploy succeeded", body: "event-service v2.14.3 → prod", kind: "deploy", severity: "info" },
    { title: "Anomaly detected", body: "ML drift +0.18 on ml-service", kind: "alert", severity: "warning" },
    { title: "API key rotated", body: "ci-deploy by sam@pulse.io", kind: "alert", severity: "info" }
  ];
  return items.map((x, i) => ({
    ...x,
    id: id(),
    timestamp: new Date(Date.now() - i * 7 * 6e4 - r() * 6e4).toISOString(),
    read: i > 2
  }));
}
const ENVIRONMENTS = [
  { slug: "prod", label: "Production", color: "var(--color-success)", region: "us-east-1" },
  { slug: "staging", label: "Staging", color: "var(--color-warning)", region: "us-east-1" },
  { slug: "dev", label: "Development", color: "var(--color-info)", region: "us-east-1" },
  { slug: "preview", label: "Preview", color: "var(--color-muted-foreground)", region: "us-west-2" }
];
function generateSLOs() {
  const defs = [
    { name: "API Availability", service: "api-gateway", slis: [
      { name: "Availability", type: "availability", target: 99.99, current: 99.992, unit: "%" },
      { name: "p95 Latency", type: "latency", target: 200, current: 142, unit: "ms" }
    ] },
    { name: "Event Processing", service: "event-service", slis: [
      { name: "Availability", type: "availability", target: 99.95, current: 99.94, unit: "%" },
      { name: "Error Rate", type: "error_rate", target: 1, current: 1.24, unit: "%" }
    ] },
    { name: "Auth Latency", service: "auth-service", slis: [
      { name: "p99 Latency", type: "latency", target: 500, current: 380, unit: "ms" },
      { name: "Availability", type: "availability", target: 99.99, current: 99.998, unit: "%" }
    ] },
    { name: "ML Inference", service: "ml-service", slis: [
      { name: "p95 Inference", type: "latency", target: 300, current: 218, unit: "ms" },
      { name: "Accuracy", type: "throughput", target: 95, current: 91.2, unit: "%" }
    ] },
    { name: "Worker Throughput", service: "worker-service", slis: [
      { name: "Availability", type: "availability", target: 99.9, current: 99.85, unit: "%" },
      { name: "Throughput", type: "throughput", target: 2e3, current: 1840, unit: "rps" }
    ] }
  ];
  return defs.map((d) => {
    const breached = d.slis.some((s) => {
      if (s.type === "error_rate") return s.current > s.target;
      if (s.type === "latency") return s.current > s.target;
      return s.current < s.target;
    });
    const atRisk = !breached && d.slis.some((s) => {
      if (s.type === "availability") return s.current < s.target + 0.05;
      return false;
    });
    return {
      id: `slo_${id()}`,
      name: d.name,
      service: d.service,
      status: breached ? "breached" : atRisk ? "at_risk" : "healthy",
      budgetRemaining: breached ? Math.round(between(2, 15)) : atRisk ? Math.round(between(15, 40)) : Math.round(between(60, 98)),
      burnRate: breached ? +between(3, 14).toFixed(1) : atRisk ? +between(1, 3).toFixed(1) : +between(0.1, 0.8).toFixed(1),
      burnRateWindow: "1h",
      slis: d.slis,
      period: "30d"
    };
  });
}
function generateTimelineEvents(count = 30) {
  const now = Date.now();
  const items = [
    { type: "deploy", title: "event-service v2.14.3", description: "Deployed to prod", service: "event-service", severity: "info" },
    { type: "alert", title: "Queue depth spike", description: "events.high depth > 10k", service: "event-service", severity: "warning" },
    { type: "incident", title: "INC-1001 opened", description: "Elevated 5xx on api-gateway", service: "api-gateway", severity: "critical" },
    { type: "queue_spike", title: "events.high backlog", description: "Lag 4.2s, 12k messages", service: "event-service", severity: "error" },
    { type: "worker_restart", title: "worker-eu-west-1b restarted", description: "OOM kill, auto-recovered", severity: "warning" },
    { type: "config_change", title: "Rate limit updated", description: "api-gateway: 2000 to 2500 rps", service: "api-gateway", severity: "info" },
    { type: "slo_breach", title: "SLO at risk: Event Processing", description: "Budget remaining 18%", service: "event-service", severity: "error" },
    { type: "ai_anomaly", title: "Anomaly: latency drift", description: "worker-service +220ms above baseline", service: "worker-service", severity: "warning" },
    { type: "deploy", title: "auth-service v2.12.1", description: "Hotfix: token validation", service: "auth-service", severity: "info" },
    { type: "alert", title: "DLQ growing", description: "webhooks queue DLQ > 100", service: "event-service", severity: "warning" }
  ];
  return items.slice(0, count).map((x, i) => ({
    ...x,
    id: id(),
    timestamp: new Date(now - i * (12e4 + Math.floor(r() * 48e4))).toISOString(),
    link: x.service ? { kind: "event", id: id(), title: x.title } : void 0
  }));
}
function generateLatencyHeatmap() {
  const services = ["api-gateway", "auth-service", "event-service", "worker-service", "ml-service", "analytics-service"];
  const cells = [];
  for (let h = 0; h < 24; h++) {
    for (let s = 0; s < services.length; s++) {
      const isPeak = h >= 9 && h <= 17;
      cells.push({ x: h, y: s, value: Math.round(isPeak ? between(120, 480) : between(30, 180)), label: `${h}:00` });
    }
  }
  return { title: "Latency Heatmap", xLabel: "Hour", yLabel: "Service", cells, maxValue: 500 };
}
function generateEndpointHeatmap() {
  const endpoints = ["/v1/events", "/v1/ingest", "/v1/auth", "/v1/queues", "/v1/workers", "/v1/me"];
  const codes = ["200", "400", "401", "404", "500", "503"];
  const cells = [];
  for (let e = 0; e < endpoints.length; e++) {
    for (let c = 0; c < codes.length; c++) {
      const isError = parseInt(codes[c]) >= 400;
      cells.push({ x: e, y: c, value: Math.round(isError ? between(0, 80) : between(200, 4e3)) });
    }
  }
  return { title: "Endpoint x Status Code", xLabel: "Endpoint", yLabel: "Status", cells, maxValue: 4e3 };
}
function generateServiceDependencyHeatmap() {
  const svcs = ["api-gw", "auth", "events", "worker", "ml", "postgres"];
  const cells = [];
  for (let a = 0; a < svcs.length; a++) {
    for (let b = 0; b < svcs.length; b++) {
      cells.push({ x: a, y: b, value: a === b ? 0 : r() > 0.6 ? Math.round(between(50, 800)) : Math.round(between(0, 20)) });
    }
  }
  return { title: "Service Dependency RPS", xLabel: "Downstream", yLabel: "Upstream", cells, maxValue: 800 };
}
function generateSearchIndex() {
  const items = [];
  generateTraces(20).forEach((t) => items.push({ kind: "trace", id: t.id, title: t.rootOperation, subtitle: `${t.rootService} · ${t.durationMs}ms`, route: `/traces/${t.id}`, tone: t.status === "error" ? "error" : t.status === "degraded" ? "warning" : "success" }));
  generateIncidents().forEach((i) => items.push({ kind: "incident", id: i.id, title: i.title, subtitle: i.severity, route: `/incidents/${i.id}`, tone: i.severity === "sev1" ? "critical" : i.severity === "sev2" ? "error" : "warning" }));
  generateServices().forEach((s) => items.push({ kind: "service", id: s.id, title: s.name, subtitle: `${s.status} · ${s.rps} rps`, route: `/services/${s.name}`, tone: s.status === "healthy" ? "success" : s.status === "degraded" ? "warning" : "error" }));
  generateDeployments(10).forEach((d) => items.push({ kind: "deployment", id: d.id, title: `${d.service}@${d.version}`, subtitle: d.environment, route: "/deployments", tone: d.status === "succeeded" ? "success" : d.status === "failed" ? "error" : "warning" }));
  generateApiEndpoints().forEach((e) => items.push({ kind: "endpoint", id: `${e.method}:${e.path}`, title: `${e.method} ${e.path}`, subtitle: `${e.rps} rps · ${e.p95}ms`, route: "/api", tone: e.errorRate > 1 ? "error" : "info" }));
  generateAlerts(10).forEach((a) => items.push({ kind: "alert", id: a.id, title: a.title, subtitle: a.severity, route: "/alerts", tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning" }));
  generateQueues().forEach((q) => items.push({ kind: "queue", id: q.id, title: q.name, subtitle: `${q.messages} msgs · ${q.status}`, route: "/queues", tone: q.status === "backlogged" ? "error" : q.status === "degraded" ? "warning" : "success" }));
  generateWorkers().forEach((w) => items.push({ kind: "worker", id: w.id, title: w.name, subtitle: `${w.status} · ${w.region}`, route: "/workers", tone: w.status === "online" ? "success" : "error" }));
  generateApiKeys().forEach((k) => items.push({ kind: "api_key", id: k.id, title: k.name, subtitle: k.prefix, route: "/settings" }));
  generateMembers().forEach((m) => items.push({ kind: "member", id: m.id, title: m.name, subtitle: `${m.role} · ${m.team}`, route: "/settings" }));
  REGIONS.forEach((rg) => items.push({ kind: "region", id: rg, title: rg, subtitle: "AWS region", route: "/" }));
  return items;
}
function buildCorrelatedContext(kind, entityId, entityTitle, service) {
  const svc = service ?? pick(SERVICES);
  const alerts = generateAlerts(3).slice(0, Math.floor(between(0, 3))).map((a) => ({ kind: "alert", id: a.id, title: a.title, tone: a.severity === "critical" ? "critical" : a.severity === "error" ? "error" : "warning" }));
  const traces = generateTraces(3).slice(0, Math.floor(between(1, 3))).map((t) => ({ kind: "trace", id: t.id, title: `${t.rootOperation} · ${t.durationMs}ms`, tone: t.status === "ok" ? "success" : "error" }));
  const logs = generateLogs(4).slice(0, Math.floor(between(2, 4))).map((l) => ({ kind: "log", id: l.id, title: `${l.level}: ${l.message.slice(0, 60)}`, tone: l.level === "error" || l.level === "critical" ? "error" : l.level === "warn" ? "warning" : "neutral" }));
  const queues = generateQueues().slice(0, 2).map((q) => ({ kind: "event", id: q.id, title: `${q.name} · ${q.messages}`, tone: q.status === "backlogged" ? "error" : q.status === "degraded" ? "warning" : "success" }));
  const workers = generateWorkers().slice(0, 2).map((w) => ({ kind: "event", id: w.id, title: `${w.name} · ${w.status}`, tone: w.status === "online" ? "success" : "error" }));
  const endpoints = generateApiEndpoints().slice(0, 2).map((e) => ({ kind: "event", id: `${e.method}:${e.path}`, title: `${e.method} ${e.path}`, tone: e.errorRate > 1 ? "error" : "info" }));
  const deploy = generateDeployments(1)[0];
  const incident = generateIncidents()[0];
  const aiSummary = `Correlated anomaly: ${entityTitle} in ${svc} shows elevated latency correlated with deploy ${deploy.version} and ${alerts.length} active alerts. Probable cause: connection pool saturation after configuration change.`;
  return {
    entity: { kind, id: entityId, title: entityTitle },
    service: svc,
    deployment: { kind: "deployment", id: deploy.id, title: `${deploy.service}@${deploy.version}`, tone: deploy.status === "succeeded" ? "success" : "error" },
    incident: alerts.length > 0 ? { kind: "incident", id: incident.id, title: incident.title, tone: "error" } : void 0,
    alerts,
    traces,
    logs,
    queues,
    workers,
    endpoints,
    region: pick(REGIONS),
    environment: "prod",
    aiSummary
  };
}
const styles = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  error: "border-destructive/30 bg-destructive/10 text-destructive",
  critical: "border-destructive/40 bg-destructive/15 text-destructive",
  info: "border-primary/30 bg-primary/10 text-primary",
  neutral: "border-border bg-muted text-muted-foreground"
};
function StatusBadge({ tone = "neutral", children, dot = true, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider",
        styles[tone],
        className
      ),
      children: [
        dot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("h-1 w-1 rounded-full", `bg-current`) }),
        children
      ]
    }
  );
}
function formatDistanceToNow(ts) {
  const t = typeof ts === "string" ? new Date(ts).getTime() : ts.getTime();
  const diff = Math.max(0, Date.now() - t);
  const s = Math.floor(diff / 1e3);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}
function formatTime(ts) {
  const d = typeof ts === "string" ? new Date(ts) : ts;
  return d.toLocaleTimeString(void 0, { hour12: false });
}
function formatNumber(n) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "k";
  return n.toString();
}
const sevTone = {
  info: "info",
  warning: "warning",
  error: "error",
  critical: "critical"
};
function NotificationCenter() {
  const [items, setItems] = reactExports.useState(() => generateNotifications());
  const unread = reactExports.useMemo(() => items.filter((i) => !i.read).length, [items]);
  const markAll = () => setItems((cur) => cur.map((i) => ({ ...i, read: true })));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        className: "relative flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
        "aria-label": "Notifications",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-3.5 w-3.5" }),
          unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverContent, { align: "end", className: "w-96 p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-3 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: "Notifications" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: markAll,
            className: "flex items-center gap-1 text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
              " mark all read"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "thin-scrollbar max-h-[480px] divide-y divide-border overflow-auto", children: items.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 px-3 py-2 " + (n.read ? "opacity-70" : ""), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: sevTone[n.severity] ?? "info", children: n.kind }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: n.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground", children: formatDistanceToNow(n.timestamp) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pl-1 text-[11px] text-muted-foreground", children: n.body })
      ] }, n.id)) })
    ] })
  ] });
}
const RANGE_LABEL = {
  "15m": "Last 15 minutes",
  "1h": "Last 1 hour",
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  custom: "Custom range"
};
const useTimeRangeStore = create((set) => ({
  range: "1h",
  setRange: (range) => set({ range }),
  setCustom: (customStart, customEnd) => set({ range: "custom", customStart, customEnd })
}));
const Dialog = Root$1;
const DialogTrigger = Trigger$3;
const DialogPortal = Portal$1;
const DialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    ref,
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props
  }
));
DialogOverlay.displayName = Overlay.displayName;
const DialogContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(DialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
DialogContent.displayName = Content.displayName;
const DialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    ),
    ...props
  }
);
DialogHeader.displayName = "DialogHeader";
const DialogFooter = ({
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
DialogFooter.displayName = "DialogFooter";
const DialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    ),
    ...props
  }
));
DialogTitle.displayName = Title.displayName;
const DialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
DialogDescription.displayName = Description.displayName;
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = Root.displayName;
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-card shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const RANGES = ["15m", "1h", "24h", "7d", "30d"];
function isoLocal(d) {
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 6e4).toISOString().slice(0, 16);
}
function TimeRangeSelector() {
  const { range, customStart, customEnd, setRange, setCustom } = useTimeRangeStore();
  const [openCustom, setOpenCustom] = reactExports.useState(false);
  const [start, setStart] = reactExports.useState(customStart || isoLocal(new Date(Date.now() - 36e5)));
  const [end, setEnd] = reactExports.useState(customEnd || isoLocal(/* @__PURE__ */ new Date()));
  const label = range === "custom" && customStart && customEnd ? `${customStart.slice(5, 16)} → ${customEnd.slice(5, 16)}` : range;
  const applyCustom = () => {
    if (new Date(start) >= new Date(end)) return toast.error("Start must be before end");
    setCustom(start, end);
    setOpenCustom(false);
    toast.success("Custom range applied");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-52", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Time range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        RANGES.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => setRange(r2), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: RANGE_LABEL[r2] }),
          r2 === range && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-3 w-3" })
        ] }, r2)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => setOpenCustom(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: "Custom range…" }),
          range === "custom" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-3 w-3" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: openCustom, onOpenChange: setOpenCustom, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Custom time range" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-xs", children: "Pick a start and end timestamp in your local timezone." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground", children: "Start" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: start, onChange: (e) => setStart(e.target.value), className: "h-8 font-mono text-xs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-[11px] font-mono uppercase tracking-wider text-muted-foreground", children: "End" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "datetime-local", value: end, onChange: (e) => setEnd(e.target.value), className: "h-8 font-mono text-xs" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", className: "h-7 text-xs", onClick: () => setOpenCustom(false), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "h-7 text-xs", onClick: applyCustom, children: "Apply" })
      ] })
    ] }) })
  ] });
}
function RoleBadge({ role }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: ROLE_TONE[role], children: ROLE_LABEL[role] });
}
const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(badgeVariants({ variant }), className), ...props });
}
function Topbar() {
  const { organization, setOrganization, environment, setEnvironment } = useUIStore();
  const { user, setRole, signOut } = useAuthStore();
  const navigate = useNavigate();
  const orgs = reactExports.useMemo(() => generateOrganizations(), []);
  const [dark, setDark] = reactExports.useState(true);
  reactExports.useEffect(() => {
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);
  const current = orgs.find((o) => o.slug === organization) ?? orgs[0];
  const currentEnv = ENVIRONMENTS.find((e) => e.slug === environment) ?? ENVIRONMENTS[0];
  const handleSignOut = () => {
    signOut();
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-12 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => window.dispatchEvent(new CustomEvent("pulse:open-palette")),
        className: "group relative flex h-8 max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-left text-xs text-muted-foreground hover:bg-accent hover:text-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "Search events, traces, services…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto rounded border border-border px-1.5 py-0.5 font-mono text-[10px]", children: "⌘K" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimeRangeSelector, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RealtimeIndicator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: { background: currentEnv.color } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: currentEnv.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: currentEnv.region }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-52", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Environment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          ENVIRONMENTS.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => setEnvironment(e.slug), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mr-2 h-1.5 w-1.5 rounded-full", style: { background: e.color } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: e.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: e.region }),
            e.slug === environment && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-3 w-3" })
          ] }, e.slug))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: "flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1.5 text-xs hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: current.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "h-4 border-border px-1 text-[10px] font-mono uppercase", children: current.plan }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-xs", children: "Switch organization" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          orgs.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => setOrganization(o.slug), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate", children: o.name }),
            o.slug === current.slug && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-3 w-3" })
          ] }, o.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuItem, { className: "text-xs text-muted-foreground", disabled: true, children: "Invite member…" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDark(!dark),
          className: "flex h-8 w-8 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
          "aria-label": "Toggle theme",
          children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationCenter, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuTrigger, { className: "flex items-center gap-2 rounded-md border border-border bg-card px-2 py-1 hover:bg-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold uppercase text-primary", children: user?.avatar ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-xs font-medium md:inline", children: user?.name ?? "Guest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-3 w-3 text-muted-foreground" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuLabel, { className: "text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user?.name ?? "Guest" }),
              user && /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: user.role })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-[10px] text-muted-foreground", children: user?.email })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuLabel, { className: "text-[10px] font-mono uppercase text-muted-foreground", children: "Switch role (demo)" }),
          Object.keys(ROLE_LABEL).map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => setRole(r2), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: ROLE_LABEL[r2] }),
            user?.role === r2 && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "ml-2 h-3 w-3" })
          ] }, r2)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs", onSelect: () => navigate({ to: "/settings" }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "mr-2 h-3 w-3" }),
            " Profile & devices"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuItem, { className: "text-xs text-destructive", onSelect: handleSignOut, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "mr-2 h-3 w-3" }),
            " Sign out"
          ] })
        ] })
      ] })
    ] })
  ] });
}
const Command = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e,
  {
    ref,
    className: cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    ),
    ...props
  }
));
Command.displayName = _e.displayName;
const CommandDialog = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogContent, { className: "overflow-hidden p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Command, { className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5", children }) }) });
};
const CommandInput = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    _e.Input,
    {
      ref,
      className: cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props
    }
  )
] }));
CommandInput.displayName = _e.Input.displayName;
const CommandList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.List,
  {
    ref,
    className: cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className),
    ...props
  }
));
CommandList.displayName = _e.List.displayName;
const CommandEmpty = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Empty,
  {
    ref,
    className: "py-6 text-center text-sm",
    ...props
  }
));
CommandEmpty.displayName = _e.Empty.displayName;
const CommandGroup = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Group,
  {
    ref,
    className: cn(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      className
    ),
    ...props
  }
));
CommandGroup.displayName = _e.Group.displayName;
const CommandSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Separator,
  {
    ref,
    className: cn("-mx-1 h-px bg-border", className),
    ...props
  }
));
CommandSeparator.displayName = _e.Separator.displayName;
const CommandItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  _e.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    ),
    ...props
  }
));
CommandItem.displayName = _e.Item.displayName;
const CommandShortcut = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      ),
      ...props
    }
  );
};
CommandShortcut.displayName = "CommandShortcut";
const ROUTES = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Navigate" },
  { to: "/events", label: "Event Explorer", icon: Search, group: "Navigate" },
  { to: "/traces", label: "Traces", icon: Workflow, group: "Navigate" },
  { to: "/logs", label: "Logs", icon: FileText, group: "Navigate" },
  { to: "/services", label: "Service Health", icon: Activity, group: "Navigate" },
  { to: "/topology", label: "Topology", icon: Network, group: "Navigate" },
  { to: "/analytics", label: "Analytics", icon: ChartBar, group: "Navigate" },
  { to: "/slos", label: "SLOs & Budgets", icon: Flame, group: "Navigate" },
  { to: "/queues", label: "Queues", icon: Layers, group: "Navigate" },
  { to: "/workers", label: "Workers", icon: Cpu, group: "Navigate" },
  { to: "/incidents", label: "Incidents", icon: OctagonAlert, group: "Navigate" },
  { to: "/alerts", label: "Alerts", icon: Bell, group: "Navigate" },
  { to: "/mlops", label: "MLOps", icon: Sparkles, group: "Navigate" },
  { to: "/deployments", label: "Deployments", icon: GitBranch, group: "Navigate" },
  { to: "/audit", label: "Audit log", icon: ShieldCheck, group: "Navigate" },
  { to: "/api", label: "API Monitoring", icon: Boxes, group: "Navigate" },
  { to: "/heatmaps", label: "Heatmaps", icon: Grid3x2, group: "Navigate" },
  { to: "/organizations", label: "Organizations", icon: Building2, group: "Navigate" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Navigate" },
  { to: "/settings", label: "API keys", icon: KeyRound, group: "Settings" },
  { to: "/settings", label: "Team & roles", icon: Users, group: "Settings" }
];
const KIND_ICON = {
  trace: Workflow,
  incident: OctagonAlert,
  service: Activity,
  deployment: GitBranch,
  endpoint: Boxes,
  log: FileText,
  alert: Bell,
  queue: Layers,
  worker: Cpu,
  api_key: KeyRound,
  member: Users,
  region: Globe
};
const KIND_LABEL = {
  trace: "Traces",
  incident: "Incidents",
  service: "Services",
  deployment: "Deployments",
  endpoint: "Endpoints",
  log: "Logs",
  alert: "Alerts",
  queue: "Queues",
  worker: "Workers",
  api_key: "API Keys",
  member: "Members",
  region: "Regions"
};
const TONE_CLASS = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  critical: "text-destructive",
  info: "text-primary",
  neutral: "text-muted-foreground"
};
const MAX_RECENT = 8;
const STORAGE_KEY = "pulse-recent-searches";
function loadRecent() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveRecent(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0, MAX_RECENT)));
}
function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}
function CommandPalette() {
  const [open, setOpen] = reactExports.useState(false);
  const [query, setQuery] = reactExports.useState("");
  const navigate = useNavigate();
  const { realtimeConnected, setRealtimeConnected } = useUIStore();
  const searchIndex = reactExports.useMemo(() => generateSearchIndex(), []);
  const [recent, setRecent] = reactExports.useState(loadRecent);
  reactExports.useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => {
      setOpen(true);
      setQuery("");
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pulse:open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pulse:open-palette", onOpen);
    };
  }, []);
  const go = reactExports.useCallback((to) => {
    setOpen(false);
    setQuery("");
    navigate({ to });
  }, [navigate]);
  const selectEntity = reactExports.useCallback((entity) => {
    setRecent((prev) => {
      const next = [entity, ...prev.filter((r2) => !(r2.kind === entity.kind && r2.id === entity.id))].slice(0, MAX_RECENT);
      saveRecent(next);
      return next;
    });
    go(entity.route);
  }, [go]);
  const clearRecent = reactExports.useCallback(() => {
    setRecent([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);
  const entityResults = reactExports.useMemo(() => {
    if (!query.trim()) return [];
    return searchIndex.filter(
      (e) => fuzzyMatch(query, e.title) || e.subtitle && fuzzyMatch(query, e.subtitle)
    ).slice(0, 30);
  }, [query, searchIndex]);
  const groupedResults = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    entityResults.forEach((e) => {
      const list = map.get(e.kind) || [];
      list.push(e);
      map.set(e.kind, list);
    });
    return map;
  }, [entityResults]);
  const navGroups = reactExports.useMemo(
    () => Array.from(new Set(ROUTES.map((r2) => r2.group))),
    []
  );
  const hasQuery = query.trim().length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandDialog, { open, onOpenChange: (o) => {
    setOpen(o);
    if (!o) setQuery("");
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CommandInput,
      {
        placeholder: "Search traces, incidents, services, endpoints… or jump to a page",
        value: query,
        onValueChange: setQuery
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "No results found." }),
      hasQuery && Array.from(groupedResults.entries()).map(([kind, items]) => {
        const Icon = KIND_ICON[kind];
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: KIND_LABEL[kind], children: items.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          CommandItem,
          {
            onSelect: () => selectEntity(e),
            className: "flex items-center gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4 shrink-0", e.tone ? TONE_CLASS[e.tone] : "text-muted-foreground") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: e.title }),
              e.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[10px] text-muted-foreground", children: e.subtitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { className: "font-mono text-[10px]", children: e.route })
            ]
          },
          `${e.kind}:${e.id}`
        )) }, kind);
      }),
      hasQuery && entityResults.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      !hasQuery && recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Recent", children: [
        recent.map((e) => {
          const Icon = KIND_ICON[e.kind];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            CommandItem,
            {
              onSelect: () => selectEntity(e),
              className: "flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-4 w-4 shrink-0", e.tone ? TONE_CLASS[e.tone] : "text-muted-foreground") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: e.title }),
                e.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-[10px] text-muted-foreground", children: e.subtitle })
              ]
            },
            `recent:${e.kind}:${e.id}`
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: clearRecent, className: "flex items-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Clear recent" })
        ] })
      ] }),
      !hasQuery && recent.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      navGroups.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(CommandGroup, { heading: g, children: ROUTES.filter((r2) => r2.group === g).map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go(r2.to), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(r2.icon, { className: "h-4 w-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r2.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { className: "font-mono text-[10px]", children: r2.to })
      ] }, r2.to + r2.label)) }, g)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandGroup, { heading: "Quick actions", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => {
          setRealtimeConnected(!realtimeConnected);
          setOpen(false);
        }, children: [
          realtimeConnected ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: realtimeConnected ? "Pause realtime stream" : "Resume realtime stream" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CommandShortcut, { children: "⌘ ." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/incidents"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "h-4 w-4 text-destructive" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Declare incident" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onSelect: () => go("/deployments"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "View deployments" })
        ] })
      ] })
    ] })
  ] });
}
const useInspector = create((set) => ({
  open: false,
  payload: null,
  inspect: (payload) => set({ open: true, payload }),
  close: () => set({ open: false })
}));
const Sheet = Root$1;
const SheetPortal = Portal$1;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content,
    {
      ref,
      className: cn(sheetVariants({ side }), className),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
        ] }),
        children
      ]
    }
  )
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({
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
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
const Tabs = Root2$1;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content$1,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content$1.displayName;
function JSONViewer({ data }) {
  const [copied, setCopied] = reactExports.useState(false);
  const json = JSON.stringify(data, null, 2);
  const copy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-md border border-border bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: copy,
        className: "absolute right-2 top-2 z-10 flex h-6 items-center gap-1 rounded border border-border bg-card px-1.5 text-[10px] font-mono uppercase text-muted-foreground hover:text-foreground",
        children: [
          copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" }),
          copied ? "copied" : "copy"
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "thin-scrollbar max-h-72 overflow-auto p-3 font-mono text-[11px] leading-relaxed text-foreground/90", children: json })
  ] });
}
function InspectorDrawer() {
  const { open, payload, close } = useInspector();
  const ctx = reactExports.useMemo(() => {
    if (!payload) return null;
    if (payload.correlation) return payload.correlation;
    return buildCorrelatedContext(
      payload.kind,
      payload.id,
      payload.title,
      payload.service
    );
  }, [payload]);
  const copyId = () => {
    if (!payload) return;
    navigator.clipboard.writeText(payload.id);
    toast.success("ID copied", { description: payload.id });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open, onOpenChange: (o) => !o && close(), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { className: "w-[600px] sm:max-w-[600px] p-0", children: payload && ctx && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "border-b border-border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(KindBadge, { kind: payload.kind }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: copyId,
            className: "flex items-center gap-1 font-mono text-[11px] text-muted-foreground hover:text-foreground",
            title: "Copy ID",
            children: [
              payload.id.slice(0, 12),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "h-3 w-3" })
            ]
          }
        ),
        ctx.service && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]", children: ctx.service }),
        ctx.region && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 font-mono text-[10px] text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-3 w-3" }),
          " ",
          ctx.region
        ] }),
        ctx.environment && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded border border-success/30 bg-success/10 px-1.5 py-0.5 font-mono text-[10px] text-success", children: ctx.environment })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "mt-1 text-sm font-semibold", children: payload.title }),
      payload.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { className: "font-mono text-[11px]", children: payload.subtitle })
    ] }),
    ctx.aiSummary && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-primary/5 px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] leading-relaxed text-foreground/85", children: ctx.aiSummary })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5 border-b border-border px-4 py-2", children: [
      ctx.deployment && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationChip, { link: ctx.deployment, icon: Rocket }),
      ctx.incident && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationChip, { link: ctx.incident, icon: ShieldCheck }),
      ctx.alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-3 w-3 text-warning" }),
        " ",
        ctx.alerts.length,
        " alerts"
      ] }),
      ctx.traces.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Workflow, { className: "h-3 w-3 text-info" }),
        " ",
        ctx.traces.length,
        " traces"
      ] }),
      ctx.logs.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-3 w-3 text-muted-foreground" }),
        " ",
        ctx.logs.length,
        " logs"
      ] }),
      ctx.queues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "h-3 w-3 text-warning" }),
        " ",
        ctx.queues.length,
        " queues"
      ] }),
      ctx.workers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "h-3 w-3 text-success" }),
        " ",
        ctx.workers.length,
        " workers"
      ] }),
      ctx.endpoints.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Boxes, { className: "h-3 w-3 text-info" }),
        " ",
        ctx.endpoints.length,
        " endpoints"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "context", className: "flex min-h-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "mx-4 mt-2 grid h-8 grid-cols-5 bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "context", className: "text-[11px]", children: "Context" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "metadata", className: "text-[11px]", children: "Metadata" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "logs", className: "text-[11px]", children: "Logs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "traces", className: "text-[11px]", children: "Traces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "actions", className: "text-[11px]", children: "Actions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "thin-scrollbar min-h-0 flex-1 overflow-y-auto p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "context", className: "m-0 space-y-4", children: [
          ctx.deployment && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: "Deployment", icon: Rocket, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: ctx.deployment }) }),
          ctx.incident && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: "Incident", icon: ShieldCheck, children: /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: ctx.incident }) }),
          ctx.alerts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: `Alerts (${ctx.alerts.length})`, icon: TriangleAlert, children: ctx.alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: a }, a.id)) }),
          ctx.queues.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: "Queues", icon: Layers, children: ctx.queues.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: q }, q.id)) }),
          ctx.workers.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: "Workers", icon: Cpu, children: ctx.workers.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: w }, w.id)) }),
          ctx.endpoints.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationSection, { title: "Endpoints", icon: Boxes, children: ctx.endpoints.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsx(CorrelationRow, { link: e }, e.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 font-mono text-[11px]", children: [
            ctx.service && /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Service", v: ctx.service }),
            ctx.region && /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Region", v: ctx.region }),
            ctx.environment && /* @__PURE__ */ jsxRuntimeExports.jsx(Kv, { k: "Environment", v: ctx.environment })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "metadata", className: "m-0 space-y-3", children: [
          payload.service && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] uppercase text-muted-foreground", children: "Service" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: payload.service })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(JSONViewer, { data: payload.data })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "logs", className: "m-0 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-mono uppercase text-muted-foreground", children: [
            "Related log lines · ",
            ctx.logs.length
          ] }),
          ctx.logs.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded border border-border/60 bg-card p-2 font-mono text-[11px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[10px]", children: [
            l.tone && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: l.tone, children: l.kind }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-foreground/90", children: l.title })
          ] }) }, l.id))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "traces", className: "m-0 space-y-2", children: ctx.traces.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: ctx.traces.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/traces/$traceId",
            params: { traceId: t.id },
            onClick: close,
            className: "flex items-center justify-between rounded border border-border bg-card p-2 text-xs hover:bg-accent",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono", children: t.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3 w-3 shrink-0 text-muted-foreground" })
            ]
          },
          t.id
        )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "No trace correlation available." }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "actions", className: "m-0 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { icon: Bell, label: "Create alert from this", onClick: () => toast.success("Alert rule drafted") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { icon: GitBranch, label: "Link to deployment", onClick: () => toast.info("Linked to latest deploy") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { icon: MessageSquare, label: "Add to incident", onClick: () => toast.success("Added to active incident") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { icon: Sparkles, label: "AI root cause analysis", onClick: () => toast.success("RCA draft generated") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionButton, { icon: Copy, label: "Copy as cURL", onClick: () => {
            navigator.clipboard.writeText(`curl https://api.pulse.io/v1/${payload.kind}/${payload.id}`);
            toast.success("Copied");
          } })
        ] })
      ] })
    ] })
  ] }) }) });
}
function KindBadge({ kind }) {
  const ICON = {
    trace: Workflow,
    log: FileText,
    event: Boxes,
    incident: ShieldCheck,
    alert: TriangleAlert,
    deployment: Rocket
  };
  const Icon = ICON[kind] ?? Boxes;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] uppercase text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
    kind
  ] });
}
function CorrelationChip({ link, icon: Icon }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("h-3 w-3", link.tone === "error" || link.tone === "critical" ? "text-destructive" : link.tone === "warning" ? "text-warning" : link.tone === "success" ? "text-success" : "text-muted-foreground") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: link.title })
  ] });
}
function CorrelationSection({ title, icon: Icon, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3 w-3" }),
      " ",
      title
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children })
  ] });
}
function CorrelationRow({ link }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded border border-border/60 bg-card px-2.5 py-1.5 text-xs", children: [
    link.tone && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: link.tone, dot: false, children: link.kind }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: link.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: link.id.slice(0, 8) })
  ] });
}
function Kv({ k, v }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded border border-border bg-background p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase text-muted-foreground", children: k }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5", children: v })
  ] });
}
function ActionButton({ icon: Icon, label, onClick }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick,
      className: "flex w-full items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-left text-xs hover:bg-accent",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" }),
        label
      ]
    }
  );
}
function AppShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Topbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "thin-scrollbar min-w-0 flex-1 overflow-x-auto", children })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandPalette, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InspectorDrawer, {})
  ] });
}
const appCss = "/assets/styles-CIyOL56w.css";
const queryClient = new QueryClient();
const AUTH_ROUTES = ["/", "/login", "/signup", "/forgot-password", "/welcome"];
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground", children: "ERR_NOT_FOUND" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-5xl font-semibold tracking-tight", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you requested doesn't exist." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "mt-6 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent", children: "Back to dashboard" })
  ] }) });
}
const Route$s = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pulse — Distributed Event Processing & Analytics" },
      { name: "description", content: "Realtime observability for distributed event processing, queues, workers and ML." },
      { property: "og:title", content: "Pulse — Distributed Event Processing & Analytics" },
      { property: "og:description", content: "Realtime observability for distributed event processing, queues, workers and ML." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-background text-foreground antialiased", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    isAuthRoute ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark" })
  ] });
}
const $$splitComponentImporter$r = () => import("./workers-DjmNnmZU.mjs");
const Route$r = createFileRoute("/workers")({
  head: () => ({
    meta: [{
      title: "Worker Monitoring — Pulse"
    }, {
      name: "description",
      content: "Realtime worker fleet health, CPU, memory and throughput."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./welcome-CfsmBGfg.mjs");
const Route$q = createFileRoute("/welcome")({
  head: () => ({
    meta: [{
      title: "Pulse — Distributed Event Processing & Observability Platform"
    }, {
      name: "description",
      content: "Realtime observability for distributed event pipelines: traces, logs, metrics, queues, workers, incidents and MLOps in one engineering-grade console."
    }, {
      property: "og:title",
      content: "Pulse — Distributed Event Processing Platform"
    }, {
      property: "og:description",
      content: "One platform for distributed events, traces, logs, queues, workers, incidents and MLOps."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./traces-CvDSikEz.mjs");
const Route$p = createFileRoute("/traces")({
  head: () => ({
    meta: [{
      title: "Traces — Pulse"
    }, {
      name: "description",
      content: "Distributed trace explorer"
    }]
  }),
  validateSearch: (s) => {
    const out = {};
    if (typeof s.q === "string" && s.q) out.q = s.q;
    if (typeof s.status === "string" && s.status && s.status !== "all") out.status = s.status;
    return out;
  },
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./topology-DGmvSKne.mjs");
const Route$o = createFileRoute("/topology")({
  head: () => ({
    meta: [{
      title: "Topology — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./slos-Bvdbp6UW.mjs");
const Route$n = createFileRoute("/slos")({
  head: () => ({
    meta: [{
      title: "SLOs & Error Budgets — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./signup-BkUVi3b5.mjs");
const Route$m = createFileRoute("/signup")({
  head: () => ({
    meta: [{
      title: "Create account — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./settings-uGzhafvV.mjs");
const Route$l = createFileRoute("/settings")({
  head: () => ({
    meta: [{
      title: "Settings — Pulse"
    }, {
      name: "description",
      content: "Account, organization, API keys, webhooks and notification settings."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./services-DNulzKS5.mjs");
const Route$k = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Service Health — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./queues-DTSyZ9dt.mjs");
const Route$j = createFileRoute("/queues")({
  head: () => ({
    meta: [{
      title: "Queue Monitoring — Pulse"
    }, {
      name: "description",
      content: "Monitor queue depth, lag, throughput and DLQ in realtime."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./organizations-D_pszjqA.mjs");
const Route$i = createFileRoute("/organizations")({
  head: () => ({
    meta: [{
      title: "Organizations — Pulse"
    }, {
      name: "description",
      content: "Manage tenant organizations on the platform."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./mlops-CtmQraKz.mjs");
const Route$h = createFileRoute("/mlops")({
  head: () => ({
    meta: [{
      title: "MLOps — Pulse"
    }, {
      name: "description",
      content: "Model serving, drift and inference monitoring"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./ml-insights-Cm5XaG3J.mjs");
const Route$g = createFileRoute("/ml-insights")({
  head: () => ({
    meta: [{
      title: "ML Insights — Pulse"
    }, {
      name: "description",
      content: "Anomaly detection, predictions and AI summaries."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./logs-CBMdmWsm.mjs");
const Route$f = createFileRoute("/logs")({
  head: () => ({
    meta: [{
      title: "Logs — Pulse"
    }, {
      name: "description",
      content: "Structured log explorer"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./login-o-bWX_qS.mjs");
const Route$e = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Sign in — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./incidents-3WMv9ExX.mjs");
const Route$d = createFileRoute("/incidents")({
  head: () => ({
    meta: [{
      title: "Incidents — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./heatmaps-B0uEccn5.mjs");
const Route$c = createFileRoute("/heatmaps")({
  head: () => ({
    meta: [{
      title: "Heatmaps — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./forgot-password-BwiQrcQE.mjs");
const Route$b = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{
      title: "Reset password — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./events-Bw-649Tt.mjs");
const Route$a = createFileRoute("/events")({
  head: () => ({
    meta: [{
      title: "Event Explorer — Pulse"
    }, {
      name: "description",
      content: "Search, filter and inspect distributed events in realtime."
    }]
  }),
  validateSearch: (s) => {
    const out = {};
    if (typeof s.q === "string" && s.q) out.q = s.q;
    if (typeof s.status === "string" && s.status && s.status !== "all") out.status = s.status;
    if (typeof s.sev === "string" && s.sev && s.sev !== "all") out.sev = s.sev;
    if (typeof s.org === "string" && s.org && s.org !== "all") out.org = s.org;
    if (["latency", "retries", "type"].includes(s.sort)) out.sort = s.sort;
    if (s.dir === "asc") out.dir = "asc";
    if (s.density === "comfortable") out.density = "comfortable";
    return out;
  },
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./deployments-BIW_tKKy.mjs");
const Route$9 = createFileRoute("/deployments")({
  head: () => ({
    meta: [{
      title: "Deployments — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./dashboard-rIIvcPLD.mjs");
const Route$8 = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{
      title: "Dashboard — Pulse"
    }, {
      name: "description",
      content: "Realtime overview of events, queues, workers and ML insights."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./audit-BuzWgyD7.mjs");
const Route$7 = createFileRoute("/audit")({
  head: () => ({
    meta: [{
      title: "Audit log — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./api-Ct6NHpug.mjs");
const Route$6 = createFileRoute("/api")({
  head: () => ({
    meta: [{
      title: "API Monitoring — Pulse"
    }, {
      name: "description",
      content: "Latency, throughput and errors per endpoint."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./analytics-3FURJmDf.mjs");
const Route$5 = createFileRoute("/analytics")({
  head: () => ({
    meta: [{
      title: "Analytics — Pulse"
    }, {
      name: "description",
      content: "Throughput, latency, distribution and organization analytics."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./alerts-B1tepeMF.mjs");
const Route$4 = createFileRoute("/alerts")({
  head: () => ({
    meta: [{
      title: "Alerts — Pulse"
    }, {
      name: "description",
      content: "Active alerts across services, queues, workers and ML."
    }]
  }),
  validateSearch: (s) => {
    const out = {};
    if (typeof s.q === "string" && s.q) out.q = s.q;
    if (typeof s.sev === "string" && s.sev && s.sev !== "all") out.sev = s.sev;
    if (typeof s.scope === "string" && s.scope && s.scope !== "all") out.scope = s.scope;
    return out;
  },
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./index-COMDovIg.mjs");
const Route$3 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Pulse — Distributed Event Processing & Observability Platform"
    }, {
      name: "description",
      content: "Realtime observability for distributed event pipelines: traces, logs, metrics, queues, workers, incidents and MLOps in one engineering-grade console."
    }, {
      property: "og:title",
      content: "Pulse — Distributed Event Processing Platform"
    }, {
      property: "og:description",
      content: "One platform for distributed events, traces, logs, queues, workers, incidents and MLOps."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./traces._traceId-Dpd94oyE.mjs");
const Route$2 = createFileRoute("/traces/$traceId")({
  head: () => ({
    meta: [{
      title: "Trace — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./services._serviceName-SJ3sVLIN.mjs");
const Route$1 = createFileRoute("/services/$serviceName")({
  head: () => ({
    meta: [{
      title: "Service — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./incidents._incidentId-CidBx1co.mjs");
const Route = createFileRoute("/incidents/$incidentId")({
  head: () => ({
    meta: [{
      title: "Incident — Pulse"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WorkersRoute = Route$r.update({
  id: "/workers",
  path: "/workers",
  getParentRoute: () => Route$s
});
const WelcomeRoute = Route$q.update({
  id: "/welcome",
  path: "/welcome",
  getParentRoute: () => Route$s
});
const TracesRoute = Route$p.update({
  id: "/traces",
  path: "/traces",
  getParentRoute: () => Route$s
});
const TopologyRoute = Route$o.update({
  id: "/topology",
  path: "/topology",
  getParentRoute: () => Route$s
});
const SlosRoute = Route$n.update({
  id: "/slos",
  path: "/slos",
  getParentRoute: () => Route$s
});
const SignupRoute = Route$m.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$s
});
const SettingsRoute = Route$l.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => Route$s
});
const ServicesRoute = Route$k.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$s
});
const QueuesRoute = Route$j.update({
  id: "/queues",
  path: "/queues",
  getParentRoute: () => Route$s
});
const OrganizationsRoute = Route$i.update({
  id: "/organizations",
  path: "/organizations",
  getParentRoute: () => Route$s
});
const MlopsRoute = Route$h.update({
  id: "/mlops",
  path: "/mlops",
  getParentRoute: () => Route$s
});
const MlInsightsRoute = Route$g.update({
  id: "/ml-insights",
  path: "/ml-insights",
  getParentRoute: () => Route$s
});
const LogsRoute = Route$f.update({
  id: "/logs",
  path: "/logs",
  getParentRoute: () => Route$s
});
const LoginRoute = Route$e.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$s
});
const IncidentsRoute = Route$d.update({
  id: "/incidents",
  path: "/incidents",
  getParentRoute: () => Route$s
});
const HeatmapsRoute = Route$c.update({
  id: "/heatmaps",
  path: "/heatmaps",
  getParentRoute: () => Route$s
});
const ForgotPasswordRoute = Route$b.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => Route$s
});
const EventsRoute = Route$a.update({
  id: "/events",
  path: "/events",
  getParentRoute: () => Route$s
});
const DeploymentsRoute = Route$9.update({
  id: "/deployments",
  path: "/deployments",
  getParentRoute: () => Route$s
});
const DashboardRoute = Route$8.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => Route$s
});
const AuditRoute = Route$7.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => Route$s
});
const ApiRoute = Route$6.update({
  id: "/api",
  path: "/api",
  getParentRoute: () => Route$s
});
const AnalyticsRoute = Route$5.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => Route$s
});
const AlertsRoute = Route$4.update({
  id: "/alerts",
  path: "/alerts",
  getParentRoute: () => Route$s
});
const IndexRoute = Route$3.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$s
});
const TracesTraceIdRoute = Route$2.update({
  id: "/$traceId",
  path: "/$traceId",
  getParentRoute: () => TracesRoute
});
const ServicesServiceNameRoute = Route$1.update({
  id: "/$serviceName",
  path: "/$serviceName",
  getParentRoute: () => ServicesRoute
});
const IncidentsIncidentIdRoute = Route.update({
  id: "/$incidentId",
  path: "/$incidentId",
  getParentRoute: () => IncidentsRoute
});
const IncidentsRouteChildren = {
  IncidentsIncidentIdRoute
};
const IncidentsRouteWithChildren = IncidentsRoute._addFileChildren(
  IncidentsRouteChildren
);
const ServicesRouteChildren = {
  ServicesServiceNameRoute
};
const ServicesRouteWithChildren = ServicesRoute._addFileChildren(
  ServicesRouteChildren
);
const TracesRouteChildren = {
  TracesTraceIdRoute
};
const TracesRouteWithChildren = TracesRoute._addFileChildren(TracesRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AlertsRoute,
  AnalyticsRoute,
  ApiRoute,
  AuditRoute,
  DashboardRoute,
  DeploymentsRoute,
  EventsRoute,
  ForgotPasswordRoute,
  HeatmapsRoute,
  IncidentsRoute: IncidentsRouteWithChildren,
  LoginRoute,
  LogsRoute,
  MlInsightsRoute,
  MlopsRoute,
  OrganizationsRoute,
  QueuesRoute,
  ServicesRoute: ServicesRouteWithChildren,
  SettingsRoute,
  SignupRoute,
  SlosRoute,
  TopologyRoute,
  TracesRoute: TracesRouteWithChildren,
  WelcomeRoute,
  WorkersRoute
};
const routeTree = Route$s._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({
  error,
  reset
}) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  generateLogs as $,
  TabsList as A,
  Button as B,
  TabsTrigger as C,
  DEMO_ACCOUNTS as D,
  buttonVariants as E,
  cn as F,
  formatDistanceToNow as G,
  formatNumber as H,
  Input as I,
  JSONViewer as J,
  formatTime as K,
  Label as L,
  generateAlerts as M,
  generateApiEndpoints as N,
  generateApiKeys as O,
  generateAuditLogs as P,
  generateConfidenceDistribution as Q,
  ROLE_LABEL as R,
  Sheet as S,
  Tabs as T,
  generateDeployments as U,
  generateEndpointHeatmap as V,
  generateEventDistribution as W,
  generateEvents as X,
  generateIncidents as Y,
  generateLatencyHeatmap as Z,
  generateLatencySeries as _,
  Dialog as a,
  generateMLInsights as a0,
  generateMLModels as a1,
  generateMembers as a2,
  generateOrganizations as a3,
  generateQueueLagSeries as a4,
  generateQueues as a5,
  generateSLOs as a6,
  generateServiceDependencyHeatmap as a7,
  generateServices as a8,
  generateSpansForTrace as a9,
  generateThroughputSeries as aa,
  generateTimeSeries as ab,
  generateTimelineEvents as ac,
  generateTopology as ad,
  generateTraces as ae,
  generateWorkers as af,
  router as ag,
  useAuthStore as ah,
  useInspector as ai,
  useUIStore as aj,
  DialogContent as b,
  DialogDescription as c,
  DialogFooter as d,
  DialogHeader as e,
  DialogTitle as f,
  DialogTrigger as g,
  DropdownMenu as h,
  DropdownMenuCheckboxItem as i,
  DropdownMenuContent as j,
  DropdownMenuLabel as k,
  DropdownMenuSeparator as l,
  DropdownMenuTrigger as m,
  ROLE_TONE as n,
  Route$p as o,
  Route$a as p,
  Route$4 as q,
  Route$2 as r,
  Route$1 as s,
  Route as t,
  SheetContent as u,
  SheetDescription as v,
  SheetHeader as w,
  SheetTitle as x,
  StatusBadge as y,
  TabsContent as z
};


export { r }