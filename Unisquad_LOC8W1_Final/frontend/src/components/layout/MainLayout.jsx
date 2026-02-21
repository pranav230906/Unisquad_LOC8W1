// MainLayout — top-level shell: sets full-height, background, and overflow.
// Wrap DashboardLayout inside this for a complete page.
import React from "react";

/**
 * Props:
 *   children — typically <DashboardLayout />
 */
export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F3F4F6] overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    );
}
