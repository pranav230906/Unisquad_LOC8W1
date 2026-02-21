"""
Pydantic schemas for the Navigation feature.
"""

from pydantic import BaseModel, Field
from typing import Optional


class NavigationRequest(BaseModel):
    """
    Request body when a worker clicks "Navigate".
    The frontend sends the job_id (or accepted_job_id).
    Worker's current location is sent as lat/lng.
    """
    job_id: str = Field(..., description="ID of the accepted job")
    worker_lat: float = Field(..., description="Worker's current latitude")
    worker_lng: float = Field(..., description="Worker's current longitude")


class LatLng(BaseModel):
    lat: float
    lng: float


class NavigationStep(BaseModel):
    """A single step in the turn-by-turn directions."""
    instruction: str = Field(..., description="HTML-stripped turn instruction")
    distance_text: str = Field(..., description="e.g. '200 m'")
    duration_text: str = Field(..., description="e.g. '1 min'")
    start_location: LatLng
    end_location: LatLng


class NavigationRoute(BaseModel):
    """Full route from worker to client."""
    overview_polyline: str = Field(..., description="Encoded polyline for the route")
    total_distance_text: str
    total_distance_meters: int
    total_duration_text: str
    total_duration_seconds: int
    start_address: str
    end_address: str
    steps: list[NavigationStep] = []


class NavigationResponse(BaseModel):
    """Response returned to the frontend."""
    success: bool = True
    job_id: str
    client_name: str
    client_address: str
    client_lat: float
    client_lng: float
    worker_lat: float
    worker_lng: float
    route: Optional[NavigationRoute] = None
    error: Optional[str] = None


class JobAddressResponse(BaseModel):
    """Response for fetching just the client address for a job."""
    job_id: str
    client_name: str
    client_address: str
    client_lat: float
    client_lng: float
    client_phone: Optional[str] = None
