"""
Twilio Configuration and Service Module
Place your Twilio credentials here to enable calling and SMS features
"""

import os
from typing import Optional

# Twilio Configuration - Replace with your actual credentials
TWILIO_ACCOUNT_SID = os.getenv("TWILIO_ACCOUNT_SID", "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")  # Replace with your Account SID
TWILIO_AUTH_TOKEN = os.getenv("TWILIO_AUTH_TOKEN", "your_auth_token_here")  # Replace with your Auth Token
TWILIO_PHONE_NUMBER = os.getenv("TWILIO_PHONE_NUMBER", "+1234567890")  # Replace with your Twilio phone number

# Optional: Twilio API Key for enhanced security
TWILIO_API_KEY = os.getenv("TWILIO_API_KEY", "SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")  # Replace with your API Key
TWILIO_API_SECRET = os.getenv("TWILIO_API_SECRET", "your_api_secret_here")  # Replace with your API Secret

# Twilio Service SID for Voice (optional, for advanced features)
TWILIO_TWIML_APPLICATION_SID = os.getenv("TWILIO_TWIML_APPLICATION_SID", "APxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")

# Environment Variables Setup Instructions:
# 1. Set these in your environment or .env file:
#    export TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
#    export TWILIO_AUTH_TOKEN="your_auth_token_here"
#    export TWILIO_PHONE_NUMBER="+1234567890"
#
# 2. Or create a .env file in the backend directory:
#    TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#    TWILIO_AUTH_TOKEN=your_auth_token_here
#    TWILIO_PHONE_NUMBER=+1234567890

def get_twilio_config() -> dict:
    """Get Twilio configuration"""
    return {
        "account_sid": TWILIO_ACCOUNT_SID,
        "auth_token": TWILIO_AUTH_TOKEN,
        "phone_number": TWILIO_PHONE_NUMBER,
        "api_key": TWILIO_API_KEY,
        "api_secret": TWILIO_API_SECRET,
        "twiml_app_sid": TWILIO_TWIML_APPLICATION_SID,
    }

def is_twilio_configured() -> bool:
    """Check if Twilio is properly configured"""
    return (
        TWILIO_ACCOUNT_SID and 
        TWILIO_ACCOUNT_SID != "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" and
        TWILIO_AUTH_TOKEN and 
        TWILIO_AUTH_TOKEN != "your_auth_token_here" and
        TWILIO_PHONE_NUMBER and 
        TWILIO_PHONE_NUMBER != "+1234567890"
    )

# Twilio Client (to be initialized when credentials are provided)
twilio_client = None

def init_twilio_client():
    """Initialize Twilio client if credentials are available"""
    global twilio_client
    try:
        from twilio.rest import Client
        if is_twilio_configured():
            twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
            return True
        else:
            print("Twilio credentials not configured. Please set environment variables.")
            return False
    except ImportError:
        print("Twilio library not installed. Run: pip install twilio")
        return False
    except Exception as e:
        print(f"Failed to initialize Twilio client: {e}")
        return False

async def make_masked_call(to_phone: str, from_phone: Optional[str] = None) -> dict:
    """
    Make a masked call using Twilio
    This will create a proxy number to hide real phone numbers
    """
    if not twilio_client:
        return {"success": False, "error": "Twilio not configured"}
    
    try:
        # Create a masked call (proxy number)
        call = twilio_client.calls.create(
            to=to_phone,
            from_=from_phone or TWILIO_PHONE_NUMBER,
            url="https://handler.twilio.com/twiml/EHxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  # TwiML URL
            method="GET"
        )
        return {"success": True, "call_sid": call.sid}
    except Exception as e:
        return {"success": False, "error": str(e)}

async def send_sms(to_phone: str, message: str, from_phone: Optional[str] = None) -> dict:
    """Send SMS using Twilio"""
    if not twilio_client:
        return {"success": False, "error": "Twilio not configured"}
    
    try:
        sms = twilio_client.messages.create(
            body=message,
            to=to_phone,
            from_=from_phone or TWILIO_PHONE_NUMBER
        )
        return {"success": True, "message_sid": sms.sid}
    except Exception as e:
        return {"success": False, "error": str(e)}

# Initialize Twilio client on module import
init_twilio_client()
