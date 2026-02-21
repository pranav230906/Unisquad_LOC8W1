// ClientLayout — thin config wrapper around the shared DashboardLayout.
// Only the navItems and portalName are Client-specific. Structure = DashboardLayout.
import React from "react";
import {
  Home,
  PlusSquare,
  Users,
  History,
  MapPin,
  Briefcase,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";

const NAV_ITEMS = [
  { to: "/client", label: "Home", icon: Home, end: true },
  { to: "/client/post-job", label: "Post Job", icon: PlusSquare },
  { to: "/client/workers", label: "Workers", icon: Users },
  { to: "/client/history", label: "History", icon: History },
  { to: "/client/track/demo", label: "Track", icon: MapPin },
];

const SIDEBAR_FOOTER = (
  <>
    <div className="font-semibold text-[#111827] flex items-center gap-2 text-sm mb-1">
      <Briefcase className="w-4 h-4" /> Demo Mode
    </div>
    <p className="text-xs leading-relaxed">
      Data in <span className="font-medium text-[#374151]">localStorage</span>.
      Replace with real calls in{" "}
      <code className="bg-[#F3F4F6] px-1 rounded">services/</code>.
    </p>
  </>
);

export default function ClientLayout() {
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      portalName="Client Portal"
      sidebarFooter={SIDEBAR_FOOTER}
    />
  );
}