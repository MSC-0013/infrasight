import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { OAuthButtons } from "@/components/oauth-buttons";
import { registerWithCredentials } from "@/store/auth-store";
import { ApiError } from "@/lib/api/client";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Create account — Pulse" }] }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !org) {
      toast.error("All fields required");
      return;
    }
    setLoading(true);
    try {
      await registerWithCredentials({
        email,
        password,
        name: name || email.split("@")[0],
        organizationName: org,
      });
      toast.success(`Workspace ${org} created`);
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your workspace" subtitle="Start monitoring in under a minute.">
      <OAuthButtons mode="signup" />
      <div className="my-5 flex items-center gap-3 text-[10px] font-mono uppercase text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or with email <span className="h-px flex-1 bg-border" />
      </div>
      <form onSubmit={submit} className="space-y-3">
        <Field label="Full name">
          <Input value={name} onChange={(e) => setName(e.target.value)} className="h-9 bg-card text-xs" placeholder="Jane Doe" />
        </Field>
        <Field label="Work email">
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-9 bg-card font-mono text-xs" placeholder="jane@company.com" />
        </Field>
        <Field label="Password">
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="h-9 bg-card font-mono text-xs" />
        </Field>
        <Field label="Workspace slug">
          <div className="flex h-9 items-center rounded-md border border-border bg-card px-2 font-mono text-xs">
            <span className="text-muted-foreground">pulse.io/</span>
            <input value={org} onChange={(e) => setOrg(e.target.value)} className="flex-1 bg-transparent outline-none" placeholder="acme" />
          </div>
        </Field>
        <p className="text-[10px] text-muted-foreground">
          By signing up you agree to the Terms and Privacy Policy. No credit card required for the 14-day trial.
        </p>
        <button type="submit" disabled={loading} className="h-9 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
          {loading ? "Creating…" : "Create workspace"}
        </button>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
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
