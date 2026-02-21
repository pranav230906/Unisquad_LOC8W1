/**
 * Navigation Service
 * ------------------
 * Handles:
 *  1. Fetching the client address for an accepted job (from backend)
 *  2. Getting driving directions (from backend → Google Directions API)
 *  3. Loading the Google Maps JS API dynamically
 *  4. Providing mock/fallback data when backend or API key isn't available
 *
 * TODO: When the real backend is live set `USE_MOCK = false` and
 *       ensure the backend is running on API_BASE_URL.
 */

import { API_BASE_URL, isMockEnabled } from "./api";

// ═══════════════════════════════════════════════════════════════════════
// Mock data — used when backend isn't running or isMockEnabled() is true
// ═══════════════════════════════════════════════════════════════════════
const MOCK_JOB_ADDRESSES = {
    "J-8932": {
        job_id: "J-8932",
        client_name: "Sharma Residence",
        client_address: "B-42, Sector 15, Noida, Uttar Pradesh, India",
        client_lat: 28.5855,
        client_lng: 77.31,
        client_phone: "+91 98765 43210",
    },
    "J-8933": {
        job_id: "J-8933",
        client_name: "Gupta House",
        client_address: "C-12, Sector 62, Noida, Uttar Pradesh, India",
        client_lat: 28.627,
        client_lng: 77.365,
        client_phone: "+91 91234 56789",
    },
    "J-8934": {
        job_id: "J-8934",
        client_name: "Verma Apartment",
        client_address: "D-7, Indirapuram, Ghaziabad, Uttar Pradesh, India",
        client_lat: 28.6412,
        client_lng: 77.3581,
        client_phone: "+91 99876 54321",
    },
    "J-8935": {
        job_id: "J-8935",
        client_name: "Mehta Villa",
        client_address: "Plot 22, DLF Phase 3, Gurgaon, Haryana, India",
        client_lat: 28.4809,
        client_lng: 77.093,
        client_phone: "+91 88765 43210",
    },
};

// ═══════════════════════════════════════════════════════════════════════
// Google Maps JS API loader
// ═══════════════════════════════════════════════════════════════════════

let _mapsApiPromise = null;

/**
 * Load the Google Maps JavaScript API once and cache the promise.
 * Tries to get the key from the backend first; falls back to
 * VITE_GOOGLE_MAPS_API_KEY env var.
 */
export async function loadGoogleMapsAPI() {
    if (_mapsApiPromise) return _mapsApiPromise;

    _mapsApiPromise = (async () => {
        // Already loaded?
        if (window.google?.maps) return window.google.maps;

        // Try to get API key from backend
        let apiKey = "";
        try {
            const res = await fetch(`${API_BASE_URL}/navigation/maps-key`);
            if (res.ok) {
                const data = await res.json();
                apiKey = data.key || "";
            }
        } catch {
            // Backend not running; fallback to env var
        }

        if (!apiKey) {
            apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
        }

        if (!apiKey) {
            console.warn(
                "[NavigationService] No Google Maps API key found. " +
                "Maps will use fallback mode. " +
                "Set GOOGLE_MAPS_API_KEY in backend .env or VITE_GOOGLE_MAPS_API_KEY in frontend .env"
            );
            return null;
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry,places`;
            script.async = true;
            script.defer = true;
            script.onload = () => resolve(window.google.maps);
            script.onerror = () => reject(new Error("Failed to load Google Maps API"));
            document.head.appendChild(script);
        });
    })();

    return _mapsApiPromise;
}

// ═══════════════════════════════════════════════════════════════════════
// API calls
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch the client's address details for a job.
 * @param {string} jobId
 * @returns {Promise<object>} { job_id, client_name, client_address, client_lat, client_lng, client_phone }
 */
export async function getJobClientAddress(jobId) {
    // Use mock if enabled or backend is down
    if (isMockEnabled()) {
        await new Promise((r) => setTimeout(r, 300)); // simulate latency
        const mock = MOCK_JOB_ADDRESSES[jobId];
        if (!mock) throw new Error(`Job '${jobId}' not found in mock data`);
        return { ...mock };
    }

    const res = await fetch(`${API_BASE_URL}/navigation/job-address/${jobId}`);
    if (!res.ok) throw new Error(`Failed to fetch job address: ${res.status}`);
    return res.json();
}

/**
 * Get full driving directions from the worker's current location to the client.
 * @param {string} jobId
 * @param {number} workerLat
 * @param {number} workerLng
 * @returns {Promise<object>} NavigationResponse
 */
export async function getNavigationDirections(jobId, workerLat, workerLng) {
    if (isMockEnabled()) {
        // Build a mock response using the mock address data
        await new Promise((r) => setTimeout(r, 500)); // simulate latency
        const addr = MOCK_JOB_ADDRESSES[jobId];
        if (!addr) throw new Error(`Job '${jobId}' not found in mock data`);

        // Calculate approximate distance using haversine
        const dist = haversineDistance(workerLat, workerLng, addr.client_lat, addr.client_lng);
        const distKm = (dist / 1000).toFixed(1);
        const durationMins = Math.round(dist / (30 * 1000 / 3600) / 60);

        // Calculate ETA
        const now = new Date();
        const eta = new Date(now.getTime() + durationMins * 60 * 1000);
        const etaStr = eta.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

        return {
            success: true,
            job_id: jobId,
            client_name: addr.client_name,
            client_address: addr.client_address,
            client_lat: addr.client_lat,
            client_lng: addr.client_lng,
            worker_lat: workerLat,
            worker_lng: workerLng,
            route: {
                overview_polyline: "",
                total_distance_text: `${distKm} km`,
                total_distance_meters: Math.round(dist),
                total_duration_text: `${durationMins} min`,
                total_duration_seconds: durationMins * 60,
                start_address: "Your location",
                end_address: addr.client_address,
                eta: etaStr,
                steps: [
                    {
                        instruction: `Head towards ${addr.client_address}`,
                        distance_text: `${distKm} km`,
                        duration_text: `${durationMins} min`,
                        start_location: { lat: workerLat, lng: workerLng },
                        end_location: { lat: addr.client_lat, lng: addr.client_lng },
                    },
                ],
            },
        };
    }

    const res = await fetch(`${API_BASE_URL}/navigation/directions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            job_id: jobId,
            worker_lat: workerLat,
            worker_lng: workerLng,
        }),
    });
    if (!res.ok) throw new Error(`Directions request failed: ${res.status}`);
    return res.json();
}

/**
 * Get the worker's current location using the browser Geolocation API.
 * @returns {Promise<{lat: number, lng: number}>}
 */
export function getWorkerCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            // Fallback: Sector 45, Noida (worker's mock address)
            resolve({ lat: 28.5700, lng: 77.3250 });
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            (err) => {
                console.warn("[NavigationService] Geolocation error, using fallback:", err.message);
                // Fallback location
                resolve({ lat: 28.5700, lng: 77.3250 });
            },
            { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════════
// Utility helpers
// ═══════════════════════════════════════════════════════════════════════

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371000;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
