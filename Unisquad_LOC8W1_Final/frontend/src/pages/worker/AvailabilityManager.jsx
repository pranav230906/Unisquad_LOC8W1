import React, { useState } from "react";
import { Clock, Lightbulb, Save } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";
import Button from "../../components/ui/Button.jsx";

const AvailabilityManager = () => {
  const { t } = useLanguage();
  const [isAvailable, setIsAvailable] = useState(true);
  const [workingHours, setWorkingHours] = useState("09:00 AM - 06:00 PM");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    alert(t("save_settings") + "! (Mock)");
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();
    if (cmd.includes("unavailable") || cmd.includes("अनुपलब्ध")) {
      setIsAvailable(false);
    } else if (cmd.includes("available") || cmd.includes("उपलब्ध")) {
      setIsAvailable(true);
    }
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <header>
          <h1 className="text-2xl font-bold text-[#111827]">{t("availability")}</h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Control your active status and working hours.
          </p>
        </header>
        <VoiceInputButton onCommand={handleVoiceCommand} />
      </div>

      {/* Toggle card */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <div className="flex items-center justify-between min-h-[64px]">
          <div>
            <h3 className="text-base font-bold text-[#111827]">{t("active_status")}</h3>
            <p className="text-sm text-[#6B7280] mt-0.5">
              When on, clients can find and book you.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span
              className="text-sm font-bold px-3 py-1 rounded-full"
              style={{
                background: isAvailable ? "#dcfce7" : "#fee2e2",
                color: isAvailable ? "#16a34a" : "#dc2626",
              }}
            >
              {isAvailable ? t("available") : t("unavailable")}
            </span>
            {/* Toggle switch */}
            <button
              aria-label="Toggle availability"
              onClick={() => setIsAvailable(!isAvailable)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E3A8A] ${isAvailable ? "bg-[#1E3A8A]" : "bg-[#D1D5DB]"
                }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition-transform ${isAvailable ? "translate-x-7" : "translate-x-1"
                  }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Working hours card */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-[#374151]">
          <Clock className="w-4 h-4 text-[#1E3A8A]" />
          {t("working_hours")}
        </label>
        <input
          type="text"
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-full min-h-[48px] px-4 py-3 rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] transition-all"
          placeholder="e.g. 9:00 AM - 6:00 PM"
        />
        <p className="text-xs text-[#9CA3AF]">
          These are your typical hours. You can always toggle your status manually.
        </p>
      </div>

      {/* Tip */}
      <div className="bg-[#eff6ff] rounded-[10px] p-4 flex gap-3 items-start border border-[#bfdbfe]">
        <Lightbulb className="w-5 h-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#1e40af] leading-relaxed font-medium">
          Staying online during peak hours (10 AM – 4 PM) can increase your booking frequency by up to 50%.
        </p>
      </div>

      {/* Save */}
      <Button fullWidth loading={saving} onClick={handleSave}>
        <Save className="w-5 h-5" />
        {t("save_settings")}
      </Button>
    </div>
  );
};

export default AvailabilityManager;
