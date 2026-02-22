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
import { useLanguage } from "../../context/LanguageContext";
import NavigationPopup from "../../components/maps/NavigationPopup";

const nearbyJobs = [
    { id: "J-8933", title: "electrical_setup", price: "₹1200", distance: "dist_1_2km", time: "time_10_00am", urgent: true, location: "verma_apt_sec62" },
    { id: "J-8934", title: "ac_maintenance", price: "₹800", distance: "dist_2_5km", time: "time_11_30am", urgent: false, location: "tech_park_sec125" },
    { id: "J-8935", title: "sofa_cleaning", price: "₹2500", distance: "dist_3_0km", time: "time_02_00pm", urgent: false, location: "sunset_blvd_delhi" },
];

const WorkerDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { t } = useLanguage();

    const [isAvailable, setIsAvailable] = useState(true);
    const [navigatingJobId, setNavigatingJobId] = useState(null);
    const [activeJob, setActiveJob] = useState({
        id: "J-8932",
        status: "On the Way",
        price: "₹800",
        title: "plumbing_repair",
        location: "sharma_res_sec15",
    });
    const [jobStatus, setJobStatus] = useState("On the Way");
    const [nearby, setNearby] = useState(nearbyJobs);

    const handleNavigate = (jobId) => {
        setNavigatingJobId(jobId);
    };

    const handleCloseNavigation = () => {
        setNavigatingJobId(null);
    };

    useEffect(() => {
        const handleVoiceCommand = (e) => {
            const { intent, payload } = e.detail;
            console.log("WorkerDashboard received voice command:", intent, payload);

            if (intent === "TOGGLE_AVAILABLE") {
                setIsAvailable((prev) => !prev);
            } else if (intent === "START_NAVIGATION") {
                setNavigatingJobId(activeJob?.id || null);
            } else if (intent === "COMPLETE_JOB") {
                setJobStatus("Completed");
            } else if (intent === "ACCEPT_JOB") {
                const query = payload?.jobQuery?.toLowerCase() || "";

                let match = nearby.find((j) => query.includes(j.title.toLowerCase().split(" ")[0]) || query.includes(j.title.toLowerCase().split("_")[0]));

                if (!match && query.includes("plumbing")) {
                    alert("Voice Assistant: Plumbing Repair is already your active task!");
                    return;
                }

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
    }, [nearby, activeJob]);

    return (
        <>
            <div className="space-y-4 animate-in pb-16">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h1 className="text-[20px] font-bold text-[#111827]">
                            {t('good_morning')}, {user?.name?.split(' ')[0] || user?.phoneOrEmail || "Rajesh"}!
                        </h1>
                        <p className="text-[#6B7280] mt-0.5 text-xs">{t('daily_overview')}</p>
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
                            <p className="font-bold text-[#111827] text-[15px]">{isAvailable ? t('available') : t('offline')}</p>
                            <p className="text-xs font-semibold text-[#6B7280] mt-0.5">{isAvailable ? t('receive_nearby_jobs') : t('currently_hidden')}</p>
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
                        <h2 className="text-[16px] font-bold text-[#111827]">{t('your_hub')}</h2>
                        <Link to="/worker/earnings" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            {t('view_all')} &gt;
                        </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {/* Today's Earnings */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dcfce7] flex items-center justify-center mb-1.5">
                                <IndianRupee className="w-4 h-4 text-[#16a34a]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight uppercase tracking-wide">{t('todays_earnings')}</p>
                            <p className="text-[15px] font-extrabold text-[#111827]">₹1250</p>
                        </div>

                        {/* Jobs Completed */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#dbeafe] flex items-center justify-center mb-1.5">
                                <Briefcase className="w-4 h-4 text-[#1E3A8A]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[11px] font-bold text-[#6B7280] leading-tight mb-0.5">{t('completed_jobs')}</p>
                            <p className="text-[17px] font-extrabold text-[#111827]">3</p>
                        </div>

                        {/* Rating */}
                        <div className="bg-white rounded-[10px] shadow-sm p-2.5 flex flex-col items-center text-center border border-[#F3F4F6]">
                            <div className="w-9 h-9 rounded-full bg-[#fef08a] flex items-center justify-center mb-2">
                                <Star className="w-4 h-4 text-[#ca8a04]" strokeWidth={2.5} />
                            </div>
                            <p className="text-[10px] font-bold text-[#6B7280] leading-tight mb-0.5 uppercase tracking-wide">{t('overall_rating')}</p>
                            <div className="flex items-center gap-1">
                                <p className="text-[16px] font-extrabold text-[#111827]">4.8</p>
                                <Star className="w-3 h-3 text-[#ca8a04] fill-current" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Job */}
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
                                    onClick={() => handleNavigate(activeJob.id)}
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

                {/* Nearby Jobs */}
                <div>
                    <div className="flex items-center justify-between mb-2.5">
                        <h2 className="text-[16px] font-bold text-[#111827]">{t('nearby_jobs')}</h2>
                        <Link to="/worker/incoming" className="text-sm font-semibold text-[#6B7280] hover:text-[#111827]">
                            {t('view_all')} &gt;
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {nearby.map((job) => (
                            <div
                                key={job.id}
                                onClick={() => alert(`Viewing details for ${job.title}`)}
                                className="bg-white rounded-[10px] shadow-sm border border-[#F3F4F6] p-3.5 flex flex-col gap-1.5 hover:border-[#E5E7EB] transition-colors cursor-pointer"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-[#111827] text-[15px]">{t(job.title)}</h3>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <p className="text-[12px] font-bold text-[#6B7280]">{t(job.distance)}</p>
                                            <span className="text-gray-300 text-[10px]">•</span>
                                            <p className="text-[12px] font-bold text-[#6B7280]">{t(job.time)}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end gap-1">
                                        <p className="font-extrabold text-[#111827] text-[15px]">{job.price}</p>
                                        {job.urgent && (
                                            <span className="bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wide flex items-center gap-1 border border-red-100">
                                                <AlertCircle className="w-2.5 h-2.5" strokeWidth={2.5} /> {t('urgent')}
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
