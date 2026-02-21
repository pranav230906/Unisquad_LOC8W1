import React, { useMemo, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Select from "../../components/common/Select.jsx";
import Button from "../../components/common/Button.jsx";
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

  const { showToast } = useToast();
  const nav = useNavigate();

  const canSubmit = useMemo(() => skill && date && time && address, [skill, date, time, address]);

  async function previewMatches() {
    try {
      setLoading(true);
      const workers = await matchWorkers({ skill, radiusKm });
      setMatchingCount(workers.length);
    } catch (e) {
      showToast(e.message || "Failed to preview matches", "error");
    } finally {
      setLoading(false);
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
    <div className="space-y-4">
      <Card title="Post a Job" subtitle="Form-based booking. Later: POST /jobs (FastAPI).">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Service Type" value={skill} onChange={(e) => setSkill(e.target.value)}>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>

          <Input
            label="Search Radius (km)"
            type="number"
            min={1}
            max={10}
            value={radiusKm}
            onChange={(e) => setRadiusKm(Number(e.target.value))}
            hint="Active workers within this radius will be shown"
          />

          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input label="Time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <div className="md:col-span-2">
            <Input
              label="Address"
              placeholder="House no, street, area, city"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              hint="Future: address will be geocoded with Google Maps API"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Notes (optional)</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              rows={4}
              placeholder="Explain the issue. Example: fan not working, switch sparks, etc."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={previewMatches} disabled={loading}>
            {loading ? "Checking..." : "Preview matching workers"}
          </Button>

          {matchingCount !== null && (
            <span className="text-sm text-slate-700">
              Found <span className="font-semibold">{matchingCount}</span> worker(s) within {radiusKm} km
            </span>
          )}

          <div className="ml-auto">
            <Button onClick={onPost} disabled={!canSubmit || loading}>
              {loading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PostJob;