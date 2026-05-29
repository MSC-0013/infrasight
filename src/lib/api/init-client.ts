import { configureApiClient } from './client';
import { useAuthStore } from '@/store/auth-store';

let configured = false;

export function initPulseApiClient() {
  if (configured || typeof window === 'undefined') return;
  configured = true;

  configureApiClient({
    getTokens: () => {
      const s = useAuthStore.getState();
      return {
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
      };
    },
    setTokens: ({ accessToken, refreshToken }) => {
      useAuthStore.getState().setTokens({ accessToken, refreshToken });
    },
    onUnauthorized: () => {
      useAuthStore.getState().signOut();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    },
  });
}
