# from app.common.database import Base
# # from sqlalchemy import Column, Integer, String, DateTime,Boolean
#
# # class User(Base):
# #     __tablename__ = 'users'
# #     id = Colum
#
# from sqlalchemy import Column, Integer, String, DateTime,Boolean
# from app.common.database import db
# import datetime
# class User(db):
#     __tablename__ = 'users'
#     id = Column(Integer, primary_key=True)
#     username = Column(String(50),  nullable=False)
#     email = Column(String(100), unique=True, nullable=False)
#     password = Column(String(100), nullable=False)
#
# class TokenTable(db):
#     __tablename__ = "token"
#     user_id = Column(Integer)
#     access_toke = Column(String(450), primary_key=True)
#     refresh_toke = Column(String(450),nullable=False)
#     status = Column(Boolean)
#     created_date = Column(DateTime, default=datetime.datetime.now)
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
#from app.common.database import db
# from .database import Base


# class User(db):
#     __tablename__ = "users"
#
#     uuid = Column(Integer, primary_key=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)
#     is_active = Column(Boolean, default=True)
#     role = Column(String, default="user")
#
#     items = relationship("Item", back_populates="owner")
