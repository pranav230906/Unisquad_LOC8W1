import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// ⚠️ DEV ONLY: Set to true to bypass login and access all dashboards directly.
// Set back to false before committing or deploying.
const DEV_BYPASS = false;

export default function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const loc = useLocation();

  if (DEV_BYPASS) return children;

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: loc.pathname }} />;
  }
  return children;
}