# from fastapi import Form
# from fastapi import APIRouter, Response, Depends
# from sqlalchemy.orm import Session
# from common.schema import schemas
# from typing import List, Union
# app = APIRouter()
# from . import BooksCRUD


# db2 = [{'id': 1, 'name': "test", 'author': "John Doe", 'desc': "philosophical dude"},
#        {'id': 2, 'name': "test2", 'author': "Jane Doe", 'desc': "thriller writer from 1801"},
#     ]
# db: List[Books] = [
#     Books(
#         id= 1,
#         name="test",
#         author="john doe",
#         desc="philosophical dude"
#     ),
#     Books(
#         id= 2,
#         name="test2",
#         author="jane doe",
#         desc="thriller writer from 1801"
#     )
# ]

# # GET /books: Retrieve a list of all books.
# @app.get("/books",tags=["books"]) 
# async def retrieve_books():
#   # Call a Function in services and return a list
#   return BooksCRUD.get_books()

# @app.get("/books/", response_model=list[schemas.Books])
# def retrieve_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     books = BooksCRUD.get_books(db, skip=skip, limit=limit)
#     return books

# GET /books/:id: Retrieve details of a specific book by its ID.
# @app.get("/books/{id}", tags=["books"]) 
# async def retrieve_book(id: int):
#   # Call Function in services and return details
#     for book in db2:
#        if book["id"] == id:
#           return book
#     return {"None Found"}

#POST /books: Create a new book record (Admin only).
# @app.post("/books",response_model = Books, tags=["books"]) 
# async def create_book(book: Books):
#   # Call a Function in services to add a new book
  
#   return BooksCRUD.create_book(book)

# PUT /books/:id: Update an existing book record by its ID (Admin only).
# @app.post("/books/id",tags=["books"]) 
# async def update_book():
#   # Call a Function in services to update a book

#   return test()