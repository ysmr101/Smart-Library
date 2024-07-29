from pydantic import BaseModel


class Books(BaseModel):
    book_id: int
    title: str
    genre: str
    description: str
    thumbnail: str
    author_id: int


class Books_create(BaseModel):
    title: str
    genre: str
    description: str
    author_id: int


class User_preferences(BaseModel):
    preference_id: int
    user_id: str
    preferences: str


class User_preferences_create(BaseModel):
    # user_id: str
    preferences: str


class QueryModel(BaseModel):
    query: str
