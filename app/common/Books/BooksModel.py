from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.config.database import Base

class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, index=True)
    genre = Column(String, index=True)
    description = Column(String, index=True)
    Author_id = Column(Integer, ForeignKey("authors.author_id"))


class UserPreference(Base):
    __tablename__ = "userpreferences"

    preference_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, index=True)
    preferences = Column(String, index=True)

    