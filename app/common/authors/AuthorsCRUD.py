from sqlalchemy.orm import Session

from . import AuthorsSchema, AuthorsModel


# GET all authors
def read_all_authors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(AuthorsModel.Author).offset(skip).limit(limit).all()


# GET an author by ID
def read_author(db: Session, author_id: int):
    return db.query(AuthorsModel.Author).filter(AuthorsModel.Author.author_id == author_id).first()


# POST a new author
def create_author(db: Session, author: AuthorsSchema.Author):
    db.add(author)
    db.commit()
    db.refresh(author)
    return author
