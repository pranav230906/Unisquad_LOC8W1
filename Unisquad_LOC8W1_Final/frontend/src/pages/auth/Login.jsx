import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function Login() {
    const nav = useNavigate();
    const { login } = useAuth();
    const { showToast } = useToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setLoading(true);
        try {
            console.log('Attempting login with:', { email, password });
            const user = await login({ email, password });
            console.log('Login successful:', user);
            showToast("Login successful!", "success");
            nav("/client");
        } catch (error) {
            console.error('Login error:', error);
            showToast(error.message || "Login failed", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-white px-6 py-8 flex flex-col items-center">
            <div className="w-full max-w-md animate-in flex flex-col h-full">
                {/* Header */}
                <div className="mb-8 pt-2">
                    <h1 className="text-[26px] font-bold text-[#111827] leading-tight">Welcome Back</h1>
                    <p className="mt-1 text-[15px] text-[#6B7280]">Sign in to your account</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#374151]">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-semibold text-[#111827] text-[17px] h-[56px] placeholder:text-gray-400 placeholder:font-normal"
                            required
                            autoFocus
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-[#374151]">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-semibold text-[#111827] text-[17px] h-[56px] placeholder:text-gray-400 placeholder:font-normal"
                            required
                        />
                    </div>

                    {/* Terms */}
                    <p className="text-[13px] text-[#6B7280] leading-relaxed pt-2">
                        By continuing, you agree to our <Link to="#" className="text-[#1E3A8A] font-semibold hover:underline">Terms of Service</Link> and <Link to="#" className="text-[#1E3A8A] font-semibold hover:underline">Privacy Policy</Link>
                    </p>

                    {/* Login Button */}
                    <div className="mt-8">
                        <Button
                            type="submit"
                            fullWidth
                            disabled={!email || !password}
                            loading={loading}
                            className="h-[56px] text-[17px] !rounded-[12px]"
                        >
                            Sign In
                        </Button>

                        <div className="mt-6 text-center">
                            <Link to="/auth/register" className="text-[15px] font-bold text-[#1E3A8A] hover:underline">
                                New here? Join as a worker or client
                            </Link>
                        </div>
                    </div>
                </form>

                {/* Demo Accounts Info */}
                <div className="mt-8 p-4 bg-gray-50 rounded-lg text-sm">
                    <p className="font-semibold text-gray-700 mb-2">Demo Accounts:</p>
                    <p className="text-gray-600">Client: client@example.com / client123</p>
                    <p className="text-gray-600">Worker: worker@example.com / worker123</p>
                </div>
            </div>
        </div>
    );
}