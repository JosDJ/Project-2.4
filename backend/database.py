from config import config

import models
from models import Base

import pydantic_schemas

from passlib.context import CryptContext
from typing import Optional, List

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(config["DATABASE_URI"])
Session = sessionmaker(bind=engine)

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)

def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def get_user(email: str) -> Optional[models.User]:
    s = Session()

    user = s.query(models.User).filter_by(email=email).first()

    s.close()

    return user


def validate_user(email: str, password: str) -> Optional[models.User]:
    if user := get_user(email):
        if verify_password(password, user.hashed_password):
            return user