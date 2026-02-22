import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Building2, ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";

const ROLES = [
  {
    value: "worker",
    label: "Service Provider",
    icon: Briefcase,
    desc: "Find work opportunities and earn daily",
    tags: ["Find Jobs", "Track Earnings", "Get Paid Daily"]
  },
  {
    value: "client",
    label: "Client / Employer",
    icon: Building2,
    desc: "Post jobs and hire skilled workers",
    tags: ["Post Jobs", "Find Workers", "Manage Projects"]
  },
];

export default function Register() {
  const [role, setRole] = useState("worker");
  const nav = useNavigate();

  const handleContinue = () => {
    // Figma flow adjustment: Account selection -> Profile Setup (and entering Phone)
    nav("/auth/profile", { state: { intent: "register", role } });
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md animate-in flex flex-col h-full">

        <button onClick={() => nav(-1)} className="mb-4 hover:bg-gray-100 p-2 rounded-full transition-colors inline-block -ml-2 text-[#111827] self-start">
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Heading */}
        <div className="mb-8 text-center pt-2">
          <h1 className="text-[28px] font-bold text-[#111827]">Join as</h1>
          <p className="mt-1.5 text-[15px] text-[#6B7280]">
            Choose your account type
          </p>
        </div>

        {/* Roles */}
        <div className="space-y-4">
          {ROLES.map((r) => {
            const Icon = r.icon;
            const isSelected = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`w-full flex flex-col p-5 rounded-[12px] border-2 text-left transition-all ${isSelected
                  ? "border-[#1E3A8A] bg-[#eff6ff] shadow-[0_4px_16px_rgba(0,0,0,0.06)] transform scale-[0.995]"
                  : "border-[#E5E7EB] hover:border-[#1E3A8A]/30 bg-white"
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-full ${isSelected ? 'bg-[#1E3A8A] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold text-[#111827]">{r.label}</span>
                </div>
                <span className="text-[15px] text-[#4B5563] font-medium leading-snug block mb-4">{r.desc}</span>

                <div className="flex flex-wrap gap-2">
                  {r.tags.map(tag => (
                    <span key={tag} className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${isSelected ? 'bg-[#1E3A8A] text-white' : 'bg-[#F3F4F6] text-[#6B7280]'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action */}
        <div className="mt-10 mb-8">
          <Button fullWidth onClick={handleContinue} className="h-[56px] text-[17px] !rounded-[12px]">
            Continue as {role === "worker" ? "Service Provider" : "Client"}
          </Button>

          <div className="mt-6 text-center">
            <Link to="/auth/login" className="text-[15px] font-bold text-[#1E3A8A] hover:underline">
              Already have an account? Log in
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}