import { apiFetch, isMockEnabled } from "./api.js";

const LS_TOKEN = "unisquad_token";
const LS_USER = "unisquad_user";

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

    const user = await apiFetch("/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` }
    });
    return user;
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
