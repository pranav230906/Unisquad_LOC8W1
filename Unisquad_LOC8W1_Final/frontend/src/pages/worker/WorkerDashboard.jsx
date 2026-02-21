import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  CheckCircle,
  Clock,
  IndianRupee,
  Star,
  Inbox,
  User,
  CalendarDays,
  ChevronRight,
  Wrench,
  Zap,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";
import Button from "../../components/ui/Button.jsx";

const mockStats = {
  totalJobs: 156,
  completedJobs: 142,
  pendingJobs: 8,
  totalEarnings: "₹45,200",
  averageRating: 4.8,
};

const recentJobs = [
  { id: 1024, icon: Wrench, title: "Plumbing Fix", date: "Mar 20, 2024", amount: "₹800" },
  { id: 1025, icon: Zap, title: "Electrical Repair", date: "Mar 19, 2024", amount: "₹1,200" },
  { id: 1026, icon: Sparkles, title: "Deep Cleaning", date: "Mar 18, 2024", amount: "₹1,600" },
];

const WorkerDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { title: t("total_jobs"), value: mockStats.totalJobs, icon: Briefcase, color: "#1E3A8A", bg: "#dbeafe" },
    { title: t("completed_jobs"), value: mockStats.completedJobs, icon: CheckCircle, color: "#16a34a", bg: "#dcfce7" },
    { title: t("pending_jobs"), value: mockStats.pendingJobs, icon: Clock, color: "#d97706", bg: "#fef3c7" },
    { title: t("total_earnings"), value: mockStats.totalEarnings, icon: IndianRupee, color: "#1E3A8A", bg: "#dbeafe" },
    { title: t("avg_rating"), value: `${mockStats.averageRating}`, icon: Star, color: "#F97316", bg: "#ffedd5" },
  ];

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();
    if (cmd.includes("earnings") || cmd.includes("कमाई") || cmd.includes("ఆదాయం")) {
      navigate("/worker/earnings");
    } else if (cmd.includes("incoming") || cmd.includes("jobs") || cmd.includes("काम")) {
      navigate("/worker/incoming");
    } else if (cmd.includes("profile") || cmd.includes("प्रोफ़ाइल")) {
      navigate("/worker/profile");
    }
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">{t("welcome")} 👋</h1>
          <p className="text-[#6B7280] mt-1 text-sm">{t("performance_overview")}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <VoiceInputButton onCommand={handleVoiceCommand} />
          <p className="text-[10px] text-[#9CA3AF] italic max-w-[120px] text-right leading-tight">
            {t("voice_command_hint")}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4 flex flex-col gap-2"
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ background: stat.bg }}
              >
                <Icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <p className="text-[11px] font-semibold text-[#6B7280] uppercase tracking-wide leading-tight">
                {stat.title}
              </p>
              <p className="text-xl font-bold text-[#111827]">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <h2 className="text-base font-bold text-[#111827] mb-4">{t("quick_actions")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link to="/worker/incoming">
            <Button fullWidth>
              <Inbox className="w-5 h-5" />
              {t("incoming_jobs")}
            </Button>
          </Link>
          <Link to="/worker/profile">
            <Button fullWidth variant="secondary">
              <User className="w-5 h-5" />
              {t("edit_profile")}
            </Button>
          </Link>
          <Link to="/worker/availability">
            <Button fullWidth variant="secondary">
              <CalendarDays className="w-5 h-5" />
              {t("set_availability")}
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6]">
          <h2 className="text-base font-bold text-[#111827]">{t("recent_jobs")}</h2>
          <button className="text-sm font-semibold text-[#1E3A8A] hover:underline">
            {t("view_all")}
          </button>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {recentJobs.map((job) => {
            const Icon = job.icon;
            return (
              <div
                key={job.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors min-h-[64px]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#dbeafe] rounded-[10px] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1E3A8A]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">Job #{job.id} – {job.title}</p>
                    <p className="text-xs text-[#6B7280] mt-0.5">{job.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827] text-sm">{job.amount}</span>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
