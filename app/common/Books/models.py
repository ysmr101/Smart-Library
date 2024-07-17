from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.common.database import Base


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True)
    first_name = Column(String, unique=True, index=True)
    last_name = Column(String)
    biography = Column(String, default=True)

    books = relationship("Book", back_populates="author")


class Book(Base):
    __tablename__ = "books"

    book_id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, index=True)
    genre = Column(String)
    description = Column(String, index=True)
    Author_id = Column(Integer, ForeignKey("authors.id"))

    author = relationship("Author", back_populates="books")