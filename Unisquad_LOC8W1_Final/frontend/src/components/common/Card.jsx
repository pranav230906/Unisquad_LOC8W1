import React from "react";

export default function Card({ title, subtitle, right, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
      {(title || subtitle || right) && (
        <div className="flex items-start justify-between gap-3">
          <div>
            {title ? <h3 className="text-base font-semibold text-slate-900">{title}</h3> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
          </div>
          {right}
        </div>
      )}
      {children ? <div className={`${title || subtitle || right ? "mt-4" : ""}`}>{children}</div> : null}
    </div>
  );
}