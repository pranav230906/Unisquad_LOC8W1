import logging
import httpx
from app.core.config import settings

logger = logging.getLogger(__name__)

async def send_sms_otp(to_phone: str, otp_code: str) -> bool:
    """
    Sends a real SMS OTP via Twilio using httpx (non-blocking).
    Returns True if successfully queued, False otherwise.
    If no Twilio credentials are in .env, just skips and returns True
    so local dev doesn't break.
    """
    sid = settings.TWILIO_ACCOUNT_SID
    token = settings.TWILIO_AUTH_TOKEN
    from_num = settings.TWILIO_FROM_NUMBER

    # Local dev safety switch
    if not sid or not token or not from_num:
        logger.warning(f"Twilio env missing. Skipping actual SMS to {to_phone}. OTP is: {otp_code}")
        return True

    url = f"https://api.twilio.com/2010-04-01/Accounts/{sid}/Messages.json"
    
    payload = {
        "To": to_phone,
        "From": from_num,
        "Body": f"Your Unisquad login code is: {otp_code}. Do not share this with anyone."
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                url,
                auth=(sid, token),
                data=payload,
                timeout=10.0
            )
            
            if response.status_code in (200, 201):
                logger.info(f"✅ SMS OTP sent successfully to {to_phone}")
                return True
            else:
                logger.error(f"❌ Failed to send SMS to {to_phone}. Twilio Response: {response.text}")
                return False
                
    except Exception as e:
        logger.error(f"❌ Exception connecting to SMS provider: {str(e)}")
        return False
