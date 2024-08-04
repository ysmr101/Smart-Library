from pydantic import BaseModel


class Books(BaseModel):
    book_id: int
    title: str
    genre: str
    description: str
    author_id: int
    thumbnail: str


class Books_create(BaseModel):
    title: str
    genre: str
    description: str
    author_id: int
    publish_year: int
    rating: int
    author: str
    thumbnail: str


class User_preferences(BaseModel):
    preference_id: int
    user_id: str
    preferences: str


class User_preferences_create(BaseModel):
    # user_id: str
    preferences: str
