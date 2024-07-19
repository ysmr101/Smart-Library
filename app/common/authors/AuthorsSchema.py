from pydantic import BaseModel


class Author(BaseModel):
    author_id: int
    first_name: str
    last_name: str
    biography: str


class AuthorAdd(BaseModel):
    first_name: str
    last_name: str
    biography: str
