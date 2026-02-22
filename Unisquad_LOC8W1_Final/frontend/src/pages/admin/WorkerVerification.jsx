import React, { useState } from "react";
import { BadgeCheck, Clock, FileText } from "lucide-react";
import Button from "../../components/ui/Button.jsx";

const pending = [
    { id: "w2", name: "Sohail Khan", skill: "Plumber", phone: "+91 98765 00002", aadhaar: "XXXX-XXXX-4321", submitted: "20 Feb 2026" },
    { id: "w5", name: "Naveen Reddy", skill: "Painter", phone: "+91 98765 00007", aadhaar: "XXXX-XXXX-7654", submitted: "19 Feb 2026" },
];

const verified = [
    { id: "w1", name: "Ramesh Patil", skill: "Electrician", verifiedOn: "15 Feb 2026" },
    { id: "w4", name: "Ajay Sutar", skill: "Carpenter", verifiedOn: "10 Feb 2026" },
];

export default function WorkerVerification() {
    const [verifiedList, setVerifiedList] = useState(verified);
    const [pendingList, setPendingList] = useState(pending);

    const approve = (w) => {
        setPendingList((p) => p.filter((x) => x.id !== w.id));
        setVerifiedList((v) => [{ id: w.id, name: w.name, skill: w.skill, verifiedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) }, ...v]);
    };

    const reject = (id) => setPendingList((p) => p.filter((x) => x.id !== id));

    return (
        <div className="space-y-6 animate-in">
            <header>
                <h1 className="text-2xl font-bold text-[#111827]">Worker Verification</h1>
                <p className="text-sm text-[#6B7280] mt-1">Review and approve worker ID documents.</p>
            </header>

            {/* Pending */}
            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <Clock className="w-5 h-5 text-[#d97706]" />
                    <h2 className="text-base font-bold text-[#111827]">Pending ({pendingList.length})</h2>
                </div>
                {pendingList.length === 0 ? (
                    <p className="px-5 py-8 text-center text-sm text-[#6B7280]">All workers verified ✓</p>
                ) : (
                    <div className="divide-y divide-[#F3F4F6]">
                        {pendingList.map((w) => (
                            <div key={w.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                                <div>
                                    <p className="text-sm font-bold text-[#111827]">{w.name}</p>
                                    <p className="text-xs text-[#6B7280]">{w.skill} · {w.phone}</p>
                                    <p className="text-xs text-[#9CA3AF] mt-0.5 flex items-center gap-1">
                                        <FileText className="w-3 h-3" /> Aadhaar: {w.aadhaar} · Submitted {w.submitted}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="success" onClick={() => approve(w)}>
                                        <BadgeCheck className="w-4 h-4" /> Approve
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => reject(w.id)}>Reject</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Verified */}
            <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-4 border-b border-[#F3F4F6]">
                    <BadgeCheck className="w-5 h-5 text-[#16a34a]" />
                    <h2 className="text-base font-bold text-[#111827]">Verified ({verifiedList.length})</h2>
                </div>
                <div className="divide-y divide-[#F3F4F6]">
                    {verifiedList.map((w) => (
                        <div key={w.id} className="flex items-center justify-between px-5 py-4 min-h-[56px]">
                            <p className="text-sm font-semibold text-[#111827]">{w.name} <span className="text-xs font-normal text-[#6B7280]">· {w.skill}</span></p>
                            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background: "#dcfce7", color: "#16a34a" }}>
                                Verified {w.verifiedOn}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
