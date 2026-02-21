import React from "react";

const Navigation = () => {
  const activeJob = {
    address: "B-42, Sector 56, Noida, Uttar Pradesh",
    distance: "3.2 km",
    eta: "12 mins",
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 animate-in fade-in duration-500 h-[calc(100vh-120px)] flex flex-col">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Job Navigation</h1>
        <p className="text-gray-500 mt-1">Real-time directions to your client's location.</p>
      </header>

      {/* Map Placeholder */}
      <div className="flex-1 relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-blue-50 group">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl mb-4 animate-bounce">
            📍
          </div>
          <h3 className="text-xl font-black text-blue-900 mb-2 tracking-tight">Map Interface Mockup</h3>
          <p className="text-blue-600/60 max-w-xs font-medium italic">
            // TODO: Integrate Map API (Google Maps / Mapbox)
          </p>
        </div>

        {/* Animated grid overlay to look like a map system */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#00f 1px, transparent 1px), linear-gradient(90deg, #00f 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Client Detail Card */}
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] ml-1">Current Destination</p>
          <h2 className="text-xl font-bold text-gray-900">{activeJob.address}</h2>
          <div className="flex items-center justify-center md:justify-start gap-4 pt-1">
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold">🛣️ {activeJob.distance}</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold">⏱️ {activeJob.eta}</span>
          </div>
        </div>
        <button className="w-full md:w-auto px-10 py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-3">
          <span>🚀</span> Start Navigation
        </button>
      </div>
    </div>
  );
};

export default Navigation;
