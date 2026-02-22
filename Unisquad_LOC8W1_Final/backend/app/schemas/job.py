from pydantic import BaseModel
from typing import Optional


class JobCreate(BaseModel):
    title: str
    description: str
    budget: float
    location: str


class Job(BaseModel):
    id: str
    title: str
    description: str
    budget: float
    location: str
    status: str
    client_id: str
    worker_id: Optional[str] = None


class JobUpdate(BaseModel):
    status: Optional[str] = None
    worker_id: Optional[str] = None
