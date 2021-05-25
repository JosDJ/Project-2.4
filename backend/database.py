from models import *
from passlib.context import CryptContext
from typing import Optional, List

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


users = [
    {
        'email': 'd.p.reitsma@gmail.com',
        'hashed_password': get_password_hash('qwerty123')
    }
]


def get_user(email: str) -> Optional[User]:
    for u in users:
        if u["email"] == email:
            return User(**u)


def validate_user(email: str, password: str) -> Optional[User]:
    if user := get_user(email):
        if verify_password(password, user.hashed_password):
            return user
