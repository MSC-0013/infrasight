import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Environment } from "@/lib/mock-data";

interface UIState {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  setSidebarCollapsed: (v: boolean) => void;
  realtimeConnected: boolean;
  setRealtimeConnected: (v: boolean) => void;
  organization: string;
  setOrganization: (v: string) => void;
  environment: Environment;
  setEnvironment: (v: Environment) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
      realtimeConnected: true,
      setRealtimeConnected: (v) => set({ realtimeConnected: v }),
      organization: "demo-org",
      setOrganization: (v) => set({ organization: v }),
      environment: "prod",
      setEnvironment: (v) => set({ environment: v }),
    }),
    { name: "pulse-ui" },
  ),
);
