import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusSquare, Mic, Users, Activity, CheckCircle, ArrowRight } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { listBookings } from "../../services/jobService.js";
import { useAuth } from "../../context/AuthContext.jsx";

function ClientDashboard() {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    listBookings().then(setBookings);
  }, []);

  const active = bookings.filter((b) => b.status !== "COMPLETED");

  const statusColors = {
    COMPLETED: { bg: "#dcfce7", color: "#16a34a" },
    ACTIVE: { bg: "#dbeafe", color: "#1E3A8A" },
    PENDING: { bg: "#fef3c7", color: "#d97706" },
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Hero */}
      <div
        className="rounded-[10px] p-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%)" }}
      >
        <div className="relative z-10">
          <p className="text-blue-100 font-semibold mb-1 text-sm tracking-wide uppercase">
            Welcome, {user?.name || user?.phoneOrEmail || "User"}
          </p>
          <h1 className="text-2xl font-bold leading-snug">
            Book trusted professionals near you
          </h1>
          <p className="mt-1 text-sm text-blue-200">
            Electricians, plumbers, carpenters and more — book instantly.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link to="/client/post-job">
              <Button variant="ghost" className="bg-white text-[#1E3A8A] hover:bg-blue-50">
                <PlusSquare className="w-5 h-5" />
                Post a Job
              </Button>
            </Link>
            <Link to="/client/voice-post-job">
              <Button variant="ghost" className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                <Mic className="w-5 h-5" />
                Voice Post
              </Button>
            </Link>
            <Link to="/client/workers">
              <Button variant="ghost" className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                <Users className="w-5 h-5" />
                Browse Workers
              </Button>
            </Link>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -right-2 top-12 w-20 h-20 rounded-full bg-white/5" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Bookings", value: active.length, icon: Activity, color: "#1E3A8A", bg: "#dbeafe" },
          { label: "Total Bookings", value: bookings.length, icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
          { label: "Masked Calls", value: "ON", icon: Activity, color: "#F97316", bg: "#ffedd5" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4">
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center mb-2"
                style={{ background: s.bg }}
              >
                <Icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <p className="text-xl font-bold text-[#111827]">{s.value}</p>
              <p className="text-xs font-medium text-[#6B7280] mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Recent bookings */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
          <h2 className="text-base font-bold text-[#111827]">Recent Bookings</h2>
        </div>
        {bookings.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-[#6B7280]">
            No bookings yet. <Link to="/client/post-job" className="text-[#1E3A8A] font-semibold hover:underline">Post your first job →</Link>
          </div>
        ) : (
          <div className="divide-y divide-[#F3F4F6]">
            {bookings.slice(0, 4).map((b) => {
              const cfg = statusColors[b.status] || statusColors.PENDING;
              return (
                <div key={b.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors min-h-[64px]">
                  <div>
                    <p className="text-sm font-semibold text-[#111827]">#{b.id.slice(0, 6)}</p>
                    <span
                      className="inline-block mt-1 text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      {b.status}
                    </span>
                  </div>
                  <Link to={`/client/track/${b.id}`}>
                    <Button size="sm" variant="secondary">
                      <ArrowRight className="w-4 h-4" />
                      Track
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientDashboard;