import React from "react";
import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguage();

    const languages = [
        { code: "en", name: "English", icon: "🇺🇸" },
        { code: "hi", name: "हिंदी", icon: "🇮🇳" },
        { code: "mr", name: "मराठी", icon: "🇮🇳" },
        { code: "te", name: "తెలుగు", icon: "🇮🇳" },
        { code: "ta", name: "தமிழ்", icon: "🇮🇳" },
        { code: "bn", name: "বাংলা", icon: "🇮🇳" },
        { code: "gu", name: "ગુજરાતી", icon: "🇮🇳" },
        { code: "kn", name: "ಕನ್ನಡ", icon: "🇮🇳" },
        { code: "ml", name: "മലയാളം", icon: "🇮🇳" }
    ];

    return (
        <div className="relative inline-block text-left">
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer shadow-sm hover:border-blue-400 transition-all"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.icon} {lang.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
