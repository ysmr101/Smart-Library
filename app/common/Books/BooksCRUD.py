from fastapi import HTTPException
from sqlalchemy.orm import Session
from . import BooksModel
from . import BooksSchema
from app.common.authors import AuthorsCRUD

def get_books(db: Session, skip: int = 0, limit: int = 100):
    
    return db.query(BooksModel.Book).offset(skip).limit(limit).all()

def create_book(db: Session, book: BooksSchema.BooksCreate):
    db_book = BooksModel.Book(
                           title=book.title, 
                           genre = book.genre, 
                           description=book.description, 
                           Author_id=book.Author_id)
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book

def get_single_book(db: Session, id):
    book_to_get = db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    return  book_to_get

def update_book(db: Session, book: BooksSchema.BooksCreate, id):
    book_to_update = db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    if book_to_update is None:
        raise HTTPException(status_code=404, detail="Book not found")
    book_to_update.title = book.title
    book_to_update.genre = book.genre
    book_to_update.description = book.description
    book_to_update.Author_id = book.Author_id
    db.commit()
    db.refresh(book_to_update)
    return book_to_update


def delete_book(db: Session, id):
    book_to_delete = db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    if book_to_delete is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book_to_delete)
    db.commit()
    return book_to_delete

def recommend_book(db: Session, user_id):

    return
