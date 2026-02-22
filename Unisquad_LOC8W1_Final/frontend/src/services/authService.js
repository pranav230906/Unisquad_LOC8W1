import api, { apiFetch, isMockEnabled } from "./api.js";

const LS_TOKEN = "unisquad_token";
const LS_USER = "unisquad_user";
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
        throw new Error(error.response?.data?.detail || 'Fetch profile failed');
    }
}

/** Send OTP to phone */
export async function sendOtp({ phone }) {
    if (isMockEnabled()) {
        console.info("[authService] OTP sent to", phone, "(mock)");
        return { success: true };
    }
    const data = await apiFetch("/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
    });

    // Popup developer OTP because Twilio is disabled locally!
    if (data.dev_otp) {
        alert(`[DEV MODE] Your OTP is: ${data.dev_otp}`);
    }

    return { success: true, dev_otp: data.dev_otp };
}

/** Verify OTP and return JWT token payload */
export async function verifyOtp({ phone, otp }) {
    if (isMockEnabled()) {
        // mock bypass
        let role = "client";
        if (phone.includes("worker")) role = "worker";
        const user = { id: crypto.randomUUID(), role, phone, name: role === "worker" ? "Rajesh Kumar" : "Demo User" };
        localStorage.setItem(LS_USER, JSON.stringify(user));
        return { token: "MOCK_TOKEN", user };
    }

    const data = await apiFetch("/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
    });

    const token = data.access_token;
    localStorage.setItem(LS_TOKEN, token);

    // Fetch user details immediately using the new token
    const user = await fetchMe(token);
    localStorage.setItem(LS_USER, JSON.stringify(user));

    return { token, user };
}

/** Fetch user using currently saved token */
export async function fetchMe(token) {
    if (isMockEnabled()) return JSON.parse(localStorage.getItem(LS_USER));
    const authToken = token || localStorage.getItem(LS_TOKEN);
    if (!authToken) throw new Error("No token found");

    try {
        const user = await apiFetch("/auth/me", {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        return user;
    } catch (error) {
        // If client endpoint fails, try to get user info from token
        const tokenStr = localStorage.getItem(LS_TOKEN);
        if (tokenStr) {
            // For now, return basic user info from token
            const payload = JSON.parse(atob(tokenStr.split('.')[1]));
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

/** Update Profile (Name & Role) for New Users */
export async function updateProfile({ name, role }) {
    const token = localStorage.getItem(LS_TOKEN);
    if (!token) {
        window.dispatchEvent(new Event("auth_unauthorized"));
        throw new Error("Authentication token missing. Please log in again.");
    }

    const updatedUser = await apiFetch("/users/profile", {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, role })
    });
    localStorage.setItem(LS_USER, JSON.stringify(updatedUser));
    return updatedUser;
}

export function getCurrentUser() {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
}

export function clearSession() {
    localStorage.removeItem(LS_USER);
    localStorage.removeItem(LS_TOKEN);
}

/** Check if user is authenticated */
export function isAuthed() {
    return !!localStorage.getItem(LS_TOKEN);
}
