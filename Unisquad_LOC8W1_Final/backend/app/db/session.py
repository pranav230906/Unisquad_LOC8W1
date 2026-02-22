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
from mongomock_motor import AsyncMongoMockClient
from app.core.config import settings
import os

# Use MongoDB if provided, otherwise fallback to mongomock for testing/hackathons
if os.environ.get("USE_REAL_MONGO") == "1":
    client = AsyncIOMotorClient(settings.MONGO_URI)
else:
    print("⚠️ MongoDB daemon not detected locally. Initializing in-memory MongoMock for local testing.")
    client = AsyncMongoMockClient()

# ── Shortcut to the target database ───────────────────────────────────────────
db = client[settings.MONGO_DB_NAME]
