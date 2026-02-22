from datetime import timedelta
from fastapi import HTTPException, status
from app.core.security import verify_password, create_access_token
from app.data.users_mock import get_user_by_email
from app.schemas.auth import UserLogin, Token, User


def authenticate_user(login_data: UserLogin) -> Token:
    user = get_user_by_email(login_data.email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not verify_password(login_data.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token_expires = timedelta(minutes=60)
    access_token = create_access_token(
        data={"sub": user["id"], "role": user["role"]},
        expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")


def get_user_from_token_payload(user_id: str) -> User:
    from app.data.users_mock import get_user_by_id
    
    user = get_user_by_id(user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return User(
        id=user["id"],
        name=user["name"],
        email=user["email"],
        role=user["role"],
        skills=user.get("skills", []),
        rating=user.get("rating")
    )
