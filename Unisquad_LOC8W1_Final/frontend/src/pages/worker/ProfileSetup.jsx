import React, { useState } from "react";
import { User, Briefcase, Clock, IndianRupee, Languages, FileText, Save, Mic } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";
import Button from "../../components/ui/Button.jsx";

const ProfileSetup = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    fullName: "Rajesh Kumar",
    skills: "Plumbing, Electrical, AC Repair",
    experience: "5 Years",
    hourlyRate: "500",
    languages: "Hindi, English",
    bio: "Professional multi-skilled technician with 5 years of experience in residential repairs and maintenance.",
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoiceInput = (field, transcript) => {
    setFormData((prev) => ({ ...prev, [field]: transcript }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    alert(t("save_profile") + " successfully! (Mock)");
  };

  const inputClass =
    "w-full min-h-[48px] px-4 py-3 rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] bg-white transition-all";
  const labelClass = "flex items-center gap-2 text-sm font-semibold text-[#374151] mb-1.5";

  const fields = [
    { name: "fullName", label: t("full_name"), icon: User, voice: true, placeholder: "e.g. Rajesh Kumar" },
    { name: "experience", label: t("experience"), icon: Clock, placeholder: "e.g. 5 Years" },
    { name: "skills", label: t("skills"), icon: Briefcase, voice: true, placeholder: "e.g. Plumbing, Electrical", fullWidth: true },
    { name: "hourlyRate", label: `${t("hourly_rate")} (₹)`, icon: IndianRupee, type: "number", placeholder: "e.g. 500" },
    { name: "languages", label: t("languages"), icon: Languages, placeholder: "e.g. Hindi, English" },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">{t("profile")} Setup</h1>
        <p className="text-sm text-[#6B7280] mt-1">{t("update_profile_desc")}</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <div key={field.name} className={field.fullWidth ? "md:col-span-2" : ""}>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={labelClass}>
                    <Icon className="w-4 h-4 text-[#1E3A8A]" />
                    {field.label}
                  </label>
                  {field.voice && (
                    <VoiceInputButton
                      onTranscript={(text) => handleVoiceInput(field.name, text)}
                    />
                  )}
                </div>
                <input
                  type={field.type || "text"}
                  name={field.name}
                  className={inputClass}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  required
                />
              </div>
            );
          })}

          {/* Bio */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between mb-1.5">
              <label className={labelClass}>
                <FileText className="w-4 h-4 text-[#1E3A8A]" />
                {t("bio")}
              </label>
              <VoiceInputButton onTranscript={(text) => handleVoiceInput("bio", text)} />
            </div>
            <textarea
              name="bio"
              rows={4}
              className={`${inputClass} resize-none`}
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell clients about your work style..."
              required
            />
          </div>
        </div>

        <Button type="submit" fullWidth loading={saving}>
          <Save className="w-5 h-5" />
          {t("save_profile")}
        </Button>
      </form>
    </div>
  );
};

export default ProfileSetup;
