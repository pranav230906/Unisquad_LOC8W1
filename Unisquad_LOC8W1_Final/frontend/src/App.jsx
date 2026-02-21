import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ClientRoutes from "./routes/ClientRoutes";
import WorkerRoutes from "./routes/WorkerRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import OTPVerification from "./pages/auth/OTPVerification";

const DemoHome = () => (
  <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
    <h1 className="text-5xl font-black text-slate-900 mb-4 tracking-tight">UNISQUAD <span className="text-blue-600">LOC8W1</span></h1>
    <p className="text-slate-500 text-lg mb-12 max-w-lg">Welcome to the Unisquad Multilingual Service Marketplace Demo. Please select an interface to explore.</p>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
      <Link to="/client" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">🏠</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Client Portal</h2>
        <p className="text-slate-500">Post jobs, track workers, and manage your service requests.</p>
      </Link>

      <Link to="/worker" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
        <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-colors">🔧</div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Worker Portal</h2>
        <p className="text-slate-500">Manage availability, accept jobs, and track your earnings.</p>
      </Link>
    </div>

    <div className="mt-12 flex gap-4">
      <Link to="/auth/login" className="text-sm font-bold text-slate-400 hover:text-slate-900">Auth Pages</Link>
      <span className="text-slate-200">|</span>
      <Link to="/admin" className="text-sm font-bold text-slate-400 hover:text-slate-900">Admin Panel</Link>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<DemoHome />} />

      {/* Module Routes */}
      <Route path="/client/*" element={<ClientRoutes />} />
      <Route path="/worker/*" element={<WorkerRoutes />} />

      {/* Auth Routes */}
      <Route path="/auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="otp" element={<OTPVerification />} />
      </Route>

      {/* Admin placeholder */}
      <Route path="/admin/*" element={<AdminRoutes />} />

      {/* 404 Redirect to Home */}
      <Route path="*" element={<DemoHome />} />
    </Routes>
  );
}

export default App;
