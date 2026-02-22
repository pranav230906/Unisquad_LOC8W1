"""
models/job.py
─────────────
MongoDB document model for the `jobs` collection.

Design decisions
════════════════
• `client_id` references the User who created the job.
• `status` is forced to a literal string Enum ("open", "assigned", "completed", "cancelled")
  so queries can easily filter by job state.
• `location` uses the strict GeoJSON Point model (reused from worker profiles).
  This allows workers to search for nearby jobs, or clients to broadcast jobs
  to a radius.
• `category` is a simple string for fast equality filtering (e.g. "plumber").

Collection:  jobs
Indexes (created in db/init_db.py):
  • status (1), created_at (-1)  ← filtering open jobs, sorting by newest
  • category (1)                 ← filtering jobs by type
  • 2dsphere(location)           ← powering $near job search
  • client_id (1)                ← fetching jobs posted by a specific client
"""

from datetime import datetime
from typing import Literal, Optional

from bson import ObjectId
from pydantic import BaseModel, Field

from app.models.user import PyObjectId
from app.models.worker_profile import GeoJSONPoint

# Core literal type for job status
JobStatus = Literal["open", "assigned", "completed", "cancelled"]


class JobInDB(BaseModel):
    """
    Exact mirror of a document in the `jobs` MongoDB collection.
    Only used internally. The API layer uses schemas/job.py models.
    """

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    # ── Relations ──────────────────────────────────────────────────────────────
    client_id: PyObjectId = Field(
        ...,
        description="References users._id of the client who posted it",
    )
    # Keeping worker_id optional. Null if status="open"
    worker_id: Optional[PyObjectId] = Field(
        default=None,
        description="References users._id of the assigned worker (if status >= assigned)",
    )

    # ── Details ────────────────────────────────────────────────────────────────
    title: str = Field(..., max_length=200, example="Plumbing Fix")
    description: str = Field(..., max_length=2000, example="Pipe is leaking heavily.")
    category: str = Field(..., example="plumber")

    # ── Location & Time ────────────────────────────────────────────────────────
    location: str = Field(..., description="String address")
    geo_location: Optional[GeoJSONPoint] = Field(
        default=None,
        description="Feeds the 2dsphere index.",
    )
    budget: float = Field(..., ge=0, example=800.0)
    status: JobStatus = Field(default="open")
    scheduled_time: Optional[datetime] = Field(
        default=None,
        description="When the client wants the job to be done",
    )

    # ── Timestamps ─────────────────────────────────────────────────────────────
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
