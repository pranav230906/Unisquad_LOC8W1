import requests

BASE_URL = "http://localhost:8000/api/v1/auth"
PHONE = "+919876543210"

print("1️⃣ SENDING OTP...")
send_res = requests.post(f"{BASE_URL}/send-otp", json={"phone": PHONE})
send_data = send_res.json()
print("Response:", send_data)
otp = send_data.get("dev_otp")

print("\n2️⃣ VERIFYING OTP...")
verify_res = requests.post(f"{BASE_URL}/verify-otp", json={"phone": PHONE, "otp": otp})
verify_data = verify_res.json()
print("Response:", verify_data)
token = verify_data.get("access_token")

print("\n3️⃣ FETCHING /me (PROTECTED)...")
headers = {"Authorization": f"Bearer {token}"}
me_res = requests.get(f"{BASE_URL}/me", headers=headers)
print("Response:", me_res.json())
