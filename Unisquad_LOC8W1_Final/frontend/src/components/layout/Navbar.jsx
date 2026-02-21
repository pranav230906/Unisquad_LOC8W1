// Navbar — shared top navigation bar.
// Portal-specific content injected via props — structure never changes.
import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";
import Button from "../common/Button.jsx";

/**
 * Props:
 *   portalName  — string shown below "Unisquad" e.g. "Client Portal"
 *   rightSlot   — optional ReactNode rendered right of user info (e.g. LanguageSwitcher)
 */
export default function Navbar({ portalName = "Portal", rightSlot }) {
    const { user, logout } = useAuth();
    const nav = useNavigate();

    const handleLogout = () => {
        logout();
        nav("/auth/login");
    };

    return (
        <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <div className="w-full flex items-center justify-between px-4 py-3 max-w-screen-xl mx-auto">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-[10px] bg-[#1E3A8A] text-white grid place-items-center font-bold text-lg shadow-[0_4px_12px_rgba(30,58,138,0.3)]">
                        U
                    </div>
                    <div>
                        <div className="text-base font-bold text-[#111827] leading-tight">Unisquad</div>
                        <div className="text-xs text-[#6B7280] font-medium">{portalName}</div>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Optional extra slot (e.g. LanguageSwitcher) */}
                    {rightSlot && <div className="hidden sm:block">{rightSlot}</div>}

                    {/* User identity */}
                    <div className="hidden sm:flex flex-col items-end">
                        <span className="text-xs text-[#6B7280]">Signed in as</span>
                        <span className="text-sm font-semibold text-[#111827] max-w-[160px] truncate">
                            {user?.name || user?.phoneOrEmail || "User"}
                        </span>
                    </div>

                    {/* Logout */}
                    <Button variant="secondary" size="sm" onClick={handleLogout}>
                        <LogOut className="w-4 h-4" />
                        <span className="hidden sm:inline">Logout</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
