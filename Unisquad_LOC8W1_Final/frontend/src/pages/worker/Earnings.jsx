import React from "react";
import { useLanguage } from "../../context/LanguageContext";

const mockEarnings = {
  total: "₹45,200",
  thisMonth: "₹12,800",
  jobs: [
    { id: 1, title: "AC Cleaning", date: "Feb 20, 2024", amount: "₹1,200", status: "Paid" },
    { id: 2, title: "Furniture Assembly", date: "Feb 18, 2024", amount: "₹850", status: "Processing" },
    { id: 3, title: "Wall Painting", date: "Feb 15, 2024", amount: "₹4,500", status: "Paid" },
    { id: 4, title: "Switchboard Repair", date: "Feb 10, 2024", amount: "₹300", status: "Paid" },
  ],
};

const Earnings = () => {
  const { t } = useLanguage();
  // TODO: workerService.getEarnings()

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{t("earnings")}</h1>
        <p className="text-gray-500 mt-1">Track your income and payment history.</p>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-600 p-8 rounded-3xl shadow-xl shadow-blue-100 text-white relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-2">{t("total_earnings")}</p>
            <h2 className="text-4xl font-black">{mockEarnings.total}</h2>
          </div>
          <div className="absolute -right-4 -bottom-4 text-9xl text-white/10 font-black">₹</div>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-2">{t("this_month")}</p>
          <h2 className="text-4xl font-black text-gray-900">{mockEarnings.thisMonth}</h2>
          <div className="mt-4 flex items-center gap-2 text-green-600 font-bold text-sm">
            <span>📈</span> +12% from last month
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h3 className="text-xl font-bold text-gray-900">{t("completed_jobs")}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Service</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockEarnings.jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{job.date}</td>
                  <td className="px-6 py-4 font-black text-gray-900">{job.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${job.status === "Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
