// Mock auth service — swap apiFetch calls in when backend is ready
import { isMockEnabled } from "./api.js";

const LS_USER = "unisquad_user";

/** Send OTP to phone/email (mock) */
export async function sendOtp({ phoneOrEmail }) {
    if (!isMockEnabled()) {
        // future: await apiFetch("/auth/send-otp", { method: "POST", body: JSON.stringify({ phoneOrEmail }) });
    }
    console.info("[authService] OTP sent to", phoneOrEmail, "(mock)");
    return { success: true };
}

/** Verify OTP and return user profile (mock) */
export async function verifyOtp({ phoneOrEmail, otp }) {
    if (!isMockEnabled()) {
        // future: return apiFetch("/auth/verify-otp", { method: "POST", body: JSON.stringify({ phoneOrEmail, otp }) });
    }
    // Determine role from input (demo shortcut)
    let role = "client";
    if (phoneOrEmail.toLowerCase().includes("worker")) role = "worker";
    if (phoneOrEmail.toLowerCase().includes("admin")) role = "admin";

    const user = { id: crypto.randomUUID(), role, phoneOrEmail, name: role === "worker" ? "Rajesh Kumar" : "Demo User" };
    localStorage.setItem(LS_USER, JSON.stringify(user));
    return user;
}

/** Register a new user (mock) */
export async function register({ name, phoneOrEmail, role = "client" }) {
    if (!isMockEnabled()) {
        // future: return apiFetch("/auth/register", { method: "POST", body: JSON.stringify({ name, phoneOrEmail, role }) });
    }
    const user = { id: crypto.randomUUID(), role, phoneOrEmail, name };
    localStorage.setItem(LS_USER, JSON.stringify(user));
    return user;
}

/** Get current persisted user */
export function getCurrentUser() {
    const raw = localStorage.getItem(LS_USER);
    return raw ? JSON.parse(raw) : null;
}

/** Clear session */
export function clearSession() {
    localStorage.removeItem(LS_USER);
}
