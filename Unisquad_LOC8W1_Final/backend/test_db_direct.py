import asyncio
from app.db.session import db
from app.core.security import generate_otp, hash_otp, verify_otp, create_access_token
from bson import ObjectId
from datetime import datetime, timedelta

async def run_db_test():
    phone = "+919999000011"
    
    print("1️⃣ Cleaning DB...")
    await db["otp_verifications"].delete_many({"phone": phone})
    await db["users"].delete_many({"phone": phone})

    print("2️⃣ Generating and Saving OTP...")
    otp = generate_otp()
    hashed = hash_otp(otp)
    await db["otp_verifications"].update_one(
        {"phone": phone},
        {
            "$set": {
                "phone": phone,
                "otp_hash": hashed,
                "expires_at": datetime.utcnow() + timedelta(minutes=5),
            }
        },
        upsert=True,
    )
    
    print("3️⃣ Verifying OTP from DB...")
    record = await db["otp_verifications"].find_one({"phone": phone})
    assert record, "Record not found"
    assert verify_otp(otp, record["otp_hash"]), "OTP Hash mismatch"
    
    print("4️⃣ Finding or Creating User...")
    user = await db["users"].find_one({"phone": phone})
    if not user:
        result = await db["users"].insert_one({
            "phone": phone,
            "role": None,
            "created_at": datetime.utcnow(),
        })
        user_id = str(result.inserted_id)
        print(f"   Created User: {user_id}")
    else:
        user_id = str(user["_id"])
        print(f"   Found User: {user_id}")

    print("5️⃣ Generating JWT...")
    token = create_access_token({"sub": user_id})
    print(f"   Token: {token[:30]}...")

    print("✅ TEST PASSED: Database models, security hashes, and queries all work!")

if __name__ == "__main__":
    import logging
    # Suppress verbose pymongo logs
    logging.getLogger("pymongo").setLevel(logging.WARNING)
    logging.getLogger("passlib").setLevel(logging.WARNING)
    asyncio.run(run_db_test())
