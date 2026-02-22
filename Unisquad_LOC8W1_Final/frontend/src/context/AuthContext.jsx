import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { login as apiLogin, getCurrentUser, clearSession, fetchMe as apiFetchMe, isAuthed } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getCurrentUser());
    const [isAuthenticated, setIsAuthenticated] = useState(() => isAuthed());
    const [isInitializing, setIsInitializing] = useState(true);

    // Validate session on mount
    useEffect(() => {
        async function init() {
            try {
                const currentToken = localStorage.getItem("unisquad_token");
                if (currentToken) {
                    const freshUser = await apiFetchMe(currentToken);
                    setUser(freshUser); // Ensure role + name are always fresh from DB on reload
                    setIsAuthenticated(true);
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                console.warn("Session validation failed:", err);
                clearSession();
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsInitializing(false);
            }
        }
        init();
    }, []);

    // Global eviction listener
    useEffect(() => {
        const handleUnauthorized = () => {
            console.warn("Unauthorized API call detected. Terminating session...");
            clearSession();
            setUser(null);
            setIsAuthenticated(false);
            if (!window.location.pathname.includes('/auth/login')) {
                window.location.href = '/auth/login';
            }
        };
        window.addEventListener("auth_unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth_unauthorized", handleUnauthorized);
    }, []);

    const login = async ({ email, password }) => {
        try {
            const user = await apiLogin({ email, password });
            setUser(user);
            setIsAuthenticated(true);
            return user;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        clearSession();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = useMemo(() => ({
        user,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        login,
        logout
    }), [user, isAuthenticated]);

    if (isInitializing) return null; // Avoid rendering guarded routes before resolving session

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}