import datetime

from fastapi.exceptions import HTTPException
from sqlalchemy.inspection import inspect
from config import config

import models
from models import Album, Artist, Base

import pydantic_schemas

from passlib.context import CryptContext
from typing import Optional, List

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

engine = create_engine(config["DATABASE_URI"])
Session = sessionmaker(bind=engine)

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def create_dummy_data():
    s = Session()

    country = models.Country(name='The Netherlands')

    user = models.User(
        email='test@test.com',
        hashed_password=get_password_hash('qwerty123'),
        birthday=datetime.date(1998, 5, 4),
        country=country)

    s.add(user)

    artist = models.Artist(name='Metallica')

    genre = models.Genre(title='Metal')

    songs = [
        models.Song(title='Enter Sandman', artists=[artist]),
        models.Song(title='Sad but True', artists=[artist]),
        models.Song(title='Holier Than Thou', artists=[artist]),
        models.Song(title='The Unforgiven', artists=[artist]),
        models.Song(title='Wherever I May Roam', artists=[artist]),
        models.Song(title='Don\'t Tread on Me', artists=[artist]),
        models.Song(title='Through the Never', artists=[artist]),
        models.Song(title='Nothing Else Matters', artists=[artist]),
        models.Song(title='Of Wolf and Man', artists=[artist]),
        models.Song(title='The God That Failed', artists=[artist]),
        models.Song(title='My Friend of Misery', artists=[artist]),
        models.Song(title='The Struggle Within', artists=[artist]),
    ]

    album = models.Album(title='Metallica', artist=artist,
                         songs=songs, release_date=datetime.date(1991, 8, 12), genre=genre)

    s.add(album)

    s.commit()

    s.close()


def get_user_by_id(id: int) -> Optional[models.User]:
    s = Session()

    user = s.query(models.User).filter_by(id=id).first()

    return user


def get_user_by_email(email: str) -> Optional[models.User]:
    s = Session()

    user = s.query(models.User).filter_by(email=email).first()

    return user


def validate_user(email: str, password: str) -> Optional[models.User]:
    if user := get_user_by_email(email):
        if verify_password(password, user.hashed_password):
            return user


def get_song_by_id(id: int) -> Optional[models.Song]:
    s = Session()

    song = s.query(models.Song).filter_by(id=id).first()

    return song

def get_album_by_id(id: int) -> Optional[models.Album]:
    s = Session()

    album = s.query(models.Album).filter_by(id=id).first()

    return album

def create_album(album: models.Album) -> Optional[models.Album]:
    s = Session()

    s.add(album)
    s.commit()
    
    return album


def get_genre_by_id(id: int) -> Optional[models.Genre]:
    s = Session()

    genre = s.query(models.Genre).filter_by(id=id).first()

    return genre


def get_artist_by_id(id: int) -> Optional[models.Artist]:
    s = Session()

    artist = s.query(models.Artist).filter_by(id=id).first()

    return artist