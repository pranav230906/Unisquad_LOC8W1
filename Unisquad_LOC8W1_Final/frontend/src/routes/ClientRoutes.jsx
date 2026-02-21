import { Routes, Route } from "react-router-dom";
import ClientLayout from "../components/layout/ClientLayout";
import ClientDashboard from "../pages/client/ClientDashboard";
import PostJob from "../pages/client/PostJob";
import VoicePostJob from "../pages/client/VoicePostJob";
import WorkerList from "../pages/client/WorkerList";
import BookingHistory from "../pages/client/BookingHistory";
import Feedback from "../pages/client/Feedback";
import LiveTracking from "../pages/client/LiveTracking";

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="post-job" element={<PostJob />} />
        <Route path="voice-post-job" element={<VoicePostJob />} />
        <Route path="workers" element={<WorkerList />} />
        <Route path="history" element={<BookingHistory />} />
        <Route path="feedback/:bookingId" element={<Feedback />} />
        <Route path="track/:bookingId" element={<LiveTracking />} />
      </Route>
    </Routes>
  );
};

export default ClientRoutes;
