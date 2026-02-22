from fastapi import HTTPException, status
from app.data.users_mock import get_user_by_id
from app.schemas.client import ClientProfile, ClientUpdate


def get_client_profile(user_id: str) -> ClientProfile:
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user["role"] != "client":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not a client"
        )
    
    return ClientProfile(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"]
    )


def update_client_profile(user_id: str, update_data: ClientUpdate) -> ClientProfile:
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if user["role"] != "client":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not a client"
        )
    
    if update_data.name:
        user["name"] = update_data.name
    
    return ClientProfile(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"]
    )
