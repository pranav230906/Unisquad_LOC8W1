from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from bson import ObjectId
from datetime import datetime

from app.api.deps import get_current_user
from app.db.session import db
from app.models.job import JobInDB
from app.schemas.job import JobOut, JobCreate

router = APIRouter()

@router.post("", response_model=JobOut, status_code=status.HTTP_201_CREATED)
async def create_job(
    request: JobCreate,
    current_user: dict = Depends(get_current_user)
):
    """
    Create a new job.
    """
    if current_user.get("role") != "client":
        raise HTTPException(status_code=403, detail="Only clients can create jobs")
    
    # Ensure current_user["_id"] is available
    client_id = str(current_user["_id"])
    
    # Base mapping
    job_data = request.copy(update={"client_id": client_id})
    job_doc = JobInDB(**job_data.model_dump(), client_id=client_id)
    
    # Store in DB
    result = await db["jobs"].insert_one(job_doc.model_dump(by_alias=True, exclude_none=True))
    created_id = result.inserted_id
    
    # Fetch back from DB to return complete Out model
    job = await db["jobs"].find_one({"_id": created_id})
    job["id"] = str(job["_id"])
    job["client_id"] = str(job["client_id"])
    if "worker_id" in job and job["worker_id"]:
        job["worker_id"] = str(job["worker_id"])
    return job


@router.get("/my-jobs", response_model=List[JobOut])
async def get_my_jobs(current_user: dict = Depends(get_current_user)):
    """
    Get all jobs for the currently logged in client or worker.
    """
    user_role = current_user.get("role")
    user_id = str(current_user["_id"])
    
    if user_role == "client":
        cursor = db["jobs"].find({"client_id": user_id}).sort("created_at", -1)
    else:
        cursor = db["jobs"].find({"worker_id": user_id}).sort("created_at", -1)
        
    jobs = []
    async for job in cursor:
        job["id"] = str(job["_id"])
        job["client_id"] = str(job["client_id"])
        if "worker_id" in job and job["worker_id"]:
            job["worker_id"] = str(job["worker_id"])
        jobs.append(job)
        
    return jobs


@router.get("/{job_id}", response_model=JobOut)
async def get_job(job_id: str, current_user: dict = Depends(get_current_user)):
    """
    Get a specific job by ID.
    """
    try:
        oid = ObjectId(job_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid job ID")
        
    job = await db["jobs"].find_one({"_id": oid})
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job["id"] = str(job["_id"])
    job["client_id"] = str(job["client_id"])
    if "worker_id" in job and job["worker_id"]:
        job["worker_id"] = str(job["worker_id"])
        
    return job
