// ─────────────────────────────────────────────────────────────
// Button — canonical location: /components/ui/Button.jsx
// ─────────────────────────────────────────────────────────────
import React from "react";

const SIZES = {
    sm: "min-h-[40px] px-4 py-2 text-sm",
    md: "min-h-[48px] px-5 py-3 text-base",
    lg: "min-h-[56px] px-6 py-4 text-base",
};

const VARIANTS = {
    primary: "bg-[#1E3A8A] text-white shadow-[0_4px_16px_rgba(30,58,138,0.25)] hover:bg-[#1e40af] focus:ring-[#1E3A8A]",
    secondary: "bg-transparent border-2 border-[#1E3A8A] text-[#1E3A8A] hover:bg-blue-50 focus:ring-[#1E3A8A]",
    danger: "bg-red-600 text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)] hover:bg-red-700 focus:ring-red-500",
    ghost: "bg-transparent text-[#1E3A8A] hover:bg-blue-50 focus:ring-[#1E3A8A]",
    success: "bg-[#16a34a] text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:bg-green-700 focus:ring-green-500",
    warning: "bg-[#d97706] text-white shadow-[0_4px_12px_rgba(217,119,6,0.25)] hover:bg-amber-700 focus:ring-amber-500",
};

const BASE = "inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.97] select-none";

const DISABLED = "bg-[#E5E7EB] text-[#9CA3AF] shadow-none cursor-not-allowed pointer-events-none";

/**
 * Props:
 *   variant   — "primary" | "secondary" | "danger" | "ghost" | "success" | "warning"
 *   size      — "sm" | "md" | "lg"
 *   fullWidth — boolean
 *   loading   — boolean (shows spinner, disables click)
 *   disabled  — boolean
 *   className — extra classes
 *   ...props  — any native button props (onClick, type, aria-*, etc.)
 */
export default function Button({
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    className = "",
    disabled,
    ...props
}) {
    const isDisabled = disabled || loading;
    return (
        <button
            className={[
                BASE,
                SIZES[size] ?? SIZES.md,
                isDisabled ? DISABLED : (VARIANTS[variant] ?? VARIANTS.primary),
                fullWidth ? "w-full" : "",
                className,
            ].join(" ")}
            disabled={isDisabled}
            aria-busy={loading || undefined}
            {...props}
        >
            {loading ? (
                <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                    <span>Loading…</span>
                </>
            ) : children}
        </button>
    );
}
