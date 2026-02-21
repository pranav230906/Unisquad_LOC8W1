import React from "react";
import { MapPin, Timer, Route, Navigation2 } from "lucide-react";
import Button from "../../components/ui/Button.jsx";

const activeJob = {
  address: "B-42, Sector 56, Noida, Uttar Pradesh",
  distance: "3.2 km",
  eta: "12 mins",
};

const Navigation = () => {
  return (
    <div className="space-y-5 animate-in h-[calc(100vh-160px)] flex flex-col">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Job Navigation</h1>
        <p className="text-sm text-[#6B7280] mt-1">Real-time directions to your client's location.</p>
      </header>

      {/* Map placeholder */}
      <div
        className="flex-1 relative rounded-[10px] overflow-hidden border-2 border-[#E5E7EB] shadow-[0_2px_8px_rgba(0,0,0,0.08)] min-h-[280px]"
        style={{
          background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
        }}
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 bg-[#1E3A8A] rounded-full flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(30,58,138,0.35)]">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A8A] mb-1">Map Interface</h3>
          <p className="text-sm text-[#6B7280] max-w-xs">
            Google Maps / Mapbox integration pending
          </p>
        </div>

        {/* Distance chips anchored to bottom of map */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
          <div className="flex-1 bg-white/90 backdrop-blur rounded-[8px] px-3 py-2 flex items-center gap-2 shadow-sm">
            <Route className="w-4 h-4 text-[#1E3A8A]" />
            <span className="text-sm font-bold text-[#111827]">{activeJob.distance}</span>
          </div>
          <div className="flex-1 bg-white/90 backdrop-blur rounded-[8px] px-3 py-2 flex items-center gap-2 shadow-sm">
            <Timer className="w-4 h-4 text-[#F97316]" />
            <span className="text-sm font-bold text-[#111827]">{activeJob.eta}</span>
          </div>
        </div>
      </div>

      {/* Destination card + CTA */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <p className="text-xs font-bold text-[#1E3A8A] uppercase tracking-widest mb-2">
          Current Destination
        </p>
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="w-5 h-5 text-[#6B7280] flex-shrink-0 mt-0.5" />
          <h2 className="text-base font-bold text-[#111827] leading-snug">
            {activeJob.address}
          </h2>
        </div>
        <Button fullWidth>
          <Navigation2 className="w-5 h-5" />
          Start Navigation
        </Button>
      </div>
    </div>
  );
};

export default Navigation;
