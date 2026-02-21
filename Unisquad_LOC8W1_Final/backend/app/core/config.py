"""
Application configuration using pydantic-settings.
Reads from .env automatically.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "Unisquad LOC8"
    DEBUG: bool = True

    # ── Database ─────────────────────────────────────────────────────
    DATABASE_URL: str = "postgresql+psycopg://postgres:password@localhost:5432/unisquad_loc8w1"

    # ── Google Maps ──────────────────────────────────────────────────
    # TODO: Add your Google Maps API key to .env as GOOGLE_MAPS_API_KEY
    GOOGLE_MAPS_API_KEY: str = ""

    # ── CORS ─────────────────────────────────────────────────────────
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    return Settings()
