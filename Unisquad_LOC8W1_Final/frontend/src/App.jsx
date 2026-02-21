import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkerRoutes from "./routes/WorkerRoutes";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Worker Module */}
        <Route path="/worker/*" element={<WorkerRoutes />} />

        {/* Temporary Home Route */}
        <Route
          path="/"
          element={
            <div className="p-10">
              <h1 className="text-3xl font-bold">
                Unisquad LOC8W1 - Test Mode
              </h1>
              <p className="mt-4">
                Go to <a href="/worker" className="text-blue-600">Worker Dashboard</a>
              </p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;