from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from app.common.configs.database import Base
from sqlalchemy.orm import relationship


class Author(Base):
    __tablename__ = "authors"

    author_id = Column(Integer, primary_key=True)
    first_name = Column(String, unique=True, index=True)
    last_name = Column(String, unique=True, index=True)
    biography = Column(String, default=True)
