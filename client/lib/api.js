const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function apiFetch(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  search: (q) => apiFetch(`/api/search?q=${encodeURIComponent(q)}`),
  getDrug: (id) => apiFetch(`/api/drugs/${id}`),
  getDrugs: (limit = 50) => apiFetch(`/api/drugs?limit=${limit}`),
  getCategories: () => apiFetch('/api/drugs/categories'),
  getSupplements: () => apiFetch('/api/supplements'),
  checkInteractions: (drugIds) => apiFetch('/api/interactions/check', {
    method: 'POST',
    body: JSON.stringify({ drugIds }),
  }),
  chat: (message, history = []) => apiFetch('/api/ai/chat', {
    method: 'POST',
    body: JSON.stringify({ message, history }),
  }),
};
