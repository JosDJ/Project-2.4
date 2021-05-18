from pydantic import BaseModel
from typing import Optional, List
from datetime import date


class BaseUser(BaseModel):
    email: str


class PasswordUser(BaseUser):
    password: str


class PublicUser(BaseUser):
    birthday: date
    country: str


class PrivateUser(PublicUser, PasswordUser):
    pass


class Artist(BaseModel):
    name: str


class Song(BaseModel):
    title: str
    artists: List[Artist]

class Genre(BaseModel):
    title: str


class Album(BaseModel):
    title: str
    artist: Artist
    genre: Genre
    release_date: date
    songs: List[Song]