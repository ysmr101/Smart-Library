from sqlalchemy.orm import Session
from . import models
from . import schemas

def get_books(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Book).offset(skip).limit(limit).all()

def create_book(db: Session, book: schemas.BooksCreate):
    db_book = models.Book(
                           title=book.title, 
                           genre = book.genre, 
                           description=book.description, 
                           Author_id=book.Author_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_single_book(db: Session, id):
    return db.query(models.Book).filter(models.Book.book_id == id).first()

def update_book(db: Session, book: schemas.BooksCreate, id):
    book_to_update = db.query(models.Book).filter(models.Book.book_id == id).first()
    book_to_update.title = book.title
    book_to_update.genre = book.genre
    book_to_update.description = book.description
    book_to_update.Author_id = book.Author_id
    db.commit()
    db.refresh(book_to_update)
    return book_to_update


def delete_book(db: Session, id):
    book_to_delete = db.query(models.Book).filter(models.Book.book_id == id).first()
    db.delete(book_to_delete)
    db.commit()
    return book_to_delete