/**
 * Design Tokens — Unisquad LOC 8.0
 * Single source of truth for all design values.
 *
 * These mirror the CSS custom properties in index.css.
 * Import this file in components instead of hardcoding hex values.
 *
 * Usage:
 *   import { colors, radius, shadow } from "../tokens.js";
 *   style={{ background: colors.primaryLight, color: colors.primary }}
 */

export const colors = {
    // Primary
    primary: "#1E3A8A",
    primaryHover: "#1e40af",
    primaryLight: "#dbeafe",

    // Secondary (orange)
    secondary: "#F97316",
    secondaryHover: "#ea6c04",
    secondaryLight: "#ffedd5",

    // Semantic
    success: "#16a34a",
    successLight: "#dcfce7",
    danger: "#dc2626",
    dangerLight: "#fee2e2",
    warning: "#d97706",
    warningLight: "#fef3c7",

    // Neutrals
    background: "#F3F4F6",
    surface: "#ffffff",
    textPrimary: "#111827",
    textSecondary: "#6B7280",
    textMuted: "#9CA3AF",
    textLabel: "#374151",
    border: "#E5E7EB",
    borderFocus: "#1E3A8A",
    disabledBg: "#E5E7EB",
    disabledText: "#9CA3AF",
};

export const radius = {
    sm: "6px",
    md: "10px",   // cards, buttons, inputs
    lg: "16px",   // modals, hero sections
    xl: "20px",
    full: "9999px", // pills, badges
};

export const shadow = {
    soft: "0 2px 8px rgba(0,0,0,0.08)",
    md: "0 4px 16px rgba(0,0,0,0.10)",
    strong: "0 4px 24px rgba(30,58,138,0.18)",
    primary: "0 4px 16px rgba(30,58,138,0.25)",
    hover: "0 4px 20px rgba(30,58,138,0.15)",
    modal: "0 20px 60px rgba(0,0,0,0.25)",
};

export const spacing = {
    touchMin: "48px",  // minimum interactive target height
    rowMin: "56px",  // minimum list row height
    mobileNav: "64px",  // mobile bottom nav height
};

export const typography = {
    fontFamily: "'Inter', 'Noto Sans', system-ui, sans-serif",
    // Tailwind equivalent class combos:
    h1: "text-2xl font-bold text-[#111827]",
    h2: "text-base font-bold text-[#111827]",
    h3: "text-base font-bold text-[#111827] leading-tight",
    body: "text-sm font-medium text-[#111827]",
    muted: "text-sm text-[#6B7280]",
    caption: "text-xs text-[#9CA3AF]",
    label: "text-sm font-semibold text-[#374151]",
};

/** Status badge config — use with inline styles for Rule 9 compliance */
export const statusBadge = {
    COMPLETED: { bg: colors.successLight, color: colors.success },
    PENDING: { bg: colors.warningLight, color: colors.warning },
    EN_ROUTE: { bg: colors.secondaryLight, color: colors.secondary },
    ASSIGNED: { bg: colors.primaryLight, color: colors.primary },
    CANCELLED: { bg: colors.dangerLight, color: colors.danger },
};
