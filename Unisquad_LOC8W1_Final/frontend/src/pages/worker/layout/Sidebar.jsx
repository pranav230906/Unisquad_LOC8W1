import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  CalendarDays,
  Inbox,
  Navigation2,
  IndianRupee,
  Star,
  LogOut,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { useAuth } from "../../../context/AuthContext";

const navItems = [
  { to: "/worker", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/worker/incoming", label: "Incoming Jobs", icon: Inbox },
  { to: "/worker/earnings", label: "Earnings", icon: IndianRupee },
  { to: "/worker/availability", label: "Availability", icon: CalendarDays },
  { to: "/worker/profile", label: "Profile", icon: User },
  { to: "/worker/navigation", label: "Navigation", icon: Navigation2 },
  { to: "/worker/reviews", label: "Reviews", icon: Star },
];

const Sidebar = () => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="w-64 bg-white border-r-2 border-[#E5E7EB] flex flex-col h-screen fixed left-0 top-0 z-50 overflow-y-auto shadow-[2px_0_8px_rgba(0,0,0,0.06)]">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#1E3A8A] rounded-[10px] flex items-center justify-center text-white font-bold text-lg shadow-[0_4px_12px_rgba(30,58,138,0.3)]">
            U
          </div>
          <div>
            <div className="text-base font-bold text-[#111827] leading-tight">
              Unisquad
            </div>
            <div className="text-xs text-[#6B7280] font-medium">
              Worker Portal
            </div>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="mx-3 mb-4 p-3 bg-[#F3F4F6] rounded-[10px]">
        <p className="text-xs text-[#6B7280] font-medium">Signed in as</p>
        <p className="text-sm font-semibold text-[#111827] truncate">
          {user?.phoneOrEmail || "Worker"}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm font-semibold transition-all duration-150 min-h-[48px] ${isActive
                  ? "bg-[#1E3A8A] text-white shadow-[0_4px_12px_rgba(30,58,138,0.25)]"
                  : "text-[#374151] hover:bg-[#dbeafe] hover:text-[#1E3A8A]"
                }`
              }
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom: logout */}
      <div className="p-3 mt-4 border-t-2 border-[#E5E7EB]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors min-h-[48px]"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
