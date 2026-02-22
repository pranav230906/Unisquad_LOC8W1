// AdminLayout — thin config wrapper around the shared DashboardLayout.
// Only the navItems and portalName are Admin-specific. Structure = DashboardLayout.
import React from "react";
import {
    LayoutDashboard,
    Users,
    BadgeCheck,
    Briefcase,
    BarChart2,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout.jsx";

const NAV_ITEMS = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/verification", label: "Verify", icon: BadgeCheck },
    { to: "/admin/jobs", label: "Job Monitor", icon: Briefcase },
    { to: "/admin/analytics", label: "Analytics", icon: BarChart2 },
];

export default function AdminLayout() {
    return (
        <DashboardLayout
            navItems={NAV_ITEMS}
            portalName="Admin Portal"
        />
    );
}
