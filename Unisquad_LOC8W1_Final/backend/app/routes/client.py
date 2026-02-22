from fastapi import APIRouter, Depends
from app.schemas.client import ClientProfile, ClientUpdate
from app.schemas.auth import User
from app.services.client_service import get_client_profile, update_client_profile
from app.core.dependencies import get_current_client

router = APIRouter(prefix="/client", tags=["client"])


@router.get("/me", response_model=ClientProfile)
async def get_profile(current_user: User = Depends(get_current_client)):
    return get_client_profile(current_user.id)


@router.put("/me", response_model=ClientProfile)
async def update_profile(
    update_data: ClientUpdate,
    current_user: User = Depends(get_current_client)
):
    return update_client_profile(current_user.id, update_data)
