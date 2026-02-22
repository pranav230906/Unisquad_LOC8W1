import React, { useState } from "react";
import { Bell, Globe, Shield, HelpCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Toggle = ({ active, onChange }) => (
    <button
        onClick={onChange}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${active ? 'bg-[#1E3A8A]' : 'bg-gray-200'}`}
    >
        <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${active ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
);

export default function WorkerSettings() {
    const { t } = useLanguage();
    const [jobAlerts, setJobAlerts] = useState(true);
    const [msgNotifs, setMsgNotifs] = useState(true);
    const [earnUpdates, setEarnUpdates] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className="animate-in space-y-4 max-w-3xl pb-10">
            <h1 className="text-[20px] font-bold text-[#111827] mb-4">{t('settings')}</h1>

            {/* Notifications */}
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-4">
                <div className="px-4 py-3 border-b border-[#F3F4F6] flex items-center gap-3">
                    <Bell className="w-4 h-4 text-[#111827]" />
                    <h2 className="text-[16px] font-bold text-[#111827]">{t('notifications')}</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    <div className="p-4 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors">
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827] leading-none mb-1">{t('job_alerts')}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280]">{t('job_alerts_desc')}</p>
                        </div>
                        <Toggle active={jobAlerts} onChange={() => setJobAlerts(!jobAlerts)} />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors">
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827] leading-none mb-1">{t('message_notifications')}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280]">{t('message_notifs_desc')}</p>
                        </div>
                        <Toggle active={msgNotifs} onChange={() => setMsgNotifs(!msgNotifs)} />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors">
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827] leading-none mb-1">{t('earnings_updates')}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280]">{t('earn_updates_desc')}</p>
                        </div>
                        <Toggle active={earnUpdates} onChange={() => setEarnUpdates(!earnUpdates)} />
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-4">
                <div className="px-4 py-3 border-b border-[#F3F4F6] flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#111827]" />
                    <h2 className="text-[16px] font-bold text-[#111827]">{t('preferences')}</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    <div className="p-4 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors">
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827] leading-none mb-1">{t('dark_mode')}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280]">{t('dark_mode_desc')}</p>
                        </div>
                        <Toggle active={darkMode} onChange={() => setDarkMode(!darkMode)} />
                    </div>
                    <div className="p-4 flex items-center justify-between bg-white hover:bg-[#F9FAFB] transition-colors">
                        <div>
                            <h3 className="text-[15px] font-bold text-[#111827] leading-none mb-1">{t('language')}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280]">English</p>
                        </div>
                        <button
                            onClick={() => alert("Language change settings opening...")}
                            className="px-4 py-1.5 rounded-[6px] border border-[#E5E7EB] text-[#111827] font-bold text-[12px] shadow-sm bg-white hover:bg-gray-50 transition-colors"
                        >
                            {t('change')}
                        </button>
                    </div>
                </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-4">
                <div className="px-4 py-3 border-b border-[#F3F4F6] flex items-center gap-3">
                    <Shield className="w-4 h-4 text-[#111827]" />
                    <h2 className="text-[16px] font-bold text-[#111827]">{t('privacy_security')}</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6] p-3 flex flex-col gap-2">
                    <button
                        onClick={() => alert("Redirecting to password change flow...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('change_password')}
                    </button>
                    <button
                        onClick={() => alert("Opening Privacy Policy...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('privacy_policy')}
                    </button>
                    <button
                        onClick={() => alert("Opening Terms of Service...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('terms_service')}
                    </button>
                </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white border border-[#E5E7EB] rounded-[10px] shadow-sm overflow-hidden mb-6">
                <div className="px-4 py-3 border-b border-[#F3F4F6] flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[#111827]" />
                    <h2 className="text-[16px] font-bold text-[#111827]">{t('help_support')}</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6] p-3 flex flex-col gap-2">
                    <button
                        onClick={() => alert("Opening FAQ...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('faq')}
                    </button>
                    <button
                        onClick={() => alert("Loading Support chat...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('contact_support')}
                    </button>
                    <button
                        onClick={() => alert("Opening Problem Reporter...")}
                        className="w-full text-left px-4 py-2.5 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-[6px] bg-white hover:bg-[#F9FAFB] text-[#111827] font-bold text-[13px] transition-colors"
                    >
                        {t('report_problem')}
                    </button>
                </div>
            </div>

            {/* Account Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    onClick={() => {
                        alert("Logging out...");
                    }}
                    className="py-3 bg-white border border-[#E5E7EB] rounded-[8px] text-[14px] font-bold text-[#111827] hover:bg-gray-50 transition-colors shadow-sm"
                >
                    {t('logout')}
                </button>
                <button
                    onClick={() => {
                        if (confirm("Are you sure you want to delete your account?")) {
                            alert("Account deletion requested.");
                        }
                    }}
                    className="py-3 bg-[#B91C1C] border border-[#991B1B] rounded-[8px] text-[14px] font-bold text-white hover:bg-[#991B1B] transition-colors shadow-sm"
                >
                    {t('delete_account')}
                </button>
            </div>

        </div>
    );
}
