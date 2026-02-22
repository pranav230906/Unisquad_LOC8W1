import requests
import pymongo
from bson import ObjectId
import sys
import os

# Add backend to path to import security
sys.path.append(os.path.abspath('c:/Hackathon/LOC 8.0/Unisquad_LOC8W1/Unisquad_LOC8W1_Final/backend'))
from app.core.security import create_access_token

BASE_URL = "http://localhost:8000/api/v1"
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client.unisquad

def test_full_auth_flow():
    phone = "+910000000000"
    print(f"Testing for phone: {phone}")
    
    # 1. Ensure user exists
    user = db.users.find_one({"phone": phone})
    if not user:
        from datetime import datetime
        res = db.users.insert_one({"phone": phone, "role": None, "created_at": datetime.utcnow()})
        user_id = str(res.inserted_id)
        print(f"Created new user: {user_id}")
    else:
        user_id = str(user["_id"])
        print(f"Found existing user: {user_id}")

    # 2. Generate token
    token = create_access_token({"sub": user_id})
    print(f"Generated token: {token[:20]}...")

    # 3. Test /auth/me
    print("Calling /auth/me...")
    headers = {"Authorization": f"Bearer {token}"}
    res = requests.get(f"{BASE_URL}/auth/me", headers=headers)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")
    if res.status_code != 200:
        return

    # 4. Test /users/profile
    print("Calling /users/profile...")
    payload = {"name": "Test User", "role": "client"}
    res = requests.patch(f"{BASE_URL}/users/profile", json=payload, headers=headers)
    print(f"Status: {res.status_code}")
    print(f"Response: {res.text}")

if __name__ == "__main__":
    test_full_auth_flow()
