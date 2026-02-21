import React from "react";

export default function Input({ label, hint, error, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      <input
        className={`w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 ${
          error ? "border-red-300" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}