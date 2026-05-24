import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = "super_admin" | "admin" | "sre" | "developer" | "viewer";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

export const PERMISSIONS: Record<Role, string[]> = {
  super_admin: ["*"],
  admin: [
    "view:*", "manage:users", "manage:org", "manage:billing",
    "manage:settings", "manage:incidents", "manage:deployments",
    "manage:alerts", "manage:api_keys",
  ],
  sre: [
    "view:*", "manage:incidents", "manage:alerts",
    "manage:deployments", "manage:queues", "manage:workers",
  ],
  developer: [
    "view:dashboard", "view:events", "view:traces", "view:logs",
    "view:services", "view:topology", "view:analytics", "view:api",
    "view:queues", "view:workers", "view:deployments", "view:mlops",
    "view:alerts", "view:incidents", "view:slos", "view:heatmaps",
    "manage:incidents",
  ],
  viewer: [
    "view:dashboard", "view:events", "view:traces", "view:logs",
    "view:services", "view:topology", "view:analytics", "view:api",
    "view:queues", "view:workers", "view:alerts", "view:incidents",
    "view:slos", "view:heatmaps",
  ],
};

export const DEMO_ACCOUNTS: Record<string, { password: string; role: Role; name: string; avatar: string }> = {
  "admin@pulse.io": { password: "admin123", role: "super_admin", name: "Alex Chen", avatar: "AC" },
  "ops@pulse.io":   { password: "ops123",   role: "admin",       name: "Jordan Park", avatar: "JP" },
  "sre@pulse.io":   { password: "sre123",   role: "sre",         name: "Priya Sharma", avatar: "PS" },
  "dev@pulse.io":   { password: "dev123",   role: "developer",   name: "Sam Engineer", avatar: "SE" },
  "viewer@pulse.io":{ password: "viewer123",role: "viewer",      name: "Mia Analyst", avatar: "MA" },
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, opts?: { role?: Role; name?: string }) => void;
  signOut: () => void;
  setRole: (role: Role) => void;
  can: (perm: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
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
            role,
          },
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
      },
    }),
    { name: "pulse-auth" }
  )
);

export const ROLE_LABEL: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  sre: "SRE",
  developer: "Developer",
  viewer: "Viewer",
};

export const ROLE_TONE: Record<Role, "info" | "success" | "warning" | "error" | "critical"> = {
  super_admin: "critical",
  admin: "error",
  sre: "warning",
  developer: "info",
  viewer: "success",
};
