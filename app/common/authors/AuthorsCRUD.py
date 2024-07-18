from http.client import HTTPException
from sqlalchemy.orm import Session

from . import AuthorsSchema, AuthorsModel


# GET all authors
def read_all_authors(db: Session, skip: int = 0, limit: int = 100):
    return db.query(AuthorsModel.Author).offset(skip).limit(limit).all()


# GET an author by ID
def read_author(db: Session, author_id: int):
    db_author = db.query(AuthorsModel.Author).filter(AuthorsModel.Author.author_id == author_id).first()
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    return db_author


# POST a new author
def create_author(db: Session, author: AuthorsSchema.AuthorAdd):
    db_author = AuthorsModel.Author(first_name=author.first_name,last_name=author.last_name, biography=author.biography)
    db.add(db_author)
    db.commit()
    db.refresh(db_author)
    return db_author


# PUT an author by ID
def update_author(db: Session, author: AuthorsSchema.AuthorAdd, id):
    author_to_update = db.query(AuthorsModel.Author).filter(AuthorsModel.Author.author_id == id).first()
    if author_to_update is None:
        raise HTTPException(status_code=404, detail="Author not found")
    author_to_update.first_name = author.first_name
    author_to_update.last_name = author.last_name
    author_to_update.biography = author.biography
    db.commit()
    db.refresh(author_to_update)
    return author_to_update


# DELETE an author by ID
def delete_author(db: Session, author_id: int):
    db_author = db.query(AuthorsModel.Author).filter(AuthorsModel.Author.author_id == author_id).first()
    if db_author is None:
        raise HTTPException(status_code=404, detail="Author not found")
    db.delete(db_author)
    db.commit()
    return db_author


# # GET all authors
# def read_all_authors(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(AuthorsModel.Author).offset(skip).limit(limit).all()
#     # db_author = db.query(AuthorsModel.Author).offset(skip).limit(limit).all()
#     # if db_author is None:
#     #     raise HTTPException(status_code=404, detail="No authors found")
#     # return db_author
