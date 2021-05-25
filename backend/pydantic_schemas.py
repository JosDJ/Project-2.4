from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class User(BaseModel):
    email: str = None
    birthday: str = None
    country: str = None

class RegistrationUser(User):
    password: str = None

class Artist(BaseModel):
    name: str = None

class Song(BaseModel):
    title: str = None
    artists: List[Artist] = []
    filepath: Optional[str] = None

class Genre(BaseModel):
    title: str = None

class Album(BaseModel):
    title: str = None
    artist: Artist = None
    release_date: date = None
    genre: Genre = None
    songs: List[Song] = []