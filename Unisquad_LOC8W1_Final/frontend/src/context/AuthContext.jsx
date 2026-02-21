import React, { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("unisquad_user");
    return raw ? JSON.parse(raw) : null;
  });

  const isAuthed = !!user;

  // Placeholder login (future: backend auth)
  const login = async ({ phoneOrEmail }) => {
    const fakeUser = { id: "u1", role: "client", phoneOrEmail, name: "Client" };
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