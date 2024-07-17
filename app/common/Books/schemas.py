from pydantic import BaseModel

class Books(BaseModel):
    book_id: int
    title: str
    genre: str
    description: str
    Author_id: int

    
class BooksCreate(BaseModel):
    title: str
    genre: str
    description: str
    Author_id: int
