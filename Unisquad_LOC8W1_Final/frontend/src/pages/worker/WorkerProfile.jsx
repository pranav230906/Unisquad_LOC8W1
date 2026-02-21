import React from "react";
import { Mail, Phone, MapPin, Edit, User } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function WorkerProfile() {
    const { t } = useLanguage();
    return (
        <div className="animate-in space-y-5 max-w-4xl pb-10">
            <div className="flex justify-between items-center">
                <h1 className="text-[22px] font-bold text-[#111827]">{t('profile')}</h1>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E5E7EB] shadow-sm rounded-[8px] text-[14px] font-semibold text-[#374151] hover:bg-gray-50 transition-colors">
                    <Edit className="w-4 h-4" /> {t('edit_profile')}
                </button>
            </div>

            {/* Hero Card */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm flex items-center gap-5">
                <div className="w-24 h-24 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                    <User className="w-10 h-10 text-[#4B5563]" />
                </div>
                <div>
                    <h2 className="text-[22px] font-bold text-[#111827]">{t('rajesh_kumar')}</h2>
                    <p className="text-[15px] font-semibold text-[#6B7280] mb-3">{t('prof_worker')}</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-yellow-500 text-[14px]">★</span>
                            <span className="text-[12px] font-bold text-[#4B5563]">{t('rating_48')}</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-[12px] font-bold text-[#4B5563]">{t('jobs_127')}</span>
                        </div>
                        <div className="flex items-center bg-gray-100 rounded-[6px] px-3 py-1">
                            <span className="text-[12px] font-bold text-[#4B5563]">{t('reviews_98')}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-6">
                <h3 className="text-[16px] font-bold text-[#111827]">{t('contact_info')}</h3>

                <div className="flex gap-4 items-start">
                    <Mail className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">{t('email')}</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">rajesh.kumar@example.com</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">{t('phone')}</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">+91 98765 43210</p>
                    </div>
                </div>

                <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-[#6B7280] mt-0.5" />
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280]">{t('location')}</p>
                        <p className="text-[15px] font-semibold text-[#111827] mt-0.5">{t('sector_15_noida')}</p>
                    </div>
                </div>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827] flex items-center gap-2">
                    <div className="w-5 h-5">💼</div> {t('skills_expertise')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["plumbing_category", "electrical_category", "ac_service_category", "carpentry_category"].map(skill => (
                        <span key={skill} className="px-4 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] font-bold text-[#374151]">
                            {t(skill)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827] flex items-center gap-2">
                    <div className="w-5 h-5">⚑</div> {t('languages')}
                </h3>
                <div className="flex flex-wrap gap-3">
                    {["english_lang", "hindi_lang", "tamil_lang"].map(lang => (
                        <span key={lang} className="px-4 py-1.5 border border-[#E5E7EB] rounded-full text-[13px] font-bold text-[#374151]">
                            {t(lang)}
                        </span>
                    ))}
                </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
                <h3 className="text-[16px] font-bold text-[#111827] mb-6">{t('statistics')}</h3>
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">{t('total_earnings')}</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">₹45600</p>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">{t('total_jobs')}</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">127</p>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">{t('avg_rating')}</p>
                        <div className="flex items-center gap-1.5">
                            <p className="text-[20px] font-extrabold text-[#111827]">4.8</p>
                            <span className="text-yellow-500 text-[16px]">★</span>
                        </div>
                    </div>
                    <div>
                        <p className="text-[12px] font-bold text-[#6B7280] mb-1">{t('total_reviews')}</p>
                        <p className="text-[20px] font-extrabold text-[#111827]">98</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
