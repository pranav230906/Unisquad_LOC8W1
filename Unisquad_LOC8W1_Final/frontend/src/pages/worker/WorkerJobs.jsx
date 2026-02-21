import React, { useState } from "react";
import { Search, MapPin, Clock } from "lucide-react";

const jobs = [
    {
        id: 1,
        title: "Plumbing Repair",
        urgent: true,
        price: "₹800",
        category: "Plumbing",
        client: "Sharma Residence",
        desc: "Kitchen sink leaking, needs immediate attention",
        distance: "1.2 km",
        location: "Sector 15, Noida",
        time: "10:00 AM • Today"
    },
    {
        id: 2,
        title: "Electrical Wiring",
        urgent: false,
        price: "₹1200",
        category: "Electrical",
        client: "Verma Apartment",
        desc: "Install new ceiling fan and replace switch boards",
        distance: "2.5 km",
        location: "Indirapuram, Ghaziabad",
        time: "2:00 PM • Today"
    }
];

export default function WorkerJobs() {
    const [activeTab, setActiveTab] = useState("nearby");

    return (
        <div className="animate-in space-y-6 max-w-4xl pb-10">
            <h1 className="text-[22px] font-bold text-[#111827]">Jobs</h1>

            {/* Search */}
            <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full h-[44px] bg-white border border-[#E5E7EB] rounded-[8px] pl-10 pr-4 text-[14px] text-[#111827] focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder-[#9CA3AF] shadow-sm font-semibold"
                />
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-[#F3F4F6] rounded-[10px] w-max gap-1">
                <button
                    onClick={() => setActiveTab("nearby")}
                    className={`px-10 py-2 rounded-[8px] text-[14px] font-bold transition-all shadow-sm ${activeTab === "nearby" ? "bg-white text-[#111827]" : "text-[#6B7280] shadow-none hover:text-[#374151]"}`}>
                    Nearby Jobs
                </button>
                <button
                    onClick={() => setActiveTab("history")}
                    className={`px-10 py-2 rounded-[8px] text-[14px] font-bold transition-all shadow-sm ${activeTab === "history" ? "bg-white text-[#111827]" : "text-[#6B7280] shadow-none hover:text-[#374151]"}`}>
                    Job History
                </button>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white border border-[#E5E7EB] rounded-[12px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-[17px] font-bold text-[#111827]">{job.title}</h3>
                                    {job.urgent && (
                                        <span className="bg-[#EF4444] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px] flex items-center gap-1 uppercase tracking-wide">
                                            <span className="text-[10px] font-serif pr-0.5">!</span> Urgent
                                        </span>
                                    )}
                                </div>
                                <p className="text-[13px] font-semibold text-[#6B7280]">{job.client}</p>
                            </div>
                            <div className="text-right flex flex-col items-end gap-1.5">
                                <p className="text-[20px] font-extrabold text-[#111827] leading-none mb-1">{job.price}</p>
                                <span className="bg-gray-100 text-[#4B5563] text-[12px] font-bold px-2.5 py-1 rounded-[6px]">
                                    {job.category}
                                </span>
                            </div>
                        </div>

                        <p className="text-[15px] font-semibold text-[#374151] mb-4">
                            {job.desc}
                        </p>

                        <div className="flex items-center gap-3 text-[13px] font-bold text-[#6B7280] mb-5">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" />
                                <span>{job.distance} • {job.location}</span>
                            </div>
                            <div className="w-[3px] h-[3px] rounded-full bg-gray-300"></div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                <span>{job.time}</span>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => alert("Job accepted! Generating navigation...")}
                                className="flex-1 bg-[#1E3A8A] hover:bg-[#1e40af] text-white text-[15px] font-bold rounded-[8px] py-[10px] transition-colors shadow-sm"
                            >
                                Accept Job
                            </button>
                            <button
                                onClick={() => alert(`Opening details for ${job.title}`)}
                                className="flex-1 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] text-[15px] font-bold rounded-[8px] py-[10px] transition-colors shadow-sm"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
