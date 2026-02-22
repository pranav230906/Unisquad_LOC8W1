import { Routes, Route } from "react-router-dom";
import WorkerLayout from "../pages/worker/layout/WorkerLayout";
import WorkerDashboard from "../pages/worker/WorkerDashboard";
import ProfileSetup from "../pages/worker/ProfileSetup";
import AvailabilityManager from "../pages/worker/AvailabilityManager";
import IncomingJobs from "../pages/worker/IncomingJobs";
import Navigation from "../pages/worker/Navigation";
import Earnings from "../pages/worker/Earnings";
import Reviews from "../pages/worker/Reviews";

const WorkerRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<WorkerLayout />}>
        <Route index element={<WorkerDashboard />} />
        <Route path="profile" element={<ProfileSetup />} />
        <Route path="availability" element={<AvailabilityManager />} />
        <Route path="incoming" element={<IncomingJobs />} />
        <Route path="navigation" element={<Navigation />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
};

export default WorkerRoutes;