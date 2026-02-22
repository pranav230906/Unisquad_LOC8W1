import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { login as apiLogin, getCurrentUser, clearSession, isAuthed } from "../services/authService.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return getCurrentUser();
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return isAuthed();
  });

  useEffect(() => {
    setIsAuthenticated(isAuthed());
  }, [user]);

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
    login, 
    logout 
  }), [user, isAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}