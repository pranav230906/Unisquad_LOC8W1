"""
db/session.py
─────────────
Async MongoDB client wired through Motor.
A single MongoClient is created at import time and reused for the
entire process lifetime — Motor handles connection pooling internally.

Usage anywhere in the app:
    from app.db.session import db
    user = await db["users"].find_one({"phone": phone})
"""

from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

# ── Motor client (one per process) ────────────────────────────────────────────
client: AsyncIOMotorClient = AsyncIOMotorClient(settings.MONGO_URI)

# ── Shortcut to the target database ───────────────────────────────────────────
db = client[settings.MONGO_DB_NAME]
