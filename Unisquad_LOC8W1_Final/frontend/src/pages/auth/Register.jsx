import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Phone, Briefcase, ChevronRight } from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const ROLES = [
  { value: "client", label: "I need a service", icon: "🏠", desc: "Find and book workers" },
  { value: "worker", label: "I offer services", icon: "🔧", desc: "Get hired for jobs" },
];

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("client");
  const nav = useNavigate();
  const { showToast } = useToast();

  const handleSendOtp = () => {
    showToast("OTP sent (mock)", "success");
    nav("/auth/otp", { state: { name, phone: role === "worker" ? `worker_${phone}` : phone } });
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] grid place-items-center px-4 py-8">
      <div className="w-full max-w-md animate-in">

        {/* Logo + heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-[16px] bg-[#1E3A8A] text-white grid place-items-center font-bold text-2xl shadow-[0_8px_24px_rgba(30,58,138,0.35)]">
            U
          </div>
          <h1 className="mt-5 text-3xl font-bold text-[#111827]">Create account</h1>
          <p className="mt-1 text-base text-[#6B7280]">
            Join thousands of professionals on Unisquad
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 space-y-5">

          {/* Role picker */}
          <div>
            <p className="text-sm font-semibold text-[#374151] mb-2">I am a…</p>
            <div className="grid grid-cols-2 gap-3">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-start gap-1 p-3 rounded-[10px] border-2 text-left transition-all min-h-[72px] ${role === r.value
                      ? "border-[#1E3A8A] bg-[#eff6ff]"
                      : "border-[#E5E7EB] hover:border-[#1E3A8A]/40"
                    }`}
                >
                  <span className="text-xl">{r.icon}</span>
                  <span className="text-sm font-semibold text-[#111827]">{r.label}</span>
                  <span className="text-xs text-[#6B7280]">{r.desc}</span>
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Full Name"
            placeholder="e.g. Rajesh Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-5 h-5" />}
            required
          />

          <Input
            label="Phone Number"
            placeholder="+91 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-5 h-5" />}
            type="tel"
            required
          />

          <Button fullWidth disabled={!name || !phone} onClick={handleSendOtp}>
            <ChevronRight className="w-5 h-5" />
            Send OTP
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            Already have an account?{" "}
            <Link to="/auth/login" className="font-semibold text-[#1E3A8A] hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Demo note */}
        <p className="mt-4 text-center text-xs text-[#9CA3AF]">
          Demo mode — any input works. Backend integration pending.
        </p>
      </div>
    </div>
  );
}