import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function OTPVerification() {
  const [otp, setOtp] = useState("");
  const nav = useNavigate();
  const loc = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  const phone = loc.state?.phone || "";

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <div className="w-full max-w-md">
        <Card title="Verify OTP" subtitle={`Sent to ${phone || "your number"} (mock)`}>
          <div className="space-y-4">
            <Input label="OTP" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button
              className="w-full"
              disabled={otp.length < 4}
              onClick={async () => {
                await login({ phoneOrEmail: phone || "client" });
                showToast("OTP verified (mock)", "success");
                nav("/client");
              }}
            >
              Verify
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}