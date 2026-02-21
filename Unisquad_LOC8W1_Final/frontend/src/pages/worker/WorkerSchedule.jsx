import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";

export default function WorkerSchedule() {
    const [activeTab, setActiveTab] = useState("upcoming");

    const schedules = [
        {
            id: 1,
            title: "Roof Repair",
            client: "Mehta Residence",
            date: "Feb 22, 2026",
            time: "9:00 AM",
            status: "scheduled"
        },
        {
            id: 2,
            title: "Garden Maintenance",
            client: "Joshi Villa",
            date: "Feb 23, 2026",
            time: "2:00 PM",
            status: "scheduled"
        }
    ];

    return (
        <div className="animate-in space-y-6 max-w-4xl pb-10">
            <h1 className="text-[22px] font-bold text-[#111827]">Schedule</h1>

            {/* Tabs */}
            <div className="flex p-1 bg-[#F3F4F6] rounded-[10px] w-max gap-1">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-10 py-2 rounded-[8px] text-[14px] font-bold transition-all shadow-sm ${activeTab === "upcoming" ? "bg-white text-[#111827]" : "text-[#6B7280] shadow-none hover:text-[#374151]"}`}>
                    Upcoming
                </button>
                <button
                    onClick={() => setActiveTab("completed")}
                    className={`px-10 py-2 rounded-[8px] text-[14px] font-bold transition-all shadow-sm ${activeTab === "completed" ? "bg-white text-[#111827]" : "text-[#6B7280] shadow-none hover:text-[#374151]"}`}>
                    Completed
                </button>
            </div>

            <div className="space-y-4">
                {schedules.map(item => (
                    <div key={item.id} className="bg-white border border-[#E5E7EB] rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex justify-between items-start">
                        <div>
                            <h3 className="text-[17px] font-bold text-[#111827] mb-0.5">{item.title}</h3>
                            <p className="text-[13px] font-semibold text-[#6B7280] mb-4">{item.client}</p>

                            <div className="flex flex-col gap-2 text-[13px] font-bold text-[#6B7280]">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-[#9CA3AF]" /> {item.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-[#9CA3AF]" /> {item.time}
                                </div>
                            </div>
                        </div>

                        <span className="bg-[#F3F4F6] text-[#4B5563] text-[11px] font-extrabold px-3 py-1 rounded-[6px] lowercase tracking-wide">
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
