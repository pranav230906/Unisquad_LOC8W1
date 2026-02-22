from datetime import datetime, timedelta
import random

from jose import jwt
from passlib.context import CryptContext

from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# ── OTP ────────────────────────────────────────────────────────────────────────

def generate_otp() -> str:
    """Generate a random 6-digit OTP."""
    return str(random.randint(100000, 999999))


def hash_otp(otp: str) -> str:
    """Hash the OTP using bcrypt."""
    return pwd_context.hash(otp)


def verify_otp(plain: str, hashed: str) -> bool:
    """Verify a plain OTP against its bcrypt hash."""
    return pwd_context.verify(plain, hashed)


# ── JWT ────────────────────────────────────────────────────────────────────────

def create_access_token(data: dict) -> str:
    """Create a short-lived JWT token."""
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM,
    )
