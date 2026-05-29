import { API_BASE_URL } from './config';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

type TokenGetter = () => {
  accessToken: string | null;
  refreshToken: string | null;
};

type TokenSetter = (tokens: { accessToken: string; refreshToken?: string }) => void;

let getTokens: TokenGetter = () => ({ accessToken: null, refreshToken: null });
let setTokens: TokenSetter = () => undefined;
let onUnauthorized: () => void = () => undefined;

export function configureApiClient(opts: {
  getTokens: TokenGetter;
  setTokens: TokenSetter;
  onUnauthorized?: () => void;
}) {
  getTokens = opts.getTokens;
  setTokens = opts.setTokens;
  if (opts.onUnauthorized) onUnauthorized = opts.onUnauthorized;
}

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = getTokens();
  if (!refreshToken) return null;

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) return null;

  const json = (await res.json()) as {
    success: boolean;
    data?: { accessToken: string };
  };

  if (json.success && json.data?.accessToken) {
    setTokens({ accessToken: json.data.accessToken });
    return json.data.accessToken;
  }
  return null;
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
  retry = true,
): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  const { accessToken } = getTokens();

  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && init.body) {
    headers.set('Content-Type', 'application/json');
  }
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const res = await fetch(url, { ...init, headers });

  if (res.status === 401 && retry) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return apiRequest<T>(path, init, false);
    }
    onUnauthorized();
    throw new ApiError('Session expired', 401, 'UNAUTHORIZED');
  }

  const json = (await res.json().catch(() => ({}))) as {
    success?: boolean;
    data?: T;
    error?: { message?: string; code?: string; details?: unknown };
  };

  if (!res.ok) {
    throw new ApiError(
      json.error?.message ?? res.statusText,
      res.status,
      json.error?.code,
      json.error?.details,
    );
  }

  if (json.success === false) {
    throw new ApiError(json.error?.message ?? 'Request failed', res.status, json.error?.code);
  }

  return (json.data ?? json) as T;
}

export function apiGet<T>(path: string, params?: Record<string, string | number | undefined>) {
  const qs = params
    ? '?' +
      new URLSearchParams(
        Object.entries(params)
          .filter(([, v]) => v !== undefined && v !== '')
          .map(([k, v]) => [k, String(v)]),
      ).toString()
    : '';
  return apiRequest<T>(`${path}${qs}`);
}

export function apiPost<T>(path: string, body?: unknown) {
  return apiRequest<T>(path, {
    method: 'POST',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiPatch<T>(path: string, body?: unknown) {
  return apiRequest<T>(path, {
    method: 'PATCH',
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export function apiDelete<T>(path: string) {
  return apiRequest<T>(path, { method: 'DELETE' });
}
