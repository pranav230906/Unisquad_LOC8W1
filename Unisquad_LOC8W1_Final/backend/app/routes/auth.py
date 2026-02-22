from fastapi import APIRouter, Depends
from app.schemas.auth import UserLogin, Token
from app.services.auth_service import authenticate_user

router = APIRouter(prefix="/auth", tags=["authentication"])


@router.post("/login", response_model=Token)
async def login(login_data: UserLogin):
    return authenticate_user(login_data)
