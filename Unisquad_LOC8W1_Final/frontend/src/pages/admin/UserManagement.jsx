import React, { useState } from "react";
import { Users, Search, BadgeCheck, UserX } from "lucide-react";
import Button from "../../components/ui/Button.jsx";

const mockUsers = [
    { id: "u1", name: "Anjali Sharma", role: "client", phone: "+91 98765 00001", status: "active" },
    { id: "u2", name: "Ramesh Patil", role: "worker", phone: "+91 98765 00002", status: "active" },
    { id: "u3", name: "Vikram Seth", role: "client", phone: "+91 98765 00003", status: "suspended" },
    { id: "u4", name: "Sohail Khan", role: "worker", phone: "+91 98765 00004", status: "active" },
    { id: "u5", name: "Pooja Hegde", role: "client", phone: "+91 98765 00005", status: "active" },
];

const roleBadge = { client: { bg: "#dbeafe", color: "#1E3A8A" }, worker: { bg: "#dcfce7", color: "#16a34a" } };
const statusBadge = { active: { bg: "#dcfce7", color: "#16a34a" }, suspended: { bg: "#fee2e2", color: "#dc2626" } };

export default function UserManagement() {
    const [query, setQuery] = useState("");
    const filtered = mockUsers.filter(
        (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.phone.includes(query)
    );

    return (
        <div className="space-y-5 animate-in">
            <header>
                <h1 className="text-2xl font-bold text-[#111827]">User Management</h1>
                <p className="text-sm text-[#6B7280] mt-1">View, search, and manage all platform users.</p>
            </header>

            {/* Search */}
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                    className="w-full pl-9 pr-4 min-h-[48px] rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] bg-white"
                    placeholder="Search by name or phone..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <Users className="w-5 h-5 text-[#1E3A8A]" />
                    <h2 className="text-base font-bold text-[#111827]">{filtered.length} Users</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    {filtered.map((u) => {
                        const rb = roleBadge[u.role] || roleBadge.client;
                        const sb = statusBadge[u.status] || statusBadge.active;
                        return (
                            <div key={u.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 min-h-[64px]">
                                <div>
                                    <p className="text-sm font-bold text-[#111827]">{u.name}</p>
                                    <p className="text-xs text-[#6B7280]">{u.phone}</p>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: rb.bg, color: rb.color }}>{u.role}</span>
                                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: sb.bg, color: sb.color }}>{u.status}</span>
                                    <Button size="sm" variant={u.status === "active" ? "danger" : "success"}>
                                        {u.status === "active" ? <><UserX className="w-3 h-3" /> Suspend</> : <><BadgeCheck className="w-3 h-3" /> Reinstate</>}
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
