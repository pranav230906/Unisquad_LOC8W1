from pydantic import BaseModel
from typing import Optional


class ClientProfile(BaseModel):
    id: str
    name: str
    email: str
    role: str


class ClientUpdate(BaseModel):
    name: Optional[str] = None
