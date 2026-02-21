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
  Navigation2,
} from "lucide-react";
import DashboardLayout from "../../../components/layout/DashboardLayout.jsx";
import LanguageSwitcher from "../../../components/LanguageSwitcher.jsx";

const NAV_ITEMS = [
  { to: "/worker", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/worker/incoming", label: "Jobs", icon: Inbox },
  { to: "/worker/earnings", label: "Earnings", icon: IndianRupee },
  { to: "/worker/availability", label: "Schedule", icon: CalendarDays },
  { to: "/worker/reviews", label: "Reviews", icon: Star },
  { to: "/worker/navigation", label: "Navigate", icon: Navigation2 },
  { to: "/worker/profile", label: "Profile", icon: User },
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
