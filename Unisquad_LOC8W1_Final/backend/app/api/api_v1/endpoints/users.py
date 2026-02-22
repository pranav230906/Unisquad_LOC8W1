from fastapi import APIRouter, Depends, HTTPException
from bson import ObjectId
from app.api.deps import get_current_user
from app.db.session import db
from app.schemas.user import UserOut, UserProfileUpdate

router = APIRouter(prefix="/users", tags=["Users"])

@router.patch("/profile", response_model=UserOut)
async def update_user_profile(
    payload: UserProfileUpdate,
    current_user=Depends(get_current_user)
):
    """
    After OTP verification, the user has no name or role. 
    The frontend must redirect them here to enter their 'name', 'role', etc.
    This saves their details to the DB so their actual name shows up identically everywhere.
    """
    user_id = str(current_user["_id"])
    
    # Update fields we received in payload
    update_data = {
        "name": payload.name,
        "role": payload.role,
    }
    
    if payload.language is not None:
        update_data["language"] = payload.language

    await db["users"].update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )

    # Fetch updated user to return via UserOut Pydantic parser
    updated_user = await db["users"].find_one({"_id": ObjectId(user_id)})
    updated_user["id"] = str(updated_user["_id"])
    
    return updated_user
