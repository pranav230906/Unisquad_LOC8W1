import React, { useMemo, useState } from "react";
import {
  Wrench,
  MapPin,
  Calendar,
  Clock,
  FileText,
  Radar,
  Search,
  PaperclipIcon,
} from "lucide-react";
import Input from "../../components/ui/Input.jsx";
import Button from "../../components/ui/Button.jsx";
import { createJob, matchWorkers } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";
import { useNavigate } from "react-router-dom";

const SKILLS = ["Electrician", "Plumber", "Carpenter", "Painter", "Mechanic"];

function PostJob() {
  const [skill, setSkill] = useState("Electrician");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [radiusKm, setRadiusKm] = useState(5);
  const [matchingCount, setMatchingCount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewing, setPreviewing] = useState(false);

  const { showToast } = useToast();
  const nav = useNavigate();
  const canSubmit = useMemo(() => skill && date && time && address, [skill, date, time, address]);

  const inputClass = "w-full min-h-[48px] px-4 py-3 rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] bg-white transition-all";

  async function previewMatches() {
    try {
      setPreviewing(true);
      const workers = await matchWorkers({ skill, radiusKm });
      setMatchingCount(workers.length);
    } catch (e) {
      showToast(e.message || "Failed to preview matches", "error");
    } finally {
      setPreviewing(false);
    }
  }

  async function onPost() {
    try {
      setLoading(true);
      const job = await createJob({ skill, date, time, address, notes, radiusKm });
      showToast("Job posted (mock). Choose a worker now.", "success");
      nav("/client/workers", { state: { jobId: job.id, skill, radiusKm } });
    } catch (e) {
      showToast(e.message || "Failed to post job", "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 animate-in">
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Post a Job</h1>
        <p className="text-sm text-[#6B7280] mt-1">Fill in the details and we'll match you with the best workers nearby.</p>
      </header>

      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Service Type */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-[#374151] mb-1.5">
              <Wrench className="w-4 h-4 text-[#1E3A8A]" />
              Service Type
            </label>
            <select
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              className={inputClass}
            >
              {SKILLS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Radius */}
          <Input
            label="Search Radius (km)"
            type="number"
            min={1}
            max={10}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            hint="Active workers within this radius"
            leftIcon={<Radar className="w-5 h-5" />}
          />

          {/* Date */}
          <Input
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            leftIcon={<Calendar className="w-5 h-5" />}
          />

          {/* Time */}
          <Input
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            leftIcon={<Clock className="w-5 h-5" />}
          />

          {/* Address */}
          <div className="md:col-span-2">
            <Input
              label="Address"
              placeholder="House no, street, area, city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              leftIcon={<MapPin className="w-5 h-5" />}
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-[#374151] mb-1.5">
              <FileText className="w-4 h-4 text-[#1E3A8A]" />
              Notes (optional)
            </label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={3}
              placeholder="Describe the issue. E.g., fan not working, switch sparks, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 items-start">
          <Button variant="secondary" loading={previewing} onClick={previewMatches}>
            <Search className="w-5 h-5" />
            Preview Workers
          </Button>
          {matchingCount !== null && (
            <span className="flex items-center self-center text-sm font-semibold text-[#16a34a]">
              ✓ {matchingCount} worker{matchingCount !== 1 ? "s" : ""} found within {radiusKm} km
            </span>
          )}
          <div className="sm:ml-auto w-full sm:w-auto">
            <Button fullWidth disabled={!canSubmit} loading={loading} onClick={onPost}>
              Post Job
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;