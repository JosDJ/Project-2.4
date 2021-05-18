from pydantic import BaseModel
from typing import Optional, List
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCredentials(BaseModel):
    email: str
    password: str

class User(BaseModel):
    email: str
    birthday: Optional[date]
    country: Optional[str]


class UserWithPassword(User):
    hashed_password: str

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