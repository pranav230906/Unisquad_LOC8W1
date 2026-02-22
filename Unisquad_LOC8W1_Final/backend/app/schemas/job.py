"""
schemas/job.py
──────────────
Pydantic schemas used at the API boundary for Jobs.
Strips internal `_id` into a string representation and ensures status bounds.

Schema hierarchy
════════════════
  JobBase                 ← shared read/write fields (title, desc, cat, loc, budget, time)
      ↓
  JobCreate               ← request body for POST /jobs
  JobUpdate               ← request body for PATCH /jobs/{job} (all optional)
  JobOut                  ← full response payload
  JobNearbyOut            ← lightweight response augmented with aggregated distance
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.job import JobStatus
from app.models.worker_profile import GeoJSONPoint


# ── Shared base ────────────────────────────────────────────────────────────────
class JobBase(BaseModel):
    title: str = Field(..., max_length=200, example="Plumbing Fix")
    description: str = Field(..., max_length=2000, example="Pipe is leaking heavily")
    category: str = Field(..., example="plumber")
    location: GeoJSONPoint = Field(...)
    budget: float = Field(..., ge=0, example=800.0)
    scheduled_time: datetime = Field(...)


# ── Create request ─────────────────────────────────────────────────────────────
class JobCreate(JobBase):
    """
    Body for POST /api/v1/jobs
    client_id and status are injected by the server endpoint — never trusted
    from the client request payload.
    """
    pass


# ── Partial update request ─────────────────────────────────────────────────────
class JobUpdate(BaseModel):
    """
    Body for PATCH /api/v1/jobs/{job_id}
    All fields optional — only supplied fields get updated.
    """
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    category: Optional[str] = None
    location: Optional[GeoJSONPoint] = None
    budget: Optional[float] = Field(default=None, ge=0)
    scheduled_time: Optional[datetime] = None
    status: Optional[JobStatus] = None


# ── Public response payload ────────────────────────────────────────────────────
class JobOut(JobBase):
    """
    Returned by GET/POST/PATCH job endpoints.
    Translates MongoDB intrinsic properties efficiently into string IDs.
    """
    id: str = Field(..., description="Job's MongoDB ObjectId as string")
    client_id: str = Field(..., description="Posting user ID")
    worker_id: Optional[str] = Field(
        default=None,
        description="Assigned worker ID, if status >= assigned",
    )
    status: JobStatus = Field(default="open")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ── Nearby-search extension ────────────────────────────────────────────────────
class JobNearbyOut(JobOut):
    """
    Returned by GET /api/v1/jobs/nearby
    Includes computed distance from the $geoNear pipeline stage.
    """
    distance_km: Optional[float] = Field(
        default=None,
        description="Distance from search origin, injected by $geoNear aggregation",
    )

    class Config:
        from_attributes = True
