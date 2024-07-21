from pydantic import BaseModel


class Author(BaseModel):
    author_id: int
    first_name: str
    last_name: str
    biography: str


class Author_add(BaseModel):
    first_name: str
    last_name: str
    biography: str
