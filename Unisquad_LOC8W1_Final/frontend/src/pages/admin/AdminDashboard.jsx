import React from "react";
import { Users, Briefcase, Star, IndianRupee, TrendingUp, Activity } from "lucide-react";

const stats = [
    { label: "Total Users", value: "1,284", icon: Users, bg: "#dbeafe", color: "#1E3A8A" },
    { label: "Active Jobs", value: "47", icon: Briefcase, bg: "#dcfce7", color: "#16a34a" },
    { label: "Avg Rating", value: "4.7", icon: Star, bg: "#ffedd5", color: "#F97316" },
    { label: "Revenue (Mo.)", value: "₹2.4L", icon: IndianRupee, bg: "#f3e8ff", color: "#7c3aed" },
];

const recentActivity = [
    { id: 1, text: "New worker verified: Ramesh Patil", time: "2 min ago", type: "success" },
    { id: 2, text: "Job #A1029 marked completed", time: "8 min ago", type: "info" },
    { id: 3, text: "Client reported issue on booking #B2201", time: "15 min ago", type: "warning" },
    { id: 4, text: "New registration: Sohail Khan (Worker)", time: "30 min ago", type: "info" },
    { id: 5, text: "Payout processed: ₹12,000 to 6 workers", time: "1 hr ago", type: "success" },
];

const typeStyles = {
    success: { bg: "#dcfce7", color: "#16a34a" },
    info: { bg: "#dbeafe", color: "#1E3A8A" },
    warning: { bg: "#fef3c7", color: "#d97706" },
};

export default function AdminDashboard() {
    return (
        <div className="space-y-6 animate-in">
            <header>
                <h1 className="text-2xl font-bold text-[#111827]">Admin Dashboard</h1>
                <p className="text-sm text-[#6B7280] mt-1">Platform overview — all metrics at a glance.</p>
            </header>

            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((s) => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4">
                            <div className="w-9 h-9 rounded-[8px] flex items-center justify-center mb-3" style={{ background: s.bg }}>
                                <Icon className="w-4 h-4" style={{ color: s.color }} />
                            </div>
                            <p className="text-xl font-bold text-[#111827]">{s.value}</p>
                            <p className="text-xs font-medium text-[#6B7280] mt-0.5">{s.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <Activity className="w-5 h-5 text-[#1E3A8A]" />
                    <h2 className="text-base font-bold text-[#111827]">Recent Activity</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    {recentActivity.map((a) => {
                        const cfg = typeStyles[a.type];
                        return (
                            <div key={a.id} className="flex items-center justify-between px-5 py-4 min-h-[56px]">
                                <p className="text-sm font-medium text-[#111827]">{a.text}</p>
                                <span className="text-xs font-medium flex-shrink-0 ml-4 px-2 py-0.5 rounded-full"
                                    style={{ background: cfg.bg, color: cfg.color }}>
                                    {a.time}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
