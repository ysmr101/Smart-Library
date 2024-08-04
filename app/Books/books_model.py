from sqlalchemy import Column, Integer, String
from app.common.config.database import Base


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, index=True)
    genre = Column(String, index=True, default="history")
    description = Column(String, index=True)
    author_id = Column(Integer, index=True)
    thumbnail = Column(String, index=True)
    publish_year = Column(Integer, index=True)
    rating = Column(Integer, index=True)
    author = Column(String, index=True)


class User_preference(Base):
    __tablename__ = "userpreferences"

    preference_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, index=True)
    preferences = Column(String, index=True)
