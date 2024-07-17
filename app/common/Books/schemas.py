from pydantic import BaseModel

class Books(BaseModel):
    title: str
    genre: str
    description: str
    Author_id: int
    
# class BookBase(BaseModel):
#     title: str
#     description: str | None = None


# class BookCreate(BookBase):
#     pass


# class Book(BookBase):
#     id: int
#     author_id: int

#     class Config:
#         orm_mode = True


# class AuthorBase(BaseModel):
#     first_name: str
#     last_name = str


# class AuthorCreate(AuthorBase):
#     pass

# class Author(AuthorBase):
#     id: int
#     biography: str
#     books: list[Book] = []

#     class Config:
#         orm_mode = True