"""
Job model — placeholder until database is initialised.

TODO: When the DB is ready, define the Job model like:

from sqlalchemy import Column, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base
import uuid
from datetime import datetime

class Job(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, default=lambda: f"J-{uuid.uuid4().hex[:6].upper()}")
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(100), nullable=False)        # e.g. "Plumbing", "Electrical"
    price = Column(Float, nullable=False)
    status = Column(String(50), default="PENDING")         # PENDING, ASSIGNED, IN_PROGRESS, COMPLETED, CANCELLED
    urgent = Column(Boolean, default=False)

    # Client info (FK to users table)
    client_id = Column(String, ForeignKey("users.id"), nullable=False)
    client = relationship("User", foreign_keys=[client_id], back_populates="posted_jobs")

    # Client location (for navigation)
    client_address = Column(String(500), nullable=False)
    client_lat = Column(Float, nullable=True)
    client_lng = Column(Float, nullable=True)

    # Assigned worker (FK to users table)
    worker_id = Column(String, ForeignKey("users.id"), nullable=True)
    worker = relationship("User", foreign_keys=[worker_id], back_populates="assigned_jobs")

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    scheduled_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
"""

# Placeholder
pass
