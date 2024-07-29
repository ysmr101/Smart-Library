import pandas as pd
from app.authors import authors_model
from app.Books import books_model
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.common.config.database import SessionLocal

SQLALCHEMY_DATABASE_URL = (
    "postgresql://postgres:48204820Qp$@localhost:5432/smart_library_database"
)
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)



def add_authors():
    df = pd.read_csv('/Users/maltuaijri001/Desktop/new_books_cleaned.csv')
    columns = ['title', 'categories', 'authors', 'description']
    df.dropna(subset=columns, inplace=True)
    
    db = SessionLocal()
    for row in df['authors']:
        x = row.split(";")
        for author in x:
            check = db.query(authors_model.Author).filter_by(name=author).first()
            if check is None:
                db_author = authors_model.Author(name=author,
                                                biography= '')
                db.add(db_author)
                db.commit()
                db.refresh(db_author)
                print(f"Added author: {author}")
            else:
                print(f"Author already exists: {author}")

# add_authors()

def add_books():
    df = pd.read_csv('/Users/maltuaijri001/Desktop/new_books_cleaned.csv')
    columns = ['title', 'categories', 'authors', 'description']
    df.dropna(subset=columns, inplace=True)

    db = SessionLocal()
    for index, row in df.iterrows():
        book_title = row['title']
        genre = row['categories']
        description = row['description']
        thumbnail = row['thumbnail']
        year = row['published_year']
        rating = row['average_rating']
        pages = row['num_pages']
        ratings = row['ratings_count']
        author = row['authors'].strip(';')
        check_author = db.query(authors_model.Author).filter_by(name=author).first()
        if check_author:
            author_id = check_author.author_id
            check = db.query(books_model.Book).filter_by(title=book_title).first()
            if check is None:
                db_book = books_model.Book(title=book_title,
                                                genre=genre,
                                                description=description,
                                                thumbnail = thumbnail,
                                                published_year = year,
                                                average_rating = rating,
                                                num_pages = pages,
                                                ratings_count = ratings,
                                                author_id=author_id,
                                                )
                db.add(db_book)
                db.commit()
                db.refresh(db_book)
                print(f"Added book: {book_title}")
            else:
                print(f"book already exists: {book_title}")


add_books()