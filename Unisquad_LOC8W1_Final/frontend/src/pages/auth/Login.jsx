import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";


export default function Login() {
  const nav = useNavigate();
  const loc = useLocation();

  const [phoneOrEmail, setPhoneOrEmail] = useState(loc.state?.phone || "");
  const [loading, setLoading] = useState(false);

  const { showToast } = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!phoneOrEmail) return;
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      showToast("Verification code sent", "success");
      const explicitRole = loc.state?.role;
      nav("/auth/otp", { state: { phone: phoneOrEmail, role: explicitRole, intent: loc.state?.intent, from: loc.state?.from } });
    }, 500);
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md animate-in flex flex-col h-full">
        {/* Header */}
        <div className="mb-8 pt-2">
          <h1 className="text-[26px] font-bold text-[#111827] leading-tight">Enter Mobile Number</h1>
          <p className="mt-1 text-[15px] text-[#6B7280]">We'll send you a verification code</p>
        </div>

        {/* Input */}
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-[#374151]">Mobile Number</label>
          <div className="flex gap-2">
            <div className="flex items-center justify-center bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-[10px] px-4 font-semibold text-[#111827] h-[56px]">
              +91
            </div>
            <input
              type="tel"
              placeholder="10-digit number"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
              className="flex-1 bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-semibold text-[#111827] text-[17px] h-[56px] placeholder:text-gray-400 placeholder:font-normal"
              maxLength={10}
              autoFocus
            />
          </div>

          <p className="text-[13px] text-[#6B7280] leading-relaxed pt-2">
            By continuing, you agree to our <Link to="#" className="text-[#1E3A8A] font-semibold hover:underline">Terms of Service</Link> and <Link to="#" className="text-[#1E3A8A] font-semibold hover:underline">Privacy Policy</Link>
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <Button
            fullWidth
            disabled={!phoneOrEmail || phoneOrEmail.length < 5}
            loading={loading}
            onClick={handleLogin}
            className="h-[56px] text-[17px] !rounded-[12px]"
          >
            Send OTP
          </Button>
          <div className="mt-6 text-center">
            <Link to="/auth/register" className="text-[15px] font-bold text-[#1E3A8A] hover:underline">
              New here? Join as a worker or client
            </Link>
          </div>
        </div>

        {/* Demo hint */}
        <div className="mt-auto pt-10">
          <div className="bg-[#eff6ff] rounded-[12px] p-4 border border-[#bfdbfe]">
            <p className="text-sm font-bold text-[#1e40af] mb-1">Demo shortcuts:</p>
            <ul className="text-[13px] text-[#6B7280] space-y-0.5 font-medium">
              <li>• Any input → <strong className="font-extrabold text-[#111827]">Client</strong> (goes to /client)</li>
              <li>• Input containing "worker" → <strong className="font-extrabold text-[#111827]">Worker</strong></li>
              <li>• Input containing "admin" → <strong className="font-extrabold text-[#111827]">Admin</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}