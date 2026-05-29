import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OAuthButtons } from "@/components/oauth-buttons";
import { useAuthStore, ROLE_LABEL, loginWithCredentials, getAuthErrorMessage } from "@/store/auth-store";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Activity } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Pulse" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@pulse.io");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await loginWithCredentials(email, password);
      const user = useAuthStore.getState().user;
      toast.success(`Signed in as ${ROLE_LABEL[user?.role ?? "viewer"]}`);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">Pulse</span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          All data is loaded from PostgreSQL via the API. Session is stored in localStorage.
        </p>

        <OAuthButtons mode="signin" />
        <div className="my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground">
          <span className="h-px flex-1 bg-border" /> email <span className="h-px flex-1 bg-border" />
        </div>

        <form onSubmit={submit} className="space-y-3">
          {error && (
            <div className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
              {error}
              <p className="mt-2 text-[10px] opacity-80">
                Ensure Docker, API (<code>npm run dev</code> in backend), and seed are running.
              </p>
            </div>
          )}
          <Field label="Email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="h-9 bg-card font-mono text-xs"
              autoComplete="email"
            />
          </Field>
          <Field label="Password">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className="h-9 bg-card font-mono text-xs"
              autoComplete="current-password"
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="h-9 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-4 rounded-md border border-border bg-muted/30 p-3 font-mono text-[10px] text-muted-foreground">
          After <code>npm run db:seed</code>: admin@pulse.io / Demo1234!
        </p>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          No account? <Link to="/signup" className="text-primary hover:underline">Create one</Link>
        </p>
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
