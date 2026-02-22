// Navbar — shared top navigation bar.
// Portal-specific content injected via props — structure never changes.
import React from "react";
import { Bell, Mic } from "lucide-react";


/**
 * Props:
 *   portalName  — string shown below "Unisquad" e.g. "Client Portal"
 *   rightSlot   — optional ReactNode rendered right of user info (e.g. LanguageSwitcher)
 */
export default function Navbar({ rightSlot }) {

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
                            onClick={() => alert("Voice assistant activated!")}
                            className="hover:text-[#111827] transition-colors"
                        >
                            <Mic className="w-[20px] h-[20px]" />
                        </button>
                    </div>

                </div>
            </div>
        </header>
    );
}
