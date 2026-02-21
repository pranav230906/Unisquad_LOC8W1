import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import VoiceInputButton from "../../components/VoiceInputButton";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVoiceInput = (field, transcript) => {
    setFormData((prev) => ({ ...prev, [field]: transcript }));
    // TODO: Send transcript to backend for NLP processing later
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: workerService.updateProfile(formData)
    alert(t("save_profile") + " successfully! (Mock)");
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-gray-50/50";
  const labelClass = "block text-sm font-bold text-gray-700 mb-2 ml-1";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("profile")} Setup</h1>
        <p className="text-gray-500 mt-1">{t("update_profile_desc")}</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-gray-700 ml-1">{t("full_name")}</label>
              <VoiceInputButton onTranscript={(text) => handleVoiceInput("fullName", text)} />
            </div>
            <input
              type="text"
              name="fullName"
              className={inputClass}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
            />
          </div>
          <div>
            <label className={labelClass}>{t("experience")}</label>
            <input
              type="text"
              name="experience"
              className={inputClass}
              value={formData.experience}
              onChange={handleChange}
              placeholder="e.g. 3 Years"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700 ml-1">{t("skills")}</label>
            <VoiceInputButton onTranscript={(text) => handleVoiceInput("skills", text)} />
          </div>
          <input
            type="text"
            name="skills"
            className={inputClass}
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. Plumbing, Painting"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>{t("hourly_rate")} (₹)</label>
            <input
              type="number"
              name="hourlyRate"
              className={inputClass}
              value={formData.hourlyRate}
              onChange={handleChange}
              placeholder="e.g. 500"
              required
            />
          </div>
          <div>
            <label className={labelClass}>{t("languages")}</label>
            <input
              type="text"
              name="languages"
              className={inputClass}
              value={formData.languages}
              onChange={handleChange}
              placeholder="e.g. English, Hindi"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-bold text-gray-700 ml-1">{t("bio")}</label>
            <VoiceInputButton onTranscript={(text) => handleVoiceInput("bio", text)} />
          </div>
          <textarea
            name="bio"
            rows="4"
            className={`${inputClass} resize-none`}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell clients about your work style..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-[0.98]"
        >
          {t("save_profile")}
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;

