import React from "react";
import { Briefcase, MapPin, Clock, CheckCircle, Loader2 } from "lucide-react";

const mockJobs = [
    { id: "j001", title: "AC Repair", client: "Anjali Sharma", worker: "Ramesh Patil", location: "Sector 56, Noida", status: "COMPLETED", date: "21 Feb 2026" },
    { id: "j002", title: "Plumbing", client: "Vikram Seth", worker: "Sohail Khan", location: "Indirapuram", status: "EN_ROUTE", date: "21 Feb 2026" },
    { id: "j003", title: "Home Cleaning", client: "Pooja Hegde", worker: "Unassigned", location: "Sector 18, Noida", status: "PENDING", date: "21 Feb 2026" },
    { id: "j004", title: "Electrical", client: "Sanjay Gupta", worker: "Ajay Sutar", location: "Vaishali, Ghaziabad", status: "ASSIGNED", date: "20 Feb 2026" },
];

const statusConfig = {
    COMPLETED: { label: "Completed", icon: CheckCircle, bg: "#dcfce7", color: "#16a34a" },
    EN_ROUTE: { label: "En Route", icon: Loader2, bg: "#ffedd5", color: "#F97316" },
    ASSIGNED: { label: "Assigned", icon: Loader2, bg: "#dbeafe", color: "#1E3A8A" },
    PENDING: { label: "Pending", icon: Clock, bg: "#fef3c7", color: "#d97706" },
};

export default function JobMonitoring() {
    return (
        <div className="space-y-5 animate-in">
            <header>
                <h1 className="text-2xl font-bold text-[#111827]">Job Monitoring</h1>
                <p className="text-sm text-[#6B7280] mt-1">Live overview of all platform jobs.</p>
            </header>

            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <Briefcase className="w-5 h-5 text-[#1E3A8A]" />
                    <h2 className="text-base font-bold text-[#111827]">All Jobs ({mockJobs.length})</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    {mockJobs.map((j) => {
                        const cfg = statusConfig[j.status] || statusConfig.PENDING;
                        const Icon = cfg.icon;
                        return (
                            <div key={j.id} className="px-5 py-4 min-h-[72px]">
                                <div className="flex flex-wrap items-start justify-between gap-2">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-bold text-[#111827]">{j.title}</p>
                                            <span className="text-xs text-[#9CA3AF]">#{j.id}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-3 mt-1">
                                            <span className="text-xs text-[#6B7280] flex items-center gap-1">
                                                <MapPin className="w-3 h-3" /> {j.location}
                                            </span>
                                            <span className="text-xs text-[#6B7280] flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {j.date}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#9CA3AF] mt-1">Client: {j.client} · Worker: {j.worker}</p>
                                    </div>
                                    <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                                        style={{ background: cfg.bg, color: cfg.color }}>
                                        <Icon className={`w-3 h-3 ${j.status === "EN_ROUTE" || j.status === "ASSIGNED" ? "animate-spin" : ""}`} />
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
}
