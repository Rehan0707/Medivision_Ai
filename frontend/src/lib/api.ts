/**
 * Backend API base URL. Use env var for deployment.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export function apiUrl(path: string): string {
  return `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
}

export function authHeaders(accessToken?: string | null): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (accessToken && accessToken !== 'undefined') {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
  }
  return headers;
}
