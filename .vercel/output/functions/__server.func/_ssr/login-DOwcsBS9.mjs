import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { A as AuthLayout } from "./auth-layout-CrNT5wgx.mjs";
import { O as OAuthButtons } from "./oauth-buttons-zlW0wXFC.mjs";
import { _ as useAuthStore } from "./router-F21aWjaR.mjs";
import { I as Input } from "./input-f80pHA3R.mjs";
import { t as toast } from "../_libs/sonner.mjs";
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
import "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "../_libs/cmdk.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = reactExports.useState("sam@pulse.io");
  const [password, setPassword] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("admin");
  const [loading, setLoading] = reactExports.useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email, {
        role
      });
      toast.success("Signed in");
      navigate({
        to: "/"
      });
    }, 400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AuthLayout, { title: "Sign in to Pulse", subtitle: "Access your observability workspace.", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OAuthButtons, { mode: "signin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" }),
      " or with email ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-px flex-1 bg-border" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: email, onChange: (e) => setEmail(e.target.value), type: "email", className: "h-9 bg-card font-mono text-xs" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Password", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: password, onChange: (e) => setPassword(e.target.value), type: "password", className: "h-9 bg-card font-mono text-xs", placeholder: "••••••••" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Sign in as (demo)", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: role, onChange: (e) => setRole(e.target.value), className: "h-9 w-full rounded-md border border-border bg-card px-2 font-mono text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "super_admin", children: "Super Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "sre", children: "SRE" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "developer", children: "Developer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "viewer", children: "Viewer" })
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
