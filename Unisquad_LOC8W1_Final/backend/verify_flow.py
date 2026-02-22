import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.db.session import db
from datetime import datetime

# Initialize test client
client = TestClient(app)

async def test_auth_and_db():
    print("\n🚀 Starting Auth & Database Verification...")
    
    test_phone = "+919999999999"
    
    # Clean up previous test runs if any
    await db["otp_verifications"].delete_many({"phone": test_phone})
    await db["users"].delete_many({"phone": test_phone})

    # 1️⃣ Test /send-otp
    print(f"\n1️⃣ Sending OTP to {test_phone}...")
    response = client.post("/api/v1/auth/send-otp", json={"phone": test_phone})
    assert response.status_code == 200, f"Failed to send OTP: {response.text}"
    print("✅ /send-otp API Response OK:", response.json())

    # 2️⃣ Verify DB record for OTP was created
    print("\n2️⃣ Checking MongoDB `otp_verifications` collection...")
    otp_record = await db["otp_verifications"].find_one({"phone": test_phone})
    assert otp_record is not None, "❌ OTP record not found in MongoDB!"
    assert "otp_hash" in otp_record, "❌ otp_hash missing from MongoDB!"
    print("✅ OTP successfully hashed and saved in DB. Expires at:", otp_record["expires_at"])
    
    # Now we need the actual OTP since only the hash is stored in the DB.
    # To test verify-otp seamlessly, let's inject a known hash into the DB for OTP "123456"
    # and update the expiration time.
    from app.core.security import hash_otp
    known_otp = "123456"
    print(f"\n3️⃣ Overwriting DB with known OTP '{known_otp}' hash for testing...")
    await db["otp_verifications"].update_one(
        {"phone": test_phone},
        {"$set": {"otp_hash": hash_otp(known_otp)}}
    )

    # 4️⃣ Test /verify-otp
    print(f"\n4️⃣ Verifying OTP '{known_otp}'...")
    verify_response = client.post(
        "/api/v1/auth/verify-otp", 
        json={"phone": test_phone, "otp": known_otp}
    )
    assert verify_response.status_code == 200, f"Failed to verify OTP: {verify_response.text}"
    token_data = verify_response.json()
    assert "access_token" in token_data, "❌ No access_token in response!"
    token = token_data["access_token"]
    print("✅ /verify-otp API Response OK. Issued JWT Token:", token[:20] + "...(truncated)")

    # 5️⃣ Verify DB record for User was created
    print("\n5️⃣ Checking MongoDB `users` collection...")
    user_record = await db["users"].find_one({"phone": test_phone})
    assert user_record is not None, "❌ User record not found in MongoDB!"
    print(f"✅ User automatically created in DB with ID: {user_record['_id']} | Role: {user_record.get('role', 'None')}")

    # 6️⃣ Test Protected Route /me
    print("\n6️⃣ Fetching Protected Endpoint /me...")
    me_response = client.get(
        "/api/v1/auth/me", 
        headers={"Authorization": f"Bearer {token}"}
    )
    assert me_response.status_code == 200, f"Failed protected route: {me_response.text}"
    me_data = me_response.json()
    assert me_data["phone"] == test_phone, "❌ User phone mismatch!"
    print("✅ /me Authenticated successfully. User Identity:", me_data)

    # Cleanup
    await db["otp_verifications"].delete_many({"phone": test_phone})
    await db["users"].delete_many({"phone": test_phone})
    print("\n🎉 ALL TESTS PASSED! Database connections and JWT Auth pipeline are 100% healthy.")

if __name__ == "__main__":
    import asyncio
    asyncio.run(test_auth_and_db())
