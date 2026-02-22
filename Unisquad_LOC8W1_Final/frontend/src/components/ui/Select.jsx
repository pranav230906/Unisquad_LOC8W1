// ─────────────────────────────────────────────────────────────
// Select — canonical location: /components/ui/Select.jsx
// ─────────────────────────────────────────────────────────────
import React, { useId } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Props:
 *   label     — visible label text
 *   hint      — helper text below
 *   error     — error message (turns border red)
 *   required  — adds asterisk
 *   className — extra classes on wrapper div
 *   children  — <option> elements
 *   ...props  — any native select props
 */
export default function Select({ label, hint, error, required, className = "", children, ...props }) {
    const id = useId();
    return (
        <div className={`space-y-1.5 ${className}`}>
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-[#374151]">
                    {label}
                    {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
                </label>
            )}
            <div className="relative">
                <select
                    id={id}
                    required={required}
                    aria-invalid={!!error}
                    className={[
                        "w-full min-h-[48px] rounded-[10px] border-2 bg-white appearance-none",
                        "px-4 pr-10 py-3 text-base font-medium text-[#111827]",
                        "outline-none transition-all duration-200",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100",
                        "disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
                    ].join(" ")}
                    {...props}
                >
                    {children}
                </select>
                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] pointer-events-none"
                    aria-hidden="true"
                />
            </div>
            {error ? (
                <p role="alert" className="text-xs font-medium text-red-600">{error}</p>
            ) : hint ? (
                <p className="text-xs text-[#6B7280]">{hint}</p>
            ) : null}
        </div>
    );
}
