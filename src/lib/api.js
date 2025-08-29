const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function apiGet(path, params) {
  const url = new URL(path, BASE);
  if (params) Object.entries(params).forEach(([k,v]) => v != null && url.searchParams.set(k, v));
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const url = new URL(path, BASE);
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
  return res.json();
}

export default { get: apiGet, post: apiPost };
