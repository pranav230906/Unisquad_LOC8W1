import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Loader2,
  CheckCircle,
  Clock,
  Users,
  Route,
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { getJob, getWorkerById, hireWorker } from "../../services/jobService.js";
import { makeCall, sendSMS } from "../../services/twilioService.js";
import { useToast } from "../../context/ToastContext.jsx";

const nextStatus = {
  ASSIGNED: { status: "ACCEPTED", label: "Worker accepted job" },
  ACCEPTED: { status: "EN_ROUTE", label: "Worker is en route" },
  EN_ROUTE: { status: "ARRIVED", label: "Worker arrived" },
  ARRIVED: { status: "COMPLETED", label: "Job completed" },
};

const timelineIcons = {
  ASSIGNED: Users,
  ACCEPTED: CheckCircle,
  EN_ROUTE: Route,
  ARRIVED: MapPin,
  COMPLETED: CheckCircle,
};

function LiveTracking() {
  const { bookingId } = useParams();
  const { showToast } = useToast();

  const [job, setJob] = useState(null);
  const [worker, setWorker] = useState(null);
  const [advancing, setAdvancing] = useState(false);
  const [calling, setCalling] = useState(false);

  async function load() {
    const j = await getJob(bookingId);
    setJob(j);
    if (j && j.worker_id) setWorker(await getWorkerById(j.worker_id));
  }

  useEffect(() => { load(); }, [bookingId]);

  if (!job) {
    return (
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-10 text-center animate-in">
        <MapPin className="w-10 h-10 text-[#9CA3AF] mx-auto mb-3" />
        <p className="font-semibold text-[#374151]">Job not found</p>
        <Link to="/client/history" className="mt-2 inline-block text-sm font-semibold text-[#1E3A8A] hover:underline">
          ← Back to history
        </Link>
      </div>
    );
  }

  const isCompleted = job.status === "completed";

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Live Tracking</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Job #{job.id.slice(0, 6)}
          {worker ? ` • ${worker.name}` : ""}
        </p>
      </header>

      {/* Status banner */}
      <div
        className="rounded-[10px] px-5 py-4 flex items-center gap-3"
        style={{
          background: isCompleted ? "#dcfce7" : "#dbeafe",
          borderLeft: `4px solid ${isCompleted ? "#16a34a" : "#1E3A8A"}`,
        }}
      >
        {isCompleted ? (
          <CheckCircle className="w-5 h-5 text-[#16a34a] flex-shrink-0" />
        ) : (
          <Loader2 className="w-5 h-5 text-[#1E3A8A] animate-spin flex-shrink-0" />
        )}
        <div>
          <p className="text-sm font-bold" style={{ color: isCompleted ? "#16a34a" : "#1E3A8A" }}>
            {isCompleted ? "Job Completed" : `Status: ${job.status.replace(/_/g, " ")}`}
          </p>
          {!isCompleted && (
            <p className="text-xs text-[#6B7280] mt-0.5">Tracking worker in real-time</p>
          )}
        </div>
      </div>

      {/* Map + Timeline grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Map placeholder */}
        <div
          className="rounded-[10px] overflow-hidden border-2 border-[#E5E7EB] min-h-[240px] relative flex flex-col items-center justify-center"
          style={{ background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#1E3A8A 1px, transparent 1px), linear-gradient(90deg, #1E3A8A 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
          <div className="relative z-10 text-center p-6">
            <div className="w-14 h-14 bg-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_8px_24px_rgba(30,58,138,0.3)]">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <p className="text-base font-bold text-[#1E3A8A]">Live Map</p>
            <p className="text-xs text-[#6B7280] mt-1 max-w-[200px]">Google Maps + WebSocket integration pending</p>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
          <h3 className="text-base font-bold text-[#111827] mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#1E3A8A]" />
            Status Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 bg-[#dbeafe] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#1E3A8A]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#111827]">Job Posted</p>
                <p className="text-xs text-[#6B7280]">{new Date().toLocaleString()}</p>
              </div>
            </div>
            {job.worker_id && (
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 bg-[#dbeafe] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-[#1E3A8A]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#111827]">Worker Assigned</p>
                  <p className="text-xs text-[#6B7280]">{new Date().toLocaleString()}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Worker actions */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 flex flex-col sm:flex-row gap-3">
        <Button
          fullWidth
          variant="secondary"
          loading={calling}
          onClick={async () => {
            if (!worker) {
              showToast("No worker assigned yet", "error");
              return;
            }
            setCalling(true);
            try {
              await makeCall(worker.id);
              showToast("Call initiated successfully!", "success");
            } catch (error) {
              showToast(error.message || "Failed to make call", "error");
            } finally {
              setCalling(false);
            }
          }}
        >
          <Phone className="w-5 h-5" />
          Call Worker (Masked)
        </Button>
        <Button
          fullWidth
          variant="secondary"
          onClick={() => showToast("Chat integration pending (WebSocket).", "info")}
        >
          <MessageCircle className="w-5 h-5" />
          Chat
        </Button>

        {!isCompleted && job.worker_id && (
          <Button
            fullWidth
            loading={advancing}
            onClick={async () => {
              setAdvancing(true);
              await hireWorker(job.id, job.worker_id);
              showToast("Worker hired (demo).", "success");
              await load();
              setAdvancing(false);
            }}
          >
            <ArrowRight className="w-5 h-5" />
            Hire Worker
          </Button>
        )}
        {isCompleted && (
          <Link to={`/client/feedback/${job.id}`} className="flex-1">
            <Button fullWidth>
              <ChevronRight className="w-5 h-5" />
              Leave Feedback
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default LiveTracking;