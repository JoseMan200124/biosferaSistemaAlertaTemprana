import { env } from '@/shared/lib/env';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

export async function httpJson<T>(path: string, options: RequestOptions = {}): Promise<T> {
  if (!env.apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL no está configurada.');
  }

  const url = new URL(path.replace(/^\//, ''), env.apiBaseUrl.replace(/\/+$/, '/') );

  const res = await fetch(url.toString(), {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
    cache: 'no-store',
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${txt || res.statusText}`);
  }

  return (await res.json()) as T;
}
