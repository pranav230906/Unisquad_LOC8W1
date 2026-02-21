import React from "react";
import { Star, BadgeCheck } from "lucide-react";

const mockReviews = {
  averageRating: 4.8,
  totalReviews: 124,
  list: [
    {
      id: 1,
      clientName: "Anjali Sharma",
      rating: 5,
      comment: "Excellent service! Fixed the AC quickly and was very professional.",
      date: "Feb 15, 2024",
    },
    {
      id: 2,
      clientName: "Vikram Seth",
      rating: 4,
      comment: "Good work on the furniture assembly. Arrived slightly late but the quality was great.",
      date: "Feb 10, 2024",
    },
    {
      id: 3,
      clientName: "Pooja Hegde",
      rating: 5,
      comment: "Very polite and skilled. Highly recommended for any plumbing issues.",
      date: "Feb 5, 2024",
    },
  ],
};

function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className="w-4 h-4"
          fill={i < rating ? "#F97316" : "none"}
          color={i < rating ? "#F97316" : "#D1D5DB"}
        />
      ))}
    </div>
  );
}

const Reviews = () => {
  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">Customer Reviews</h1>
        <p className="text-sm text-[#6B7280] mt-1">See what your clients are saying about your work.</p>
      </header>

      {/* Rating summary card */}
      <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5 flex items-center gap-6">
        <div className="text-center">
          <p className="text-5xl font-bold text-[#111827]">{mockReviews.averageRating}</p>
          <StarRating rating={Math.round(mockReviews.averageRating)} />
          <p className="text-xs text-[#6B7280] mt-1">{mockReviews.totalReviews} reviews</p>
        </div>
        <div className="w-px h-16 bg-[#E5E7EB]" />
        <div>
          {[5, 4, 3].map((star) => {
            const pct = star === 5 ? 75 : star === 4 ? 18 : 7;
            return (
              <div key={star} className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-[#6B7280] w-4">{star}</span>
                <Star className="w-3 h-3 text-[#F97316]" fill="#F97316" />
                <div className="w-24 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F97316] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-[#9CA3AF]">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {mockReviews.list.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#111827]">{review.clientName}</h3>
                  <BadgeCheck className="w-4 h-4 text-[#1E3A8A]" />
                </div>
                <StarRating rating={review.rating} />
              </div>
              <span className="text-xs text-[#9CA3AF] flex-shrink-0 mt-1">{review.date}</span>
            </div>
            <p className="text-sm text-[#374151] leading-relaxed italic">
              "{review.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
