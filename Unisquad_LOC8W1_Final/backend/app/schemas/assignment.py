"""
schemas/assignment.py
─────────────────────
Pydantic schemas used at the API boundary for Assignments.
Handles payload validation when accepting jobs or updating statuses.

Schema hierarchy
════════════════
  AssignmentBase          ← core status tracker
      ↓
  AssignmentCreate        ← POST /jobs/{job_id}/accept
  AssignmentUpdate        ← PATCH /assignments/{id}/status (worker moves it forward)
  AssignmentOut           ← full response payload
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from app.models.assignment import AssignmentStatus


# ── Shared base ────────────────────────────────────────────────────────────────
class AssignmentBase(BaseModel):
    status: AssignmentStatus = Field(default="accepted")


# ── Create request ─────────────────────────────────────────────────────────────
class AssignmentCreate(BaseModel):
    """
    Body (or query param equivalent) for POST /api/v1/jobs/{job_id}/accept
    The client provides nothing except their auth token.
    Both job_id (path) and worker_id (JWT token) are injected server-side.
    """
    pass


# ── Partial update request ─────────────────────────────────────────────────────
class AssignmentUpdate(BaseModel):
    """
    Body for PATCH /api/v1/assignments/{id}/status
    Workers can only move the status forward.
    """
    status: AssignmentStatus


# ── Public response payload ────────────────────────────────────────────────────
class AssignmentOut(AssignmentBase):
    """
    Returned by POST /jobs/{id}/accept or GET /assignments
    Translates MongoDB intrinsic properties efficiently into string IDs.
    """
    id: str = Field(..., description="Assignment's MongoDB ObjectId as string")
    job_id: str = Field(..., description="Linked jobs._id")
    worker_id: str = Field(..., description="Linked users._id (worker)")

    # Lifecycle Timestamps
    accepted_at: datetime
    on_the_way_at: Optional[datetime] = None
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True
