import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout } from "@/components/auth-layout";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({ meta: [{ title: "Reset password — Pulse" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");
    setSent(true);
    toast.success("Reset link sent");
  };

  return (
    <AuthLayout title="Reset your password" subtitle="We'll email you a secure reset link.">
      {sent ? (
        <div className="rounded-md border border-success/30 bg-success/10 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Check className="h-4 w-4 text-success" />
            <p className="text-sm font-medium">Check your email</p>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            We sent a reset link to <span className="text-foreground">{email}</span>. The link expires in 30 minutes.
          </p>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-3">
          <label className="block">
            <span className="mb-1 block text-[11px] font-medium text-foreground/80">Email</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="h-9 bg-card font-mono text-xs" />
          </label>
          <button type="submit" className="h-9 w-full rounded-md bg-primary text-xs font-medium text-primary-foreground hover:bg-primary/90">
            Send reset link
          </button>
        </form>
      )}
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Remember it? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
