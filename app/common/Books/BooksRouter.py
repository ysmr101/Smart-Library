from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.common.config.database import get_db
from app.common.Books import BooksCRUD, BooksSchema
from typing import Annotated
from app.common.utils import auth
from typing import Union

app = APIRouter()


# GET /books: Retrieve a list of all books.
@app.get("/books/", response_model=list[BooksSchema.Books], tags=["books"])
def retrieve_all_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return BooksCRUD.get_books(db, skip=skip, limit=limit)


# POST /books: Create a new book record (Admin only).
@app.post("/books/", tags=["books"])
async def create_book(
    _: Annotated[bool, Depends(auth.RoleChecker(allowed_roles=["Admin"]))],
    book: BooksSchema.BooksCreate,
    db: Session = Depends(get_db),
):
    return BooksCRUD.create_book(db, book)


# GET /books/:id: Retrieve details of a specific book by its ID.
@app.get("/books/{id}", response_model=BooksSchema.Books, tags=["books"])
async def retrieve_single_book(id: int, db: Session = Depends(get_db)):
    return BooksCRUD.get_single_book(db, id)


# PUT /books/:id: Update an existing book record by its ID (Admin only).
@app.put("/books/{id}", response_model=BooksSchema.BooksCreate, tags=["books"])
async def update_book(
    _: Annotated[bool, Depends(auth.RoleChecker(allowed_roles=["Admin"]))],
    id: int,
    book: BooksSchema.BooksCreate,
    db: Session = Depends(get_db),
):
    return BooksCRUD.update_book(db, book, id)


# DELETE /books/:id: Delete a book record by its ID (Admin only).
@app.delete("/books/{id}", response_model=BooksSchema.BooksCreate, tags=["books"])
async def delete_book(
    _: Annotated[bool, Depends(auth.RoleChecker(allowed_roles=["Admin"]))],
    id: int,
    db: Session = Depends(get_db),
):
    return BooksCRUD.delete_book(db, id)


# GET /recommendations: Retrieve book recommendations for the authenticated user based on their preferences.
@app.get(
    "/recommnedations/{user_id}",
    response_model=list[BooksSchema.Books],
    tags=["recommendations"],
)
async def recommend_book(user_id: str, db: Session = Depends(get_db)):
    return BooksCRUD.recommend_book(db, user_id)
