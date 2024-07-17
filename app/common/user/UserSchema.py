from pydantic import BaseModel

class UserCreate(BaseModel):
    user_name: str
    password: str | None = None