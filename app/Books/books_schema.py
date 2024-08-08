from pydantic import BaseModel


class Books(BaseModel):
    book_id: int
    title: str
    genre: str
    description: str
    thumbnail: str
    author: str
    average_rating: str
    published_year: str


class Books_create(BaseModel):
    title: str
    author: str
    genre: str
    published_year: str
    description: str
    average_rating: str
    thumbnail: str


class User_preferences(BaseModel):
    preference_id: int
    user_id: str
    preferences: str


class User_preferences_create(BaseModel):
    # user_id: str
    preferences: str


class QueryModel(BaseModel):
    query: str


class Favorites(BaseModel):
    favorite_id : int
    user_id: str
    book_id: int
