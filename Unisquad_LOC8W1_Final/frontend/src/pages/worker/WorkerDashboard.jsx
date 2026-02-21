import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    IndianRupee,
    Briefcase,
    Star,
    Navigation2,
    Phone,
    CheckCircle,
    AlertCircle,
    X,
    Clock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NavigationPopup from "../../components/maps/NavigationPopup";

/**
 * Active job data — placeholder until DB is ready.
 * TODO (DB integration): Replace with a real API call, e.g.:
 *   const { data: activeJob } = useFetch("/api/v1/workers/me/active-job");
 */
const activeJob = {
    id: "J-8932",
    status: "On the Way",
    price: "₹800",
    title: "Plumbing Repair",
    location: "Sharma Residence • Sector 15, Noida",
};

/**
 * Nearby jobs — placeholder until DB is ready.
 * TODO (DB integration): Replace with:
 *   const { data: nearbyJobs } = useFetch("/api/v1/jobs/nearby?lat=...&lng=...");
 */
const nearbyJobs = [
    { id: "J-8933", title: "Electrical Setup", price: "₹1200", distance: "1.2 km away", time: "10:00 AM • Today", urgent: true },
    { id: "J-8934", title: "AC Maintenance", price: "₹800", distance: "2.5 km away", time: "11:30 AM • Today", urgent: false },
    { id: "J-8935", title: "Sofa Cleaning", price: "₹2500", distance: "3.0 km away", time: "02:00 PM • Today", urgent: false },
];

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [isAvailable, setIsAvailable] = useState(true);

    // ── Navigation state ────────────────────────────────────────────────
    // When navigatingJobId is set, the NavigationPopup will appear
    const [navigatingJobId, setNavigatingJobId] = useState(null);

    /**
     * Called when the worker presses "Navigate" on the active job.
     * Sets the jobId to trigger the NavigationPopup, which automatically:
     *  1. Fetches the client's address from the backend
     *  2. Gets the worker's current GPS location
     *  3. Requests driving directions
     *  4. Renders the Google Maps navigation popup
     */
    const handleNavigate = (jobId) => {
        setNavigatingJobId(jobId);
    };

    const handleCloseNavigation = () => {
        setNavigatingJobId(null);
    };

    return (
        <>
            <div className="space-y-4 animate-in pb-16">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#111827]">
                            Good morning, {user?.name?.split(' ')[0] || user?.phoneOrEmail || "Rajesh"}!
                        </h1>
                        <p className="text-[#6B7280] mt-0.5 text-xs">Here's your daily overview</p>
                    </div>
                </div>

                {/* Availability Status */}
                <div className={`bg-white rounded-[10px] shadow-sm p-3.5 flex items-center justify-between border-l-4 ${isAvailable ? 'border-green-500' : 'border-[#E5E7EB]'}`}>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className={`w-3 h-3 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                            {isAvailable && <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>}
                        </div>
                        <div>
                            <p className="font-bold text-[#111827] text-[15px]">{isAvailable ? 'Available' : 'Offline'}</p>
                            <p className="text-xs font-semibold text-[#6B7280] mt-0.5">{isAvailable ? 'You will receive nearby jobs' : 'You are currently hidden'}</p>
                        </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                {/* Your Hub (Stats) */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <h2 className="text-[16px] font-bold text-[#111827]">Your Hub</h2>
                        <Link to="/worker/earnings" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            View Stats &gt;
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {/* Today's Earnings */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dcfce7] flex items-center justify-center mb-1.5">
                                <IndianRupee className="w-4 h-4 text-[#16a34a]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight uppercase tracking-wide">Today's Earnings</p>
                            <p className="text-[15px] font-extrabold text-[#111827]">₹1250</p>
                        </div>

                        {/* Jobs Completed */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center mb-1.5">
                                <Briefcase className="w-4 h-4 text-[#1E3A8A]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[11px] font-bold text-[#6B7280] leading-tight mb-0.5">Jobs<br />Completed</p>
                            <p className="text-[17px] font-extrabold text-[#111827]">3</p>
                        </div>

                        {/* Rating */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2.5 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#fef08a] flex items-center justify-center mb-2">
                                <Star className="w-4 h-4 text-[#ca8a04]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight mb-0.5 uppercase tracking-wide">Overall Rating</p>
                            <div className="flex items-center gap-1">
                                <p className="text-[16px] font-extrabold text-[#111827]">4.8</p>
                                <Star className="w-3 h-3 text-[#ca8a04] fill-current" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Job */}
                <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-1 h-full bg-[#1E3A8A]"></div>
                    <div className="p-3.5 pl-4.5">
                        <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                                <div className="text-[16px] font-extrabold text-[#111827]">{activeJob.price}</div>
                            </div>
                        </div>

                        <h3 className="text-[16px] font-bold text-[#111827] leading-tight mb-0.5">{activeJob.title}</h3>
                        <p className="text-[12px] font-semibold text-[#6B7280] mb-4">{activeJob.location}</p>

                        <div className="flex gap-2">
                            <button
                                onClick={() => handleNavigate(activeJob.id)}
                                className="flex-1 bg-[#1E3A8A] hover:bg-[#1e40af] text-white flex items-center justify-center gap-2 py-2 rounded-[6px] font-bold text-[13px] transition-colors shadow-sm"
                            >
                                <Navigation2 className="w-4 h-4" strokeWidth={2.5} /> Navigate
                            </button>
                            <button
                                onClick={() => alert("Calling Client...")}
                                className="flex-none px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] flex items-center justify-center rounded-[6px] transition-colors"
                            >
                                <Phone className="w-4 h-4" strokeWidth={2} />
                            </button>
                            <button
                                onClick={() => alert("Marking job as complete!")}
                                className="flex-none px-3 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#374151] flex items-center justify-center rounded-[6px] transition-colors"
                            >
                                <CheckCircle className="w-4 h-4" strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nearby Jobs */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <h2 className="text-[16px] font-bold text-[#111827]">Nearby Jobs</h2>
                        <Link to="/worker/incoming" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            View All &gt;
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {nearbyJobs.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => alert(`Viewing details for ${job.title}`)}
                                className="bg-white rounded-[10px] shadow-sm border border-[#F3F4F6] p-3.5 flex flex-col gap-1.5 hover:border-[#E5E7EB] transition-colors cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-[#111827] text-[15px]">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-[12px] font-bold text-[#6B7280]">{job.distance}</p>
                                            <span className="text-gray-300 text-[10px]">•</span>
                                            <p className="text-[12px] font-bold text-[#6B7280]">{job.time}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <p className="font-extrabold text-[#111827] text-[15px]">{job.price}</p>
                                        {job.urgent && (
                                            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 border border-red-100">
                                                <AlertCircle className="w-2.5 h-2.5" strokeWidth={2.5} /> Urgent
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Navigation Popup ─────────────────────────────────────── */}
            {/* 
        When navigatingJobId is set, the NavigationPopup component:
        1. Calls getWorkerCurrentLocation() → browser GPS
        2. Calls getNavigationDirections(jobId, lat, lng) → backend API
           → backend looks up client address (mock/DB)
           → backend calls Google Directions API
           → returns route with turn-by-turn steps
        3. Loads Google Maps JS API and renders the interactive map
        4. Shows minimized/maximized navigation UI
      */}
            {navigatingJobId && (
                <NavigationPopup
                    jobId={navigatingJobId}
                    onClose={handleCloseNavigation}
                />
            )}
        </>
    );
};

export default WorkerDashboard;
