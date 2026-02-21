// Navbar — shared top navigation bar.
// Portal-specific content injected via props — structure never changes.
import React, { useState, useEffect } from "react";
import { Bell, Mic, Loader2 } from "lucide-react";
import { VoiceAssistant } from "../../services/voiceAssistantService";

/**
 * Props:
 *   portalName  — string shown below "Unisquad" e.g. "Client Portal"
 *   rightSlot   — optional ReactNode rendered right of user info (e.g. LanguageSwitcher)
 */
export default function Navbar({ rightSlot }) {
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        const handleVoiceStatus = (e) => setIsListening(e.detail.active);
        window.addEventListener('voice-status', handleVoiceStatus);
        return () => window.removeEventListener('voice-status', handleVoiceStatus);
    }, []);

    const toggleVoice = () => {
        if (VoiceAssistant.isListening) {
            VoiceAssistant.stopListening();
        } else {
            VoiceAssistant.startListening();
        }
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EB] h-[56px] flex items-center shadow-sm flex-shrink-0">
            <div className="w-full flex items-center justify-between px-6">

                {/* Brand Logo only */}
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center rounded-[8px] bg-[#1E3A8A] text-white font-bold text-[14px] shadow-sm">
                        KC
                    </div>
                    <div className="text-[16px] font-bold text-[#111827]">Kaam-connect</div>
                </div>

                {/* Right side icons */}
                <div className="flex items-center gap-5">
                    {/* Optional extra slot (e.g. LanguageSwitcher) */}
                    {rightSlot && <div className="hidden sm:block">{rightSlot}</div>}

                    <div className="flex items-center gap-5 text-[#4B5563]">
                        <button
                            onClick={() => alert("You have 3 new notifications!")}
                            className="hover:text-[#111827] transition-colors relative"
                        >
                            <Bell className="w-[20px] h-[20px]" />
                            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                        </button>
                        <button
                            onClick={toggleVoice}
                            className={`transition-colors relative ${isListening ? 'text-red-500' : 'hover:text-[#111827]'}`}
                            title="Activate Voice Assistant (Sarvam AI Translation)"
                        >
                            {isListening ? (
                                <Loader2 className="w-[20px] h-[20px] animate-spin" />
                            ) : (
                                <Mic className="w-[20px] h-[20px]" />
                            )}
                            {isListening && (
                                <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500 border border-white animate-ping"></span>
                            )}
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}
