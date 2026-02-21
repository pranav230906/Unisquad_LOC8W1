import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Star,
  BadgeCheck,
  MapPin,
  Search,
  SlidersHorizontal,
  Users
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { createBooking, matchWorkers } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";

function WorkerList() {
  const loc = useLocation();
  const nav = useNavigate();
  const { showToast } = useToast();

  const jobId = loc.state?.jobId || null;
  const initialSkill = loc.state?.skill || "All";
  const initialRadius = loc.state?.radiusKm || 5;

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialSkill);
  const [radiusKm, setRadiusKm] = useState(initialRadius);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);

  const CATEGORIES = ["All", "Plumber", "Electrician", "Carpenter", "AC Repair", "Cleaning", "Painting"];

  async function load() {
    setLoading(true);
    try {
      // For demo, we ignore radius/category if searching by string, or vice versa
      const data = await matchWorkers({
        skill: activeCategory === "All" ? "" : activeCategory,
        radiusKm
      });
      setWorkers(data);
    } catch (e) {
      showToast(e.message || "Failed to load workers", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [activeCategory, radiusKm]);

  const filtered = useMemo(() => {
    return workers.filter(w =>
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.skill.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [workers, searchQuery]);

  async function onBook(workerId) {
    if (!jobId) {
      showToast("Please post a job or select a requirement first to book.", "error");
      nav("/client/post-job");
      return;
    }
    setBooking(workerId);
    try {
      const b = await createBooking({ jobId, workerId });
      showToast("Professional booked successfully!", "success");
      nav(`/client/track/${b.id}`);
    } catch (e) {
      showToast("Booking failed. Please try again.", "error");
    } finally {
      setBooking(null);
    }
  }

  return (
    <div className="space-y-6 animate-in pb-10">
      {/* Page Header */}
      <header>
        <h1 className="text-3xl font-black text-[#111827]">Browse Workers</h1>
        <p className="text-[#6B7280] font-medium mt-1">Find and book trusted professionals near you</p>
      </header>

      {/* Search & Categories Section */}
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-6 space-y-6">
        <div className="flex gap-3">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
            <input
              type="text"
              placeholder="Search by name, category, or skill..."
              className="w-full h-14 pl-12 pr-4 bg-gray-50 border-2 border-transparent rounded-[16px] text-sm font-bold text-[#111827] outline-none focus:border-[#1E3A8A]/20 focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="h-14 px-6 flex items-center gap-2 border-2 border-gray-100 rounded-[16px] text-sm font-bold text-[#111827] hover:bg-gray-50 transition-colors">
            <SlidersHorizontal className="w-5 h-5" />
            <span className="hidden md:inline">Filters</span>
          </button>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-2.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeCategory === cat
                  ? "bg-[#111827] text-white shadow-lg shadow-black/10"
                  : "bg-white text-[#374151] border border-gray-200 hover:border-gray-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Worker Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white h-[420px] rounded-[24px] shadow-sm animate-pulse flex flex-col p-6">
              <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-6" />
              <div className="h-6 bg-gray-100 rounded-full w-2/3 mx-auto mb-4" />
              <div className="h-4 bg-gray-100 rounded-full w-1/3 mx-auto mb-8" />
              <div className="mt-auto h-12 bg-gray-100 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-[24px] p-20 text-center border-2 border-dashed border-gray-100">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-[#111827]">No professionals found</h3>
          <p className="text-sm font-semibold text-[#6B7280] mt-1">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col group p-6 text-center"
            >
              {/* Profile Image with Verified Badge */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={`https://i.pravatar.cc/150?u=${w.id}`}
                  alt={w.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-md"
                />
                {w.verified && (
                  <div className="absolute bottom-1 right-1 bg-[#1E3A8A] border-4 border-white rounded-full p-1 shadow-sm">
                    <BadgeCheck className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>

              {/* Worker Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-[#111827]">{w.name}</h3>
                  <div className="mt-2 text-center">
                    <span className="bg-blue-50 text-[#1E3A8A] text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      {w.skill}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-black text-[#111827]">{w.rating}</span>
                    <span className="text-sm font-bold text-gray-400">({w.id.length * 15} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{w.distanceKm} km away</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-gray-400 capitalize">Starting from <span className="text-lg font-black text-[#111827]">₹{w.priceFrom}</span></p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8">
                <button
                  onClick={() => onBook(w.id)}
                  disabled={booking === w.id}
                  className="w-full py-4 bg-[#111827] text-white rounded-xl font-bold text-sm hover:translate-y-[-2px] hover:shadow-lg active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {booking === w.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Booking...
                    </div>
                  ) : "Book Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkerList;
