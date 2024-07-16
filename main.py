from fastapi import FastAPI, Query, Body
from app.common.user import UserController
from app.common.user.UserSchema import User
from app.common.utils import auth
from pydantic import BaseModel, Field
from typing import Annotated
app = FastAPI()

app.include_router(UserController.app)
app.include_router(auth.app)


@app.get("/")
async def root():
    return {"message": "Hello Wasdasdasdasdasdorld"}
temporary_storage = None
@app.post("/users/registeration")
async def register(user: User):
    user_dict = user.dict()
    print(user_dict.get("fullName", "NO"))
    return user


class Item(BaseModel):
    name: str
    description: str
    price: float
    tax: float


@app.put("/items/{item_id}")
async def update_item(item_id: int, item: Annotated[
        Item,
        Body(
            openapi_examples={
                "normal": {
                    "summary": "A normal example",
                    "description": "A **normal** item works correctly.",
                    "value": {
                        "name": "Foo",
                        "description": "A very nice Item",
                        "price": 35.4,
                        "tax": 3.2,
                    },
                },
                "converted": {
                    "summary": "An example with converted data",
                    "description": "FastAPI can convert price `strings` to actual `numbers` automatically",
                    "value": {
                        "name": "Bar",
                        "price": "35.4",
                    },
                },
                "invalid": {
                    "summary": "Invalid data is rejected with an error",
                    "value": {
                        "name": "Baz",
                        "price": "thirty five point four",
                    },
                },
            },
        ),
    ],
):
    results = {"item_id": item_id, "item": item}
    return results
@app.post("/store-name1")
async def store_name(name: str):
    global temporary_storage
    temporary_storage = name
    return {"message": f"Stored name: {name}"}


@app.post("/store-name2/{name}")
async def store_name(name: str):
    global temporary_storage
    temporary_storage = name
    return {"message": f"Stored name is: {name}"}

@app.get("/items/{item_id}")
async def read_user_item(item_id: str, needy: str):
    item = {"item_id": item_id, "needy": needy}
    return item

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.get("/get-name")
async def say_hello():
    global temporary_storage
    return {"message": f"Hello {temporary_storage}"}
