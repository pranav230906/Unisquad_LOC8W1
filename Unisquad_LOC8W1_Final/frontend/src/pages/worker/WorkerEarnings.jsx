import React from "react";
import { IndianRupee, TrendingUp, Calendar } from "lucide-react";

export default function WorkerEarnings() {
    const history = [
        { id: 1, title: "Bathroom Plumbing", date: "Feb 20, 2026", amount: "₹650", status: "paid" },
        { id: 2, title: "Kitchen Renovation", date: "Feb 19, 2026", amount: "₹3500", status: "paid" },
        { id: 3, title: "Light Fixture Installation", date: "Feb 18, 2026", amount: "₹450", status: "paid" },
        { id: 4, title: "AC Repair", date: "Feb 17, 2026", amount: "₹800", status: "paid" },
    ];

    return (
        <div className="animate-in space-y-6 max-w-4xl pb-10">
            <h1 className="text-[22px] font-bold text-[#111827]">Earnings</h1>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {/* Total Earnings */}
                <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-[#16a34a]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">Total Earnings</p>
                        <p className="text-[22px] font-extrabold text-[#111827]">₹45600</p>
                    </div>
                </div>

                {/* This Month */}
                <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#dbeafe] flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-[#1E3A8A]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">This Month</p>
                        <p className="text-[22px] font-extrabold text-[#111827]">₹10000</p>
                    </div>
                </div>

                {/* Pending */}
                <div className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E7EB] p-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ffedd5] flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#f97316]" strokeWidth={2.5} />
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">Pending</p>
                        <p className="text-[22px] font-extrabold text-[#111827]">₹2800</p>
                    </div>
                </div>
            </div>

            <h2 className="text-[17px] font-bold text-[#111827] mb-4">Earnings History</h2>

            <div className="bg-white border border-[#E5E7EB] rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
                <div className="divide-y divide-[#F3F4F6]">
                    {history.map(item => (
                        <div key={item.id} className="p-5 flex justify-between items-center hover:bg-[#F9FAFB] transition-colors">
                            <div>
                                <h3 className="text-[16px] font-bold text-[#111827] mb-1">{item.title}</h3>
                                <p className="text-[13px] font-semibold text-[#6B7280]">{item.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="bg-[#1E3A8A] text-white text-[11px] font-bold px-2 py-0.5 rounded-[4px]">
                                    {item.status}
                                </span>
                                <span className="text-[17px] font-extrabold text-[#111827] w-[60px] text-right">
                                    {item.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
