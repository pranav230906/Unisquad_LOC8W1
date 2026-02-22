from fastapi import HTTPException, status
from app.data.jobs_mock import create_job, get_job_by_id, get_jobs_by_client_id, update_job, delete_job
from app.data.users_mock import get_user_by_id
from app.schemas.job import Job, JobCreate, JobUpdate


def create_new_job(job_data: JobCreate, client_id: str) -> Job:
    client = get_user_by_id(client_id)
    if not client:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Client not found"
        )
    
    if client["role"] != "client":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only clients can create jobs"
        )
    
    job_dict = job_data.dict()
    job_dict["client_id"] = client_id
    
    created_job = create_job(job_dict)
    return Job(**created_job)


def get_client_jobs(client_id: str) -> list[Job]:
    jobs = get_jobs_by_client_id(client_id)
    return [Job(**job) for job in jobs]


def get_job_by_id_for_client(job_id: str, client_id: str) -> Job:
    job = get_job_by_id(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    if job["client_id"] != client_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to view this job"
        )
    
    return Job(**job)


def delete_job_by_id(job_id: str, client_id: str) -> bool:
    job = get_job_by_id(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    if job["client_id"] != client_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to delete this job"
        )
    
    return delete_job(job_id)


def hire_worker_for_job(job_id: str, worker_id: str, client_id: str) -> Job:
    job = get_job_by_id(job_id)
    if not job:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found"
        )
    
    if job["client_id"] != client_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to modify this job"
        )
    
    worker = get_user_by_id(worker_id)
    if not worker:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Worker not found"
        )
    
    if worker["role"] != "worker":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User is not a worker"
        )
    
    if job["status"] != "open":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Job is not open for hiring"
        )
    
    updated_job = update_job(job_id, {"status": "assigned", "worker_id": worker_id})
    return Job(**updated_job)
