import { create } from "zustand";

export type InspectorKind = "log" | "event" | "trace" | "incident" | "alert" | "deployment";

export interface InspectorPayload {
  kind: InspectorKind;
  id: string;
  title: string;
  subtitle?: string;
  data: Record<string, unknown>;
  relatedTraceId?: string;
  service?: string;
}

interface InspectorState {
  open: boolean;
  payload: InspectorPayload | null;
  inspect: (p: InspectorPayload) => void;
  close: () => void;
}

export const useInspector = create<InspectorState>((set) => ({
  open: false,
  payload: null,
  inspect: (payload) => set({ open: true, payload }),
  close: () => set({ open: false }),
}));
