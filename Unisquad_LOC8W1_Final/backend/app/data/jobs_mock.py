from typing import List, Dict, Any, Optional
from uuid import uuid4

jobs: List[Dict[str, Any]] = []


def create_job(job_data: Dict[str, Any]) -> Dict[str, Any]:
    job = {
        "id": str(uuid4()),
        **job_data,
        "status": "open",
        "worker_id": None
    }
    jobs.append(job)
    return job


def get_job_by_id(job_id: str) -> Optional[Dict[str, Any]]:
    for job in jobs:
        if job["id"] == job_id:
            return job
    return None


def get_jobs_by_client_id(client_id: str) -> List[Dict[str, Any]]:
    return [job for job in jobs if job["client_id"] == client_id]


def update_job(job_id: str, update_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    for i, job in enumerate(jobs):
        if job["id"] == job_id:
            jobs[i].update(update_data)
            return jobs[i]
    return None


def delete_job(job_id: str) -> bool:
    for i, job in enumerate(jobs):
        if job["id"] == job_id:
            del jobs[i]
            return True
    return False


def get_all_jobs() -> List[Dict[str, Any]]:
    return jobs
