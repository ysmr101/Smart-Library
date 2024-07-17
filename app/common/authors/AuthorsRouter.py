from fastapi import APIRouter, Depends, HTTPException
from app.common.authors import AuthorsSchema, AuthorsCRUD
from sqlalchemy.orm import Session
from app.config.db import get_db


app = APIRouter()


# GET all authors
@app.get("/authors", response_model=list[AuthorsSchema.Author], tags=["author"])
def retrieve_authors(db: Session = Depends(get_db), skip: int = 0, limit: int = 100):
    authors = AuthorsCRUD.read_all_authors(db, skip=skip, limit=limit)
    return authors


# GET an author by ID
@app.get("/authors/{author_id}", response_model=AuthorsSchema.Author, tags=["author"])
async def read_author(author_id: int, db: Session = Depends(get_db)):
    db_author = AuthorsCRUD.read_author(db, author_id=author_id)
    # if db_author is None:
    #     raise HTTPException(status_code=404, detail="Author not found")
    return db_author


# POST a new author
@app.post("/authors/", response_model=AuthorsSchema.Author, tags=["author"])
def create_author(author: AuthorsSchema.AuthorAdd, db: Session = Depends(get_db)):
    return AuthorsCRUD.create_author(db, author=author)


# PUT an author by ID
@app.put("/authors/{author_id}", response_model=AuthorsSchema.Author, tags=["author"]) 
async def update_author(author_id: int, author: AuthorsSchema.AuthorAdd, db: Session = Depends(get_db)):
  return AuthorsCRUD.update_author(db, author, author_id)


# DELETE an author by ID
@app.delete("/authors/{author_id}", response_model=AuthorsSchema.Author, tags=["author"])
def delete_author(author_id: int, db: Session = Depends(get_db)):
    db_author = AuthorsCRUD.delete_author(db, author_id=author_id)
    # if db_author is None:
    #     raise HTTPException(status_code=404, detail="Author not found")
    return db_author
