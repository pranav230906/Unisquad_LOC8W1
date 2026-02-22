import React, { useState, useEffect } from "react";
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
<<<<<<< HEAD
import { useLanguage } from "../../context/LanguageContext";

// Removed fixed activeJob object
=======
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
>>>>>>> clientBackendFinal

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
<<<<<<< HEAD
    const { t } = useLanguage();

    const [isAvailable, setIsAvailable] = useState(true);
    const [showMap, setShowMap] = useState(false);
    const [isMapMaximized, setIsMapMaximized] = useState(false);
    const [activeJob, setActiveJob] = useState({
        id: "J-8932",
        status: "On the Way",
        price: "₹800",
        title: "plumbing_repair",
        location: "sharma_res_sec15",
    });
    const [jobStatus, setJobStatus] = useState("On the Way");
    const [nearby, setNearby] = useState([
        { id: "J-8933", title: "electrical_setup", price: "₹1200", distance: "dist_1_2km", time: "time_10_00am", urgent: true, location: "verma_apt_sec62" },
        { id: "J-8934", title: "ac_maintenance", price: "₹800", distance: "dist_2_5km", time: "time_11_30am", urgent: false, location: "tech_park_sec125" },
        { id: "J-8935", title: "sofa_cleaning", price: "₹2500", distance: "dist_3_0km", time: "time_02_00pm", urgent: false, location: "sunset_blvd_delhi" },
    ]);

    useEffect(() => {
        const handleVoiceCommand = (e) => {
            const { intent, payload } = e.detail;
            console.log("WorkerDashboard received voice command:", intent, payload);

            if (intent === "TOGGLE_AVAILABLE") {
                setIsAvailable((prev) => !prev);
            } else if (intent === "START_NAVIGATION") {
                setShowMap(true);
                setIsMapMaximized(true);
            } else if (intent === "COMPLETE_JOB") {
                setJobStatus("Completed");
            } else if (intent === "ACCEPT_JOB") {
                const query = payload?.jobQuery?.toLowerCase() || "";

                // Fallback: If user just says "accept plumbing job" despite it being active already
                let match = nearby.find((j) => query.includes(j.title.toLowerCase().split(" ")[0]));

                if (!match && query.includes("plumbing")) {
                    alert("Voice Assistant: Plumbing Repair is already your active task!");
                    return;
                }

                // Extra fallback if they just say "accept this job" or "accept job" and there's nearby jobs
                if (!match && nearby.length > 0 && query.includes("this")) match = nearby[0];

                if (match) {
                    setActiveJob({
                        id: match.id,
                        status: "On the Way",
                        price: match.price,
                        title: match.title,
                        location: match.location || "Client address",
                    });
                    setJobStatus("On the Way");
                    setNearby(prev => prev.filter(j => j.id !== match.id));
                } else {
                    alert("Voice Assistant: Could not find that job to accept.");
                }
            }
        };

        window.addEventListener('voice-command', handleVoiceCommand);
        return () => window.removeEventListener('voice-command', handleVoiceCommand);
    }, [nearby]);

=======

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

>>>>>>> clientBackendFinal
    return (
        <>
            <div className="space-y-4 animate-in pb-16">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#111827]">
<<<<<<< HEAD
                            {t('good_morning')}, {user?.name?.split(' ')[0] || user?.phoneOrEmail || "Rajesh"}!
                        </h1>
                        <p className="text-[#6B7280] mt-0.5 text-xs">{t('daily_overview')}</p>
=======
                            Good morning, {user?.name?.split(' ')[0] || user?.phoneOrEmail || "Rajesh"}!
                        </h1>
                        <p className="text-[#6B7280] mt-0.5 text-xs">Here's your daily overview</p>
>>>>>>> clientBackendFinal
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
<<<<<<< HEAD
                            <p className="font-bold text-[#111827] text-[15px]">{isAvailable ? t('available') : t('offline')}</p>
                            <p className="text-xs font-semibold text-[#6B7280] mt-0.5">{isAvailable ? t('receive_nearby_jobs') : t('currently_hidden')}</p>
=======
                            <p className="font-bold text-[#111827] text-[15px]">{isAvailable ? 'Available' : 'Offline'}</p>
                            <p className="text-xs font-semibold text-[#6B7280] mt-0.5">{isAvailable ? 'You will receive nearby jobs' : 'You are currently hidden'}</p>
>>>>>>> clientBackendFinal
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
<<<<<<< HEAD
                        <h2 className="text-[16px] font-bold text-[#111827]">{t('your_hub')}</h2>
                        <Link to="/worker/earnings" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            {t('view_all')} &gt;
=======
                        <h2 className="text-[16px] font-bold text-[#111827]">Your Hub</h2>
                        <Link to="/worker/earnings" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            View Stats &gt;
>>>>>>> clientBackendFinal
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {/* Today's Earnings */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dcfce7] flex items-center justify-center mb-1.5">
                                <IndianRupee className="w-4 h-4 text-[#16a34a]" strokeWidth={2.5} />
                            </div>
<<<<<<< HEAD
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight uppercase tracking-wide">{t('todays_earnings')}</p>
=======
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight uppercase tracking-wide">Today's Earnings</p>
>>>>>>> clientBackendFinal
                            <p className="text-[15px] font-extrabold text-[#111827]">₹1250</p>
                        </div>

                        {/* Jobs Completed */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center mb-1.5">
                                <Briefcase className="w-4 h-4 text-[#1E3A8A]" strokeWidth={2.5} />
                            </div>
<<<<<<< HEAD
                            <p className="text-[11px] font-bold text-[#6B7280] leading-tight mb-0.5">{t('completed_jobs')}</p>
=======
                            <p className="text-[11px] font-bold text-[#6B7280] leading-tight mb-0.5">Jobs<br />Completed</p>
>>>>>>> clientBackendFinal
                            <p className="text-[17px] font-extrabold text-[#111827]">3</p>
                        </div>

                        {/* Rating */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2.5 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#fef08a] flex items-center justify-center mb-2">
                                <Star className="w-4 h-4 text-[#ca8a04]" strokeWidth={2.5} />
                            </div>
<<<<<<< HEAD
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight mb-0.5 uppercase tracking-wide">{t('overall_rating')}</p>
=======
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight mb-0.5 uppercase tracking-wide">Overall Rating</p>
>>>>>>> clientBackendFinal
                            <div className="flex items-center gap-1">
                                <p className="text-[16px] font-extrabold text-[#111827]">4.8</p>
                                <Star className="w-3 h-3 text-[#ca8a04] fill-current" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Job */}
<<<<<<< HEAD
                {activeJob && (
                    <div className="bg-white rounded-[10px] shadow-sm border border-[#E5E7EB] overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#1E3A8A]"></div>
                        <div className="p-3.5 pl-4.5">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide border 
                                  ${jobStatus === "Completed" ? "bg-green-50 text-green-700 border-green-200" :
                                            "bg-[#1E3A8A]/10 text-[#1E3A8A] border-[#1E3A8A]/20"}`}>
                                        {jobStatus === "Completed" ? t('completed') : t('on_the_way')}
                                    </span>
                                    <div className="text-[16px] font-extrabold text-[#111827]">{activeJob.price}</div>
                                </div>
                            </div>

                            <h3 className="text-[16px] font-bold text-[#111827] leading-tight mb-0.5">{t(activeJob.title)}</h3>
                            <p className="text-[12px] font-semibold text-[#6B7280] mb-4">{t(activeJob.location)}</p>

                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowMap(true)}
                                    className="flex-1 bg-[#1E3A8A] hover:bg-[#1e40af] text-white flex items-center justify-center gap-2 py-2 rounded-[6px] font-bold text-[13px] transition-colors shadow-sm"
                                >
                                    <Navigation2 className="w-4 h-4" strokeWidth={2.5} /> {t('navigate')}
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
                )}
=======
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
>>>>>>> clientBackendFinal

                {/* Nearby Jobs */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
<<<<<<< HEAD
                        <h2 className="text-[16px] font-bold text-[#111827]">{t('nearby_jobs')}</h2>
                        <Link to="/worker/incoming" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            {t('view_all')} &gt;
=======
                        <h2 className="text-[16px] font-bold text-[#111827]">Nearby Jobs</h2>
                        <Link to="/worker/incoming" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            View All &gt;
>>>>>>> clientBackendFinal
                        </Link>
                    </div>

                    <div className="space-y-3">
<<<<<<< HEAD
                        {nearby.map((job) => (
=======
                        {nearbyJobs.map((job) => (
>>>>>>> clientBackendFinal
                            <div
                                key={job.id}
                                onClick={() => alert(`Viewing details for ${job.title}`)}
                                className="bg-white rounded-[10px] shadow-sm border border-[#F3F4F6] p-3.5 flex flex-col gap-1.5 hover:border-[#E5E7EB] transition-colors cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
<<<<<<< HEAD
                                        <h3 className="font-bold text-[#111827] text-[15px]">{t(job.title)}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-[12px] font-bold text-[#6B7280]">{t(job.distance)}</p>
                                            <span className="text-gray-300 text-[10px]">•</span>
                                            <p className="text-[12px] font-bold text-[#6B7280]">{t(job.time)}</p>
=======
                                        <h3 className="font-bold text-[#111827] text-[15px]">{job.title}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-[12px] font-bold text-[#6B7280]">{job.distance}</p>
                                            <span className="text-gray-300 text-[10px]">•</span>
                                            <p className="text-[12px] font-bold text-[#6B7280]">{job.time}</p>
>>>>>>> clientBackendFinal
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <p className="font-extrabold text-[#111827] text-[15px]">{job.price}</p>
                                        {job.urgent && (
                                            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 border border-red-100">
<<<<<<< HEAD
                                                <AlertCircle className="w-2.5 h-2.5" strokeWidth={2.5} /> {t('urgent')}
=======
                                                <AlertCircle className="w-2.5 h-2.5" strokeWidth={2.5} /> Urgent
>>>>>>> clientBackendFinal
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            {/* Minimized / Maximize Navigation Map */}
            {showMap && (
                <>
                    {/* Minimized View */}
                    {!isMapMaximized && (
                        <div
                            onClick={() => setIsMapMaximized(true)}
                            className="fixed bottom-6 right-4 z-50 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
                        >
                            <div className="relative">
                                <img src={navigationMap} alt="Navigation" className="w-full h-32 object-cover" />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowMap(false);
                                    }}
                                    className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-md hover:bg-white text-gray-800 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1">
                                    <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div> LIVE
                                </div>
                            </div>
                            <div className="p-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-[14px] font-extrabold text-blue-600">12 min</p>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">to destination</p>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                        <Navigation2 className="w-4 h-4 text-blue-600 fill-current" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Maximized View (Pinned Box - Half Page Style) */}
                    {isMapMaximized && (
                        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300 pointer-events-none">
                            <div
                                className="absolute bottom-6 right-4 w-full max-w-[450px] h-[550px] bg-white rounded-[20px] shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-right-4 duration-300 flex flex-col pointer-events-auto"
                            >
                                {/* Map Area */}
                                <div className="flex-1 relative bg-gray-100">
                                    <img src={navigationMap} alt="Full Map" className="w-full h-full object-cover" />

                                    {/* Top Instruction Banner */}
                                    <div className="absolute top-4 left-4 right-4 group">
                                        <div className="bg-white rounded-xl p-3.5 shadow-lg border border-gray-100 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md">
                                                <Navigation2 className="w-5 h-5 fill-current" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">In 200 meters</p>
                                                <p className="text-[15px] font-extrabold text-[#111827]">Turn right on Sector 15 Road</p>
                                            </div>
                                            <button
                                                onClick={() => setIsMapMaximized(false)}
                                                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* LIVE Indicator */}
                                    <div className="absolute bottom-4 left-4 bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div> LIVE GPS
                                    </div>
                                </div>

                                {/* Bottom Stats & Controls */}
                                <div className="bg-white p-5 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-5 px-2">
                                        <div className="flex gap-6">
                                            <div className="text-center">
                                                <p className="text-2xl font-black text-[#111827]">12</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">min</p>
                                            </div>
                                            <div className="w-px h-8 bg-gray-100 self-center"></div>
                                            <div>
                                                <p className="text-lg font-extrabold text-gray-800">2.4 km</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">distance</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-[#111827]">12:45</p>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase">Arrival</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => {
                                                setIsMapMaximized(false);
                                                setShowMap(false);
                                            }}
                                            className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-[13px] hover:bg-red-100 transition-colors uppercase tracking-wider"
                                        >
                                            Exit Trip
                                        </button>
                                        <button
                                            onClick={() => setIsMapMaximized(false)}
                                            className="flex-1 py-3 bg-[#1E3A8A] text-white rounded-xl font-bold text-[13px] hover:bg-opacity-90 transition-colors uppercase tracking-wider shadow-md"
                                        >
                                            Minimize
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
=======
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
>>>>>>> clientBackendFinal
            )}
        </>
    );
};

export default WorkerDashboard;
