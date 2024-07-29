from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = (
    "postgresql://postgres:48204820Qp$@localhost:5432/smart_library_database"
)


engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# def load_books(file_path):
#     session = SessionLocal()
#     with open(file_path, mode='r') as file:
#         reader = csv.DictReader(file)
#         for row in reader:
#             book = books_model.Book(
#                 title=row['title'],
#                 genre = row['categories'],
#                 description = row['description'],
#                 author_id=1,
#             )
#             session.add(book)
#         session.commit()
#     session.close()

# if __name__ == "__main__":
#     file_path = r'/Users/maltuaijri001/Desktop/cleaned_books.csv'
#     load_books(file_path)
