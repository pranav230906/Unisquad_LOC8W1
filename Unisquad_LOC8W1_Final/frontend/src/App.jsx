import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Route guard
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import OTPVerification from "./pages/auth/OTPVerification.jsx";
import AuthProfileSetup from "./pages/auth/AuthProfileSetup.jsx";

// Worker layout + pages
import WorkerLayout from "./pages/worker/layout/WorkerLayout.jsx";
import WorkerDashboard from "./pages/worker/WorkerDashboard.jsx";
import WorkerJobs from "./pages/worker/WorkerJobs.jsx";
import WorkerSchedule from "./pages/worker/WorkerSchedule.jsx";
import WorkerEarnings from "./pages/worker/WorkerEarnings.jsx";
import WorkerReviews from "./pages/worker/WorkerReviews.jsx";
import WorkerProfile from "./pages/worker/WorkerProfile.jsx";
import WorkerSettings from "./pages/worker/WorkerSettings.jsx";

// Client layout + pages
import ClientLayout from "./components/layout/ClientLayout.jsx";
import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import PostJob from "./pages/client/PostJob.jsx";
import WorkerList from "./pages/client/WorkerList.jsx";
import BookingHistory from "./pages/client/BookingHistory.jsx";
import Feedback from "./pages/client/Feedback.jsx";
import LiveTracking from "./pages/client/LiveTracking.jsx";
import VoicePostJob from "./pages/client/VoicePostJob.jsx";
import ClientProfile from "./pages/client/ClientProfile.jsx";
import ClientReviews from "./pages/client/ClientReviews.jsx";
import NotFound from "./pages/NotFound.jsx";

// Admin layout + pages
import AdminLayout from "./components/layout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import WorkerVerification from "./pages/admin/WorkerVerification.jsx";
import JobMonitoring from "./pages/admin/JobMonitoring.jsx";
import Analytics from "./pages/admin/Analytics.jsx";

// NOTE: BrowserRouter, LanguageProvider, AuthProvider, ToastProvider
// are all provided by main.jsx — do NOT wrap them here again.
export default function App() {
  return (
    <Routes>
      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/auth/login" replace />} />

      {/* Auth routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/otp" element={<OTPVerification />} />
      <Route path="/auth/profile" element={<AuthProfileSetup />} />

      {/* Worker routes */}
      <Route
        path="/worker"
        element={
          <ProtectedRoute>
            <WorkerLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<WorkerDashboard />} />
        <Route path="jobs" element={<WorkerJobs />} />
        <Route path="schedule" element={<WorkerSchedule />} />
        <Route path="earnings" element={<WorkerEarnings />} />
        <Route path="reviews" element={<WorkerReviews />} />
        <Route path="profile" element={<WorkerProfile />} />
        <Route path="settings" element={<WorkerSettings />} />
      </Route>

      {/* Client routes */}
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
        <Route path="workers" element={<WorkerList />} />
        <Route path="history" element={<BookingHistory />} />
        <Route path="feedback/:bookingId" element={<Feedback />} />
        <Route path="track/:bookingId" element={<LiveTracking />} />
        <Route path="voice-post-job" element={<VoicePostJob />} />
        <Route path="profile" element={<ClientProfile />} />
        <Route path="reviews" element={<ClientReviews />} />
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="verification" element={<WorkerVerification />} />
        <Route path="jobs" element={<JobMonitoring />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
