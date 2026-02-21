import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Providers
import { AuthProvider } from "./context/AuthContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";

// Route guard
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// Auth pages
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import OTPVerification from "./pages/auth/OTPVerification.jsx";

// Worker layout + pages
import WorkerLayout from "./pages/worker/layout/WorkerLayout.jsx";
import WorkerDashboard from "./pages/worker/WorkerDashboard.jsx";
import IncomingJobs from "./pages/worker/IncomingJobs.jsx";
import Earnings from "./pages/worker/Earnings.jsx";
import AvailabilityManager from "./pages/worker/AvailabilityManager.jsx";
import ProfileSetup from "./pages/worker/ProfileSetup.jsx";
import Reviews from "./pages/worker/Reviews.jsx";
import Navigation from "./pages/worker/Navigation.jsx";

// Client layout + pages
import ClientLayout from "./components/layout/ClientLayout.jsx";
import ClientDashboard from "./pages/client/ClientDashboard.jsx";
import PostJob from "./pages/client/PostJob.jsx";
import WorkerList from "./pages/client/WorkerList.jsx";
import BookingHistory from "./pages/client/BookingHistory.jsx";
import Feedback from "./pages/client/Feedback.jsx";
import LiveTracking from "./pages/client/LiveTracking.jsx";
import VoicePostJob from "./pages/client/VoicePostJob.jsx";
import NotFound from "./pages/NotFound.jsx";

// Admin layout + pages
import AdminLayout from "./components/layout/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import UserManagement from "./pages/admin/UserManagement.jsx";
import WorkerVerification from "./pages/admin/WorkerVerification.jsx";
import JobMonitoring from "./pages/admin/JobMonitoring.jsx";
import Analytics from "./pages/admin/Analytics.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <Routes>
              {/* Default redirect */}
              <Route path="/" element={<Navigate to="/auth/login" replace />} />

              {/* Auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/otp" element={<OTPVerification />} />

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
                <Route path="incoming" element={<IncomingJobs />} />
                <Route path="earnings" element={<Earnings />} />
                <Route path="availability" element={<AvailabilityManager />} />
                <Route path="profile" element={<ProfileSetup />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="navigation" element={<Navigation />} />
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
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
