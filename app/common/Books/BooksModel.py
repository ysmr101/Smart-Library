from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.common.config.database import Base


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, index=True)
    genre = Column(String, index=True, default="history")
    description = Column(String, index=True)
    author_id = Column(Integer, index=True)


class UserPreference(Base):
    __tablename__ = "userpreferences"

    preference_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(String, index=True)
    preferences = Column(String, index=True)
