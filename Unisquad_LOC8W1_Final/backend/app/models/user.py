from datetime import datetime
from typing import Literal, Optional

from bson import ObjectId
from pydantic import BaseModel, Field


from pydantic_core import core_schema

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, source_type, handler
    ) -> core_schema.CoreSchema:
        return core_schema.union_schema(
            [
                core_schema.is_instance_schema(ObjectId),
                core_schema.no_info_plain_validator_function(cls.validate),
            ]
        )

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(
        cls, core_schema, handler
    ):
        return {"type": "string"}


class UserInDB(BaseModel):
    """
    Exact mirror of a document in the `users` MongoDB collection.
    Note: When created during OTP verification, only `phone` is set.
    `role` and `name` are populated later during profile completion.
    """

    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    phone: str = Field(..., example="+919812345678")
    
    # Optional until User completes their profile
    role: Optional[Literal["worker", "client"]] = Field(
        default=None,
        description="Platform role: 'worker' or 'client'. Null for new users.",
    )
    name: Optional[str] = Field(default=None, example="Rajesh Kumar")
    
    language: str = Field(default="en", example="hi")

    # Timestamps
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
