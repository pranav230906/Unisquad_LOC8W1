// ─────────────────────────────────────────────────────────────
// Loader — canonical location: /components/ui/Loader.jsx
// ─────────────────────────────────────────────────────────────
import React from "react";

/**
 * Props:
 *   size    — "sm" | "md" | "lg" (default "md")
 *   label   — screen-reader text (default "Loading…")
 *   center  — boolean — wrap in a centred flex container
 *   color   — tailwind text-color class for the spinner (default: "text-[#1E3A8A]")
 *
 * Usage:
 *   <Loader />                      — inline spinner
 *   <Loader center size="lg" />     — page-level centered spinner
 */
const SPINNER_SIZE = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-[3px]",
    lg: "w-12 h-12 border-4",
};

export function Spinner({ size = "md", color = "text-[#1E3A8A]", label = "Loading…" }) {
    return (
        <span role="status" aria-label={label} className={`inline-block ${color}`}>
            <span
                className={`block rounded-full border-current border-t-transparent animate-spin ${SPINNER_SIZE[size] ?? SPINNER_SIZE.md}`}
                aria-hidden="true"
            />
        </span>
    );
}

/** Full-screen or section loader with optional label text */
export default function Loader({ size = "md", label = "Loading…", center = true, color = "text-[#1E3A8A]" }) {
    const inner = (
        <div className={`flex flex-col items-center gap-3 ${center ? "" : "inline-flex"}`}>
            <Spinner size={size} color={color} label={label} />
            {label && (
                <p className="text-sm font-medium text-[#6B7280]" aria-hidden="true">
                    {label}
                </p>
            )}
        </div>
    );

    if (!center) return inner;
    return (
        <div className="flex items-center justify-center min-h-[200px] w-full">
            {inner}
        </div>
    );
}
