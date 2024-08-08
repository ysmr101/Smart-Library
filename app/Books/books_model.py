from sqlalchemy import Column, Integer, String
from app.common.config.database import Base


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, index=True)
    genre = Column(String, index=True)
    description = Column(String, index=True)
    thumbnail = Column(String)
    published_year = Column(String)
    average_rating = Column(String)
    num_pages = Column(String)
    ratings_count = Column(String)
    author = Column(String, index=True)


class User_preference(Base):
    __tablename__ = "userpreferences"

    preference_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, index=True)
    preferences = Column(String, index=True)


class Favorites(Base):
    __tablename__ = "favorites"

    favorite_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String)
    book_id = Column(Integer)
