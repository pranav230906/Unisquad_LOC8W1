"""
User model — placeholder until database is initialised.

TODO: When the DB is ready, define the User model like:

from sqlalchemy import Column, String, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.db.session import Base
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: f"u-{uuid.uuid4().hex[:8]}")
    name = Column(String(200), nullable=False)
    phone = Column(String(20), unique=True, nullable=True)
    email = Column(String(200), unique=True, nullable=True)
    role = Column(String(20), nullable=False)              # "client", "worker", "admin"
    
    # Location (used for navigation)
    address = Column(String(500), nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

    # Worker-specific fields
    is_available = Column(Boolean, default=True)
    skills = Column(String(500), nullable=True)            # comma-separated skills
    rating = Column(Float, default=0.0)
    total_jobs = Column(Integer, default=0)

    # Relationships
    posted_jobs = relationship("Job", foreign_keys="Job.client_id", back_populates="client")
    assigned_jobs = relationship("Job", foreign_keys="Job.worker_id", back_populates="worker")

    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
"""

# Placeholder
pass
