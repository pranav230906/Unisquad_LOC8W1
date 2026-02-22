import asyncio
from app.db.session import db
from app.core.security import generate_otp, hash_otp, verify_otp, create_access_token
from bson import ObjectId
from datetime import datetime, timedelta
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

async def run_profile_test():
    phone = "+919999000077"
    
    print("1️⃣ Cleaning DB...")
    await db["otp_verifications"].delete_many({"phone": phone})
    await db["users"].delete_many({"phone": phone})

    print(f"2️⃣ Sending Request to POST /api/v1/auth/send-otp... (phone: {phone})")
    send_res = client.post("/api/v1/auth/send-otp", json={"phone": phone})
    assert send_res.status_code == 200

    # Retrieve hash from DB directly without exposing via API
    record = await db["otp_verifications"].find_one({"phone": phone})
    
    # We don't have the plain text OTP, so we will generate a known one, 
    # hash it, and overwrite the DB so we can test the verify endpoint
    known_otp = "123456"
    await db["otp_verifications"].update_one(
        {"phone": phone},
        {"$set": {"otp_hash": hash_otp(known_otp)}}
    )

    print(f"3️⃣ Verifying OTP '{known_otp}'...")
    verify_res = client.post("/api/v1/auth/verify-otp", json={"phone": phone, "otp": known_otp})
    assert verify_res.status_code == 200
    token = verify_res.json()["access_token"]
    
    print("4️⃣ Trying to complete profile via PATCH /api/v1/users/profile...")
    profile_payload = {
        "name": "Arjun Sharma",
        "role": "worker"
    }
    
    profile_res = client.patch(
        "/api/v1/users/profile",
        json=profile_payload,
        headers={"Authorization": f"Bearer {token}"}
    )
    
    if profile_res.status_code != 200:
        print("ERROR:", profile_res.text)
        return

    profile_data = profile_res.json()
    print("✅ Profile Updated Successfully:", profile_data)
    assert profile_data["name"] == "Arjun Sharma"
    assert profile_data["role"] == "worker"
    
    print("5️⃣ Verifying /me sync...")
    me_res = client.get("/api/v1/auth/me", headers={"Authorization": f"Bearer {token}"})
    me_data = me_res.json()
    print("✅ /me Returns the Sync'd Name:", me_data["name"])

if __name__ == "__main__":
    import logging
    logging.getLogger("pymongo").setLevel(logging.WARNING)
    logging.getLogger("passlib").setLevel(logging.WARNING)
    asyncio.run(run_profile_test())
