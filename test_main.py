from fastapi import FastAPI
from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello it's me Goku"}

def test_read_books():
    response = client.get("/books/")
    assert response.status_code == 200
    
def test_create_book():
    response = client.post(
        "/books/",
        headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbW1lZCIsImV4cCI6MTcyMTI5NjUwOX0.gvlITbNlIuv-Pu0ol3UBCvZTDthhsmsqjx6pdXsrMKA"},
        json={"title": "Foo Bar", "genre": "History", "description": "The Foo Barters", "author_id": 1},
    )
    assert response.status_code == 200
    assert response.json() == {"title": "Foo Bar", "genre": "History", "description": "The Foo Barters", "author_id": 1, "book_id": response.json()["book_id"]}

def test_read_single_book():
    response = client.get("/books/1")
    assert response.status_code == 200
    assert response.json() == {
  "book_id": 1,
  "title": "Pride and Prejudice",
  "genre": "Fiction",
  "description": "The novel follows the character development of Elizabeth Bennet, the dynamic protagonist, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
  "author_id": 1
}
    
def test_update_book():
    response = client.put("/books/10",
        headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbW1lZCIsImV4cCI6MTcyMTI5NjUwOX0.gvlITbNlIuv-Pu0ol3UBCvZTDthhsmsqjx6pdXsrMKA"},
        json={"title": "Fee B", "genre": "History", "description": "The Fee E", "author_id": 1},
    )
    assert response.status_code == 200
    assert response.json() == {"title": "Fee B", "genre": "History", "description": "The Fee E", "author_id": 1}

def test_delete_book():
    response = client.delete("/books/13",
        headers={"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJtb2hhbW1lZCIsImV4cCI6MTcyMTI5NjUwOX0.gvlITbNlIuv-Pu0ol3UBCvZTDthhsmsqjx6pdXsrMKA"},
    )
    assert response.status_code == 200

def test_recommend_book():
    response = client.get("/recommnedations/1")
    assert response.status_code == 200
    assert response.json() == [
  {
    "book_id": 1,
    "title": "Pride and Prejudice",
    "genre": "Fiction",
    "description": "The novel follows the character development of Elizabeth Bennet, the dynamic protagonist, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    "author_id": 1
  },
  {
    "book_id": 3,
    "title": "Lord of the rings",
    "genre": "Fiction",
    "description": "A book about rings and lords idk",
    "author_id": 1
  }
    ]