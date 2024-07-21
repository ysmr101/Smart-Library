from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.books import books_model, books_schema,books_services
from sqlalchemy.orm import Session
from app.authors import authors_model


def get_books(db: Session, skip: int = 0, limit: int = 100):
    list_of_books = db.query(books_model.Book).offset(skip).limit(limit).all()
    if list_of_books is None:
        raise HTTPException(status_code=404, detail="No Books")
    return list_of_books


def create_book(db: Session, book: books_schema.Books_create):
    # Check if author exists first
    author = (
        db.query(authors_model.Author)
        .filter(authors_model.Author.author_id == book.author_id)
        .first()
    )
    if author is None:
        raise HTTPException(status_code=401, detail="Author doesnt exist")
    db_book = books_model.Book(
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
        db.query(books_model.Book).filter(books_model.Book.book_id == id).first()
    )
    if book_to_get is None:
        raise HTTPException(status_code=404, detail="Book not found")
    return book_to_get


def update_book(db: Session, book: books_schema.Books_create, id):
    book_to_update = (
        db.query(books_model.Book).filter(books_model.Book.book_id == id).first()
    )
    if book_to_update is None:
        raise HTTPException(status_code=404, detail="Book not found")
    author = (
        db.query(authors_model.Author)
        .filter(authors_model.Author.author_id == book.author_id)
        .first()
    )
    if author is None:
        raise HTTPException(status_code=401, detail="Author doesnt exist")
    book_to_update.title = book.title
    book_to_update.genre = book.genre
    book_to_update.description = book.description
    book_to_update.author_id = book.author_id
    db.commit()
    db.refresh(book_to_update)
    return book_to_update


def delete_book(db: Session, id):
    book_to_delete = (
        db.query(books_model.Book).filter(books_model.Book.book_id == id).first()
    )
    if book_to_delete is None:
        raise HTTPException(status_code=404, detail="Book not found")
    db.delete(book_to_delete)
    db.commit()
    return book_to_delete


def recommend_book(db: Session, user_id):
    preference = (
        db.query(books_model.User_preference)
        .filter(books_model.User_preference.user_id == user_id)
        .first()
    )
    if preference is None:
        raise HTTPException(status_code=404, detail="No preferences found for user")
    book = (
        db.query(books_model.Book)
        .filter(books_model.Book.genre == preference.preferences)
        .all()
    )
    if book is None:
        raise HTTPException(
            status_code=404, detail="No Books in the database match your preferences"
        )
    return book
