"""
Database session configuration.

TODO: When the database is initialised, uncomment and configure:

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import get_settings

settings = get_settings()

# Create async engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    pool_size=10,
    max_overflow=20,
)

# Session factory
async_session = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Base class for models
Base = declarative_base()

# Dependency for FastAPI routes
async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
"""

# Placeholder until DB is initialised
Base = None

async def get_db():
    """Placeholder DB dependency — yields None until DB is set up."""
    yield None
