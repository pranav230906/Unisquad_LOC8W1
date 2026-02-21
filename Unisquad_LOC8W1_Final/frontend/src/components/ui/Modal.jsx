// ─────────────────────────────────────────────────────────────
// Modal — canonical location: /components/ui/Modal.jsx
// ─────────────────────────────────────────────────────────────
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Button from "./Button.jsx";

/**
 * Props:
 *   open      — boolean — whether modal is visible
 *   onClose   — () => void — called on backdrop click or X button
 *   title     — heading text
 *   size      — "sm" | "md" | "lg" | "full" (default "md")
 *   children  — modal body content
 *   footer    — ReactNode rendered in the modal footer (e.g. action buttons)
 *   closeOnBackdrop — boolean (default true)
 */
const SIZE = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    full: "max-w-[95vw] max-h-[90vh]",
};

export default function Modal({
    open,
    onClose,
    title,
    size = "md",
    children,
    footer,
    closeOnBackdrop = true,
}) {
    const dialogRef = useRef(null);

    // Lock body scroll when open
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return;
        const handler = (e) => { if (e.key === "Escape") onClose?.(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-label={title}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-[2px] animate-in"
                onClick={closeOnBackdrop ? onClose : undefined}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                ref={dialogRef}
                className={[
                    "relative z-10 w-full bg-white rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
                    "flex flex-col animate-in max-h-[90vh]",
                    SIZE[size] ?? SIZE.md,
                ].join(" ")}
            >
                {/* Header */}
                {(title || onClose) && (
                    <div className="flex items-center justify-between px-5 py-4 border-b border-[#F3F4F6] flex-shrink-0">
                        {title && <h2 className="text-lg font-bold text-[#111827]">{title}</h2>}
                        {onClose && (
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827] transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>

                {/* Footer */}
                {footer && (
                    <div className="px-5 py-4 border-t border-[#F3F4F6] flex items-center justify-end gap-3 flex-shrink-0">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}
