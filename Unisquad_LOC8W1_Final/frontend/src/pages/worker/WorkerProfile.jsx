import React from "react";
import { Mail, Phone, MapPin, Edit, User } from "lucide-react";

export default function WorkerProfile() {
    return (
        <div className="animate-in space-y-5 max-w-4xl pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-[#111827]">Profile</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] shadow-sm rounded-[8px] text-[14px] font-semibold text-[#374151] hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" /> Edit Profile
                </button>
            </div>

            {/* Hero Card */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm flex items-center gap-5">
                <div className="w-24 h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <User className="w-10 h-10 text-[#4B5563]" />
                </div>
                <div>
                    <h2 className="text-[22px] font-bold text-[#111827]">Rajesh Kumar</h2>
                    <p className="text-[15px] font-semibold text-[#6B7280] mb-3">Professional Worker</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-yellow-500 text-[14px]">★</span>
                            <span className="text-[12px] font-bold text-[#4B5563]">4.8 Rating</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-[12px] font-bold text-[#4B5563]">127 Jobs</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-[12px] font-bold text-[#4B5563]">98 Reviews</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-6">
                <h3 className="text-[16px] font-bold text-[#111827]">Contact Information</h3>

                <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">Email</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">rajesh.kumar@example.com</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">Phone</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">+91 98765 43210</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">Location</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">Sector 15, Noida, Uttar Pradesh</p>
                    </div>
                </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827] flex items-center gap-2">
                    <div className="w-5 h-5">💼</div> Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["Plumbing", "Electrical", "AC Service", "Carpentry"].map(skill => (
                        <span key={skill} className="px-4 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] font-bold text-[#374151]">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827] flex items-center gap-2">
                    <div className="w-5 h-5">⚑</div> Languages
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["English", "Hindi", "Tamil"].map(lang => (
                        <span key={lang} className="px-4 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] font-bold text-[#374151]">
                            {lang}
                        </span>
                    ))}
                </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                <h3 className="text-[16px] font-bold text-[#111827] mb-6">Statistics</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">Total Earnings</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">₹45600</p>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">Total Jobs</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">127</p>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">Average Rating</p>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[20px] font-extrabold text-[#111827]">4.8</p>
                            <span className="text-yellow-500 text-[16px]">★</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">Total Reviews</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">98</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
