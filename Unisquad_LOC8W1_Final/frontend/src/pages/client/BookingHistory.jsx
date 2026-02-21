import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card.jsx";
import { listBookings } from "../../services/jobService.js";
import { Link } from "react-router-dom";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    listBookings().then(setBookings);
  }, []);

  return (
    <div className="space-y-4">
      <Card title="Booking History" subtitle="All bookings (mock)">
        {bookings.length === 0 ? (
          <div className="text-sm text-slate-600">
            No bookings yet. Post a job to get started.
          </div>
        ) : (
          <div className="divide-y">
            {bookings.map((b) => (
              <div key={b.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    Booking #{b.id.slice(0, 6)}
                  </div>
                  <div className="text-xs text-slate-600">
                    Status: {b.status}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    className="text-sm font-medium text-slate-900 hover:underline"
                    to={`/client/track/${b.id}`}
                  >
                    Track
                  </Link>

                  <Link
                    className="text-sm font-medium text-slate-900 hover:underline"
                    to={`/client/feedback/${b.id}`}
                  >
                    Feedback
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default BookingHistory;