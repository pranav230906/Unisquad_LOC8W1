from fastapi import APIRouter, Depends
from typing import List
from app.schemas.job import Job, JobCreate
from app.schemas.auth import User
from app.services.job_service import (
    create_new_job,
    get_client_jobs,
    get_job_by_id_for_client,
    delete_job_by_id,
    hire_worker_for_job
)
from app.core.dependencies import get_current_client

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.post("", response_model=Job)
async def create_job(
    job_data: JobCreate,
    current_user: User = Depends(get_current_client)
):
    return create_new_job(job_data, current_user.id)


@router.get("/my-jobs", response_model=List[Job])
async def get_my_jobs(current_user: User = Depends(get_current_client)):
    return get_client_jobs(current_user.id)


@router.get("/{job_id}", response_model=Job)
async def get_job(
    job_id: str,
    current_user: User = Depends(get_current_client)
):
    return get_job_by_id_for_client(job_id, current_user.id)


@router.delete("/{job_id}")
async def delete_job(
    job_id: str,
    current_user: User = Depends(get_current_client)
):
    delete_job_by_id(job_id, current_user.id)
    return {"message": "Job deleted successfully"}


@router.post("/{job_id}/hire/{worker_id}", response_model=Job)
async def hire_worker(
    job_id: str,
    worker_id: str,
    current_user: User = Depends(get_current_client)
):
    return hire_worker_for_job(job_id, worker_id, current_user.id)
