import { useAuthStore } from '@/store/auth-store';

/** WebSocket URL — uses Vite proxy in dev (`/ws` → backend). */
export function getWsUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const token = useAuthStore.getState().accessToken;
  if (!token) return null;

  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  return `${protocol}://${window.location.host}/ws?token=${encodeURIComponent(token)}`;
}
