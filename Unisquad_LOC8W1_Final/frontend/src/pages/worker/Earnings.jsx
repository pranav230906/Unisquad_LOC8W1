import React from "react";
import { IndianRupee, TrendingUp, Briefcase, Calendar, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const mockEarnings = {
  total: "₹45,200",
  thisMonth: "₹12,800",
  jobs: [
    { id: 1, title: "AC Cleaning", date: "Feb 20, 2024", amount: "₹1,200", status: "Paid" },
    { id: 2, title: "Furniture Assembly", date: "Feb 18, 2024", amount: "₹850", status: "Processing" },
    { id: 3, title: "Wall Painting", date: "Feb 15, 2024", amount: "₹4,500", status: "Paid" },
    { id: 4, title: "Switchboard Repair", date: "Feb 10, 2024", amount: "₹300", status: "Paid" },
  ],
};

const statusConfig = {
  Paid: { label: "Paid", icon: CheckCircle, bg: "#dcfce7", color: "#16a34a" },
  Processing: { label: "Processing", icon: Clock, bg: "#fef3c7", color: "#d97706" },
};

const Earnings = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">{t("earnings")}</h1>
        <p className="text-sm text-[#6B7280] mt-1">Track your income and payment history.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Total Earnings hero */}
        <div className="relative overflow-hidden rounded-[10px] p-6 text-white"
          style={{ background: "linear-gradient(135deg, #1E3A8A 0%, #1e40af 100%)" }}>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <IndianRupee className="w-5 h-5 text-blue-200" />
              <p className="text-blue-200 text-sm font-semibold uppercase tracking-wide">
                {t("total_earnings")}
              </p>
            </div>
            <h2 className="text-4xl font-bold">{mockEarnings.total}</h2>
            <p className="text-blue-200 text-sm mt-2">All-time earnings</p>
          </div>
          {/* Decorative */}
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-white/5" />
          <div className="absolute -right-2 -bottom-10 w-20 h-20 rounded-full bg-white/5" />
        </div>

        {/* This Month */}
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-[#6B7280]" />
            <p className="text-[#6B7280] text-sm font-semibold uppercase tracking-wide">
              {t("this_month")}
            </p>
          </div>
          <h2 className="text-4xl font-bold text-[#111827]">{mockEarnings.thisMonth}</h2>
          <div className="mt-3 flex items-center gap-2 text-[#16a34a]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+12% from last month</span>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
          <Briefcase className="w-5 h-5 text-[#1E3A8A]" />
          <h3 className="text-base font-bold text-[#111827]">{t("completed_jobs")}</h3>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {mockEarnings.jobs.map((job) => {
            const cfg = statusConfig[job.status] || statusConfig.Paid;
            const StatusIcon = cfg.icon;
            return (
              <div
                key={job.id}
                className="flex items-center justify-between px-5 py-4 hover:bg-[#F9FAFB] transition-colors min-h-[64px]"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-semibold text-[#111827] text-sm truncate">{job.title}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{job.date}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-bold text-[#111827] text-sm">{job.amount}</span>
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    <StatusIcon className="w-3 h-3" />
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Earnings;
