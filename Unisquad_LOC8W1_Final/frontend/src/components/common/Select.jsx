import React from "react";

export default function Select({ label, children, className = "", ...props }) {
  return (
    <div className="space-y-1">
      {label ? <label className="text-sm font-medium text-slate-700">{label}</label> : null}
      <select
        className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200 ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
}