import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";
import { sendOtp } from "../../services/authService.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
    const nav = useNavigate();
    const loc = useLocation();

    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (isAuthenticated && user?.role) {
            const dest = user.role === "worker" ? "/worker" : user.role === "admin" ? "/admin" : "/client";
            nav(dest, { replace: true });
        }
    }, [isAuthenticated, user, nav]);

    const [phoneOrEmail, setPhoneOrEmail] = useState(loc.state?.phone || "");
    const [loading, setLoading] = useState(false);

    const { showToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!phoneOrEmail || phoneOrEmail.length < 5) return;
        try {
            setLoading(true);
            const result = await sendOtp({ phone: phoneOrEmail }); // Live real-world SMS
            if (result.dev_otp) {
                showToast(`[DEV] Your OTP is: ${result.dev_otp}`, "info", 15000);
            } else {
                showToast("Verification code sent", "success");
            }

            const explicitRole = loc.state?.role;
            nav("/auth/otp", { state: { phone: phoneOrEmail, role: explicitRole, intent: loc.state?.intent, from: loc.state?.from } });
        } catch (err) {
            showToast(err.message || "Failed to send verification code", "error");
        } finally {
            setLoading(false);
        }
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


            </div>
        </div>
    );
}