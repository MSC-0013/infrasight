import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { OAuthButtons } from "@/components/oauth-buttons";
import { useAuthStore, type Role } from "@/store/auth-store";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Pulse" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((s) => s.signIn);
  const [email, setEmail] = useState("sam@pulse.io");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("admin");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password required");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      signIn(email, { role });
      toast.success("Signed in");
      navigate({ to: "/" });
    }, 400);
  };

  return (
    <AuthLayout title="Sign in to Pulse" subtitle="Access your observability workspace.">
      <OAuthButtons mode="signin" />
      <div className="my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-9 bg-card font-mono text-xs" />
        </Field>
        <Field label="Password">
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-9 bg-card font-mono text-xs" placeholder="••••••••" />
        </Field>
        <Field label="Sign in as (demo)">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="h-9 w-full rounded-md border border-border bg-card px-2 font-mono text-xs"
          >
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="sre">SRE</option>
            <option value="developer">Developer</option>
            <option value="viewer">Viewer</option>
          </select>
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
    </AuthLayout>
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
