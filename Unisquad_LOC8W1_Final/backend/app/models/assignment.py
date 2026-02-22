"""
models/assignment.py
────────────────────
MongoDB document model for the `assignments` collection.

Design decisions
════════════════
• SEPARATE FROM JOBS: This is heavily emphasized. By keeping assignments separate from jobs,
  we can handle race conditions (e.g., multiple workers trying to accept the same job
  concurrently) cleanly using a unique index on `job_id`.
• `status` tracks the granular worker lifecycle ("accepted", "on_the_way", "started", "completed").
• Time tracking fields for each stage of the lifecycle.

Collection:  assignments
Indexes (created in db/init_db.py):
  • unique(job_id)     ← Prevents two workers from being assigned to the same job (solves race conditions).
  • worker_id (1)      ← Fast lookup for a worker's active/past assignments.
"""

from datetime import datetime
from typing import Literal, Optional

from bson import ObjectId
from pydantic import BaseModel, Field

from app.models.user import PyObjectId

# Granular tracking of the worker's progress on an assignment
AssignmentStatus = Literal["accepted", "on_the_way", "started", "completed"]


class AssignmentInDB(BaseModel):
    """
    Exact mirror of a document in the `assignments` MongoDB collection.
    Only used internally. The API layer uses schemas/assignment.py models.
    """

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    # ── Relations ──────────────────────────────────────────────────────────────
    job_id: PyObjectId = Field(
        ...,
        description="References jobs._id. This MUST be unique in the DB to prevent double-booking.",
    )
    worker_id: PyObjectId = Field(
        ...,
        description="References users._id of the worker who claimed the job.",
    )

    # ── State ──────────────────────────────────────────────────────────────────
    status: AssignmentStatus = Field(
        default="accepted",
        description="Tracks the lifecycle strictly from the worker's perspective.",
    )

    # ── Lifecycle Timestamps ───────────────────────────────────────────────────
    accepted_at: datetime = Field(
        default_factory=datetime.utcnow,
        description="When the worker accepted the job",
    )
    on_the_way_at: Optional[datetime] = Field(
        default=None,
        description="When the worker started traveling",
    )
    started_at: Optional[datetime] = Field(
        default=None,
        description="When the actual work began on-site",
    )
    completed_at: Optional[datetime] = Field(
        default=None,
        description="When the worker finished the job",
    )

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
