from bson import ObjectId
from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt

from app.core.config import settings
from app.db.session import db

import logging
logger = logging.getLogger(__name__)
 
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    """
    Decodes the JWT token to extract the user sub (ObjectId),
    looks it up in the DB, and injects it into the endpoint context.
    """
    token = credentials.credentials
 
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM],
        )
        user_id = payload.get("sub")
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

    if not user_id:
        raise HTTPException(status_code=401, detail="Invalid token payload: sub missing")

    user = await db["users"].find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=401, detail=f"User not found for id: {user_id}")

    user["_id"] = str(user["_id"])
    return user
