"""
models/review.py
────────────────
MongoDB document model for the `reviews` collection.

Design decisions
════════════════
• Each job can only be reviewed once by the client (enforced via unique job_id).
• `worker_id` is indexed so we can quickly aggregate all reviews for a specific
  worker to calculate their rolling average rating.
• We store `client_id` for tracking who left the review.
• `rating` is an integer from 1 to 5.

Collection:  reviews
Indexes (created in db/init_db.py):
  • unique(job_id)     ← One review per completed job
  • worker_id (1)      ← Fast aggregation for worker's overall rating
"""

from datetime import datetime
from typing import Optional

from bson import ObjectId
from pydantic import BaseModel, Field

from app.models.user import PyObjectId


class ReviewInDB(BaseModel):
    """
    Exact mirror of a document in the `reviews` MongoDB collection.
    """

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    # ── Relations ──────────────────────────────────────────────────────────────
    job_id: PyObjectId = Field(
        ...,
        description="References jobs._id. Unique index ensures 1 review per job.",
    )
    client_id: PyObjectId = Field(
        ...,
        description="References users._id of the client who left the review.",
    )
    worker_id: PyObjectId = Field(
        ...,
        description="References users._id of the worker being reviewed.",
    )

    # ── Feedback Data ──────────────────────────────────────────────────────────
    rating: int = Field(
        ...,
        ge=1,
        le=5,
        description="Star rating from 1 to 5",
        example=5,
    )
    comment: Optional[str] = Field(
        default=None,
        max_length=1000,
        description="Optional text feedback from the client",
        example="Good work",
    )

    # ── Timestamps ─────────────────────────────────────────────────────────────
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
