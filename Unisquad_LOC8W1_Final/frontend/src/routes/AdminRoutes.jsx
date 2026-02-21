import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Analytics from "../pages/admin/Analytics";
import JobMonitoring from "../pages/admin/JobMonitoring";
import UserManagement from "../pages/admin/UserManagement";
import WorkerVerification from "../pages/admin/WorkerVerification";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="jobs" element={<JobMonitoring />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="verify" element={<WorkerVerification />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
