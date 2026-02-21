import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";

// Mock Data
const mockStats = {
  totalJobs: 156,
  completedJobs: 142,
  pendingJobs: 8,
  totalEarnings: "₹45,200",
  averageRating: 4.8,
};

const WorkerDashboard = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  // TODO: Replace with workerService.getDashboardStats()

  const stats = [
    { title: t("total_jobs"), value: mockStats.totalJobs, icon: "📋", color: "text-blue-600" },
    { title: t("completed_jobs"), value: mockStats.completedJobs, icon: "✅", color: "text-green-600" },
    { title: t("pending_jobs"), value: mockStats.pendingJobs, icon: "⏳", color: "text-yellow-600" },
    { title: t("total_earnings"), value: mockStats.totalEarnings, icon: "💰", color: "text-indigo-600" },
    { title: t("avg_rating"), value: `${mockStats.averageRating} ★`, icon: "⭐", color: "text-orange-600" },
  ];

  const handleVoiceCommand = (command) => {
    if (command.includes("earnings") || command.includes("कमाई") || command.includes("ఆదాయం")) {
      navigate("/worker/earnings");
    } else if (command.includes("incoming") || command.includes("काम") || command.includes("పనులు")) {
      navigate("/worker/incoming");
    } else if (command.includes("profile") || command.includes("प्रोफ़ाइल") || command.includes("ప్రొఫైల్")) {
      navigate("/worker/profile");
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 relative">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">{t("welcome")}</h1>
          <p className="text-gray-500 mt-1 pb-4">{t("performance_overview")}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <VoiceInputButton onCommand={handleVoiceCommand} />
          <p className="text-[10px] text-gray-400 font-medium italic max-w-[150px] text-right">
            {t("voice_command_hint")}
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className={`text-2xl mb-2 ${stat.color}`}>{stat.icon}</div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-tight">{stat.title}</h3>
            <p className="text-2xl font-black text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">{t("quick_actions")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/worker/incoming" className="flex items-center justify-center gap-3 p-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <span>📬</span> {t("incoming_jobs")}
          </Link>
          <Link to="/worker/profile" className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all">
            <span>👤</span> {t("edit_profile")}
          </Link>
          <Link to="/worker/availability" className="flex items-center justify-center gap-3 p-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all">
            <span>📅</span> {t("set_availability")}
          </Link>
        </div>
      </div>

      {/* Recent Activity Mockup */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">{t("recent_jobs")}</h2>
          <button className="text-sm font-bold text-blue-600">{t("view_all")}</button>
        </div>
        <div className="divide-y divide-gray-50">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="p-6 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-xl font-bold">
                  {i === 0 ? "🔧" : i === 1 ? "💡" : "🧹"}
                </div>
                <div>
                  <p className="font-bold text-gray-900">Job Reference #{1024 + i}</p>
                  <p className="text-sm text-gray-500">Completed on March {20 - i}, 2024</p>
                </div>
              </div>
              <p className="font-extrabold text-gray-900">₹{800 + i * 400}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
