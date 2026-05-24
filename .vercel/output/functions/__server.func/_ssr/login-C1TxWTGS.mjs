import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { O as OAuthButtons } from "./oauth-buttons-Bzat5mH3.mjs";
import { ah as useAuthStore, I as Input, R as ROLE_LABEL, y as StatusBadge, D as DEMO_ACCOUNTS } from "./router-BB8e-L7y.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as Activity, u as EyeOff, t as Eye, c as ArrowRight, h as Check } from "../_libs/lucide-react.mjs";
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
const DEMO_CARDS = [{
  email: "admin@pulse.io",
  password: "admin123",
  role: "super_admin"
}, {
  email: "ops@pulse.io",
  password: "ops123",
  role: "admin"
}, {
  email: "sre@pulse.io",
  password: "sre123",
  role: "sre"
}, {
  email: "dev@pulse.io",
  password: "dev123",
  role: "developer"
}, {
  email: "viewer@pulse.io",
  password: "viewer123",
  role: "viewer"
}];
function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const submit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    const demo = DEMO_ACCOUNTS[email];
    if (demo) {
      if (password !== demo.password) {
        setError("Invalid password for this demo account");
        return;
      }
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email, {
        role: demo?.role
      });
      toast.success(`Signed in as ${ROLE_LABEL[demo?.role ?? "viewer"]}`);
      navigate({
        to: "/dashboard"
      });
    }, 400);
  };
  const quickSignIn = (email2, password2, role) => {
    setLoading(true);
    setTimeout(() => {
      signIn(email2, {
        role
      });
      toast.success(`Signed in as ${ROLE_LABEL[role]}`);
      navigate({
        to: "/dashboard"
      });
    }, 300);
  };
  const ROLE_TONES = {
    super_admin: "critical",
    admin: "error",
    sre: "warning",
    developer: "info",
    viewer: "success"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4", strokeWidth: 2.5 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold tracking-tight", children: "Pulse" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-tight", children: "Sign in to your workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Access your observability console with role-based views." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OAuthButtons, { mode: "signin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
        " or with email ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), type: "email", className: "h-9 bg-card font-mono text-xs", placeholder: "you@company.com", autoComplete: "email" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: password, onChange: (e) => setPassword(e.target.value), type: showPassword ? "text" : "password", className: "h-9 bg-card font-mono text-xs pr-9", placeholder: "••••••••", autoComplete: "current-password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-3.5 w-3.5" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", className: "h-3 w-3 accent-primary", defaultChecked: true }),
            "Remember this device"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/forgot-password", className: "text-primary hover:underline", children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "h-9 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50", children: loading ? "Signing in…" : "Sign in" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-xs text-muted-foreground", children: [
        "No account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "text-primary hover:underline", children: "Create one" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden w-[420px] shrink-0 flex-col border-l border-border bg-muted/30 p-8 lg:flex", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono uppercase tracking-wider text-primary", children: "Demo accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-base font-semibold tracking-tight", children: "Quick sign-in by role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: "Each role has its own dashboard, permissions and sidebar layout." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex flex-col gap-2.5", children: DEMO_CARDS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => quickSignIn(d.email, d.password, d.role), disabled: loading, className: "group flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 disabled:opacity-50", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary", children: d.email.slice(0, 2).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium", children: ROLE_LABEL[d.role] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { tone: ROLE_TONES[d.role], children: d.role.replace("_", " ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 font-mono text-[10px] text-muted-foreground", children: d.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" })
      ] }, d.email)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto rounded-md border border-border bg-card p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-muted-foreground", children: "All demo passwords" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1 font-mono text-[10px]", children: DEMO_CARDS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-2.5 w-2.5 text-success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: d.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "→ ",
            d.password
          ] })
        ] }, d.email)) })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1 block text-[11px] font-medium text-foreground/80", children: label }),
    children
  ] });
}
export {
  LoginPage as component
};
