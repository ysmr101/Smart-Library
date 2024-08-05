from sqlalchemy.orm import Session
from app.Books import books_model, books_schema
from sqlalchemy.orm import Session
from app.authors import authors_model
from app.Books import books_services
from app.chromavdb import books_collection
from typing import Optional
from sqlalchemy import asc, desc



def get_books(db: Session, start: int = 0, limit: int = 100, sort: Optional[str] = None,  genre: Optional[str] = None):
    start = abs(start)
    limit = min(max(limit, 1), 10000)
    sort_map = {
        "top_rated": [desc(books_model.Book.average_rating)],
        "least_rated": [asc(books_model.Book.average_rating)],
        "most_recent": [desc(books_model.Book.published_year)],
        "earliest_year": [asc(books_model.Book.published_year)],
        "most_trending": [desc(books_model.Book.average_rating), desc(books_model.Book.published_year)],
        "book_id": [asc(books_model.Book.book_id)]
    }

    if (genre != '' and genre is not None):
        list_of_books = db.query(books_model.Book).filter(books_model.Book.genre == genre).order_by(*sort_map['top_rated']).limit(limit)
    elif (sort != '' and sort is not None):
        list_of_books = db.query(books_model.Book).order_by(*sort_map[sort]).limit(limit)
    else:
        list_of_books = db.query(books_model.Book).order_by(*sort_map["book_id"]).offset(start).limit(limit).all()
    # books_services.check_books(repr(list_of_books))
    return list_of_books


def create_book(db: Session, book: books_schema.Books_create):
    author = (
        db.query(authors_model.Author)
        .filter(authors_model.Author.name == book.author)
        .first()
    )
    books_services.check_author(author)
    db_book = books_model.Book(
        author=book.author,
        title=book.title,
        genre=book.genre,
        published_year=book.published_year,
        description=book.description,
        average_rating=book.average_rating,
        thumbnail=book.thumbnail
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
        .filter(authors_model.Author.name == book.author)
        .first()
    )
    books_services.check_author(author)
    book_to_update.title = book.title
    book_to_update.author = book.author
    book_to_update.genre = book.genre
    book_to_update.published_year = book.published_year
    book_to_update.description = book.description
    book_to_update.average_rating = book.average_rating
    book_to_update.thumbnail = book.thumbnail
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
    # books = (
    #     db.query(books_model.Book)
    #     .filter(books_model.Book.genre == preference.preferences)
    #     .all()
    # )
    # books_services.check_books(repr(books))
    return preference.preferences
