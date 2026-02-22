from datetime import datetime, timedelta

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
import phonenumbers

from app.api.deps import get_current_user
from app.core.security import create_access_token, generate_otp, hash_otp, verify_otp
from app.db.session import db
from app.schemas.auth import SendOTPRequest, TokenResponse, VerifyOTPRequest
from app.services.sms import send_sms_otp

router = APIRouter(prefix="/auth", tags=["Auth"])


OTP_EXPIRY_MINUTES = 5

# ── Collections ────────────────────────────────────────────────────────────────
users_collection = db["users"]
otp_collection = db["otp_verifications"]


def normalize_phone(phone: str) -> str:
    """
    Validates a raw phone string and strictly formats it to E.164.
    Defaults to India ('IN') region if no country code is supplied.
    """
    try:
        parsed = phonenumbers.parse(phone, "IN")
        if not phonenumbers.is_valid_number(parsed):
            raise ValueError("Invalid phone number.")
        # Outputs format like +919876543210
        return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
    except phonenumbers.NumberParseException:
        raise ValueError("Unrecognized phone format.")


# ── Send OTP ───────────────────────────────────────────────────────────────────
@router.post("/send-otp")
async def send_otp(payload: SendOTPRequest):
    try:
        # Standardize the phone number into a globally accepted format
        phone = normalize_phone(payload.phone)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    otp = generate_otp()
    hashed = hash_otp(otp)

    await otp_collection.update_one(
        {"phone": phone},
        {
            "$set": {
                "phone": phone,
                "otp_hash": hashed,
                "expires_at": datetime.utcnow() + timedelta(minutes=OTP_EXPIRY_MINUTES),
            }
        },
        upsert=True,
    )

    # Trigger Async real-life SMS delivery
    print(f"[DEV OTP] {phone} -> {otp}")
    await send_sms_otp(phone, otp)

    return {"message": "OTP sent successfully", "dev_otp": otp}


# ── Verify OTP ─────────────────────────────────────────────────────────────────
@router.post("/verify-otp", response_model=TokenResponse)
async def verify_otp_endpoint(payload: VerifyOTPRequest):
    try:
        phone = normalize_phone(payload.phone)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    otp = payload.otp

    record = await otp_collection.find_one({"phone": phone})

    if not record:
        raise HTTPException(status_code=400, detail="OTP not found")

    if datetime.utcnow() > record["expires_at"]:
        raise HTTPException(status_code=400, detail="OTP expired")

    if not verify_otp(otp, record["otp_hash"]):
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # ---------- find or create user ----------
    user = await users_collection.find_one({"phone": phone})

    if not user:
        result = await users_collection.insert_one(
            {
                "phone": phone,
                "role": None,  # role and name must be filled in via profile update later
                "created_at": datetime.utcnow(),
            }
        )
        user_id = str(result.inserted_id)
    else:
        user_id = str(user["_id"])

    # ---------- create JWT ----------
    token = create_access_token({"sub": user_id})

    return TokenResponse(access_token=token)


from app.schemas.user import UserOut

@router.get("/me", response_model=UserOut)
async def get_me(current_user=Depends(get_current_user)):
    """
    Returns the currently authenticated user payload injected by the
    get_current_user JWT dependency.
    """
    current_user["id"] = str(current_user["_id"])
    return current_user
