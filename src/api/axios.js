import axios from 'axios';

// remove trailing slash from base to avoid double slashes
const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

if (!base) {
  // Helpful warning so you know which URL the app is trying to use
  console.warn('VITE_API_URL is NOT set. Set it in .env or Netlify env vars.');
}

const api = axios.create({
  baseURL: base || '/api',  // fallback (useful for local dev if you proxy)
  withCredentials: false,
});

// optional: small response/error wrapper
api.interceptors.response.use(
  res => res,
  err => {
    console.error('API error:', err?.response?.status, err?.message);
    return Promise.reject(err);
  }
);

export default api;
