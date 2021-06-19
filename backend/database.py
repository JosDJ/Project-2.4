import datetime

from fastapi.exceptions import HTTPException
from sqlalchemy.inspection import inspect
from config import config

import models
from models import Base

from passlib.context import CryptContext
from typing import Optional, List

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

engine = create_engine(config["DATABASE_URI"])
session = scoped_session(sessionmaker(bind=engine))

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')


def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def recreate_database():
    Base.metadata.drop_all(engine)
    Base.metadata.create_all(engine)


def create_dummy_data():
    country = models.Country(name='The Netherlands')

    user = models.User(
        email='test@test.com',
        hashed_password=get_password_hash('qwerty123'),
        birthday=datetime.date(1998, 5, 4),
        country=country)

    session.add(user)

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

    session.add(album)

    song_with_no_album = models.Song(title='No Album!@#!@#', artists=[artist])

    session.add(song_with_no_album)

    session.commit()


def recreate_and_create_dummy_data():
    recreate_database()
    create_dummy_data()


def get_user_by_id(id: int) -> Optional[models.User]:
    user = session.query(models.User).filter_by(id=id).first()

    return user


def get_user_by_email(email: str) -> Optional[models.User]:
    user = session.query(models.User).filter_by(email=email).first()

    return user


def validate_user(email: str, password: str) -> Optional[models.User]:
    if user := get_user_by_email(email):
        if verify_password(password, user.hashed_password):
            return user

def create_song(song: models.Song) -> Optional[models.Song]:
    session.add(song)

    session.commit()

    return song

def get_song_by_id(id: int) -> Optional[models.Song]:
    song = session.query(models.Song).filter_by(id=id).first()

    return song

def update_song_by_id(id: int, song: models.Song) -> Optional[models.Song]:
    song_to_update = get_song_by_id(id)

    if song_to_update:
        song_to_update.title = song.title

    session.commit()

    return song_to_update

def delete_song_by_id(id: int):
    session.query(models.Song).filter_by(id=id).delete()

    session.commit()


def create_album(album: models.Album) -> Optional[models.Album]:
    session.add(album)

    session.commit()

    return album


def get_album_by_id(id: int) -> Optional[models.Album]:
    album = session.query(models.Album).filter_by(id=id).first()

    return album


def update_album_by_id(id: int, album: models.Album):
    album_to_update = get_album_by_id(id)

    if album_to_update:
        album_to_update.title = album.title
        album_to_update.artist = album.artist
        album_to_update.genre = album.genre
        album_to_update.songs = album.songs
        album_to_update.release_date = album.release_date
        album_to_update.album_cover = album.album_cover

    session.commit()

    return album_to_update


def delete_album_by_id(id: int):
    session.query(models.Album).filter_by(id=id).delete()

    session.commit()


def create_genre(genre: models.Genre):
    session.add(genre)

    session.commit()

    return genre


def get_genre_by_id(id: int) -> Optional[models.Genre]:
    genre = session.query(models.Genre).filter_by(id=id).first()

    return genre


def update_genre_by_id(id: int, genre: models.Genre) -> Optional[models.Genre]:
    genre_to_update = get_genre_by_id(id)

    if genre_to_update:
        genre_to_update.title = genre.title

    session.commit()

    return genre_to_update


def delete_genre_by_id(id: int):
    session.query(models.Genre).filter_by(id=id).delete()

    session.commit()


def create_artist(artist: models.Artist):
    session.add(artist)

    session.commit()

    return artist


def get_artist_by_id(id: int) -> Optional[models.Artist]:
    artist = session.query(models.Artist).filter_by(id=id).first()

    return artist


def update_artist_by_id(id: int, artist: models.Artist) -> Optional[models.Artist]:
    artist_to_update = get_artist_by_id(id)

    if artist_to_update:
        artist_to_update.name = artist.name

    session.commit()

    return artist_to_update


def delete_artist_by_id(id: int):
    session.query(models.Artist).filter_by(id=id).delete()
    session.commit()


def create_file(file: models.File) -> Optional[models.File]:
    session.add(file)

    session.commit()

    return file


def get_file_by_id(id: int) -> Optional[models.File]:
    file = session.query(models.File).filter_by(id=id).first()

    return file


def delete_file_by_id(id: int):
    session.query(models.File).filter_by(id=id).delete()
    session.commit()


def create_playlist(playlist: models.Playlist) -> Optional[models.Playlist]:
    session.add(playlist)

    session.commit()

    return playlist


def get_playlist_by_id(id: int) -> Optional[models.Playlist]:
    playlist = session.query(models.Playlist).filter_by(id=id).first()

    return playlist


def update_playlist_by_id(id: int, playlist: models.Playlist) -> Optional[models.Playlist]:
    playlist_to_update = get_playlist_by_id(id)

    if playlist_to_update:
        playlist_to_update.title = playlist.title
        playlist_to_update.songs = playlist.songs

    session.commit()

    return playlist_to_update


def delete_playlist_by_id(id: int):
    session.query(models.Playlist).filter_by(id=id).delete()
    session.commit()