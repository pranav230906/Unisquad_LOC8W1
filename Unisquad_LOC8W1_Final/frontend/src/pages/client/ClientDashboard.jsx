import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import { Link } from "react-router-dom";
import { listBookings } from "../../services/jobService.js";

function ClientDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    listBookings().then(setBookings);
  }, []);

  const active = bookings.filter((b) => b.status !== "COMPLETED");

  return (
    <div className="space-y-4">

      {/* Hero section */}
      <div className="rounded-2xl bg-gradient-to-br from-white to-slate-100 border border-slate-200 p-6">
        <h1 className="text-xl font-semibold text-slate-900">
          Book trusted professionals near you
        </h1>

        <p className="mt-1 text-sm text-slate-600">
          Electricians, plumbers, carpenters and more — book instantly.
        </p>

        <div className="mt-4 flex gap-2 flex-wrap">
          <Link to="/client/post-job">
            <Button>Post a Job</Button>
          </Link>

          <Link to="/client/voice-post-job">
            <Button variant="secondary">Voice Post</Button>
          </Link>

          <Link to="/client/workers">
            <Button variant="secondary">Browse Workers</Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">

        <Card title="Active Bookings">
          <div className="text-3xl font-semibold text-slate-900">
            {active.length}
          </div>
        </Card>

        <Card title="Total Bookings">
          <div className="text-3xl font-semibold text-slate-900">
            {bookings.length}
          </div>
        </Card>

        <Card title="Safety">
          <div className="text-sm text-slate-700">
            Masked calling protects your privacy.
          </div>
        </Card>

      </div>

      {/* Recent bookings */}
      <Card title="Recent Bookings">

        {bookings.length === 0 ? (
          <div className="text-sm text-slate-600">
            No bookings yet.
          </div>
        ) : (
          bookings.slice(0, 4).map((b) => (
            <div
              key={b.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div>
                <div className="text-sm font-medium">
                  #{b.id.slice(0, 6)}
                </div>

                <div className="text-xs text-slate-600">
                  {b.status}
                </div>
              </div>

              <Link to={`/client/track/${b.id}`}>
                <Button variant="secondary">
                  Track
                </Button>
              </Link>

            </div>
          ))
        )}

      </Card>

    </div>
  );
}

export default ClientDashboard;