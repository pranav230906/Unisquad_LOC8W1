from typing import Optional, List, Dict, Any
from uuid import uuid4
from app.core.security import get_password_hash

users: List[Dict[str, Any]] = [
    {
        "id": str(uuid4()),
        "name": "John Client",
        "email": "client@example.com",
        "password": get_password_hash("client123"),
        "role": "client",
        "skills": [],
        "rating": None
    },
    {
        "id": str(uuid4()),
        "name": "Jane Worker",
        "email": "worker@example.com",
        "password": get_password_hash("worker123"),
        "role": "worker",
        "skills": ["plumbing", "electrical", "carpentry"],
        "rating": 4.5
    }
]


def get_user_by_email(email: str) -> Optional[Dict[str, Any]]:
    for user in users:
        if user["email"] == email:
            return user
    return None


def get_user_by_id(user_id: str) -> Optional[Dict[str, Any]]:
    for user in users:
        if user["id"] == user_id:
            return user
    return None


def get_all_users() -> List[Dict[str, Any]]:
    return users


def add_user(user_data: Dict[str, Any]) -> Dict[str, Any]:
    users.append(user_data)
    return user_data
