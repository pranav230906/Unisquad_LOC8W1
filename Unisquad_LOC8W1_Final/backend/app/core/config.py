"""
core/config.py
──────────────
Central settings loaded from the .env file via python-dotenv.
All other modules import `settings` from here — never os.environ directly.
"""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # ── MongoDB ────────────────────────────────────────────────────────────────
    MONGO_URI: str = "mongodb://localhost:27017"
    MONGO_DB_NAME: str = "unisquad"

    # ── JWT / Auth ─────────────────────────────────────────────────────────────
    SECRET_KEY: str = "changeme-use-a-long-random-string-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 h

    # ── App meta ───────────────────────────────────────────────────────────────
    APP_NAME: str = "Unisquad API"
    DEBUG: bool = False

    # ── Twilio SMS / Live OTP ──────────────────────────────────────────────────
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    TWILIO_FROM_NUMBER: str = ""

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
