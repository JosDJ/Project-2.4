from pydantic import BaseModel, EmailStr
from typing import ForwardRef, List, Optional
from datetime import date

class Token(BaseModel):
    access_token: str
    token_type: str

class Country(BaseModel):
    name: str = None

    class Config:
        orm_mode = True

class User(BaseModel):
    email: EmailStr
    birthday: date
    country: Country

    class Config:
        orm_mode = True

class RegistrationUser(User):
    password: str

class UpdateUser(User):
    password: str

class Artist(BaseModel):
    id: int
    name: str = None

    class Config:
        orm_mode = True

class ArtistIn(BaseModel):
    name: str

class Song(BaseModel):
    id: int
    title: str = None
    artists: List[Artist] = []

    class Config:
        orm_mode = True

class SongIn(BaseModel):
    id: int
    title: str
    artist_ids: List[int]

class FileUploaded(BaseModel):
    id: int
    filetype: str
    filepath: str

    original_filename: str

    class Config:
        orm_mode = True

class Genre(BaseModel):
    id: str
    title: str = None

    class Config:
        orm_mode = True

class GenreIn(BaseModel):
    title: str

class AlbumCover(BaseModel):
    filepath: str

    class Config:
        orm_mode = True

class Album(BaseModel):
    id: int
    title: str = None
    artist: Artist = None
    release_date: date = None
    genre: Genre = None
    songs: List[Song] = []
    album_cover: AlbumCover = None

    class Config:
        orm_mode = True

class AlbumIn(BaseModel):
    title: str
    artist_id: int
    release_date: date
    genre_id: int
    song_ids: List[int]
    album_cover_id: int

class Playlist(BaseModel):
    id: int
    title: str
    songs: List[Song] = []

    class Config:
        orm_mode = True

class PlaylistIn(BaseModel):
    title: str
    song_ids: List[int] = []