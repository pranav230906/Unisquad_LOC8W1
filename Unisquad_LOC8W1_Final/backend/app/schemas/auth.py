from pydantic import BaseModel, Field


class SendOTPRequest(BaseModel):
    phone: str = Field(..., example="+919876543210")


class VerifyOTPRequest(BaseModel):
    phone: str
    otp: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
