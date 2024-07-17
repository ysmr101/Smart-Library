# from fastapi import APIRouter
# from app.common.authors import AuthorsServices
# from app.common.authors import AuthorsModel
# from app.common.authors import AuthorsSchema
# from sqlalchemy.orm import Session

# from app.common.authors.AuthorsServices import db


# app = APIRouter()
# #app.include_router(AuthorsServices.app)

# # retrieve a list of all authors
# @app.get("/authors",tags=["authors"]) 
# async def retrieve_authors(db: Session, skip: int = 0, limit: int = 100):
#   #return conn.execute(Author.select()).fetchall()
#   return db.query(AuthorsModel.Author).offset(skip).limit(limit).all()


# retrieve details of a specific author by their ID
# @app.get("/authors/{author_id}",tags=["authors"]) 
# async def retrieve_specific_author(author_id: int):
#   return conn.execute(Author.select().where(Author.c.id == author_id).fetchall())


# # add a new author (Admin only) -> add dependency relating to the token
# @app.post("/authors",tags=["authors"],response_model= Author) 
# async def add_author(author: Author):
#   db.append(author)
#   return author


# # update an existing author record by thier ID (Admin only) -> add dependency relating to the token
# @app.put("/authors/{author_id}",tags=["authors"]) 
# async def update_author():
#   return {f""}
