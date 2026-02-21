import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Camera, ArrowLeft } from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useToast } from "../../context/ToastContext.jsx";

const ROLE_ROUTES = { worker: "/worker", admin: "/admin", client: "/client" };

export default function AuthProfileSetup() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const nav = useNavigate();
    const loc = useLocation();
    const { user } = useAuth();
    const { showToast } = useToast();

    const role = loc.state?.role || user?.role || "worker";

    const handleFinish = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            showToast("Profile details saved. Verifying phone...", "success");
            nav("/auth/login", { state: { intent: "register", role, phone } });
        }, 600);
    };

    return (
        <div className="min-h-screen w-full bg-white px-6 py-8 flex flex-col items-center">
            <div className="w-full max-w-md animate-in flex flex-col h-full">
                {/* Header */}
                <div className="mb-6 flex items-center">
                    <button onClick={() => nav(-1)} className="hover:bg-gray-100 p-2 rounded-full transition-colors -ml-2 text-[#111827]">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                <h1 className="text-[26px] font-bold text-[#111827] leading-tight text-center mb-8">Complete Profile</h1>

                {/* Profile Upload Placeholder */}
                <div className="flex justify-center mb-10">
                    <div className="w-[100px] h-[100px] rounded-full bg-[#F3F4F6] border-2 border-dashed border-[#D1D5DB] flex flex-col items-center justify-center text-[#6B7280] cursor-pointer hover:bg-[#E5E7EB] transition-colors relative">
                        <Camera className="w-7 h-7 opacity-50 mb-1" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Add Photo</span>
                        <div className="absolute bottom-0 right-0 bg-[#1E3A8A] text-white p-1.5 rounded-full border-2 border-white shadow-sm">
                            <Camera className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 mb-8 flex-1">
                    <div>
                        <label className="text-sm font-semibold text-[#374151] block mb-1.5">Full Name</label>
                        <Input
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-semibold text-[#374151] block mb-1.5">Mobile Number</label>
                        <div className="flex gap-2">
                            <div className="flex items-center justify-center bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-[10px] px-4 font-semibold text-[#111827] h-[56px]">
                                +91
                            </div>
                            <input
                                type="tel"
                                placeholder="10-digit number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="flex-1 bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-semibold text-[#111827] text-[17px] h-[56px] placeholder:text-gray-400 placeholder:font-normal"
                                maxLength={10}
                            />
                        </div>
                    </div>

                    {role === "worker" && (
                        <div>
                            <label className="text-sm font-semibold text-[#374151] block mb-1.5">Service Category</label>
                            <div className="relative">
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full bg-white border-2 border-[#E5E7EB] rounded-[10px] px-4 outline-none focus:border-[#1E3A8A] focus:ring-4 focus:ring-blue-100/50 transition-all font-semibold text-[#111827] text-[15px] h-[56px] appearance-none"
                                    style={{ backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23111827%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem top 50%", backgroundSize: "0.65rem auto" }}
                                >
                                    <option value="" disabled>Select your service</option>
                                    <option value="electrician">Electrician</option>
                                    <option value="plumber">Plumber</option>
                                    <option value="carpenter">Carpenter</option>
                                    <option value="cleaner">Home Cleaning</option>
                                    <option value="salon">Salon at Home</option>
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="mt-auto pt-6">
                    <Button
                        fullWidth
                        disabled={!name || !phone || phone.length < 5 || (role === "worker" && !category)}
                        loading={loading}
                        onClick={handleFinish}
                        className="h-[56px] text-[17px] !rounded-[12px]"
                    >
                        Save & Continue
                    </Button>
                </div>

            </div>
        </div>
    );
}
