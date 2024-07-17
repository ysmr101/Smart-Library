from sqlalchemy.orm import Session
from fastapi import HTTPException
import uuid
from app.common.utils import auth
from app.common.user import UserModel, UserSchema

model = UserModel
schema = UserSchema.UserCreate


def get_user_byId(db: Session, user_id: str):
    return db.query(model.User).filter(model.User.user_id == user_id).first()


def get_user_by_username(db: Session, user_name: str):
    return db.query(model.User).filter(model.User.username == user_name).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(model.User).offset(skip).limit(limit).all()


def update_user(db: Session, user: schema, user_id: str):

    db_user = get_user_byId(db, user_id)

    if db_user == None:
        raise HTTPException(status_code=400, detail="Bad Request")
    hashed_password = auth.get_password_hash(user.password)
    db_user.username = user.user_name
    db_user.password_hash = hashed_password

    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def create_user(db: Session, user: schema):
    uid = uuid.uuid4()
    stringified_uid = str(uid)
    hashed_password = auth.get_password_hash(user.password)

    db_user = model.User(user_id=stringified_uid,
                         username=user.user_name,
                         password_hash=hashed_password,
                         role="User"
                         )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
