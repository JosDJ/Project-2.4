import datetime
from typing import Optional
from fastapi import FastAPI
from models import BaseUser, PasswordUser, PrivateUser, PublicUser, Song, Artist, Album, Genre

app = FastAPI()


@app.get('/users/{user_id}', response_model=PublicUser)
def get_user_by_id(user_id: int) -> PublicUser:
    user = PublicUser(email='d.p.reitsma@gmail.com',
                birthday=datetime.date(1998, 4, 5), country='The Netherlands')

    return user

@app.post('/users/register', response_model=PublicUser)
def register(user: PrivateUser) -> PublicUser:
    res = PublicUser(email=user.email, birthday=user.birthday, country=user.country)

    return res

@app.post('/users/login', response_model=PublicUser)
def login(user: PasswordUser) -> PublicUser:
    return user

@app.get('/songs/{song_id}', response_model=Song)
def get_song_by_id(song_id: int) -> Song:
    artist = Artist(name='Metallica')

    song = Song(title='Nothing Else Matters', artists=[artist])

    return song

@app.get('/albums/{album_id}', response_model=Album)
def get_album_by_id(album_id: int) -> Album:
    artist = Artist(name='Metallica')

    songs = [
        Song(title='Nothing Else Matters', artists=[artist]),
        Song(title='Sad But True', artists=[artist]),
    ]

    album = Album(title='Metallica', artist= artist, genre=Genre(title='Metal'), songs=songs, release_date=datetime.date(1991, 8, 12))

    return album