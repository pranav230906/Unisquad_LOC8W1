import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { getCurrentUser, clearSession, fetchMe as apiFetchMe } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getCurrentUser());
  const [isInitializing, setIsInitializing] = useState(true);

  // Validate session on mount
  useEffect(() => {
    async function init() {
      try {
        const currentToken = localStorage.getItem("unisquad_token");
        if (currentToken) {
          const freshUser = await apiFetchMe(currentToken);
          setUser(freshUser); // Ensure role + name are always fresh from DB on reload
        } else {
          setUser(null);
        }
      } catch (err) {
        console.warn("Session validation failed:", err);
        clearSession();
        setUser(null);
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
      if (!window.location.pathname.includes('/auth/login')) {
        window.location.href = '/auth/login';
      }
    };
    window.addEventListener("auth_unauthorized", handleUnauthorized);
    return () => window.removeEventListener("auth_unauthorized", handleUnauthorized);
  }, []);

  const isAuthed = !!user;

  // The actual authentication logic (send/verify OTP) happens directly via authService in the components.
  // We just use this function to inject the completely prepared user object into the Global state.
  const executeLoginState = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthed, setUser: executeLoginState, logout }), [user, isAuthed]);

  if (isInitializing) return null; // Avoid rendering guarded routes before resolving session

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}