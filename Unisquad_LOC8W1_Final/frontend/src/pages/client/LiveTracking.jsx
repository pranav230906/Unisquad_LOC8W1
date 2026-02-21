import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import { getBooking, getWorkerById, updateBookingStatus } from "../../services/jobService.js";
import { useToast } from "../../context/ToastContext.jsx";

const nextStatus = {
  ASSIGNED: { status: "ACCEPTED", label: "Worker accepted job" },
  ACCEPTED: { status: "EN_ROUTE", label: "Worker is en route" },
  EN_ROUTE: { status: "ARRIVED", label: "Worker arrived" },
  ARRIVED: { status: "COMPLETED", label: "Job completed" },
};

function LiveTracking() {
  const { bookingId } = useParams();
  const { showToast } = useToast();

  const [booking, setBooking] = useState(null);
  const [worker, setWorker] = useState(null);

  async function load() {
    const b = await getBooking(bookingId);
    setBooking(b);
    if (b) setWorker(await getWorkerById(b.workerId));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  if (!booking) {
    return (
      <Card title="Tracking" subtitle="Booking not found">
        <Link className="text-sm font-medium text-slate-900 underline" to="/client/history">
          Go to history
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card
        title={`Live Tracking • Booking #${booking.id.slice(0, 6)}`}
        subtitle={`Status: ${booking.status}${worker ? ` • Worker: ${worker.name}` : ""}`}
        right={
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => showToast("Masked calling will be integrated later (Twilio).", "info")}>
              Call (masked)
            </Button>
            <Button variant="secondary" onClick={() => showToast("Chat will be added later (Twilio/WebSocket).", "info")}>
              Chat
            </Button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Map Placeholder */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Map (placeholder)</div>
            <div className="mt-2 text-sm text-slate-600">
              Future: Google Maps JS + Directions API + WebSocket live location.
            </div>
            <div className="mt-3 h-44 rounded-xl border border-dashed border-slate-300 grid place-items-center text-slate-500 text-sm">
              Live Map Here
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">Timeline</div>

            <div className="mt-3 space-y-3">
              {booking.timeline.map((t, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                  <div>
                    <div className="text-sm font-medium text-slate-900">{t.label}</div>
                    <div className="text-xs text-slate-500">{new Date(t.at).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {booking.status !== "COMPLETED" ? (
                <Button
                  onClick={async () => {
                    const step = nextStatus[booking.status];
                    if (!step) return;
                    await updateBookingStatus(booking.id, step.status, step.label);
                    showToast("Status updated (mock).", "success");
                    load();
                  }}
                >
                  Advance Status (Demo)
                </Button>
              ) : (
                <Link to={`/client/feedback/${booking.id}`}>
                  <Button>Give Feedback</Button>
                </Link>
              )}

              <Button variant="secondary" onClick={() => showToast("AI follow-up will be triggered from backend later.", "info")}>
                AI Follow-up (placeholder)
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LiveTracking;