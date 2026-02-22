from typing import Optional, List
from pydantic import BaseModel, Field

class User(BaseModel):
    id: str
    name: str
    email: str
    role: str
    skills: Optional[List[str]] = []
    rating: Optional[float] = None

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    user_id: Optional[str] = None
    role: Optional[str] = None

class SendOTPRequest(BaseModel):
    phone: str = Field(..., example="+919876543210")

class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
