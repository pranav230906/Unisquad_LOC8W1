// Sidebar — shared desktop sticky navigation sidebar.
// Renders navItems generically — only the list content differs per portal.
import React from "react";
import { NavLink } from "react-router-dom";

/**
 * Props:
 *   navItems  — Array<{ to: string, label: string, icon: LucideIcon, end?: boolean }>
 *   footer    — optional ReactNode rendered at the bottom of the sidebar (e.g. demo note)
 *   topOffset — CSS top offset for sticky positioning (default "73px" = navbar height)
 */
export default function Sidebar({ navItems = [], footer, topOffset = "73px" }) {
    return (
        <aside className="hidden md:flex flex-col gap-4">
            {/* Nav links */}
            <nav
                className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-2 sticky"
                style={{ top: topOffset }}
            >
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-[10px] px-4 py-3 text-sm font-semibold transition-all duration-150 min-h-[48px] ${isActive
                                ? "bg-[#1E3A8A] text-white shadow-[0_4px_12px_rgba(30,58,138,0.25)]"
                                : "text-[#374151] hover:bg-[#dbeafe] hover:text-[#1E3A8A]"
                            }`
                        }
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Optional footer slot (demo note, user chip, etc.) */}
            {footer && (
                <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4 text-sm text-[#6B7280]">
                    {footer}
                </div>
            )}
        </aside>
    );
}
