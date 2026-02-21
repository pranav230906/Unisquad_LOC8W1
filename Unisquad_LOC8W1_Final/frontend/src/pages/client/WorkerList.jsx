import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Star, BadgeCheck, MapPin, IndianRupee, Users, RefreshCw } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { createBooking, matchWorkers } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";

function WorkerList() {
  const loc = useLocation();
  const nav = useNavigate();
  const { showToast } = useToast();

  const jobId = loc.state?.jobId || null;
  const initialSkill = loc.state?.skill || "Electrician";
  const initialRadius = loc.state?.radiusKm || 5;

  const [skill, setSkill] = useState(initialSkill);
  const [radiusKm, setRadiusKm] = useState(initialRadius);
  const [minRating, setMinRating] = useState(4.0);
  const [onlyVerified, setOnlyVerified] = useState(true);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const SKILLS = ["Electrician", "Plumber", "Carpenter", "Painter", "Mechanic"];

  async function load() {
    setLoading(true);
    try {
      const data = await matchWorkers({ skill, radiusKm });
      setWorkers(data);
    } catch (e) {
      showToast(e.message || "Failed to load workers", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    return workers
      .filter((w) => w.rating >= minRating)
      .filter((w) => (onlyVerified ? w.verified : true));
  }, [workers, minRating, onlyVerified]);

  async function onBook(workerId) {
    if (!jobId) {
      showToast("Post a job first (demo).", "error");
      nav("/client/post-job");
      return;
    }
    setBooking(workerId);
    try {
      const b = await createBooking({ jobId, workerId });
      showToast("Booked successfully! Tracking started.", "success");
      nav(`/client/track/${b.id}`);
    } finally {
      setBooking(null);
    }
  }

  return (
    <div className="space-y-5 animate-in">
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Choose a Worker</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          {jobId ? "Workers matched for your job" : "Browse available workers"}
        </p>
      </header>

      {/* Filters */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1 block">Skill</label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className="w-full min-h-[44px] px-3 py-2 rounded-[10px] border-2 border-[#E5E7EB] text-sm font-medium text-[#111827] outline-none focus:border-[#1E3A8A]"
            >
              {SKILLS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1 block">Radius (km)</label>
            <input
              type="number" min={1} max={10} value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full min-h-[44px] px-3 py-2 rounded-[10px] border-2 border-[#E5E7EB] text-sm font-medium text-[#111827] outline-none focus:border-[#1E3A8A]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-[#374151] mb-1 block">Min Rating</label>
            <input
              type="number" step="0.1" min={0} max={5} value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full min-h-[44px] px-3 py-2 rounded-[10px] border-2 border-[#E5E7EB] text-sm font-medium text-[#111827] outline-none focus:border-[#1E3A8A]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#374151] min-h-[24px] cursor-pointer">
              <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} className="w-4 h-4 accent-[#1E3A8A]" />
              Verified only
            </label>
            <Button size="sm" onClick={load} loading={loading}>
              <RefreshCw className="w-4 h-4" />
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Worker cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-[10px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="skeleton h-5 w-2/3 mb-3" />
              <div className="skeleton h-4 w-1/2 mb-2" />
              <div className="skeleton h-4 w-1/3 mb-5" />
              <div className="skeleton h-12 w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-10 text-center">
          <Users className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
          <p className="font-semibold text-[#374151]">No workers found</p>
          <p className="text-sm text-[#6B7280] mt-1">Try increasing radius or lowering rating filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_20px_rgba(30,58,138,0.12)] transition-shadow"
            >
              {/* Top: name + rating */}
              <div className="px-5 pt-5 pb-4 border-b border-[#F3F4F6]">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-bold text-[#111827]">{w.name}</h2>
                      {w.verified && <BadgeCheck className="w-4 h-4 text-[#1E3A8A]" />}
                    </div>
                    <p className="text-sm text-[#6B7280] mt-0.5">{w.skill}</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#ffedd5] px-3 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 text-[#F97316]" fill="#F97316" />
                    <span className="text-sm font-bold text-[#ea6c04]">{w.rating}</span>
                  </div>
                </div>
              </div>

              {/* Middle: location + wage + jobs */}
              <div className="px-5 py-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-[#374151]">
                  <MapPin className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                  <span>{w.distanceKm} km away</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#374151]">
                  <IndianRupee className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                  <span className="font-semibold">From ₹{w.priceFrom}</span>
                  <span className="text-[#9CA3AF]">• {w.jobs} jobs done</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {w.languages.map((l) => (
                    <span key={l} className="text-xs bg-[#F3F4F6] text-[#374151] font-medium px-2 py-0.5 rounded-full">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom: Book CTA */}
              <div className="px-5 pb-5">
                <Button
                  fullWidth
                  loading={booking === w.id}
                  onClick={() => onBook(w.id)}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkerList;