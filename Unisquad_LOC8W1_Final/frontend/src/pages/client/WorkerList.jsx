import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Select from "../../components/common/Select.jsx";
import Input from "../../components/common/Input.jsx";
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

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    const booking = await createBooking({ jobId, workerId });
    showToast("Booked successfully (mock). Tracking started.", "success");
    nav(`/client/track/${booking.id}`);
  }

  return (
    <div className="space-y-4">
      <Card
        title="Choose a Worker"
        subtitle={jobId ? "Workers matched for your job (mock)" : "Browse workers (mock)"}
        right={
          <Button variant="secondary" onClick={load} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <Select label="Skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
            <option>Electrician</option>
            <option>Plumber</option>
            <option>Carpenter</option>
            <option>Painter</option>
            <option>Mechanic</option>
          </Select>

          <Input label="Radius (km)" type="number" min={1} max={10} value={radiusKm} onChange={(e) => setRadiusKm(Number(e.target.value))} />
          <Input label="Min Rating" type="number" step="0.1" min={0} max={5} value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} />

          <div className="flex items-end gap-2">
            <label className="flex items-center gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={onlyVerified} onChange={(e) => setOnlyVerified(e.target.checked)} />
              Verified only
            </label>

            <Button className="ml-auto" onClick={load} disabled={loading}>
              Apply
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((w) => (
          <Card
            key={w.id}
            title={`${w.name} ${w.verified ? "✅" : ""}`}
            subtitle={`${w.skill} • ${w.distanceKm} km away • ${w.jobs} jobs`}
            right={<div className="text-sm font-semibold text-slate-900">⭐ {w.rating}</div>}
          >
            <div className="flex flex-wrap gap-2 text-xs">
              {w.languages.map((l) => (
                <span key={l} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                  {l}
                </span>
              ))}
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1">From ₹{w.priceFrom}</span>
            </div>

            <div className="mt-4 flex gap-2">
              <Button onClick={() => onBook(w.id)}>Book</Button>
              <Button variant="secondary" onClick={() => showToast("Profile screen can be added later.", "info")}>
                View Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <Card title="No workers found" subtitle="Try increasing radius or lowering rating filter.">
          <div className="text-sm text-slate-600">No matches in demo data.</div>
        </Card>
      )}
    </div>
  );
}

export default WorkerList;