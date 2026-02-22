import React from "react";
import { Star } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function WorkerReviews() {
    const { t } = useLanguage();
    const reviews = [
        {
            id: 1,
            name: "kumar_family",
            job: "bathroom_plumbing",
            rating: 5,
            text: "excellent_work_desc",
            date: "feb_20"
        }
    ];

    return (
        <div className="animate-in space-y-6 max-w-4xl pb-10">
            <h1 className="text-[22px] font-bold text-[#111827]">{t('reviews')}</h1>

            {/* Rating Summary Box */}
            <div className="bg-white border border-[#E5E7EB] rounded-[12px] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-12">
                {/* Average Rating Block */}
                <div className="text-center flex flex-col items-center flex-shrink-0 w-[160px]">
                    <div className="text-[48px] font-extrabold text-[#111827] leading-tight tracking-tight">4.8</div>
                    <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-current" : "text-yellow-400"}`} />
                        ))}
                    </div>
                    <div className="text-[13px] font-bold text-[#6B7280]">{t('based_on_reviews')}</div>
                </div>

                {/* Rating Bars */}
                <div className="flex-1 space-y-1.5 flex flex-col">
                    {/* 5 Star */}
                    <div className="flex items-center gap-3">
                        <span className="w-6 text-[13px] font-bold text-[#4B5563] text-right flex items-center justify-end gap-1">
                            5 <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </span>
                        <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden flex">
                            <div className="w-[90%] bg-yellow-400 h-full rounded-full"></div>
                        </div>
                        <span className="w-5 text-[13px] font-bold text-[#6B7280] text-right">92</span>
                    </div>

                    {/* 4 Star */}
                    <div className="flex items-center gap-3">
                        <span className="w-6 text-[13px] font-bold text-[#4B5563] text-right flex items-center justify-end gap-1">
                            4 <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        </span>
                        <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden flex">
                            <div className="w-[10%] bg-yellow-400 h-full rounded-full"></div>
                        </div>
                        <span className="w-5 text-[13px] font-bold text-[#6B7280] text-right">6</span>
                    </div>

                    {/* 3, 2, 1 Star */}
                    {[3, 2, 1].map(stars => (
                        <div key={stars} className="flex items-center gap-3">
                            <span className="w-6 text-[13px] font-bold text-[#4B5563] text-right flex items-center justify-end gap-1">
                                {stars} <Star className="w-3 h-3 text-yellow-500 fill-current" />
                            </span>
                            <div className="flex-1 h-2.5 bg-[#F3F4F6] rounded-full overflow-hidden"></div>
                            <span className="w-5 text-[13px] font-bold text-[#6B7280] text-right">0</span>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="text-[17px] font-bold text-[#111827] mt-8 mb-4">{t('recent_reviews')}</h2>

            <div className="space-y-4">
                {reviews.map(review => (
                    <div key={review.id} className="bg-white border border-[#E5E7EB] rounded-[12px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-[17px] font-bold text-[#111827] leading-tight mb-0.5">{t(review.name)}</h3>
                                <p className="text-[14px] font-semibold text-[#6B7280]">{t(review.job)}</p>
                            </div>
                            <div className="bg-[#FAF8ED] border border-[#FDE68A] flex items-center gap-1.5 px-2.5 py-1 rounded-[6px]">
                                <span className="text-[13px] font-bold text-[#92400E]">{review.rating}</span>
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                            </div>
                        </div>

                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                            ))}
                        </div>

                        <p className="text-[15px] text-[#374151] font-medium leading-relaxed mb-6">
                            {t(review.text)}
                        </p>

                        <p className="text-[13px] font-bold text-[#9CA3AF]">
                            {t(review.date)}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}
