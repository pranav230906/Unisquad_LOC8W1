import { isMockEnabled } from "./api";

const LS_JOBS = "unisquad_jobs";
const LS_BOOKINGS = "unisquad_bookings";

const mockWorkers = [
  { id: "w1", name: "Ramesh Patil", skill: "Electrician", rating: 4.7, jobs: 120, distanceKm: 1.2, priceFrom: 299, languages: ["Marathi", "Hindi"], verified: true },
  { id: "w2", name: "Sohail Khan", skill: "Plumber", rating: 4.5, jobs: 85, distanceKm: 2.8, priceFrom: 349, languages: ["Hindi"], verified: true },
  { id: "w3", name: "Naveen R", skill: "Painter", rating: 4.3, jobs: 64, distanceKm: 4.1, priceFrom: 499, languages: ["Telugu", "Hindi"], verified: false },
  { id: "w4", name: "Ajay Sutar", skill: "Carpenter", rating: 4.8, jobs: 210, distanceKm: 3.0, priceFrom: 399, languages: ["Marathi"], verified: true },
];

function load(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function createJob(payload) {
  if (!isMockEnabled()) throw new Error("Backend not enabled");
  const jobs = load(LS_JOBS, []);
  const job = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...payload };
  jobs.unshift(job);
  save(LS_JOBS, jobs);
  return job;
}

export async function matchWorkers({ skill, radiusKm = 5 }) {
  return mockWorkers
    .filter((w) => (!skill ? true : w.skill.toLowerCase() === skill.toLowerCase()))
    .filter((w) => w.distanceKm <= radiusKm)
    .sort((a, b) => b.rating - a.rating);
}

export async function createBooking({ jobId, workerId }) {
  const bookings = load(LS_BOOKINGS, []);
  const booking = {
    id: crypto.randomUUID(),
    jobId,
    workerId,
    status: "ASSIGNED",
    timeline: [{ at: new Date().toISOString(), status: "ASSIGNED", label: "Worker assigned" }],
  };
  bookings.unshift(booking);
  save(LS_BOOKINGS, bookings);
  return booking;
}

export async function listBookings() {
  return load(LS_BOOKINGS, []);
}

export async function getBooking(bookingId) {
  const all = load(LS_BOOKINGS, []);
  return all.find((b) => b.id === bookingId) || null;
}

export async function updateBookingStatus(bookingId, status, label) {
  const all = load(LS_BOOKINGS, []);
  const idx = all.findIndex((b) => b.id === bookingId);
  if (idx < 0) return null;
  all[idx].status = status;
  all[idx].timeline.unshift({ at: new Date().toISOString(), status, label: label || status });
  save(LS_BOOKINGS, all);
  return all[idx];
}

export async function getWorkerById(workerId) {
  return mockWorkers.find((w) => w.id === workerId) || null;
}