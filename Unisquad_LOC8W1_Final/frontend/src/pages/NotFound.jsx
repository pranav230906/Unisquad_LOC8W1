import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPinOff, Home, ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button.jsx";

export default function NotFound() {
    const nav = useNavigate();
    return (
        <div className="min-h-screen w-full bg-[#F3F4F6] grid place-items-center px-4">
            <div className="text-center max-w-sm animate-in">
                {/* Illustration */}
                <div className="mx-auto w-24 h-24 rounded-[24px] bg-[#dbeafe] flex items-center justify-center mb-6 shadow-[0_4px_20px_rgba(30,58,138,0.15)]">
                    <MapPinOff className="w-12 h-12 text-[#1E3A8A]" />
                </div>

                <h1 className="text-7xl font-black text-[#1E3A8A] leading-none mb-2">404</h1>
                <h2 className="text-xl font-bold text-[#111827] mb-2">Page not found</h2>
                <p className="text-sm text-[#6B7280] mb-8">
                    The page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="secondary" onClick={() => nav(-1)}>
                        <ArrowLeft className="w-4 h-4" />
                        Go back
                    </Button>
                    <Button onClick={() => nav("/auth/login")}>
                        <Home className="w-4 h-4" />
                        Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
