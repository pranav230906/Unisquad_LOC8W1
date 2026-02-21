
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { useLanguage } from "../../../context/LanguageContext";

export default function WorkerLayout() {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const navItems = [
        { to: "/worker", label: t('dashboard') || "Dashboard", icon: LayoutDashboard, end: true },
        { to: "/worker/jobs", label: t('incoming_jobs') || "Jobs", icon: Inbox },
        { to: "/worker/schedule", label: t('working_hours') || "Schedule", icon: CalendarDays },
        { to: "/worker/earnings", label: t('earnings') || "Earnings", icon: IndianRupee },
        { to: "/worker/reviews", label: t('reviews') || "Reviews", icon: Star },
        { to: "/worker/profile", label: t('profile') || "Profile", icon: User },
        { to: "/worker/settings", label: t('save_settings') || "Settings", icon: Settings },
    ];

    useEffect(() => {
        const handleVoiceCommand = (e) => {
            const { intent, payload } = e.detail;
            if (intent === "OPEN_TAB" && payload?.tab) {
                const tab = payload.tab.toLowerCase();
                if (tab === "dashboard" || tab === "home") navigate("/worker");
                else navigate(`/worker/${tab}`);
            }
        };

        window.addEventListener('voice-command', handleVoiceCommand);
        return () => window.removeEventListener('voice-command', handleVoiceCommand);
    }, [navigate]);

    return (
        <DashboardLayout
            navItems={navItems}
            portalName={t('welcome') || "Worker Portal"}
            navbarRight={<LanguageSwitcher />}
        />
    );
}
