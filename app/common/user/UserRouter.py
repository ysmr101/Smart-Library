from fastapi import APIRouter, Depends, HTTPException

from app.common.user.UserSchema import UserCreate
from app.common.user import UserCRUD, UserModel
from app.common.config.database import get_db
from typing import Annotated
from app.common.utils import auth
from sqlalchemy.orm import Session
from app.common.Books import BooksSchema

app = APIRouter()


@app.post("/users/register", tags=["users"])
def create_user(user: UserCreate, db: UserCRUD.Session = Depends(get_db)):
    db_user = UserCRUD.get_user_by_username(db, user.user_name)
    if db_user:
        raise HTTPException(status_code=400, detail="Username is already registered")
    return UserCRUD.create_user(db, user)


@app.post("/users/login", tags=["users"])
async def login_for_access_token(form_data: Annotated[auth.OAuth2PasswordRequestForm, Depends()],
                                 db: UserCRUD.Session = Depends(get_db)) -> auth.Token:
    users = UserCRUD.get_users(db, 0, 100)
    print(form_data.username, form_data.password)
    print(users[0])
    user = auth.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=auth.status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = auth.timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return auth.Token(access_token=access_token, token_type="bearer")


@app.get("/users/me/", tags=["users"])
async def read_users_me(
        current_user: Annotated[UserModel.User, Depends(auth.get_current_user)],
):
    return current_user


@app.put("/users/me/{user_id}", tags=["users"])
async def update_users_me(user_id: str, user: UserCreate, db: UserCRUD.Session = Depends(get_db)):
    return UserCRUD.update_user(db, user, user_id)


@app.post("/users/me/{user_id}", tags=["users"])
async def add_user_preference(user_id: str, preference: BooksSchema.UserPreferencesCreate, db: Session = Depends(get_db)):

    return UserCRUD.add_preference(db, preference, user_id)