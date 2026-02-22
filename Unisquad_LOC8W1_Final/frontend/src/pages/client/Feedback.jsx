import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Star, Mic, MessageCircle, Send, X } from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { useToast } from "../../context/ToastContext.jsx";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className="w-12 h-12 flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          aria-label={`Rate ${star} stars`}
        >
          <Star
            className="w-8 h-8 transition-colors"
            fill={(hovered || value) >= star ? "#F97316" : "none"}
            color={(hovered || value) >= star ? "#F97316" : "#D1D5DB"}
          />
        </button>
      ))}
      <span className="ml-2 text-base font-bold text-[#374151]">
        {["", "Poor", "Fair", "Good", "Great", "Excellent"][value] || "Tap to rate"}
      </span>
    </div>
  );
}

function Feedback() {
  const { bookingId } = useParams();
  const nav = useNavigate();
  const { showToast } = useToast();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit() {
    if (!rating) {
      showToast("Please select a rating before submitting.", "error");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    showToast("Feedback submitted! Thank you.", "success");
    nav("/client/history");
  }

  return (
    <div className="space-y-5 animate-in">
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Leave Feedback</h1>
        <p className="text-sm text-[#6B7280] mt-1">
          Booking #{bookingId.slice(0, 6)} • Your review helps workers improve
        </p>
      </header>

      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 space-y-6">
        {/* Star rating */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#374151] mb-3">
            <Star className="w-4 h-4 text-[#F97316]" />
            How was the service?
          </label>
          <StarPicker value={rating} onChange={setRating} />
        </div>

        <hr className="border-[#F3F4F6]" />

        {/* Comment */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#374151] mb-2">
            <MessageCircle className="w-4 h-4 text-[#1E3A8A]" />
            Comments (optional)
          </label>
          <textarea
            className="w-full min-h-[120px] px-4 py-3 rounded-[10px] border-2 border-[#E5E7EB] focus:border-[#1E3A8A] focus:ring-2 focus:ring-blue-100 outline-none text-base font-medium text-[#111827] resize-none transition-all"
            placeholder="What went well? Any issues? Your honest feedback helps everyone."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* Voice feedback placeholder */}
        <div className="bg-[#eff6ff] rounded-[10px] p-4 flex items-center justify-between gap-3 border border-[#bfdbfe]">
          <div>
            <p className="text-sm font-semibold text-[#1e40af]">Voice Feedback</p>
            <p className="text-xs text-[#6B7280] mt-0.5">Record your feedback by voice (coming soon)</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => showToast("Voice feedback coming soon.", "info")}
          >
            <Mic className="w-4 h-4" />
            Record
          </Button>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth onClick={() => nav("/client/history")}>
            <X className="w-5 h-5" />
            Cancel
          </Button>
          <Button fullWidth loading={submitting} onClick={onSubmit} disabled={!rating}>
            <Send className="w-5 h-5" />
            Submit Feedback
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Feedback;