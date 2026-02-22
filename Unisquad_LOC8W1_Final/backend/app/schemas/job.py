"""
schemas/job.py
──────────────
Pydantic schemas used at the API boundary for Jobs.
"""
from datetime import datetime
from typing import Optional, Any
from pydantic import BaseModel, Field

from app.models.job import JobStatus
from app.models.worker_profile import GeoJSONPoint

class JobBase(BaseModel):
    title: str = Field(..., max_length=200, example="Plumbing Fix")
    description: str = Field(..., max_length=2000, example="Pipe is leaking heavily")
    category: str = Field(default="general", example="plumber")
    location: str = Field(..., description="Address string")
    geo_location: Optional[GeoJSONPoint] = None
    budget: float = Field(..., ge=0, example=800.0)
    scheduled_time: Optional[datetime] = None

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = Field(default=None, max_length=200)
    description: Optional[str] = Field(default=None, max_length=2000)
    category: Optional[str] = None
    location: Optional[str] = None
    geo_location: Optional[GeoJSONPoint] = None
    budget: Optional[float] = Field(default=None, ge=0)
    scheduled_time: Optional[datetime] = None
    status: Optional[JobStatus] = None

class JobOut(JobBase):
    id: str = Field(..., description="Job's MongoDB ObjectId as string")
    client_id: str = Field(..., description="Posting user ID")
    worker_id: Optional[str] = Field(default=None, description="Assigned worker ID")
    status: JobStatus = Field(default="open")
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class JobNearbyOut(JobOut):
    distance_km: Optional[float] = Field(default=None)

    class Config:
        from_attributes = True
