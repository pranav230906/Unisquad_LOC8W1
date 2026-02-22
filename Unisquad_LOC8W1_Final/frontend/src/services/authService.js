import api from "./api.js";

const LS_USER = "unisquad_user";
const LS_TOKEN = "unisquad_token";

/** Login with email and password */
export async function login({ email, password }) {
  try {
    const response = await api.post('/auth/login', { email, password });
    const { access_token } = response.data;
    
    // Store token
    localStorage.setItem(LS_TOKEN, access_token);
    
    // Get user info from token first
    const payload = JSON.parse(atob(access_token.split('.')[1]));
    const user = {
      id: payload.sub,
      role: payload.role,
      email: email,
      name: payload.role === 'client' ? 'Client User' : 'Worker User'
    };
    
    // Try to get full profile if it's a client
    if (payload.role === 'client') {
      try {
        const profileResponse = await api.get('/client/me');
        const fullUser = profileResponse.data;
        localStorage.setItem(LS_USER, JSON.stringify(fullUser));
        return fullUser;
      } catch (profileError) {
        // If profile fetch fails, use token info
        localStorage.setItem(LS_USER, JSON.stringify(user));
      }
    } else {
      localStorage.setItem(LS_USER, JSON.stringify(user));
    }
    
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Login failed');
  }
}

/** Get current user profile */
export async function getCurrentUserProfile() {
  try {
    const response = await api.get('/client/me');
    const user = response.data;
    localStorage.setItem(LS_USER, JSON.stringify(user));
    return user;
  } catch (error) {
    // If client endpoint fails, try to get user info from token
    const token = localStorage.getItem(LS_TOKEN);
    if (token) {
      // For now, return basic user info from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = {
        id: payload.sub,
        role: payload.role,
        email: '', // Will be filled when needed
        name: payload.role === 'client' ? 'Client User' : 'Worker User'
      };
      localStorage.setItem(LS_USER, JSON.stringify(user));
      return user;
    }
    throw new Error('No valid session');
  }
}

/** Update client profile */
export async function updateClientProfile({ name }) {
  try {
    const response = await api.put('/client/me', { name });
    const user = response.data;
    localStorage.setItem(LS_USER, JSON.stringify(user));
    return user;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Profile update failed');
  }
}

/** Get current persisted user */
export function getCurrentUser() {
  const raw = localStorage.getItem(LS_USER);
  return raw ? JSON.parse(raw) : null;
}

/** Clear session */
export function clearSession() {
  localStorage.removeItem(LS_USER);
  localStorage.removeItem(LS_TOKEN);
}

/** Check if user is authenticated */
export function isAuthed() {
  return !!localStorage.getItem(LS_TOKEN);
}
