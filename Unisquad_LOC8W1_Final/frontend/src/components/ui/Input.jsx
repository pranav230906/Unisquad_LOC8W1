// ─────────────────────────────────────────────────────────────
// Input — canonical location: /components/ui/Input.jsx
// ─────────────────────────────────────────────────────────────
import React, { useId } from "react";
import { AlertCircle } from "lucide-react";

/**
 * Props:
 *   label        — visible label text
 *   hint         — helper text below input
 *   error        — error message (turns border red)
 *   leftIcon     — ReactNode rendered inside input on the left
 *   rightElement — ReactNode rendered inside input on the right (button, icon, etc.)
 *   className    — extra classes applied to the <input> element
 *   required     — marks label with asterisk + passes to native input
 *   ...props     — any native input props (type, placeholder, value, onChange, etc.)
 */
export default function Input({
    label,
    hint,
    error,
    leftIcon,
    rightElement,
    className = "",
    required,
    ...props
}) {
    const id = useId();

    return (
        <div className="space-y-1.5">
            {label && (
                <label htmlFor={id} className="block text-sm font-semibold text-[#374151]">
                    {label}
                    {required && <span className="ml-0.5 text-red-500" aria-hidden="true">*</span>}
                </label>
            )}

            <div className="relative flex items-center">
                {leftIcon && (
                    <div className="absolute left-3 text-[#6B7280] pointer-events-none" aria-hidden="true">
                        {leftIcon}
                    </div>
                )}

                <input
                    id={id}
                    required={required}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
                    className={[
                        "w-full min-h-[48px] rounded-[10px] border-2 bg-white",
                        "px-4 py-3 text-base font-medium text-[#111827]",
                        "placeholder:text-[#9CA3AF] placeholder:font-normal",
                        "outline-none transition-all duration-200",
                        leftIcon ? "pl-10" : "",
                        rightElement ? "pr-12" : "",
                        error
                            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100",
                        "disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
                        className,
                    ].join(" ")}
                    {...props}
                />

                {rightElement && (
                    <div className="absolute right-3">{rightElement}</div>
                )}
            </div>

            {error ? (
                <p id={`${id}-error`} role="alert" className="text-xs font-medium text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                    {error}
                </p>
            ) : hint ? (
                <p id={`${id}-hint`} className="text-xs text-[#6B7280]">{hint}</p>
            ) : null}
        </div>
    );
}
