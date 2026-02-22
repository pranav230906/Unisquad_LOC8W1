"""
db/init_db.py
─────────────
Creates all MongoDB indexes on application startup.

Why indexes here (not in migrations)?
  Motor has no migration system. Instead we call create_index() with
  `background=True` on every startup — MongoDB silently skips creation
  when the index already exists, so it is idempotent and safe.

Called by: app/main.py  →  startup event handler
"""

import logging

from app.db.session import db

logger = logging.getLogger(__name__)


async def create_indexes() -> None:
    """
    Ensure all collection indexes exist.
    Add new indexes here as new collections are introduced in Phase 2.
    """

    # ── users ──────────────────────────────────────────────────────────────────
    await db["users"].create_index(
        "phone",
        unique=True,          # duplicate phones rejected at DB level
        background=True,      # non-blocking build on existing data
        name="unique_phone",
    )
    logger.info("✅ Index ensured: users.unique_phone")

    # ── worker_profiles ────────────────────────────────────────────────────────
    # One profile per user — prevents duplicate profile creation
    await db["worker_profiles"].create_index(
        "user_id",
        unique=True,
        background=True,
        name="unique_worker_user_id",
    )
    logger.info("✅ Index ensured: worker_profiles.unique_worker_user_id")

    # CRITICAL: 2dsphere index — powers $near / $geoNear / $geoWithin queries.
    # Without this index MongoDB cannot run geospatial queries efficiently.
    # Field must contain a valid GeoJSON Point: {"type":"Point","coordinates":[lng,lat]}
    await db["worker_profiles"].create_index(
        [("location", "2dsphere")],
        background=True,
        name="geo_location_2dsphere",
    )
    logger.info("✅ Index ensured: worker_profiles.geo_location_2dsphere")

    # Speeds up availability-filtered searches (most common query pattern)
    await db["worker_profiles"].create_index(
        [("is_available", 1), ("skills", 1)],
        background=True,
        name="available_skills",
    )
    logger.info("✅ Index ensured: worker_profiles.available_skills")

    # ── jobs ───────────────────────────────────────────────────────────────────
    # Fast filtering by open jobs (the default view) and sorted newest-first
    await db["jobs"].create_index(
        [("status", 1), ("created_at", -1)],
        background=True,
        name="status_created_at_idx",
    )
    logger.info("✅ Index ensured: jobs.status_created_at_idx")

    # Fast filtering by category (e.g., all "plumber" jobs)
    await db["jobs"].create_index(
        "category",
        background=True,
        name="category_idx",
    )
    logger.info("✅ Index ensured: jobs.category_idx")

    # Powering $geoNear radius searches (workers finding jobs near them)
    await db["jobs"].create_index(
        [("location", "2dsphere")],
        background=True,
        name="geo_location_jobs_2dsphere",
    )
    logger.info("✅ Index ensured: jobs.geo_location_jobs_2dsphere")

    # Fast lookup for a specific client fetching all jobs they posted
    await db["jobs"].create_index(
        "client_id",
        background=True,
        name="client_id_idx",
    )
    logger.info("✅ Index ensured: jobs.client_id_idx")

    # ── (future) availability ──────────────────────────────────────────────────
    # await db["availability"].create_index([("worker_id", 1), ("date", 1)], background=True)

    # ── assignments ────────────────────────────────────────────────────────────
    # **CRITICAL RACE CONDITION GUARD**
    # Prevents two workers from claiming the same job at the exact same millisecond.
    # The second worker's insert will throw a MongoDB DuplicateKeyError, which we
    # catch and map to a 409 Conflict in the API.
    await db["assignments"].create_index(
        "job_id",
        unique=True,
        background=True,
        name="unique_job_assignment",
    )
    logger.info("✅ Index ensured: assignments.unique_job_assignment")

    # Fast lookup for a worker fetching their active or past assignments
    await db["assignments"].create_index(
        "worker_id",
        background=True,
        name="worker_assignments_idx",
    )
    logger.info("✅ Index ensured: assignments.worker_assignments_idx")

    # ── reviews ────────────────────────────────────────────────────────────────
    # One review per completed job (prevent double-submitting reviews)
    await db["reviews"].create_index(
        "job_id",
        unique=True,
        background=True,
        name="unique_job_review",
    )
    logger.info("✅ Index ensured: reviews.unique_job_review")

    # Fast aggregation to count and average out a worker's ratings
    await db["reviews"].create_index(
        "worker_id",
        background=True,
        name="worker_reviews_idx",
    )
    logger.info("✅ Index ensured: reviews.worker_reviews_idx")

    # ── otp_verifications ──────────────────────────────────────────────────────
    # Ensures only one active OTP flow per phone number at a time
    await db["otp_verifications"].create_index(
        "phone",
        unique=True,
        background=True,
        name="unique_otp_phone",
    )
    logger.info("✅ Index ensured: otp_verifications.unique_otp_phone")

    logger.info("✅ All indexes verified.")
