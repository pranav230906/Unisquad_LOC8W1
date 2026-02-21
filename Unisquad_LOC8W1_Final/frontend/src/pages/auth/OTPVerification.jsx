import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Keyboard, Phone } from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const phone = loc.state?.phone || loc.state?.phoneOrEmail || "";
  const name = loc.state?.name || "";

  const ROLE_ROUTES = { worker: "/worker", admin: "/admin", client: "/client" };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const user = await login({ phoneOrEmail: phone || "client" });
      showToast("OTP verified — welcome!", "success");
      nav(ROLE_ROUTES[user.role] || "/client", { replace: true });
    } catch (e) {
      showToast(e.message || "Verification failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] grid place-items-center px-4 py-8">
      <div className="w-full max-w-md animate-in">

        {/* Logo + heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-[16px] bg-[#1E3A8A] text-white grid place-items-center font-bold text-2xl shadow-[0_8px_24px_rgba(30,58,138,0.35)]">
            U
          </div>
          <h1 className="mt-5 text-3xl font-bold text-[#111827]">Verify OTP</h1>
          <p className="mt-1 text-base text-[#6B7280]">
            {phone ? (
              <>Sent to <span className="font-semibold text-[#111827]">{phone}</span> (mock)</>
            ) : (
              "Enter the 6-digit code"
            )}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 space-y-5">
          <Input
            label="OTP Code"
            placeholder="• • • • • •"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            leftIcon={<Keyboard className="w-5 h-5" />}
            inputMode="numeric"
            maxLength={6}
            autoComplete="one-time-code"
            hint="Enter any 4+ digits for demo"
          />

          <Button
            fullWidth
            disabled={otp.length < 4}
            loading={loading}
            onClick={handleVerify}
          >
            <CheckCircle className="w-5 h-5" />
            Verify & Continue
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            Wrong number?{" "}
            <Link to="/auth/register" className="font-semibold text-[#1E3A8A] hover:underline">
              Go back
            </Link>
          </p>
        </div>

        {/* Demo note */}
        <div className="mt-4 bg-[#eff6ff] rounded-[10px] border border-[#bfdbfe] p-4">
          <p className="text-xs font-semibold text-[#1e40af] mb-1">Demo mode</p>
          <p className="text-xs text-[#6B7280]">Any 4-digit code works. OTP delivery is mocked.</p>
        </div>
      </div>
    </div>
  );
}