/**
 * NavigationPopup.jsx
 * ───────────────────
 * A floating navigation popup that appears when a worker clicks "Navigate"
 * on an accepted job. It:
 *  1. Fetches the client's address from the backend (or mock)
 *  2. Gets the worker's current location via browser Geolocation
 *  3. Requests driving directions from the backend (Google Directions API)
 *  4. Renders a Google Map with the route, markers, and turn-by-turn info
 *  5. Supports minimized (thumbnail) and maximized (half-page) views
 *
 * Fallback: If Google Maps API key is not available, renders an
 *           interactive fallback map with embedded OpenStreetMap tiles.
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    X,
    Navigation2,
    Maximize2,
    Minus,
    MapPin,
    Clock,
    ArrowRight,
    Loader2,
    AlertTriangle,
    Phone,
    CornerDownRight,
} from "lucide-react";
import {
    loadGoogleMapsAPI,
    getJobClientAddress,
    getNavigationDirections,
    getWorkerCurrentLocation,
} from "../../services/navigationService";

const NavigationPopup = ({ jobId, onClose }) => {
    // ── State ──────────────────────────────────────────────────────────
    const [isMaximized, setIsMaximized] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [navData, setNavData] = useState(null);
    const [currentStepIdx, setCurrentStepIdx] = useState(0);
    const [mapsAPI, setMapsAPI] = useState(null);
    const [workerPos, setWorkerPos] = useState(null);

    // Refs for Google Maps objects
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const directionsRendererRef = useRef(null);
    const workerMarkerRef = useRef(null);
    const clientMarkerRef = useRef(null);
    const mapContainerMiniRef = useRef(null);
    const mapContainerMaxRef = useRef(null);

    // ── Initialisation ─────────────────────────────────────────────────
    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);

                // 1. Get worker's current location
                const workerLocation = await getWorkerCurrentLocation();
                if (cancelled) return;
                setWorkerPos(workerLocation);

                // 2. Load Google Maps JS API (may return null if no key)
                let maps = null;
                try {
                    maps = await loadGoogleMapsAPI();
                } catch (e) {
                    console.warn("[NavigationPopup] Maps API load failed:", e);
                }
                if (cancelled) return;
                setMapsAPI(maps);

                // 3. Get directions from backend
                const directions = await getNavigationDirections(
                    jobId,
                    workerLocation.lat,
                    workerLocation.lng
                );
                if (cancelled) return;
                setNavData(directions);
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [jobId]);

    // ── Render Google Map (when data & API are ready) ──────────────────
    const renderMap = useCallback(
        (container) => {
            if (!container || !mapsAPI || !navData) return;
            if (mapInstanceRef.current?.getDiv() === container) return;

            const { google } = window;
            if (!google?.maps) return;

            const center = {
                lat: (navData.worker_lat + navData.client_lat) / 2,
                lng: (navData.worker_lng + navData.client_lng) / 2,
            };

            const map = new google.maps.Map(container, {
                center,
                zoom: 14,
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
                zoomControl: true,
                styles: [
                    { featureType: "poi", stylers: [{ visibility: "off" }] },
                    { featureType: "transit", stylers: [{ visibility: "off" }] },
                ],
            });
            mapInstanceRef.current = map;

            // Worker marker (blue dot)
            workerMarkerRef.current = new google.maps.Marker({
                position: { lat: navData.worker_lat, lng: navData.worker_lng },
                map,
                title: "Your Location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: "#1E3A8A",
                    fillOpacity: 1,
                    strokeColor: "#ffffff",
                    strokeWeight: 3,
                },
                label: { text: "A", color: "#fff", fontSize: "10px", fontWeight: "bold" },
            });

            // Client marker (red pin)
            clientMarkerRef.current = new google.maps.Marker({
                position: { lat: navData.client_lat, lng: navData.client_lng },
                map,
                title: navData.client_name,
                label: { text: "B", color: "#fff", fontSize: "10px", fontWeight: "bold" },
            });

            // Draw route
            if (navData.route?.overview_polyline) {
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map,
                    suppressMarkers: true,
                    polylineOptions: {
                        strokeColor: "#1E3A8A",
                        strokeWeight: 5,
                        strokeOpacity: 0.85,
                    },
                });
                directionsRendererRef.current = directionsRenderer;

                // Use the Directions Service for proper rendering
                const directionsService = new google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: { lat: navData.worker_lat, lng: navData.worker_lng },
                        destination: { lat: navData.client_lat, lng: navData.client_lng },
                        travelMode: google.maps.TravelMode.DRIVING,
                    },
                    (result, status) => {
                        if (status === "OK") {
                            directionsRenderer.setDirections(result);
                        }
                    }
                );
            } else {
                // Fallback: draw a straight line
                new google.maps.Polyline({
                    path: [
                        { lat: navData.worker_lat, lng: navData.worker_lng },
                        { lat: navData.client_lat, lng: navData.client_lng },
                    ],
                    geodesic: true,
                    strokeColor: "#1E3A8A",
                    strokeWeight: 4,
                    strokeOpacity: 0.7,
                    map,
                });

                // Fit bounds
                const bounds = new google.maps.LatLngBounds();
                bounds.extend({ lat: navData.worker_lat, lng: navData.worker_lng });
                bounds.extend({ lat: navData.client_lat, lng: navData.client_lng });
                map.fitBounds(bounds, 60);
            }
        },
        [mapsAPI, navData]
    );

    // ── Map container ref callbacks ────────────────────────────────────
    useEffect(() => {
        const container = isMaximized
            ? mapContainerMaxRef.current
            : mapContainerMiniRef.current;
        if (container && mapsAPI && navData) {
            // Reset map instance so it re-renders in the new container
            mapInstanceRef.current = null;
            renderMap(container);
        }
    }, [isMaximized, mapsAPI, navData, renderMap]);

    // ── Computed values ────────────────────────────────────────────────
    const route = navData?.route;
    const currentStep = route?.steps?.[currentStepIdx];
    const durationMins = route
        ? Math.round(route.total_duration_seconds / 60)
        : "—";
    const distanceText = route?.total_distance_text || "—";

    const now = new Date();
    const etaDate = route
        ? new Date(now.getTime() + route.total_duration_seconds * 1000)
        : null;
    const etaStr = etaDate
        ? etaDate.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
        : "—";

    // ── Fallback map (static image via OpenStreetMap when no Google key) ─
    const fallbackMapUrl = navData
        ? `https://www.openstreetmap.org/export/embed.html?bbox=${Math.min(navData.worker_lng, navData.client_lng) - 0.01},${Math.min(navData.worker_lat, navData.client_lat) - 0.01},${Math.max(navData.worker_lng, navData.client_lng) + 0.01},${Math.max(navData.worker_lat, navData.client_lat) + 0.01}&layer=mapnik`
        : null;

    // ═════════════════════════════════════════════════════════════════════
    // LOADING STATE
    // ═════════════════════════════════════════════════════════════════════
    if (loading) {
        return (
            <div className="fixed bottom-6 right-4 z-50 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                <div className="p-6 flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-bold text-gray-600">
                        Fetching route...
                    </p>
                    <p className="text-[11px] text-gray-400">Getting your location & directions</p>
                </div>
            </div>
        );
    }

    // ═════════════════════════════════════════════════════════════════════
    // ERROR STATE
    // ═════════════════════════════════════════════════════════════════════
    if (error) {
        return (
            <div className="fixed bottom-6 right-4 z-50 w-[280px] bg-white rounded-xl shadow-2xl border border-red-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                <div className="p-5 flex flex-col items-center gap-3 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-500" />
                    <p className="text-sm font-bold text-red-600">Navigation Error</p>
                    <p className="text-[11px] text-gray-500">{error}</p>
                    <button
                        onClick={onClose}
                        className="mt-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    // ═════════════════════════════════════════════════════════════════════
    // MINIMIZED VIEW
    // ═════════════════════════════════════════════════════════════════════
    if (!isMaximized) {
        return (
            <div
                onClick={() => setIsMaximized(true)}
                className="fixed bottom-6 right-4 z-50 w-[280px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-300 cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
            >
                {/* Map area */}
                <div className="relative w-full h-32 bg-gray-100">
                    {mapsAPI ? (
                        <div ref={mapContainerMiniRef} className="w-full h-full" />
                    ) : fallbackMapUrl ? (
                        <iframe
                            src={fallbackMapUrl}
                            className="w-full h-full border-0"
                            title="Navigation Map"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                            <MapPin className="w-8 h-8 text-blue-400" />
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow-md hover:bg-white text-gray-800 transition-colors z-10"
                    >
                        <X className="w-4 h-4" />
                    </button>

                    {/* LIVE badge */}
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-sm flex items-center gap-1 z-10">
                        <div className="w-1 h-1 bg-white rounded-full animate-pulse" /> LIVE
                    </div>

                    {/* ETA chip */}
                    {route && (
                        <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur text-[10px] font-bold text-gray-700 px-2 py-0.5 rounded flex items-center gap-1 z-10">
                            <Clock className="w-3 h-3 text-blue-600" /> ETA {durationMins} mins
                        </div>
                    )}
                </div>

                {/* Info bar */}
                <div className="p-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[14px] font-extrabold text-blue-600">
                                {durationMins} min
                            </p>
                            <p className="text-[10px] font-bold text-gray-500 uppercase">
                                to destination
                            </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                            <Navigation2 className="w-4 h-4 text-blue-600 fill-current" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ═════════════════════════════════════════════════════════════════════
    // MAXIMIZED VIEW
    // ═════════════════════════════════════════════════════════════════════
    return (
        <div className="fixed inset-0 z-[100] animate-in fade-in duration-300 pointer-events-none">
            <div className="absolute bottom-6 right-4 w-full max-w-[450px] h-[550px] bg-white rounded-[20px] shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-right-4 duration-300 flex flex-col pointer-events-auto">
                {/* ── Map Area ──────────────────────────────────────────── */}
                <div className="flex-1 relative bg-gray-100">
                    {mapsAPI ? (
                        <div ref={mapContainerMaxRef} className="w-full h-full" />
                    ) : fallbackMapUrl ? (
                        <iframe
                            src={fallbackMapUrl}
                            className="w-full h-full border-0"
                            title="Navigation Map"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                            <MapPin className="w-12 h-12 text-blue-300" />
                        </div>
                    )}

                    {/* ── Top Instruction Banner ──────────────────────────── */}
                    <div className="absolute top-4 left-4 right-4 group z-10">
                        <div className="bg-white rounded-xl p-3.5 shadow-lg border border-gray-100 flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                                {currentStep ? (
                                    <CornerDownRight className="w-5 h-5" />
                                ) : (
                                    <Navigation2 className="w-5 h-5 fill-current" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                                    {currentStep?.distance_text || "Navigate"}
                                </p>
                                <p className="text-[14px] font-extrabold text-[#111827] truncate">
                                    {currentStep?.instruction || `Head to ${navData?.client_name || "destination"}`}
                                </p>
                            </div>
                            <button
                                onClick={() => setIsMaximized(false)}
                                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 flex-shrink-0"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* ── LIVE GPS Indicator ──────────────────────────────── */}
                    <div className="absolute bottom-4 left-4 bg-blue-600/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-1.5 z-10">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />{" "}
                        LIVE GPS
                    </div>

                    {/* Point labels */}
                    {navData && (
                        <>
                            <div className="absolute top-20 left-4 bg-white/90 backdrop-blur text-[10px] font-bold text-gray-600 px-2 py-1 rounded shadow z-10">
                                <span className="text-blue-600">A</span> Point A
                            </div>
                            <div className="absolute bottom-10 right-4 bg-white/90 backdrop-blur text-[10px] font-bold text-gray-600 px-2 py-1 rounded shadow z-10">
                                <span className="text-red-600">B</span> Point B
                            </div>
                        </>
                    )}
                </div>

                {/* ── Bottom Stats & Controls ──────────────────────────── */}
                <div className="bg-white p-5 border-t border-gray-100">
                    {/* Destination info */}
                    {navData && (
                        <div className="flex items-start gap-2 mb-4 pb-3 border-b border-gray-50">
                            <MapPin className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[12px] font-extrabold text-gray-800 truncate">{navData.client_name}</p>
                                <p className="text-[10px] text-gray-500 truncate">{navData.client_address}</p>
                            </div>
                            {navData.client_phone && (
                                <button
                                    onClick={() => window.open(`tel:${navData.client_phone}`)}
                                    className="p-1.5 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors flex-shrink-0"
                                >
                                    <Phone className="w-3.5 h-3.5" />
                                </button>
                            )}
                        </div>
                    )}

                    {/* Stats row */}
                    <div className="flex justify-between items-center mb-5 px-2">
                        <div className="flex gap-6">
                            <div className="text-center">
                                <p className="text-2xl font-black text-[#111827]">
                                    {durationMins}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">
                                    min
                                </p>
                            </div>
                            <div className="w-px h-8 bg-gray-100 self-center" />
                            <div>
                                <p className="text-lg font-extrabold text-gray-800">
                                    {distanceText}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase">
                                    distance
                                </p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-bold text-[#111827]">{etaStr}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">
                                Arrival
                            </p>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => {
                                setIsMaximized(false);
                                onClose();
                            }}
                            className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-bold text-[13px] hover:bg-red-100 transition-colors uppercase tracking-wider"
                        >
                            Exit Trip
                        </button>
                        <button
                            onClick={() => setIsMaximized(false)}
                            className="flex-1 py-3 bg-[#1E3A8A] text-white rounded-xl font-bold text-[13px] hover:bg-opacity-90 transition-colors uppercase tracking-wider shadow-md"
                        >
                            Minimize
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationPopup;
