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
export default function Sidebar({ navItems = [], footer }) {
    return (
        <aside className="hidden md:flex flex-col gap-1 w-full p-2 pt-3">
            {/* Nav links */}
            <nav className="flex flex-col gap-1.5 w-full">
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 rounded-[8px] px-3 py-2 text-[14px] font-semibold transition-all duration-150 ${isActive
                                ? "bg-[#1E3A8A] text-white shadow-sm"
                                : "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#111827]"
                            }`
                        }
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Optional footer slot (demo note, user chip, etc.) */}
            {footer && (
                <div className="mt-auto bg-gray-50 rounded-[8px] p-3 text-xs font-semibold text-[#6B7280]">
                    {footer}
                </div>
            )}
        </aside>
    );
}
