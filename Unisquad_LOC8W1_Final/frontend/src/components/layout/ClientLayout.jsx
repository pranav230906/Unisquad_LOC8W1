// ClientLayout — thin config wrapper around the shared DashboardLayout.
// Only the navItems and portalName are Client-specific. Structure = DashboardLayout.
import React from "react";
import {
  Home,
  PlusSquare,
  Users,
  History,
  MapPin,
  User,
  Star,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";
import LanguageSwitcher from "../../components/LanguageSwitcher.jsx";

const NAV_ITEMS = [
  { to: "/client", label: "Home", icon: Home, end: true },
  { to: "/client/post-job", label: "Post Job", icon: PlusSquare },
  { to: "/client/workers", label: "Browse Workers", icon: Users },
  { to: "/client/history", label: "History", icon: History },
  { to: "/client/track/demo", label: "Track Status", icon: MapPin },
  { to: "/client/profile", label: "Profile", icon: User },
  { to: "/client/reviews", label: "Reviews", icon: Star },
];

export default function ClientLayout() {
  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      portalName="Client Portal"
      navbarRight={<LanguageSwitcher />}
    />
  );
}