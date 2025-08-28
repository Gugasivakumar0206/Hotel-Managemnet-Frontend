// client/src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

function buildUrl(path, params) {
  const url = new URL(path, BASE.endsWith('/') ? BASE : BASE + '/');
  if (params && typeof params === 'object') {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && String(v).trim() !== '') {
        url.searchParams.set(k, v);
      }
    });
  }
  return url;
}

export async function apiGet(path, params) {
  const url = buildUrl(path, params);
  const res = await fetch(url.toString(), { credentials: 'include' });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

export async function apiPost(path, body) {
  const url = buildUrl(path);
  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) throw new Error(`POST ${url} -> ${res.status}`);
  return res.json();
}

const api = { get: apiGet, post: apiPost };
export default api;   // <-- make sure this line exists
