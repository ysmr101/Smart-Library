from pydantic import BaseModel


class Books(BaseModel):
    book_id: int
    title: str
    genre: str
    description: str
    author_id: int


class BooksCreate(BaseModel):
    title: str
    genre: str
    description: str
    author_id: int


class UserPreferences(BaseModel):
    preference_id: str
    user_id: str
    preferences: str

