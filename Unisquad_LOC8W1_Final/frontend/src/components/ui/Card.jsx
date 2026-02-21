// ─────────────────────────────────────────────────────────────
// Card — canonical location: /components/ui/Card.jsx
// ─────────────────────────────────────────────────────────────
import React from "react";

/**
 * Props:
 *   title      — card heading
 *   subtitle   — subheading
 *   right      — ReactNode in top-right corner (badge, button, etc.)
 *   icon       — ReactNode shown in blue icon slot
 *   footer     — ReactNode rendered after children in a border-top footer area
 *   padded     — boolean (default true) — set false to remove padding (e.g. full-bleed images)
 *   hoverable  — boolean — adds hover shadow effect
 *   onClick    — makes card clickable (adds role="button", tabIndex, cursor)
 *   className  — extra classes
 *   children
 */
export default function Card({
    title,
    subtitle,
    right,
    icon,
    footer,
    children,
    padded = true,
    hoverable = false,
    className = "",
    onClick,
}) {
    const hasHeader = title || subtitle || right || icon;
    return (
        <div
            className={[
                "bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)]",
                padded ? "p-4" : "overflow-hidden",
                hoverable || onClick
                    ? "cursor-pointer hover:shadow-[0_4px_20px_rgba(30,58,138,0.15)] transition-shadow duration-200"
                    : "",
                className,
            ].join(" ")}
            onClick={onClick}
            role={onClick ? "button" : undefined}
            tabIndex={onClick ? 0 : undefined}
            onKeyDown={onClick ? (e) => e.key === "Enter" && onClick(e) : undefined}
        >
            {hasHeader && (
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                        {icon && (
                            <div className="flex-shrink-0 w-10 h-10 rounded-[10px] bg-[#dbeafe] flex items-center justify-center text-[#1E3A8A]">
                                {icon}
                            </div>
                        )}
                        <div>
                            {title && <h3 className="text-base font-bold text-[#111827] leading-tight">{title}</h3>}
                            {subtitle && <p className="mt-0.5 text-sm text-[#6B7280]">{subtitle}</p>}
                        </div>
                    </div>
                    {right && <div className="flex-shrink-0">{right}</div>}
                </div>
            )}

            {children}

            {footer && (
                <div className="mt-4 pt-3 border-t border-[#F3F4F6]">
                    {footer}
                </div>
            )}
        </div>
    );
}
