"""
models/worker_profile.py
────────────────────────
MongoDB document model for the `worker_profiles` collection.

Design decisions
════════════════
• One-to-one with `users` via `user_id` (ObjectId FK).
  Stored in a SEPARATE collection (not embedded in users) because:
    – Profile data is fetched far less often than auth data.
    – Keeping collections narrow improves cache efficiency.
    – Allows independent reads/writes without touching the auth doc.

• `location` follows the GeoJSON Point spec exactly:
    { "type": "Point", "coordinates": [longitude, latitude] }
  ORDER MATTERS — MongoDB expects [lng, lat], not [lat, lng].
  The 2dsphere index on this field powers $near / $geoWithin queries.

• `skills` is a plain list of strings. For Phase 2 this is fine; if
  skill taxonomy grows, migrate to a skills collection with lookup.

• `rating` is a denormalised float average. Updated by a background
  task after each new feedback document is inserted (see services/).

Collection:  worker_profiles
Indexes (created in db/init_db.py):
  • unique(user_id)       ← one profile per user, enforced at DB level
  • 2dsphere(location)    ← powers nearby worker search (CRITICAL)
"""

from datetime import datetime
from typing import List, Literal, Optional

from bson import ObjectId
from pydantic import BaseModel, Field, field_validator

from app.models.user import PyObjectId


# ── GeoJSON Point sub-model ────────────────────────────────────────────────────
class GeoJSONPoint(BaseModel):
    """
    Strict GeoJSON Point — the only shape MongoDB's 2dsphere index accepts.

    coordinates = [longitude, latitude]
      longitude: -180 … +180
      latitude:  -90  … +90

    ⚠ If you accidentally store [lat, lng] your $near queries will be
      silently wrong — validate at this layer.
    """

    type: Literal["Point"] = "Point"
    coordinates: List[float] = Field(
        ...,
        min_length=2,
        max_length=2,
        description="[longitude, latitude] — note the order (not lat/lng)",
        example=[72.8777, 19.0760],   # Mumbai
    )

    @field_validator("coordinates")
    @classmethod
    def validate_coordinates(cls, v: List[float]) -> List[float]:
        lng, lat = v
        if not (-180.0 <= lng <= 180.0):
            raise ValueError(f"Longitude {lng} is out of range [-180, 180]")
        if not (-90.0 <= lat <= 90.0):
            raise ValueError(f"Latitude {lat} is out of range [-90, 90]")
        return v

    class Config:
        json_schema_extra = {
            "example": {"type": "Point", "coordinates": [72.8777, 19.0760]}
        }


# ── Worker profile document model ──────────────────────────────────────────────
class WorkerProfileInDB(BaseModel):
    """
    Exact mirror of a document in the `worker_profiles` MongoDB collection.
    Only used internally — the API layer uses WorkerProfileOut (schemas/).
    """

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    # ── Relation ───────────────────────────────────────────────────────────────
    user_id: PyObjectId = Field(
        ...,
        description="References users._id — the linked auth record",
    )

    # ── Skills & availability ──────────────────────────────────────────────────
    skills: List[str] = Field(
        default_factory=list,
        description="Free-text skill tags e.g. ['plumber', 'electrician']",
        example=["plumber", "electrician"],
    )
    is_available: bool = Field(
        default=True,
        description="Whether the worker is currently accepting new jobs",
    )
    work_radius_km: float = Field(
        default=5.0,
        ge=0.5,
        le=100.0,
        description="Max distance in km the worker is willing to travel for a job",
        example=5.0,
    )

    # ── Geospatial ─────────────────────────────────────────────────────────────
    location: Optional[GeoJSONPoint] = Field(
        default=None,
        description="Current or home location — feeds the 2dsphere index",
    )
    city: Optional[str] = Field(
        default=None,
        description="Human-readable city name for display (not used in geo queries)",
        example="Virar",
    )

    # ── Reputation ─────────────────────────────────────────────────────────────
    rating: float = Field(
        default=0.0,
        ge=0.0,
        le=5.0,
        description="Denormalised average rating; updated after each feedback insert",
        example=4.6,
    )
    total_reviews: int = Field(
        default=0,
        ge=0,
        description="Running count — used to compute rolling average without full scan",
    )

    # ── Media ──────────────────────────────────────────────────────────────────
    profile_photo: Optional[str] = Field(
        default=None,
        description="URL to profile photo (e.g. S3 / Cloudinary link)",
        example="https://cdn.example.com/photos/worker_123.jpg",
    )

    # ── Timestamps ─────────────────────────────────────────────────────────────
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
