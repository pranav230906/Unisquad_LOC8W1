from datetime import datetime
from typing import Literal, Optional

from pydantic import BaseModel, Field

# ── Shared base ────────────────────────────────────────────────────────────────
class UserBase(BaseModel):
    phone: str = Field(..., description="E.164 phone number used as the unique login identifier")
    role: Optional[Literal["worker", "client"]] = Field(
        default=None,
        description="Platform role: 'worker' or 'client'",
    )
    name: Optional[str] = Field(default=None, example="Rajesh Kumar")
    language: str = Field(default="en", description="ISO-639-1 language preference")

# ── Profile update request body ───────────────────────────────────────────────
class UserProfileUpdate(BaseModel):
    """
    Accepted by PATCH /users/profile.
    Used by the frontend to fill out the user role and name after OTP verify.
    """
    role: Literal["worker", "client"] = Field(..., description="Must choose a role for the profile.")
    name: str = Field(..., min_length=2, example="Rajesh Kumar")
    language: Optional[str] = Field(default=None, example="hi")

# ── Public response payload ────────────────────────────────────────────────────
class UserOut(UserBase):
    """
    Returned by /auth/me and /users/profile endpoints.
    id is a string representation of MongoDB ObjectId.
    """
    id: str = Field(..., description="MongoDB ObjectId serialised as string")
    created_at: datetime

    class Config:
        from_attributes = True
