import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const mockIncomingJobs = [
  {
    id: 101,
    title: "Plumbing Leakage Fix",
    clientName: "Sneha Kapoor",
    location: "Sector 15, Gurgaon",
    budget: "₹800",
    date: "Feb 22, 2024",
    description: "Bathroom tap is leaking significantly. Needs immediate repair.",
  },
  {
    id: 102,
    title: "Ceiling Fan Installation",
    clientName: "Amit Verma",
    location: "Andheri West, Mumbai",
    budget: "₹450",
    date: "Feb 23, 2024",
    description: "Need to install 2 new ceiling fans in the living room.",
  },
];

const IncomingJobs = () => {
  const { t } = useLanguage();
  const [jobs, setJobs] = useState(mockIncomingJobs);

  const handleAccept = (jobId) => {
    // TODO: jobService.acceptJob(jobId)
    alert(`Job ${jobId} accepted! (Mock)`);
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  const handleReject = (jobId) => {
    // TODO: jobService.rejectJob(jobId)
    alert(`Job ${jobId} rejected. (Mock)`);
    setJobs(jobs.filter(j => j.id !== jobId));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in slide-in-from-bottom duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("incoming_jobs")}</h1>
        <p className="text-gray-500 mt-1">{t("new_requests")}</p>
      </header>

      {jobs.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-dashed border-gray-200 text-center">
          <p className="text-gray-400 font-bold">No new service requests at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative group">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-900 leading-tight">{job.title}</h2>
                <span className="bg-blue-100 text-blue-700 text-xs font-black px-2 py-1 rounded-lg uppercase">{job.budget}</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>👤</span>
                  <span className="font-bold">{job.clientName}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>📅</span>
                  <span>{job.date}</span>
                </div>
                <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-xl italic">
                  "{job.description}"
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleAccept(job.id)}
                  className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 active:scale-95"
                >
                  {t("accept")}
                </button>
                <button
                  onClick={() => handleReject(job.id)}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-400 font-bold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-colors active:scale-95"
                >
                  {t("reject")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingJobs;
