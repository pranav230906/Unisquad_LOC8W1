import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";

const AvailabilityManager = () => {
  const { t } = useLanguage();
  const [isAvailable, setIsAvailable] = useState(true);
  const [workingHours, setWorkingHours] = useState("09:00 AM - 06:00 PM");

  const handleSave = () => {
    // TODO: workerService.updateAvailability()
    alert(t("save_settings") + "! (Mock)");
  };

  const handleVoiceCommand = (command) => {
    const lowerCommand = command.toLowerCase();
    if (lowerCommand.includes("available") || lowerCommand.includes("उपलब्ध") || lowerCommand.includes("అందుబాటు")) {
      if (lowerCommand.includes("unavailable") || lowerCommand.includes("अनुपलब्ध") || lowerCommand.includes("లేదు")) {
        setIsAvailable(false);
      } else {
        setIsAvailable(true);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("availability")}</h1>
          <p className="text-gray-500 mt-1">Control your active status and preferred working hours.</p>
        </div>
        <VoiceInputButton onCommand={handleVoiceCommand} />
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-8">
        {/* Toggle Section */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <div>
            <h3 className="font-bold text-gray-900">{t("active_status")}</h3>
            <p className="text-sm text-gray-500">When on, customers can find and book you.</p>
          </div>
          <div className="flex items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-tighter ${isAvailable ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
              {isAvailable ? t("available") : t("unavailable")}
            </span>
            <button
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isAvailable ? "translate-x-7" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* Working Hours Section */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-gray-700 ml-1">{t("working_hours")}</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl">🕒</span>
            <input
              type="text"
              value={workingHours}
              onChange={(e) => setWorkingHours(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all font-medium text-gray-900"
              placeholder="e.g. 9:00 AM - 6:00 PM"
            />
          </div>
          <p className="text-xs text-gray-400 ml-1 italic">Note: These are your typical hours, but you can always toggle status manually.</p>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
        >
          {t("save_settings")}
        </button>
      </div>

      {/* Info Card */}
      <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex gap-4">
        <span className="text-2xl">💡</span>
        <p className="text-sm text-blue-700 leading-relaxed font-medium">
          Staying online consistently during peak hours (10 AM - 4 PM) can increase your booking frequency by up to 50%.
        </p>
      </div>
    </div>
  );
};

export default AvailabilityManager;
