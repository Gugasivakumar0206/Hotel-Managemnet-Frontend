// client/src/lib/api.js
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const tokenStore = {
  get() { return localStorage.getItem('token'); },
  set(t) { localStorage.setItem('token', t); },
  clear() { localStorage.removeItem('token'); },
};

async function request(path, opts = {}) {
  const url = new URL(path, BASE);
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  const token = tokenStore.get();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { ...opts, headers, credentials: 'include' });
  if (!res.ok) {
    let msg = '';
    try { msg = (await res.json())?.message || ''; } catch {}
    throw new Error(msg || `${res.status} ${res.statusText}`);
  }
  return res.json();
}

function buildQuery(path, params) {
  if (!params) return path;
  const q = new URLSearchParams();
  Object.entries(params).forEach(([k,v]) => {
    if (v != null && String(v).trim() !== '') q.set(k, v);
  });
  const qs = q.toString();
  return qs ? `${path}${path.includes('?') ? '&' : '?'}${qs}` : path;
}

export default {
  get: (path, params) => request(buildQuery(path, params)),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body || {}) }),
  token: tokenStore,
};
