"""
Google Maps service layer.
Handles:
  1. Geocoding an address → lat/lng
  2. Fetching directions (worker → client) via the Directions API
  3. Parsing the response into our NavigationRoute schema

TODO: When the database is initialised, replace the mock job-lookup
      with a real DB query.
"""

import httpx
import re
from typing import Optional
from app.core.config import get_settings
from app.schemas.navigation import (
    NavigationRoute,
    NavigationStep,
    LatLng,
    JobAddressResponse,
)


# ── Mock job data (placeholder until DB is ready) ────────────────────────────
# Each entry simulates what would come from the `jobs` + `users` tables.
# Keys are job IDs; values contain client info.
MOCK_JOBS = {
    "J-8932": {
        "client_name": "Sharma Residence",
        "client_address": "B-42, Sector 15, Noida, Uttar Pradesh, India",
        "client_lat": 28.5855,
        "client_lng": 77.3100,
        "client_phone": "+91 98765 43210",
    },
    "J-8933": {
        "client_name": "Gupta House",
        "client_address": "C-12, Sector 62, Noida, Uttar Pradesh, India",
        "client_lat": 28.6270,
        "client_lng": 77.3650,
        "client_phone": "+91 91234 56789",
    },
    "J-8934": {
        "client_name": "Verma Apartment",
        "client_address": "D-7, Indirapuram, Ghaziabad, Uttar Pradesh, India",
        "client_lat": 28.6412,
        "client_lng": 77.3581,
        "client_phone": "+91 99876 54321",
    },
    "J-8935": {
        "client_name": "Mehta Villa",
        "client_address": "Plot 22, DLF Phase 3, Gurgaon, Haryana, India",
        "client_lat": 28.4809,
        "client_lng": 77.0930,
        "client_phone": "+91 88765 43210",
    },
    # ── Add more mock jobs here as needed ────────────────────────────
    # When the database is live, this dict will be removed and
    # replaced with: SELECT * FROM jobs JOIN users ON ... WHERE id = ?
}


def _strip_html(html: str) -> str:
    """Remove HTML tags from Google directions instructions."""
    return re.sub(r"<[^>]+>", "", html)


async def get_job_client_address(job_id: str) -> Optional[JobAddressResponse]:
    """
    Look up the client's address for a given job.

    TODO (DB integration):
        Replace the MOCK_JOBS lookup below with a real database query, e.g.:
        ─────────────────────────────────────────────────────────────────
        from app.db.session import get_db
        from sqlalchemy import select
        from app.models.job import Job
        from app.models.user import User

        async def get_job_client_address(job_id: str, db: AsyncSession):
            stmt = (
                select(Job, User)
                .join(User, Job.client_id == User.id)
                .where(Job.id == job_id)
            )
            result = await db.execute(stmt)
            row = result.first()
            if not row:
                return None
            job, client = row
            return JobAddressResponse(
                job_id=job.id,
                client_name=client.name,
                client_address=client.address,
                client_lat=client.latitude,
                client_lng=client.longitude,
                client_phone=client.phone,
            )
        ─────────────────────────────────────────────────────────────────
    """
    job = MOCK_JOBS.get(job_id)
    if not job:
        return None

    return JobAddressResponse(
        job_id=job_id,
        client_name=job["client_name"],
        client_address=job["client_address"],
        client_lat=job["client_lat"],
        client_lng=job["client_lng"],
        client_phone=job.get("client_phone"),
    )


async def geocode_address(address: str) -> Optional[LatLng]:
    """
    Convert an address string to lat/lng using the Google Geocoding API.
    Returns None if geocoding fails or no API key is configured.
    """
    settings = get_settings()
    if not settings.GOOGLE_MAPS_API_KEY:
        return None

    url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {"address": address, "key": settings.GOOGLE_MAPS_API_KEY}

    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.get(url, params=params)
        data = response.json()

    if data.get("status") == "OK" and data.get("results"):
        loc = data["results"][0]["geometry"]["location"]
        return LatLng(lat=loc["lat"], lng=loc["lng"])
    return None


async def get_directions(
    origin_lat: float,
    origin_lng: float,
    dest_lat: float,
    dest_lng: float,
) -> Optional[NavigationRoute]:
    """
    Fetch driving directions from origin to destination using the
    Google Directions API.

    Returns a NavigationRoute with turn-by-turn steps, total distance,
    duration, and an encoded polyline.

    If no API key is configured, returns a mock/fallback route so the
    frontend can still function during development.
    """
    settings = get_settings()

    if not settings.GOOGLE_MAPS_API_KEY:
        # ── Return a plausible mock route for dev/demo ────────────
        return _build_mock_route(origin_lat, origin_lng, dest_lat, dest_lng)

    url = "https://maps.googleapis.com/maps/api/directions/json"
    params = {
        "origin": f"{origin_lat},{origin_lng}",
        "destination": f"{dest_lat},{dest_lng}",
        "mode": "driving",
        "language": "en",
        "key": settings.GOOGLE_MAPS_API_KEY,
    }

    async with httpx.AsyncClient(timeout=15) as client:
        response = await client.get(url, params=params)
        data = response.json()

    if data.get("status") != "OK" or not data.get("routes"):
        return None

    route = data["routes"][0]
    leg = route["legs"][0]

    steps = []
    for s in leg.get("steps", []):
        steps.append(
            NavigationStep(
                instruction=_strip_html(s.get("html_instructions", "")),
                distance_text=s["distance"]["text"],
                duration_text=s["duration"]["text"],
                start_location=LatLng(
                    lat=s["start_location"]["lat"],
                    lng=s["start_location"]["lng"],
                ),
                end_location=LatLng(
                    lat=s["end_location"]["lat"],
                    lng=s["end_location"]["lng"],
                ),
            )
        )

    return NavigationRoute(
        overview_polyline=route["overview_polyline"]["points"],
        total_distance_text=leg["distance"]["text"],
        total_distance_meters=leg["distance"]["value"],
        total_duration_text=leg["duration"]["text"],
        total_duration_seconds=leg["duration"]["value"],
        start_address=leg.get("start_address", ""),
        end_address=leg.get("end_address", ""),
        steps=steps,
    )


def _build_mock_route(
    origin_lat: float,
    origin_lng: float,
    dest_lat: float,
    dest_lng: float,
) -> NavigationRoute:
    """
    Build a simple mock NavigationRoute when no API key is available.
    Uses haversine approximation for distance/time.
    """
    import math

    R = 6371000  # Earth radius in meters
    dlat = math.radians(dest_lat - origin_lat)
    dlng = math.radians(dest_lng - origin_lng)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(origin_lat))
        * math.cos(math.radians(dest_lat))
        * math.sin(dlng / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    distance_m = int(R * c)
    # Assume avg speed ~30 km/h in city
    duration_s = int(distance_m / (30 * 1000 / 3600))

    dist_km = round(distance_m / 1000, 1)

    return NavigationRoute(
        overview_polyline="",  # empty — frontend will draw straight line
        total_distance_text=f"{dist_km} km",
        total_distance_meters=distance_m,
        total_duration_text=f"{duration_s // 60} mins",
        total_duration_seconds=duration_s,
        start_address="Worker's current location",
        end_address="Client's address",
        steps=[
            NavigationStep(
                instruction="Head towards the destination",
                distance_text=f"{dist_km} km",
                duration_text=f"{duration_s // 60} mins",
                start_location=LatLng(lat=origin_lat, lng=origin_lng),
                end_location=LatLng(lat=dest_lat, lng=dest_lng),
            )
        ],
    )
