"""
Twilio API Routes
Handles calling and SMS functionality
"""

from fastapi import APIRouter, Depends, HTTPException
from app.schemas.auth import User
from app.core.dependencies import get_current_client
from app.core.twilio import make_masked_call, send_sms, is_twilio_configured

router = APIRouter(prefix="/twilio", tags=["twilio"])

@router.post("/call/{worker_id}")
async def make_call(
    worker_id: str,
    current_user: User = Depends(get_current_client)
):
    """Make a masked call to a worker"""
    if not is_twilio_configured():
        raise HTTPException(
            status_code=503,
            detail="Twilio service not configured. Please contact administrator."
        )
    
    # In a real implementation, you would get the worker's phone number from database
    # For now, we'll use a placeholder
    worker_phone = "+1234567890"  # Replace with actual worker phone from database
    
    result = await make_masked_call(worker_phone)
    
    if result["success"]:
        return {
            "success": True,
            "message": "Call initiated successfully",
            "call_sid": result["call_sid"]
        }
    else:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to make call: {result['error']}"
        )

@router.post("/sms/{worker_id}")
async def send_message(
    worker_id: str,
    message: str,
    current_user: User = Depends(get_current_client)
):
    """Send SMS to a worker"""
    if not is_twilio_configured():
        raise HTTPException(
            status_code=503,
            detail="Twilio service not configured. Please contact administrator."
        )
    
    # In a real implementation, you would get the worker's phone number from database
    worker_phone = "+1234567890"  # Replace with actual worker phone from database
    
    result = await send_sms(worker_phone, message)
    
    if result["success"]:
        return {
            "success": True,
            "message": "SMS sent successfully",
            "message_sid": result["message_sid"]
        }
    else:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send SMS: {result['error']}"
        )

@router.get("/status")
async def twilio_status():
    """Check Twilio configuration status"""
    return {
        "configured": is_twilio_configured(),
        "message": "Twilio is configured" if is_twilio_configured() else "Twilio credentials not set"
    }
