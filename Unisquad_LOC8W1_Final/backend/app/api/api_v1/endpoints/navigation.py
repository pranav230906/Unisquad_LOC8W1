"""
Navigation API endpoints.
Workers call these to:
  1. Fetch the client address for an accepted job
  2. Get full driving directions (turn-by-turn) from their location to the client
"""

from fastapi import APIRouter, HTTPException

from app.schemas.navigation import (
    NavigationRequest,
    NavigationResponse,
    JobAddressResponse,
)
from app.services.map_service import get_job_client_address, get_directions
from app.core.config import get_settings

router = APIRouter(prefix="/navigation", tags=["Navigation"])


@router.get(
    "/job-address/{job_id}",
    response_model=JobAddressResponse,
    summary="Get client address for a job",
)
async def fetch_job_address(job_id: str):
    """
    Returns the client's name, address, and coordinates for a given job.

    TODO (DB integration):
        Accept a `db: AsyncSession = Depends(get_db)` parameter and
        pass it through to `get_job_client_address(job_id, db)`.
    """
    result = await get_job_client_address(job_id)
    if not result:
        raise HTTPException(
            status_code=404, detail=f"Job '{job_id}' not found"
        )
    return result


@router.post(
    "/directions",
    response_model=NavigationResponse,
    summary="Get driving directions from worker to client",
)
async def fetch_directions(payload: NavigationRequest):
    """
    Given the worker's current location and a job ID, resolves the
    client's address and returns full driving directions.

    If no GOOGLE_MAPS_API_KEY is set in .env, returns a mock/fallback
    route so the frontend still works during development.

    TODO (DB integration):
        - Add auth dependency: `worker = Depends(get_current_worker)`
        - Verify the worker actually accepted this job
        - Log navigation-start event for analytics
    """
    # 1. Look up client address from the job
    job_address = await get_job_client_address(payload.job_id)
    if not job_address:
        raise HTTPException(
            status_code=404, detail=f"Job '{payload.job_id}' not found"
        )

    # 2. Get directions
    route = await get_directions(
        origin_lat=payload.worker_lat,
        origin_lng=payload.worker_lng,
        dest_lat=job_address.client_lat,
        dest_lng=job_address.client_lng,
    )

    return NavigationResponse(
        success=True,
        job_id=payload.job_id,
        client_name=job_address.client_name,
        client_address=job_address.client_address,
        client_lat=job_address.client_lat,
        client_lng=job_address.client_lng,
        worker_lat=payload.worker_lat,
        worker_lng=payload.worker_lng,
        route=route,
        error=None if route else "Could not compute route",
    )


@router.get(
    "/maps-key",
    summary="Get the Google Maps JS API key for the frontend",
)
async def get_maps_api_key():
    """
    Returns the Google Maps API key so the frontend can load the
    Maps JavaScript API. This avoids hardcoding the key in the
    client bundle.

    In production, this should be protected by auth middleware
    and rate-limited.
    """
    settings = get_settings()
    return {"key": settings.GOOGLE_MAPS_API_KEY}
