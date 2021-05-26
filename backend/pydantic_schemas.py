from pydantic import BaseModel
from typing import List, Optional
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class Country(BaseModel):
    name: str = None

    class Config:
        orm_mode = True

class User(BaseModel):
    email: str = None
    birthday: date = None
    country: Country = None

    class Config:
        orm_mode = True

class RegistrationUser(User):
    password: str = None

class Artist(BaseModel):
    name: str = None

    class Config:
        orm_mode = True

class Song(BaseModel):
    id: int
    title: str = None
    artists: List[Artist] = []
    filepath: str = None

    class Config:
        orm_mode = True

class Genre(BaseModel):
    title: str = None

    class Config:
        orm_mode = True

class Album(BaseModel):
    title: str = None
    artist: Artist = None
    release_date: date = None
    genre: Genre = None
    songs: List[Song] = []

    class Config:
        orm_mode = True