import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { verifyOtp } from "../../services/authService.js";

const ROLE_ROUTES = { worker: "/worker", admin: "/admin", client: "/client" };

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const loc = useLocation();
  const { setUser } = useAuth(); // NEW: Used only for setting Global State
  const { showToast } = useToast();

  const phone = loc.state?.phone || "9876543210";
  const explicitRole = loc.state?.role || "";

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp.length < 4) return;
    try {
      setLoading(true);

      const { user } = await verifyOtp({ phone, otp });
      setUser(user);

      showToast("OTP verified — welcome!", "success");

      if (!user.role || !user.name) {
        nav("/auth/profile", { state: { role: explicitRole, from: loc.state?.from, phone: user.phone || phone } });
        return;
      }

      const dest = loc.state?.from || ROLE_ROUTES[user.role] || "/client";
      nav(dest, { replace: true });

    } catch (err) {
      showToast(err.message || "Verification failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white px-6 py-8 flex flex-col items-center">
      <div className="w-full max-w-md animate-in flex flex-col h-full">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => nav(-1)} className="mb-6 hover:bg-gray-100 p-2 rounded-full transition-colors inline-block -ml-2 text-[#111827]">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[26px] font-bold text-[#111827] leading-tight">Verify Phone</h1>
          <p className="mt-1.5 text-[15px] text-[#6B7280]">
            Enter the code sent to <span className="font-semibold text-[#111827]">+91 {phone.substring(0, 5)} {phone.substring(5, 10)}</span>
          </p>
        </div>

        {/* Input */}
        <div className="space-y-6 mb-4">
          <input
            type="text"
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="w-full bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-bold text-[#111827] text-3xl h-[64px] tracking-[0.6em] text-center"
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            autoFocus
          />

          <div className="text-center">
            <button className="text-[14px] font-semibold text-[#6B7280] hover:text-[#1E3A8A] transition-colors">
              Resend Code in 00:30
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Button
            fullWidth
            disabled={otp.length < 4}
            loading={loading}
            onClick={handleVerify}
            className="h-[56px] text-[17px] !rounded-[12px]"
          >
            Verify & Proceed
          </Button>
        </div>


      </div>
    </div>
  );
}