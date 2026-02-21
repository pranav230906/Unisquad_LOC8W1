import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("unisquad_user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthed = !!user;

  /**
   * Mock login — sets a user based on input.
   * Role detection:
   *   input containing "worker" → role: worker (goes to /worker)
   *   input containing "admin"  → role: admin  (goes to /admin)
   *   anything else             → role: client  (goes to /client)
   */
  const login = async ({ phoneOrEmail, role: explicitRole }) => {
    const lower = phoneOrEmail.toLowerCase();
    let role = explicitRole || "client";
    if (!explicitRole) {
      if (lower.includes("worker")) role = "worker";
      else if (lower.includes("admin")) role = "admin";
    }
    const fakeUser = {
      id: crypto.randomUUID(),
      role,
      phoneOrEmail,
      name: role === "worker" ? "Rajesh Kumar" : role === "admin" ? "Platform Admin" : "Client User",
    };
    localStorage.setItem("unisquad_user", JSON.stringify(fakeUser));
    setUser(fakeUser);
    return fakeUser;
  };

  const logout = () => {
    localStorage.removeItem("unisquad_user");
    setUser(null);
  };

  const value = useMemo(() => ({ user, isAuthed, login, logout }), [user, isAuthed]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}