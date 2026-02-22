import api from "./api";

// Mock workers for fallback
const mockWorkers = [
  { id: "w1", name: "Ramesh Patil", skill: "Electrician", rating: 4.7, jobs: 120, distanceKm: 1.2, priceFrom: 299, languages: ["Marathi", "Hindi"], verified: true },
  { id: "w2", name: "Sohail Khan", skill: "Plumber", rating: 4.5, jobs: 85, distanceKm: 2.8, priceFrom: 349, languages: ["Hindi"], verified: true },
  { id: "w3", name: "Naveen R", skill: "Painter", rating: 4.3, jobs: 64, distanceKm: 4.1, priceFrom: 499, languages: ["Telugu", "Hindi"], verified: false },
  { id: "w4", name: "Ajay Sutar", skill: "Carpenter", rating: 4.8, jobs: 210, distanceKm: 3.0, priceFrom: 399, languages: ["Marathi"], verified: true },
];

const LS_JOBS = "unisquad_jobs";
const LS_BOOKINGS = "unisquad_bookings";

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) {
    console.error("Failed to parse storage key:", key, e);
    return fallback;
  }
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Create a new job */
export async function createJob(payload) {
  try {
    console.log('Creating job with payload:', payload);
    const response = await api.post('/jobs', payload);
    console.log('Job creation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Job creation error:', error);
    console.error('Error response:', error.response?.data);
    throw new Error(error.response?.data?.detail || 'Failed to create job');
  }
}

/** Get all jobs for the current client */
export async function getClientJobs() {
  try {
    const response = await api.get('/jobs/my-jobs');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch jobs');
  }
}

/** Get a specific job by ID */
export async function getJob(jobId) {
  try {
    const response = await api.get(`/jobs/${jobId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to fetch job');
  }
}

/** Delete a job */
export async function deleteJob(jobId) {
  try {
    await api.delete(`/jobs/${jobId}`);
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to delete job');
  }
}

/** Hire a worker for a job */
export async function hireWorker(jobId, workerId) {
  try {
    const response = await api.post(`/jobs/${jobId}/hire/${workerId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to hire worker');
  }
}

/** Get mock workers (fallback for worker listing) */
export async function matchWorkers({ skill, radiusKm = 5 }) {
  return mockWorkers
    .filter((w) => (!skill ? true : w.skill.toLowerCase() === skill.toLowerCase()))
    .filter((w) => w.distanceKm <= radiusKm)
    .sort((a, b) => b.rating - a.rating);
}

/** Get worker by ID (mock) */
export async function getWorkerById(workerId) {
  return mockWorkers.find((w) => w.id === workerId) || null;
}

/** Create a new booking */
export async function createBooking({ jobId, workerId }) {
  const bookings = load(LS_BOOKINGS, []);
  const booking = {
    id: "book-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
    jobId,
    workerId,
    status: "ASSIGNED",
    timeline: [{ at: new Date().toISOString(), status: "ASSIGNED", label: "Worker assigned" }],
  };
  bookings.unshift(booking);
  save(LS_BOOKINGS, bookings);
  return booking;
}

/** List all bookings */
export async function listBookings() {
  return load(LS_BOOKINGS, []);
}

/** Get a specific booking by ID */
export async function getBooking(bookingId) {
  const all = load(LS_BOOKINGS, []);
  return all.find((b) => b.id === bookingId) || null;
}

/** Update the status of a booking */
export async function updateBookingStatus(bookingId, status, label) {
  const all = load(LS_BOOKINGS, []);
  const idx = all.findIndex((b) => b.id === bookingId);
  if (idx < 0) return null;
  all[idx].status = status;
  all[idx].timeline.unshift({ at: new Date().toISOString(), status, label: label || status });
  save(LS_BOOKINGS, all);
  return all[idx];
}