"""
Unisquad LOC8 — FastAPI entry point.
Run with:  uvicorn app.main:app --reload --port 8000
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import get_settings

# ── Import routers ───────────────────────────────────────────────────
from app.api.api_v1.endpoints.navigation import router as navigation_router

# Placeholder imports — uncomment when these endpoints are implemented:
# from app.api.api_v1.endpoints.jobs import router as jobs_router
# from app.api.api_v1.endpoints.workers import router as workers_router
# from app.api.api_v1.endpoints.auth import router as auth_router
# from app.api.api_v1.endpoints.feedback import router as feedback_router
# from app.api.api_v1.endpoints.voice import router as voice_router
# from app.api.api_v1.endpoints.admin import router as admin_router

settings = get_settings()

app = FastAPI(
    title=settings.APP_NAME,
    debug=settings.DEBUG,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ── CORS — allow the Vite dev frontend ───────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register routers under /api/v1 ──────────────────────────────────
app.include_router(navigation_router, prefix="/api/v1")

# Uncomment as endpoints are implemented:
# app.include_router(jobs_router, prefix="/api/v1")
# app.include_router(workers_router, prefix="/api/v1")
# app.include_router(auth_router, prefix="/api/v1")
# app.include_router(feedback_router, prefix="/api/v1")
# app.include_router(voice_router, prefix="/api/v1")
# app.include_router(admin_router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"status": "ok", "app": settings.APP_NAME}


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}


# ── Database startup / shutdown hooks (placeholder) ──────────────────
# TODO: When the DB is initialised, add engine.dispose() on shutdown
# and optionally run migrations on startup.
#
# @app.on_event("startup")
# async def on_startup():
#     from app.db.session import engine
#     # Run Alembic migrations or create tables
#     pass
#
# @app.on_event("shutdown")
# async def on_shutdown():
#     from app.db.session import engine
#     await engine.dispose()
