import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const ROLE_ROUTES = { worker: "/worker", admin: "/admin", client: "/client" };

export default function Login() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();
  const loc = useLocation();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await login({ phoneOrEmail });
      showToast("Login successful!", "success");
      // Role-based redirect: honour "from" only if it belongs to user's role
      const dest = loc.state?.from || ROLE_ROUTES[user.role] || "/client";
      nav(dest, { replace: true });
    } catch (e) {
      showToast(e.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F3F4F6] grid place-items-center px-4 py-8">
      <div className="w-full max-w-md animate-in">
        {/* Logo + Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto h-16 w-16 rounded-[16px] bg-[#1E3A8A] text-white grid place-items-center font-bold text-2xl shadow-[0_8px_24px_rgba(30,58,138,0.35)]">
            U
          </div>
          <h1 className="mt-5 text-3xl font-bold text-[#111827]">Welcome back</h1>
          <p className="mt-1 text-base text-[#6B7280]">Sign in to your Unisquad account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 space-y-5">
          <Input
            label="Phone or Email"
            placeholder="+91 9876543210"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            leftIcon={<Phone className="w-5 h-5" />}
            type="text"
            autoComplete="tel"
          />

          <Button fullWidth disabled={!phoneOrEmail} loading={loading} onClick={handleLogin}>
            Continue
          </Button>

          <p className="text-center text-sm text-[#6B7280]">
            New here?{" "}
            <Link to="/auth/register" className="font-semibold text-[#1E3A8A] hover:underline">
              Create account
            </Link>
          </p>
        </div>

        {/* Demo hint */}
        <div className="mt-4 bg-[#eff6ff] rounded-[10px] border border-[#bfdbfe] p-4">
          <p className="text-xs font-semibold text-[#1e40af] mb-1">Demo shortcuts:</p>
          <ul className="text-xs text-[#6B7280] space-y-0.5">
            <li>• Any input → <strong>Client</strong> (goes to /client)</li>
            <li>• Input containing "worker" → <strong>Worker</strong> (goes to /worker)</li>
            <li>• Input containing "admin" → <strong>Admin</strong> (goes to /admin)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}