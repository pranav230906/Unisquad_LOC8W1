//mock service

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

// Switch to false when backend is ready:
export const isMockEnabled = () => false;

export async function apiFetch(path, options = {}) {
    const url = `${API_BASE_URL}${path}`;
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
        ...options,
    });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    return res.json();
}