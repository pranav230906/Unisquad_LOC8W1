import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { History, MapPin, MessageCircle, CheckCircle, Clock, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { listBookings } from "../../services/jobService.js";

const statusConfig = {
  COMPLETED: { label: "Completed", icon: CheckCircle, bg: "#dcfce7", color: "#16a34a" },
  ACTIVE: { label: "Active", icon: Loader2, bg: "#dbeafe", color: "#1E3A8A" },
  ASSIGNED: { label: "Assigned", icon: Loader2, bg: "#dbeafe", color: "#1E3A8A" },
  EN_ROUTE: { label: "En Route", icon: Loader2, bg: "#ffedd5", color: "#F97316" },
  ARRIVED: { label: "Arrived", icon: CheckCircle, bg: "#ffedd5", color: "#F97316" },
  PENDING: { label: "Pending", icon: Clock, bg: "#fef3c7", color: "#d97706" },
};

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listBookings().then((data) => {
      setBookings(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-5 animate-in">
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Booking History</h1>
        <p className="text-sm text-[#6B7280] mt-1">All your past and active bookings.</p>
      </header>

      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
          <History className="w-5 h-5 text-[#1E3A8A]" />
          <h2 className="text-base font-bold text-[#111827]">All Bookings</h2>
        </div>

        {loading ? (
          <div className="divide-y divide-[#F3F4F6]">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between px-5 py-4">
                <div>
                  <div className="skeleton h-4 w-32 mb-2" />
                  <div className="skeleton h-3 w-20" />
                </div>
                <div className="skeleton h-10 w-24" />
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="px-5 py-10 text-center">
            <History className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
            <p className="font-semibold text-[#374151]">No bookings yet</p>
            <p className="text-sm text-[#6B7280] mt-1">
              <Link to="/client/post-job" className="text-[#1E3A8A] font-semibold hover:underline">
                Post your first job →
              </Link>
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F3F4F6]">
            {bookings.map((b) => {
              const cfg = statusConfig[b.status] || statusConfig.PENDING;
              const StatusIcon = cfg.icon;
              return (
                <div key={b.id} className="flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors min-h-[64px]">
                  <div>
                    <p className="text-sm font-bold text-[#111827]">Booking #{b.id.slice(0, 6)}</p>
                    <span
                      className="inline-flex items-center gap-1 mt-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{ background: cfg.bg, color: cfg.color }}
                    >
                      <StatusIcon className={`w-3 h-3 ${b.status === "ACTIVE" || b.status === "EN_ROUTE" || b.status === "ASSIGNED" ? "animate-spin" : ""}`} />
                      {cfg.label}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/client/track/${b.id}`}>
                      <Button size="sm" variant="secondary">
                        <MapPin className="w-4 h-4" />
                        Track
                      </Button>
                    </Link>
                    {b.status === "COMPLETED" && (
                      <Link to={`/client/feedback/${b.id}`}>
                        <Button size="sm">
                          <MessageCircle className="w-4 h-4" />
                          Feedback
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistory;