//mock service

import axios from 'axios';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

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
      window.location.href = '/auth/login';
    }
    return Promise.reject(error);
  }
);

export default api;