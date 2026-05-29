import { useEffect } from "react";
import { Outlet, createRootRoute, HeadContent, Scripts, Link, useRouterState } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import { AppShell } from "@/components/layout/app-shell";
import { initPulseApiClient } from "@/lib/api/init-client";
import appCss from "../styles.css?url";

const queryClient = new QueryClient();

const AUTH_ROUTES = ["/", "/login", "/signup", "/forgot-password", "/welcome1"];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-mono text-muted-foreground">ERR_NOT_FOUND</p>
        <h1 className="mt-2 text-5xl font-semibold tracking-tight">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">The page you requested doesn't exist.</p>
        <Link to="/dashboard" className="mt-6 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm hover:bg-accent">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Pulse — Distributed Event Processing & Analytics" },
      { name: "description", content: "Realtime observability for distributed event processing, queues, workers and ML." },
      { property: "og:title", content: "Pulse — Distributed Event Processing & Analytics" },
      { property: "og:description", content: "Realtime observability for distributed event processing, queues, workers and ML." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  useEffect(() => {
    initPulseApiClient();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthRoute ? <Outlet /> : <AppShell><Outlet /></AppShell>}
      <Toaster theme="dark" />
    </QueryClientProvider>
  );
}
