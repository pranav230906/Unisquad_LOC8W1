"""
schemas/review.py
─────────────────
Pydantic schemas used at the API boundary for Reviews.
Separates the internal database shape from the HTTP request/response.

Schema hierarchy
════════════════
  ReviewBase          ← Core rating and comment
      ↓
  ReviewCreate        ← POST /jobs/{job_id}/review (client submits)
  ReviewOut           ← Response payload (read-only output)
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


# ── Shared base ────────────────────────────────────────────────────────────────
class ReviewBase(BaseModel):
    rating: int = Field(..., ge=1, le=5, example=5)
    comment: Optional[str] = Field(
        default=None,
        max_length=1000,
        example="Good work",
    )


# ── Create request ─────────────────────────────────────────────────────────────
class ReviewCreate(ReviewBase):
    """
    Body for POST /api/v1/jobs/{job_id}/review
    The client only provides the rating and the comment.
    `job_id`, `client_id` (from JWT), and `worker_id` (from the job)
    are injected server-side to prevent forgery.
    """
    pass


# ── Public response payload ────────────────────────────────────────────────────
class ReviewOut(ReviewBase):
    """
    Returned by GET /workers/{id}/reviews or GET /jobs/{id}/review
    Translates MongoDB intrinsic properties into fast string IDs.
    """
    id: str = Field(..., description="Review's MongoDB ObjectId as string")
    job_id: str = Field(..., description="Linked jobs._id")
    client_id: str = Field(..., description="Linked users._id (client)")
    worker_id: str = Field(..., description="Linked users._id (worker)")
    created_at: datetime

    class Config:
        from_attributes = True
