import { create } from "zustand";
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

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (v) => set({ sidebarCollapsed: v }),
  realtimeConnected: true,
  setRealtimeConnected: (v) => set({ realtimeConnected: v }),
  organization: "acme-prod",
  setOrganization: (v) => set({ organization: v }),
  environment: "prod",
  setEnvironment: (v) => set({ environment: v }),
}));
