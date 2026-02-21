// WorkerLayout — thin config wrapper around the shared DashboardLayout.
// Only the navItems, portalName, and LanguageSwitcher slot are Worker-specific.
import React from "react";
import {
  LayoutDashboard,
  Inbox,
  IndianRupee,
  CalendarDays,
  User,
  Star,
  Settings,
} from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout.jsx";
import LanguageSwitcher from "../../../components/LanguageSwitcher.jsx";

const NAV_ITEMS = [
  { to: "/worker", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/worker/jobs", label: "Jobs", icon: Inbox },
  { to: "/worker/schedule", label: "Schedule", icon: CalendarDays },
  { to: "/worker/earnings", label: "Earnings", icon: IndianRupee },
  { to: "/worker/reviews", label: "Reviews", icon: Star },
  { to: "/worker/profile", label: "Profile", icon: User },
  { to: "/worker/settings", label: "Settings", icon: Settings },
];

export default function WorkerLayout() {
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      portalName="Worker Portal"
      navbarRight={<LanguageSwitcher />}
    />
  );
}
