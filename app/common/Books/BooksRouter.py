from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from . import schemas
from app.common.database import get_db
from . import BooksCRUD

app = APIRouter()

# GET /books: Retrieve a list of all books.
@app.get("/books/", response_model=list[schemas.Books], tags=["books"])
def retrieve_all_books(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return BooksCRUD.get_books(db, skip=skip, limit=limit)

# POST /books: Create a new book record (Admin only).
@app.post("/books", tags=["books"]) 
async def create_book(book: schemas.BooksCreate, db: Session = Depends(get_db)):
  return BooksCRUD.create_book(db, book)

# GET /books/:id: Retrieve details of a specific book by its ID.
@app.get("/books/{id}", response_model=schemas.Books, tags=["books"])
async def retrieve_single_book(id: int, db: Session = Depends(get_db)):
    return BooksCRUD.get_single_book(db, id)

# PUT /books/:id: Update an existing book record by its ID (Admin only).
@app.put("/books/{id}", response_model=schemas.BooksCreate, tags=["books"]) 
async def update_book(id: int, book: schemas.BooksCreate, db: Session = Depends(get_db)):
  return BooksCRUD.update_book(db, book, id)

# DELETE /books/:id: Delete a book record by its ID (Admin only).
@app.delete("/books/{id}", response_model=schemas.BooksCreate, tags=["books"])
async def delete_book(id: int , db: Session = Depends(get_db)):
   return BooksCRUD.delete_book(db, id)
