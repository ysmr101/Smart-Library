from fastapi import FastAPI
from app.user import user_router
from app.authors import authors_router
from app.Books import books_router
from app.common.config.database import engine, Base


Base.metadata.create_all(bind=engine)
app = FastAPI()


app.include_router(user_router.app)
app.include_router(authors_router.app)
app.include_router(books_router.app)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/healthcheck")
def healthz():
    return True
