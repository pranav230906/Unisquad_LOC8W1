//mock service

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Switch to false when backend is ready:
export const isMockEnabled = () => false;

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  if (!res.ok) {
    let errMsg = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (data.detail) errMsg = typeof data.detail === "string" ? data.detail : data.detail[0]?.msg || JSON.stringify(data.detail);
      else if (data.message) errMsg = data.message;
    } catch (e) { }

    // Automatically evict user if token is invalid or expired
    if (res.status === 401) {
      window.dispatchEvent(new Event("auth_unauthorized"));
    }

    throw new Error(errMsg);
  }
  return res.json();
}