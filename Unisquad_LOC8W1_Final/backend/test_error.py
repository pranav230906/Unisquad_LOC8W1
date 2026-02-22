import asyncio
from app.db.session import db
from app.core.security import hash_otp

async def main():
    try:
        print("Hashing OTP")
        hashed = hash_otp('123456')
        print("Hashed:", hashed)
        print("Updating db")
        res = await db["otp_verifications"].update_one(
            {"phone": "+918888888888"},
            {"$set": {"phone": "+918888888888", "otp_hash": hashed}},
            upsert=True
        )
        print("DB Update successful", res.modified_count, res.upserted_id)
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(main())
