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

// Permission matrix — keep in sync with sidebar filter & route guards.
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
    "view:alerts", "view:incidents", "manage:incidents",
  ],
  viewer: [
    "view:dashboard", "view:events", "view:traces", "view:logs",
    "view:services", "view:topology", "view:analytics", "view:api",
    "view:queues", "view:workers", "view:alerts", "view:incidents",
  ],
};

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string, opts?: { role?: Role; name?: string }) => void;
  signOut: () => void;
  setRole: (role: Role) => void;
  can: (perm: string) => boolean;
}

const defaultUser: AuthUser = {
  id: "usr_demo",
  name: "Sam Engineer",
  email: "sam@pulse.io",
  avatar: "SE",
  role: "admin",
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: defaultUser,
      isAuthenticated: true,
      signIn: (email, opts) =>
        set({
          isAuthenticated: true,
          user: {
            id: "usr_" + Math.random().toString(36).slice(2, 8),
            name: opts?.name ?? email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
            email,
            avatar: (opts?.name ?? email).slice(0, 2).toUpperCase(),
            role: opts?.role ?? "admin",
          },
        }),
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
