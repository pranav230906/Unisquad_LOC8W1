import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Select from "../../components/common/Select.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function Feedback() {
  const { bookingId } = useParams();
  const nav = useNavigate();
  const { showToast } = useToast();

  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");

  return (
    <div className="space-y-4">
      <Card title="Feedback" subtitle={`Booking #${bookingId.slice(0, 6)} (mock)`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select label="Rating" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Okay</option>
            <option value="2">2 - Bad</option>
            <option value="1">1 - Very bad</option>
          </Select>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-semibold text-slate-900">Voice feedback (placeholder)</div>
            <div className="mt-1 text-sm text-slate-600">Later: record audio → STT → store via backend.</div>
            <Button className="mt-3" variant="secondary" onClick={() => showToast("Voice feedback coming soon.", "info")}>
              Record Voice
            </Button>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Comments</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              rows={4}
              placeholder="Write what went well or issues faced."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => nav("/client/history")}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                // TODO: backend: POST /feedback
                showToast("Feedback submitted (mock).", "success");
                nav("/client/history");
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Feedback;