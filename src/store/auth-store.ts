import { create } from "zustand";
import { persist } from "zustand/middleware";
import { pulseAuth, type AuthLoginResponse } from "@/lib/api/pulse-api";
import { ApiError } from "@/lib/api/client";

export type Role = "super_admin" | "admin" | "sre" | "developer" | "viewer";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
  orgId?: string;
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

export function expandBackendPermissions(backend: string[]): string[] {
  const out = new Set(backend);
  for (const p of backend) {
    if (p.startsWith("read:")) out.add(`view:${p.slice(5)}`);
    if (p === "read:dashboard") out.add("view:dashboard");
    if (p.startsWith("manage:")) out.add(p);
  }
  return [...out];
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  orgId: string | null;
  permissions: string[];
  signInWithApi: (response: AuthLoginResponse) => void;
  signOut: () => void;
  setRole: (role: Role) => void;
  setTokens: (tokens: { accessToken: string; refreshToken?: string }) => void;
  can: (perm: string) => boolean;
}

function userFromApiResponse(res: AuthLoginResponse): AuthUser {
  const u = res.user;
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    avatar: u.name.slice(0, 2).toUpperCase(),
    role: u.role as Role,
    orgId: u.orgId,
  };
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
      orgId: null,
      permissions: [],

      signInWithApi: (response) => {
        const user = userFromApiResponse(response);
        const permissions = expandBackendPermissions(response.user.permissions ?? []);
        set({
          isAuthenticated: true,
          user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          orgId: response.user.orgId,
          permissions,
        });
        if (response.user.orgSlug) {
          void import("@/store/ui-store").then(({ useUIStore }) => {
            useUIStore.getState().setOrganization(response.user.orgSlug!);
          });
        }
      },

      signOut: () => {
        const { refreshToken } = get();
        if (refreshToken) {
          void pulseAuth.logout(refreshToken).catch(() => undefined);
        }
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          orgId: null,
          permissions: [],
        });
      },

      setTokens: ({ accessToken, refreshToken }) => {
        set((s) => ({
          accessToken,
          refreshToken: refreshToken ?? s.refreshToken,
        }));
      },

      setRole: (role) => {
        const u = get().user;
        if (u) set({ user: { ...u, role } });
      },

      can: (perm) => {
        const u = get().user;
        if (!u) return false;
        const grants = [...PERMISSIONS[u.role], ...get().permissions];
        if (grants.includes("*")) return true;
        if (grants.includes(perm)) return true;
        const [verb] = perm.split(":");
        if (grants.includes(`${verb}:*`)) return true;
        if (grants.includes("view:*") && perm.startsWith("view:")) return true;
        return false;
      },
    }),
    {
      name: "pulse-auth",
      partialize: (s) => ({
        user: s.user,
        isAuthenticated: s.isAuthenticated,
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        orgId: s.orgId,
        permissions: s.permissions,
      }),
    },
  ),
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

export async function loginWithCredentials(email: string, password: string) {
  const res = await pulseAuth.login(email, password);
  useAuthStore.getState().signInWithApi(res);
  return res;
}

export async function registerWithCredentials(data: {
  email: string;
  password: string;
  name: string;
  organizationName?: string;
}) {
  const res = await pulseAuth.register(data);
  useAuthStore.getState().signInWithApi(res);
  return res;
}

export function getAuthErrorMessage(err: unknown): string {
  if (err instanceof ApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "Authentication failed";
}
