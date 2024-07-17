from sqlalchemy.orm import Session

from . import models
from . import schemas

import uuid
# def get_author(db: Session, author_id: int):
#     return db.query(models.Author).filter(models.Author.id == author_id).first()


# def get_author_by_first_name(db: Session, first_name: str):
#     return db.query(models.Author).filter(models.Author.first_name == first_name).first()


# def get_authors(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Author).offset(skip).limit(limit).all()


# def create_book(db: Session, book: schemas.BookCreate):
#     # fake_hashed_password = user.password + "notreallyhashed"
#     db_book = models.Book(title= book.title, description = book.description, id=book.id, author_id = book.author_id)
#     db.add(db_book)
#     db.commit()
#     db.refresh(db_book)
#     return db_book


def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Book).offset(skip).limit(limit).all()



def create_book(db: Session, book: schemas.Books):
    # uid = uuid.uuid4()
    # book_id = str(uid)
    db_book = models.Book(
                           title=book.title, 
                           genre = book.genre, 
                           description=book.description, 
                           Author_id=book.Author_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book