// Mock worker service — swap apiFetch calls in when backend is ready
import { mockWorkerStats, mockRecentJobs, mockWorkerProfile } from "../data/mockWorkerData.js";

/** Get dashboard stats for logged-in worker */
export async function getWorkerStats() {
    return mockWorkerStats;
}

/** Get recent jobs list */
export async function getRecentJobs() {
    return mockRecentJobs;
}

/** Get worker profile */
export async function getWorkerProfile() {
    return mockWorkerProfile;
}

/** Update worker profile (mock) */
export async function updateWorkerProfile(data) {
    // future: return apiFetch("/workers/profile", { method: "PATCH", body: JSON.stringify(data) });
    console.info("[workerService] Profile updated (mock)", data);
    return { ...mockWorkerProfile, ...data };
}

/** Update availability (mock) */
export async function updateAvailability({ isAvailable, workingHours }) {
    // future: return apiFetch("/workers/availability", { method: "PATCH", body: JSON.stringify({ isAvailable, workingHours }) });
    console.info("[workerService] Availability updated (mock)", { isAvailable, workingHours });
    return { success: true };
}

/** Get all reviews for logged-in worker */
export async function getWorkerReviews() {
    const { mockReviews } = await import("../data/mockWorkerData.js");
    return mockReviews;
}

/** Accept an incoming job */
export async function acceptJob(jobId) {
    console.info("[workerService] Job accepted (mock)", jobId);
    return { success: true };
}

/** Reject an incoming job */
export async function rejectJob(jobId) {
    console.info("[workerService] Job rejected (mock)", jobId);
    return { success: true };
}
