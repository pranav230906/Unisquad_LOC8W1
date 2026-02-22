"""
main.py
───────
FastAPI application entry-point.

Startup sequence
════════════════
1. Motor client is created lazily when `app.db.session` is imported.
2. `create_indexes()` runs once on startup — ensures all DB indexes exist.
3. API routers are mounted under /api/v1.
"""

import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.db.init_db import create_indexes

# ── Logging ────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

# ── App instance ───────────────────────────────────────────────────────────────
app = FastAPI(
    title=settings.APP_NAME,
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS ───────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # tighten in production
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Startup / Shutdown ─────────────────────────────────────────────────────────
@app.on_event("startup")
async def on_startup():
    logger.info("🚀 Starting %s …", settings.APP_NAME)
    await create_indexes()
    logger.info("✅ Database indexes ready.")


@app.on_event("shutdown")
async def on_shutdown():
    from app.db.session import client
    client.close()
    logger.info("🛑 MongoDB client closed.")


# ── Health check ───────────────────────────────────────────────────────────────
@app.get("/health", tags=["meta"])
async def health():
    return {"status": "ok", "app": settings.APP_NAME}


# ── API Routers ────────────────────────────────────────────────────────────────
from app.api.api_v1.endpoints.auth import router as auth_router
from app.api.api_v1.endpoints.users import router as users_router

app.include_router(auth_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
