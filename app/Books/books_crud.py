from sqlalchemy.orm import Session
from app.Books import books_model, books_schema
from sqlalchemy.orm import Session
from app.authors import authors_model
from app.Books import books_services


def get_books(db: Session, skip: int = 0, limit: int = 100):
    list_of_books = db.query(books_model.Book).offset(skip).limit(limit).all()
    books_services.check_books(repr(list_of_books))
    return list_of_books


def create_book(db: Session, book: books_schema.Books_create):
    author = (
        db.query(authors_model.Author)
        .filter(authors_model.Author.author_id == book.author_id)
        .first()
    )
    books_services.check_author(author)
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
    books_services.check_single_book(book_to_get)
    return book_to_get


def update_book(db: Session, book: books_schema.Books_create, id):
    book_to_update = (
        db.query(books_model.Book).filter(books_model.Book.book_id == id).first()
    )
    books_services.check_single_book(book_to_update)
    author = (
        db.query(authors_model.Author)
        .filter(authors_model.Author.author_id == book.author_id)
        .first()
    )
    books_services.check_author(author)
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
    books_services.check_single_book(book_to_delete)
    db.delete(book_to_delete)
    db.commit()
    return book_to_delete


def recommend_book(db: Session, user_id):
    preference = (
        db.query(books_model.User_preference)
        .filter(books_model.User_preference.user_id == user_id)
        .first()
    )
    books_services.check_preference(preference)
    books = (
        db.query(books_model.Book)
        .filter(books_model.Book.genre == preference.preferences)
        .all()
    )
    books_services.check_books(repr(books))
    return books
