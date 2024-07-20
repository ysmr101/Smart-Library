from fastapi import FastAPI
from app.common.user import UserRouter, UserModel

from app.common.authors import AuthorsRouter
from app.common.Books import BooksRouter
from app.common.config.database import engine, Base

Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(UserRouter.app)
app.include_router(AuthorsRouter.app)
app.include_router(BooksRouter.app)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/healthcheck")
def healthz():
    return True
