"""
schemas/worker.py
─────────────────
Pydantic schemas for the `worker_profiles` collection — API boundary only.
These schemas mirror models/worker_profile.py but strip internal fields
and shape data for HTTP request/response.

Schema hierarchy
════════════════
  GeoJSONPoint            ← shared geo sub-model (reused from models/)
  WorkerProfileBase       shared read/write fields
      ↓
  WorkerProfileCreate     request body for POST /workers/profile
  WorkerProfileUpdate     request body for PATCH /workers/profile  (all optional)
  WorkerProfileOut        response payload  (includes id, user_id, rating)
  WorkerNearbyOut         lightweight card used in nearby-search results
"""

from typing import List, Optional

from pydantic import BaseModel, Field

from app.models.worker_profile import GeoJSONPoint   # reuse validated sub-model


# ── Shared base ────────────────────────────────────────────────────────────────
class WorkerProfileBase(BaseModel):
    skills: List[str] = Field(
        default_factory=list,
        example=["plumber", "electrician"],
    )
    is_available: bool = Field(default=True)
    work_radius_km: float = Field(default=5.0, ge=0.5, le=100.0, example=5.0)
    location: Optional[GeoJSONPoint] = None
    city: Optional[str] = Field(default=None, example="Virar")
    profile_photo: Optional[str] = Field(
        default=None,
        example="https://cdn.example.com/photos/worker_123.jpg",
    )


# ── Create request ─────────────────────────────────────────────────────────────
class WorkerProfileCreate(WorkerProfileBase):
    """
    Body for POST /api/v1/workers/profile
    user_id is injected server-side from the JWT — not accepted from client.
    """
    pass


# ── Partial update request ─────────────────────────────────────────────────────
class WorkerProfileUpdate(BaseModel):
    """
    Body for PATCH /api/v1/workers/profile
    Every field is optional — only supplied fields are written.
    """
    skills: Optional[List[str]] = None
    is_available: Optional[bool] = None
    work_radius_km: Optional[float] = Field(default=None, ge=0.5, le=100.0)
    location: Optional[GeoJSONPoint] = None
    city: Optional[str] = None
    profile_photo: Optional[str] = None


# ── Full response payload ──────────────────────────────────────────────────────
class WorkerProfileOut(WorkerProfileBase):
    """
    Returned by GET /api/v1/workers/profile and related endpoints.
    Includes server-managed fields: id, user_id, rating, total_reviews.
    """
    id: str = Field(..., description="MongoDB ObjectId as string")
    user_id: str = Field(..., description="Linked users._id as string")
    rating: float = Field(default=0.0, ge=0.0, le=5.0, example=4.6)
    total_reviews: int = Field(default=0, example=12)

    class Config:
        from_attributes = True


# ── Nearby-search card (lightweight) ──────────────────────────────────────────
class WorkerNearbyOut(BaseModel):
    """
    Returned by GET /api/v1/workers/nearby
    Only fields needed to render a worker card in the client UI.
    Keeping this schema minimal reduces payload size on mobile networks.
    """
    id: str
    user_id: str
    name: str = Field(..., description="Populated from users.name via aggregation")
    skills: List[str]
    rating: float
    total_reviews: int
    is_available: bool
    work_radius_km: float
    city: Optional[str]
    profile_photo: Optional[str]
    distance_km: Optional[float] = Field(
        default=None,
        description="Distance from search origin, injected by $geoNear aggregation",
    )

    class Config:
        from_attributes = True
