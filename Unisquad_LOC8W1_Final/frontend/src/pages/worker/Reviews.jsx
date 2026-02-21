import React from "react";

const mockReviews = {
  averageRating: 4.8,
  totalReviews: 124,
  list: [
    { id: 1, clientName: "Anjali Sharma", rating: 5, comment: "Excellent service! Fixed the AC quickly and was very professional.", date: "Feb 15, 2024" },
    { id: 2, clientName: "Vikram Seth", rating: 4, comment: "Good work on the furniture assembly. Arrived slightly late but the quality was great.", date: "Feb 10, 2024" },
    { id: 3, clientName: "Pooja Hegde", rating: 5, comment: "Very polite and skilled. Highly recommended for any plumbing issues.", date: "Feb 5, 2024" },
  ],
};

const Reviews = () => {
  const { t } = useLanguage();
  // TODO: workerService.getReviews()

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("customer_reviews")}</h1>
          <p className="text-gray-500 mt-1">See what your clients are saying about your work.</p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900">{mockReviews.averageRating}</p>
            <div className="text-yellow-400 text-sm">★★★★★</div>
          </div>
          <div className="h-10 w-[1px] bg-gray-100"></div>
          <div>
            <p className="text-xl font-bold text-gray-900">{mockReviews.totalReviews}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t("reviews")} (Total)</p>
          </div>
        </div>
      </header>

      {/* Reviews List */}
      <div className="space-y-6">
        {mockReviews.list.map((review) => (
          <div key={review.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">{review.clientName}</h3>
                <div className="flex gap-1 mt-1 text-yellow-400 text-xs">
                  {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                </div>
              </div>
              <span className="text-sm font-medium text-gray-400">{review.date}</span>
            </div>
            <p className="text-gray-600 leading-relaxed font-medium italic">
              "{review.comment}"
            </p>
            <div className="mt-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-[10px] font-black">
                VERIFIED
              </span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter self-center pt-0.5">Customer</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
