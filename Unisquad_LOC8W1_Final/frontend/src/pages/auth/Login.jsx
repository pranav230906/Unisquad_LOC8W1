import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function Login() {
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const nav = useNavigate();
  const loc = useLocation();

  return (
    <div className="min-h-screen w-full bg-slate-50 grid place-items-center px-4">

      <div className="w-full max-w-md">

        <div className="mb-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold text-lg">
            U
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Login</h1>
          <p className="mt-1 text-sm text-slate-600">Client portal (mock)</p>
        </div>

        <Card>
          <div className="space-y-4">
            <Input
              label="Phone or Email"
              placeholder="+91 9876543210"
              value={phoneOrEmail}
              onChange={(e) => setPhoneOrEmail(e.target.value)}
            />

            <Button
              className="w-full"
              disabled={!phoneOrEmail || loading}
              onClick={async () => {
                try {
                  setLoading(true);
                  await login({ phoneOrEmail });
                  showToast("Login successful", "success");
                  nav(loc.state?.from || "/client");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Signing in..." : "Continue"}
            </Button>

            <div className="text-center text-sm text-slate-600">
              New here?{" "}
              <Link to="/auth/register" className="font-medium text-slate-900 hover:underline">
                Create account
              </Link>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}