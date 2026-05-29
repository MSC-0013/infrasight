/** API is always required — all data comes from PostgreSQL via the backend. */
export const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
  '/api/v1';

export const USE_API = true;
