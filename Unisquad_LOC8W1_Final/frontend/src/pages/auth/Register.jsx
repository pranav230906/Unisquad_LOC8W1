import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const nav = useNavigate();
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-slate-50 grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-slate-900 text-white grid place-items-center font-bold">U</div>
          <h1 className="mt-3 text-xl font-semibold text-slate-900">Create account</h1>
          <p className="mt-1 text-sm text-slate-600">OTP screen is a placeholder</p>
        </div>

        <Card>
          <div className="space-y-4">
            <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />

            <Button
              className="w-full"
              disabled={!name || !phone}
              onClick={() => {
                showToast("OTP sent (mock)", "success");
                nav("/auth/otp", { state: { name, phone } });
              }}
            >
              Send OTP
            </Button>

            <div className="text-center text-sm text-slate-600">
              Already have an account? <Link className="text-slate-900 font-medium" to="/auth/login">Login</Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}