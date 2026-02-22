import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusSquare,
  Mic,
  Users,
  Activity,
  CheckCircle,
  ArrowRight,
  Star,
  BadgeCheck,
  MapPin,
  Phone,
  Clock,
  Navigation2,
  Calendar
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { getClientJobs } from "../../services/jobService.js";
import { useAuth } from "../../context/AuthContext.jsx";

const RECOMMENDED_WORKERS = [
  { id: "w1", name: "Ramesh Patil", skill: "Electrician", rating: 4.7, jobs: 120, distanceKm: 1.2, priceFrom: 299, image: "https://i.pravatar.cc/150?u=w1" },
  { id: "w4", name: "Ajay Sutar", skill: "Carpenter", rating: 4.8, jobs: 210, distanceKm: 3.0, priceFrom: 399, image: "https://i.pravatar.cc/150?u=w4" },
  { id: "w2", name: "Sohail Khan", skill: "Plumber", rating: 4.5, jobs: 85, distanceKm: 2.8, priceFrom: 349, image: "https://i.pravatar.cc/150?u=w2" },
];

function ClientDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getClientJobs();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const activeJobs = jobs.filter(job => job.status !== "completed");
  const activeJob = activeJobs[0]; // Get first active job for display

  const stats = [
    { label: "Active Jobs", value: activeJobs.length, icon: Activity, color: "#1E3A8A", bg: "#dbeafe" },
    { label: "Total Jobs", value: jobs.length, icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { label: "Masked Calls", value: "ON", icon: Phone, color: "#F97316", bg: "#ffedd5" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in pb-8">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#1E3A8A] p-8 text-white shadow-xl shadow-blue-900/10">
        <div className="relative z-10 max-w-2xl">
          <p className="text-blue-100 font-bold mb-2 text-xs tracking-[0.2em] uppercase">
            Hi, {user?.name?.split(' ')[0] || "Friend"}! 👋
          </p>
          <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">
            Need help with<br />a task today?
          </h1>
          <p className="text-blue-200/90 text-[15px] font-medium mb-8 leading-relaxed">
            Connect with verified professionals for plumbing, electrical,<br className="hidden md:block" /> carpentry, and more in minutes.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/client/post-job">
              <button className="bg-white text-[#1E3A8A] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg shadow-black/10">
                <PlusSquare className="w-5 h-5" />
                Post a Job
              </button>
            </Link>
            <Link to="/client/voice-post-job">
              <button className="bg-white/15 text-white backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/25 transition-all flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Voice Post
              </button>
            </Link>
            <Link to="/client/workers">
              <button className="bg-transparent text-white border-2 border-white/30 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-all flex items-center gap-2">
                <Users className="w-5 h-5" />
                Browse Workers
              </button>
            </Link>
          </div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute -right-12 -top-12 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute right-12 top-12 md:top-auto md:bottom-12 opacity-20 hidden lg:block">
          <Navigation2 className="w-48 h-48 rotate-45 text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (Stats + Recommended) */}
        <div className="lg:col-span-8 space-y-6">

          {/* Active Booking Card (Figma Style) */}
          {activeJob ? (
            <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden">
              <div className="bg-yellow-50/50 px-6 py-3 border-b border-yellow-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest">Active Job</span>
                </div>
                <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-widest bg-yellow-100/50 px-2 py-0.5 rounded-full border border-yellow-200/50">
                  {activeJob.status}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-extrabold text-[#111827]">{activeJob.title}</h3>
                    <p className="text-sm font-semibold text-[#6B7280]">{activeJob.location}</p>
                    <p className="text-xs text-gray-500 mt-1">Budget: ₹{activeJob.budget}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#1E3A8A]">15</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">min arrival</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => navigate(`/client/track/${activeJob.id}`)}
                    className="flex-1 bg-[#1E3A8A] text-white py-3.5 rounded-xl font-bold text-[13px] hover:bg-[#1e40af] transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10"
                  >
                    <Navigation2 className="w-4 h-4" /> View Details
                  </button>
                  <button
                    onClick={() => alert("Connecting masked call...")}
                    className="flex-none px-6 bg-green-50 text-green-600 border border-green-100 py-3.5 rounded-xl font-bold text-[13px] hover:bg-green-100 transition-all flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] p-8 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-sm font-bold text-gray-900">No active bookings</h3>
              <p className="text-xs font-semibold text-gray-400 mt-1">Book a pro to see live updates</p>
            </div>
          )}

          {/* Recommended Professionals */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-black text-[#111827]">Recommended Experts</h2>
              <Link to="/client/workers" className="text-xs font-bold text-[#1E3A8A] hover:underline uppercase tracking-wide">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {RECOMMENDED_WORKERS.map((w) => (
                <div key={w.id} className="bg-white p-5 rounded-[20px] shadow-sm border border-[#F3F4F6] hover:border-blue-200 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <img src={w.image} className="w-10 h-10 rounded-full object-cover" alt={w.name} />
                    <div>
                      <h4 className="text-sm font-extrabold text-[#111827] group-hover:text-[#1E3A8A] transition-colors">{w.name}</h4>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-[#6B7280]">
                        <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                        <span>{w.rating}</span>
                        <span className="text-gray-300 mx-1">•</span>
                        <span>{w.distanceKm}km</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xs font-black text-[#111827]">₹{w.priceFrom}</p>
                    <button
                      onClick={() => navigate('/client/workers')}
                      className="text-[10px] font-black text-[#1E3A8A] bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors uppercase"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Overview + History) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Stats Overview */}
          <div className="space-y-3">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Today's Overview</h2>
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={i} className="bg-white rounded-[20px] shadow-sm p-4 border border-[#F3F4F6] flex items-center gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <Icon className="w-5 h-5" style={{ color: s.color }} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-[#111827] leading-none">{s.value}</p>
                    <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wide mt-1">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Recent Bookings List */}
          <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F3F4F6]">
              <h2 className="text-sm font-black text-[#111827] uppercase tracking-wide">Recent Activity</h2>
            </div>
            {jobs.length === 0 ? (
              <div className="p-8 text-center text-[13px] font-semibold text-gray-400">
                No activity yet
              </div>
            ) : (
              <div className="divide-y divide-[#F3F4F6]">
                {jobs.slice(0, 5).map((job) => (
                  <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                    <div>
                      <p className="text-[13px] font-extrabold text-[#111827]">{job.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter shadow-sm border ${
                          job.status === "completed" || job.status === "COMPLETED"
                            ? "bg-green-50 text-green-600 border-green-100"
                            : job.status === "assigned"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-yellow-50 text-yellow-600 border-yellow-100"
                        }`}>
                          {job.status}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <Link to={`/client/track/${job.id}`}>
                      <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 hover:text-[#1E3A8A] hover:bg-blue-50 transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
            <Link
              to="/client/history"
              className="block w-full text-center py-4 text-[11px] font-black text-[#6B7280] uppercase tracking-widest bg-gray-50/50 hover:bg-gray-100 transition-colors border-t border-[#F3F4F6]"
            >
              View Full History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboard;