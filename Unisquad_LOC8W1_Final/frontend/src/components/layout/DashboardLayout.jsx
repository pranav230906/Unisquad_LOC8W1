// DashboardLayout — THE shared layout skeleton.
// All portals (Client, Worker, Admin) use this exact same structure.
// Only the navItems, portalName, and optional slots differ.
import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout.jsx";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

/**
 * Props:
 *   navItems    — Array<{ to, label, icon, end? }> used in sidebar + mobile bottom nav
 *   portalName  — string shown in Navbar subtitle e.g. "Client Portal"
 *   navbarRight — optional ReactNode for Navbar right slot (e.g. LanguageSwitcher)
 *   sidebarFooter — optional ReactNode for Sidebar footer slot (e.g. demo note)
 *   children    — if provided renders instead of <Outlet /> (rare override)
 */
export default function DashboardLayout({
    navItems = [],
    portalName = "Portal",
    navbarRight,
    sidebarFooter,
    children,
}) {
    return (
        <MainLayout>
            <div className="flex flex-col h-screen w-full bg-white overflow-hidden text-[#111827]">

                {/* ── Top Full-Width Navbar ── */}
                <Navbar portalName={portalName} rightSlot={navbarRight} />

                {/* ── Body: Sidebar + Content ── */}
                <div className="flex flex-1 overflow-hidden min-h-0">
                    {/* Shared Desktop Sidebar Wrapper */}
                    <div className="hidden md:flex flex-col w-[240px] border-r border-[#E5E7EB] bg-white flex-shrink-0 z-20 overflow-y-auto styled-scrollbar">
                        <Sidebar navItems={navItems} footer={sidebarFooter} />
                    </div>

                    {/* Main content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-white md:bg-[#F9FAFB]">
                        <div className="max-w-screen-xl mx-auto pb-16 md:pb-6">
                            {children ?? <Outlet />}
                        </div>
                    </main>
                </div>
            </div>

            {/* ── Shared Mobile Bottom Navigation ── */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-[#E5E7EB] shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
                <div className="flex items-stretch h-16">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={end}
                            className={({ isActive }) =>
                                `flex-1 flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${isActive ? "text-[#1E3A8A]" : "text-[#6B7280]"
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <div className={`p-1.5 rounded-[8px] transition-colors ${isActive ? "bg-[#dbeafe]" : ""}`}>
                                        <Icon className={`w-5 h-5 ${isActive ? "text-[#1E3A8A]" : "text-[#6B7280]"}`} />
                                    </div>
                                    <span>{label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </MainLayout>
    );
}
