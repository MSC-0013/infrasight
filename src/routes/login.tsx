import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { OAuthButtons } from "@/components/oauth-buttons";
import { useAuthStore, DEMO_ACCOUNTS, ROLE_LABEL, type Role } from "@/store/auth-store";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { Activity, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Pulse" }] }),
  component: LoginPage,
});

const DEMO_CARDS = [
  { email: "admin@pulse.io", password: "admin123", role: "super_admin" as Role },
  { email: "ops@pulse.io", password: "ops123", role: "admin" as Role },
  { email: "sre@pulse.io", password: "sre123", role: "sre" as Role },
  { email: "dev@pulse.io", password: "dev123", role: "developer" as Role },
  { email: "viewer@pulse.io", password: "viewer123", role: "viewer" as Role },
];

function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
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
      signIn(email, { role: demo?.role });
      toast.success(`Signed in as ${ROLE_LABEL[demo?.role ?? "viewer"]}`);
      navigate({ to: "/dashboard" });
    }, 400);
  };

  const quickSignIn = (email: string, password: string, role: Role) => {
    setLoading(true);
    setTimeout(() => {
      signIn(email, { role });
      toast.success(`Signed in as ${ROLE_LABEL[role]}`);
      navigate({ to: "/dashboard" });
    }, 300);
  };

  const ROLE_TONES: Record<Role, "info" | "success" | "warning" | "error" | "critical"> = {
    super_admin: "critical",
    admin: "error",
    sre: "warning",
    developer: "info",
    viewer: "success",
  };

  return (
    <div className="flex min-h-screen">
      {/* Left: login form */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
              <Activity className="h-4 w-4" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold tracking-tight">Pulse</span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access your observability console with role-based views.</p>

          <OAuthButtons mode="signin" />
          <div className="my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="space-y-3">
            {error && (
              <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}
            <Field label="Email">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-9 bg-card font-mono text-xs"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="h-9 bg-card font-mono text-xs pr-9"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </Field>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-muted-foreground">
                <input type="checkbox" className="h-3 w-3 accent-primary" defaultChecked />
                Remember this device
              </label>
              <Link to="/forgot-password" className="text-primary hover:underline">Forgot password?</Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="h-9 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
          </p>
        </div>
      </div>

      {/* Right: demo accounts */}
      <div className="hidden w-[420px] shrink-0 flex-col border-l border-border bg-muted/30 p-8 lg:flex">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-primary">Demo accounts</p>
          <h2 className="mt-1 text-base font-semibold tracking-tight">Quick sign-in by role</h2>
          <p className="mt-1 text-xs text-muted-foreground">Each role has its own dashboard, permissions and sidebar layout.</p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {DEMO_CARDS.map((d) => (
            <button
              key={d.email}
              onClick={() => quickSignIn(d.email, d.password, d.role)}
              disabled={loading}
              className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/40 hover:bg-accent/40 disabled:opacity-50"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {d.email.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium">{ROLE_LABEL[d.role]}</span>
                  <StatusBadge tone={ROLE_TONES[d.role]}>{d.role.replace("_", " ")}</StatusBadge>
                </div>
                <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{d.email}</p>
              </div>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
            </button>
          ))}
        </div>

        <div className="mt-auto rounded-md border border-border bg-card p-4">
          <p className="text-[11px] font-medium text-muted-foreground">All demo passwords</p>
          <div className="mt-2 space-y-1 font-mono text-[10px]">
            {DEMO_CARDS.map((d) => (
              <div key={d.email} className="flex items-center gap-1.5 text-muted-foreground">
                <Check className="h-2.5 w-2.5 text-success" />
                <span className="text-foreground/70">{d.email}</span>
                <span>→ {d.password}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-medium text-foreground/80">{label}</span>
      {children}
    </label>
  );
}
