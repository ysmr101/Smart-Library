from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.Books import BooksModel, BooksSchema
from sqlalchemy.orm import Session
from app.authors import AuthorsModel
from app.Books import BooksServices


def get_books(db: Session, start: int = 0, limit: int = 100):
    start = abs(start)
    limit = max(abs(limit), 1)
    list_of_books = db.query(BooksModel.Book).offset(start).limit(limit).all()
    BooksServices.check_books(repr(list_of_books))
    return list_of_books


def create_book(db: Session, book: BooksSchema.BooksCreate):
    author = (
        db.query(AuthorsModel.Author)
        .filter(AuthorsModel.Author.author_id == book.author_id)
        .first()
    )
    BooksServices.check_author(author)
    db_book = BooksModel.Book(
        title=book.title,
        genre=book.genre,
        description=book.description,
        author_id=book.author_id,
    )
    db.add(db_book)
    db.commit()
    db.refresh(db_book)
    return db_book


def get_single_book(db: Session, id):
    book_to_get = (
        db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    )
    BooksServices.check_single_book(book_to_get)
    return book_to_get


def update_book(db: Session, book: BooksSchema.BooksCreate, id):
    book_to_update = (
        db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    )
    BooksServices.check_single_book(book_to_update)
    author = (
        db.query(AuthorsModel.Author)
        .filter(AuthorsModel.Author.author_id == book.author_id)
        .first()
    )
    BooksServices.check_author(author)
    book_to_update.title = book.title
    book_to_update.genre = book.genre
    book_to_update.description = book.description
    book_to_update.author_id = book.author_id
    db.commit()
    db.refresh(book_to_update)
    return book_to_update


def delete_book(db: Session, id):
    book_to_delete = (
        db.query(BooksModel.Book).filter(BooksModel.Book.book_id == id).first()
    )
    BooksServices.check_single_book(book_to_delete)
    db.delete(book_to_delete)
    db.commit()
    return book_to_delete


def recommend_book(db: Session, user_id):
    preference = (
        db.query(BooksModel.UserPreference)
        .filter(BooksModel.UserPreference.user_id == user_id)
        .first()
    )
    BooksServices.check_preference(preference)
    books = (
        db.query(BooksModel.Book)
        .filter(BooksModel.Book.genre == preference.preferences)
        .all()
    )
    BooksServices.check_books(repr(books))
    return books
