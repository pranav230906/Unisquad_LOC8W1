import React from "react";
import { TrendingUp, Users, Briefcase, Star, IndianRupee } from "lucide-react";

const monthly = [
    { month: "Oct", jobs: 210, revenue: 185000, users: 62 },
    { month: "Nov", jobs: 248, revenue: 218000, users: 74 },
    { month: "Dec", jobs: 275, revenue: 241000, users: 91 },
    { month: "Jan", jobs: 302, revenue: 264000, users: 103 },
    { month: "Feb", jobs: 319, revenue: 281000, users: 117 },
];

const topWorkers = [
    { name: "Ramesh Patil", jobs: 42, rating: 4.9, skill: "Electrician" },
    { name: "Ajay Sutar", jobs: 38, rating: 4.8, skill: "Carpenter" },
    { name: "Sohail Khan", jobs: 31, rating: 4.5, skill: "Plumber" },
];

const max = Math.max(...monthly.map((m) => m.revenue));

export default function Analytics() {
    return (
        <div className="space-y-6 animate-in">
            <header>
                <h1 className="text-2xl font-bold text-[#111827]">Analytics</h1>
                <p className="text-sm text-[#6B7280] mt-1">Platform-wide performance metrics.</p>
            </header>

            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Jobs", value: monthly.reduce((a, m) => a + m.jobs, 0), icon: Briefcase, bg: "#dbeafe", color: "#1E3A8A" },
                    { label: "Total Revenue", value: `₹${(monthly.reduce((a, m) => a + m.revenue, 0) / 1000).toFixed(0)}K`, icon: IndianRupee, bg: "#dcfce7", color: "#16a34a" },
                    { label: "New Users", value: monthly.reduce((a, m) => a + m.users, 0), icon: Users, bg: "#ffedd5", color: "#F97316" },
                    { label: "Avg Rating", value: "4.7", icon: Star, bg: "#f3e8ff", color: "#7c3aed" },
                ].map((s) => {
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

            {/* Revenue bar chart */}
            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
                <div className="flex items-center gap-2 mb-5">
                    <TrendingUp className="w-5 h-5 text-[#1E3A8A]" />
                    <h2 className="text-base font-bold text-[#111827]">Monthly Revenue (₹)</h2>
                </div>
                <div className="flex items-end gap-4 h-32">
                    {monthly.map((m) => {
                        const heightPct = (m.revenue / max) * 100;
                        return (
                            <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5">
                                <span className="text-xs font-semibold text-[#374151]">
                                    {(m.revenue / 1000).toFixed(0)}K
                                </span>
                                <div className="w-full rounded-t-[4px] bg-[#1E3A8A]" style={{ height: `${heightPct}%` }} />
                                <span className="text-xs text-[#9CA3AF]">{m.month}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Top workers */}
            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <Star className="w-5 h-5 text-[#F97316]" fill="#F97316" />
                    <h2 className="text-base font-bold text-[#111827]">Top Workers</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    {topWorkers.map((w, i) => (
                        <div key={w.name} className="flex items-center justify-between px-5 py-4 min-h-[56px]">
                            <div className="flex items-center gap-3">
                                <span className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#1E3A8A] flex items-center justify-center text-xs font-bold">
                                    {i + 1}
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-[#111827]">{w.name}</p>
                                    <p className="text-xs text-[#6B7280]">{w.skill}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-[#111827]">{w.jobs} jobs</p>
                                <div className="flex items-center gap-1 justify-end">
                                    <Star className="w-3 h-3 text-[#F97316]" fill="#F97316" />
                                    <span className="text-xs font-semibold text-[#F97316]">{w.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
