//mock service


import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api/v1";

// Switch to false when backend is ready:
export const isMockEnabled = () => false;

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('unisquad_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('API Request:', config.method?.toUpperCase(), config.url, 'with token');
    } else {
        console.log('API Request:', config.method?.toUpperCase(), config.url, 'without token');
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('unisquad_token');
            localStorage.removeItem('unisquad_user');
            window.dispatchEvent(new Event("auth_unauthorized"));
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);


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

export default api;
