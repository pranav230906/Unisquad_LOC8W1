import React, { useState } from "react";
import { MapPin, Calendar, User, CheckCircle, XCircle, Inbox } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import Button from "../../components/ui/Button.jsx";

const mockIncomingJobs = [
  {
    id: 101,
    title: "Plumbing Leakage Fix",
    clientName: "Sneha Kapoor",
    location: "Sector 15, Gurgaon",
    budget: "₹800",
    date: "Feb 22, 2024",
    description: "Bathroom tap is leaking significantly. Needs immediate repair.",
    urgent: true,
  },
  {
    id: 102,
    title: "Ceiling Fan Installation",
    clientName: "Amit Verma",
    location: "Andheri West, Mumbai",
    budget: "₹450",
    date: "Feb 23, 2024",
    description: "Need to install 2 new ceiling fans in the living room.",
    urgent: false,
  },
];

const IncomingJobs = () => {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState(mockIncomingJobs);
  const [accepting, setAccepting] = useState(null);
  const [rejecting, setRejecting] = useState(null);

  const handleAccept = async (jobId) => {
    setAccepting(jobId);
    await new Promise((r) => setTimeout(r, 600));
    setJobs(jobs.filter((j) => j.id !== jobId));
    setAccepting(null);
  };

  const handleReject = async (jobId) => {
    setRejecting(jobId);
    await new Promise((r) => setTimeout(r, 400));
    setJobs(jobs.filter((j) => j.id !== jobId));
    setRejecting(null);
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-[#111827]">{t("incoming_jobs")}</h1>
        <p className="text-sm text-[#6B7280] mt-1">{t("new_requests")}</p>
      </header>

      {jobs.length === 0 ? (
        <div className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-12 text-center">
          <div className="w-16 h-16 bg-[#F3F4F6] rounded-full flex items-center justify-center mx-auto mb-4">
            <Inbox className="w-8 h-8 text-[#9CA3AF]" />
          </div>
          <p className="text-[#374151] font-semibold text-base">No new job requests</p>
          <p className="text-sm text-[#6B7280] mt-1">Check back soon for new opportunities</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-[0_4px_20px_rgba(30,58,138,0.12)] transition-shadow"
            >
              {/* Top: Job title + budget badge */}
              <div className="p-5 border-b border-[#F3F4F6]">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-[#111827] leading-snug flex-1">
                    {job.title}
                  </h2>
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <span className="bg-[#ffedd5] text-[#ea6c04] text-sm font-bold px-3 py-1 rounded-full">
                      {job.budget}
                    </span>
                    {job.urgent && (
                      <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                        Urgent
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Middle: Location + client + date */}
              <div className="px-5 py-4 space-y-2.5">
                <div className="flex items-center gap-2.5 text-sm text-[#374151]">
                  <User className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                  <span className="font-semibold">{job.clientName}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#374151]">
                  <MapPin className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-[#374151]">
                  <Calendar className="w-4 h-4 text-[#6B7280] flex-shrink-0" />
                  <span>{job.date}</span>
                </div>
                <p className="text-sm text-[#6B7280] bg-[#F9FAFB] rounded-[8px] p-3 italic leading-relaxed">
                  "{job.description}"
                </p>
              </div>

              {/* Bottom: Action buttons */}
              <div className="px-5 pb-5 flex gap-3">
                <Button
                  fullWidth
                  loading={accepting === job.id}
                  onClick={() => handleAccept(job.id)}
                >
                  <CheckCircle className="w-5 h-5" />
                  {t("accept")}
                </Button>
                <Button
                  fullWidth
                  variant="secondary"
                  loading={rejecting === job.id}
                  onClick={() => handleReject(job.id)}
                >
                  <XCircle className="w-5 h-5" />
                  {t("reject")}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingJobs;
