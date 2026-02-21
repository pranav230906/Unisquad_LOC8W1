import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import OTPVerification from "./pages/auth/OTPVerification.jsx";

import ClientLayout from "./components/layout/ClientLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import PostJob from "./pages/client/PostJob.jsx";
import VoicePostJob from "./pages/client/VoicePostJob.jsx";
import WorkerList from "./pages/client/WorkerList.jsx";
import LiveTracking from "./pages/client/LiveTracking.jsx";
import Feedback from "./pages/client/Feedback.jsx";
import BookingHistory from "./pages/client/BookingHistory.jsx";

export default function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/otp" element={<OTPVerification />} />

      {/* Client */}
      <Route
        path="/client"
        element={
          <ProtectedRoute>
            <ClientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClientDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="voice-post-job" element={<VoicePostJob />} />
        <Route path="workers" element={<WorkerList />} />
        <Route path="track/:bookingId" element={<LiveTracking />} />
        <Route path="feedback/:bookingId" element={<Feedback />} />
        <Route path="history" element={<BookingHistory />} />
      </Route>

      <Route path="/" element={<Navigate to="/client" replace />} />
      <Route path="*" element={<Navigate to="/client" replace />} />
    </Routes>
  );
}