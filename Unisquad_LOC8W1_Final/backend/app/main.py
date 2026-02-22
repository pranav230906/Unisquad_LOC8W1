import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

try:
    from app.routes import auth, client, jobs, twilio
except ImportError:
    pass # Some branches might not have this

from app.core.config import settings
from app.db.init_db import create_indexes

logging.basicConfig(
    level=logging.DEBUG if settings.DEBUG else logging.INFO,
    format="%(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.APP_NAME,
    description="A job marketplace backend",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,

    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    app.include_router(auth.router)
    app.include_router(client.router)
    app.include_router(jobs.router)
    app.include_router(twilio.router)
except NameError:
    pass

@app.on_event("startup")
async def on_startup():
    logger.info("🚀 Starting %s …", settings.APP_NAME)
    try:
        await create_indexes()
        logger.info("✅ Database indexes ready.")
    except Exception as e:
        logger.error(f"Failed to create indexes: {e}")

@app.on_event("shutdown")
async def on_shutdown():
    try:
        from app.db.session import client
        client.close()
        logger.info("🛑 MongoDB client closed.")
    except Exception:
        pass

@app.get("/")
async def root():
    return {"message": "Job Marketplace API is running"}

@app.get("/health", tags=["meta"])
async def health():
    return {"status": "ok", "app": settings.APP_NAME}

try:
    from app.api.api_v1.endpoints.auth import router as auth_router
    from app.api.api_v1.endpoints.users import router as users_router
    app.include_router(auth_router, prefix="/api/v1")
    app.include_router(users_router, prefix="/api/v1")
except ImportError:
    pass
