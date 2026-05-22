import { create } from "zustand";

export type TimeRangeKey = "15m" | "1h" | "24h" | "7d" | "30d";

export const RANGE_LABEL: Record<TimeRangeKey, string> = {
  "15m": "Last 15 minutes",
  "1h": "Last 1 hour",
  "24h": "Last 24 hours",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
};

export const RANGE_MS: Record<TimeRangeKey, number> = {
  "15m": 15 * 60 * 1000,
  "1h": 60 * 60 * 1000,
  "24h": 24 * 60 * 60 * 1000,
  "7d": 7 * 24 * 60 * 60 * 1000,
  "30d": 30 * 24 * 60 * 60 * 1000,
};

interface TimeRangeState {
  range: TimeRangeKey;
  setRange: (r: TimeRangeKey) => void;
}

export const useTimeRangeStore = create<TimeRangeState>((set) => ({
  range: "1h",
  setRange: (range) => set({ range }),
}));
