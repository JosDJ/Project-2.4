from datetime import timedelta
import datetime
from os import stat
from typing import List, Optional
import pathlib
import uuid
from PIL import Image

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from jose.constants import ALGORITHMS
from sqlalchemy.sql.coercions import expect
from sqlalchemy.sql.expression import update

import pydantic_schemas
import models
import database

# openssl rand -hex 32
SECRET_KEY = 'a25570ca1b7c0a5ae1e0d2d0a542746e0a78ef042bd08de3644a556eafc45ea6'
ALGORITHM = ALGORITHMS.HS256
ACCESS_TOKEN_EXPIRES_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/login')

# create music directory if it doesn't exist already
MUSIC_DIRECTORY = pathlib.Path(__file__).parent / 'static_files' / 'music'
MUSIC_DIRECTORY.mkdir(exist_ok=True, parents=True)

IMAGES_DIRECTORY = pathlib.Path(__file__).parent / 'static_files' / 'images'
IMAGES_DIRECTORY.mkdir(exist_ok=True, parents=True)

app = FastAPI()


@app.post('/login', response_model=pydantic_schemas.Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()) -> pydantic_schemas.Token:

    user = database.validate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )

    data = {
        "email": user.email
    }

    access_token = jwt.encode(data, SECRET_KEY, access_token=ALGORITHM)

    return pydantic_schemas.Token(access_token=access_token, token_type="bearer")


@app.post('/register', response_model=pydantic_schemas.Token)
async def register(user_data: pydantic_schemas.RegistrationUser):
    user = database.get_user(user_data.email)  # check if user exists already

    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='An account with this email address already exists',
            headers={"WWW-Authenticate": "Bearer"}
        )


async def get_current_user(token: str = Depends(oauth2_scheme)) -> pydantic_schemas.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if email := payload.get("email"):
            return database.get_user(email)
        else:
            raise credentials_exception
    except JWTError:
        raise credentials_exception


@app.get('/users/{user_id}', response_model=pydantic_schemas.User)
async def get_user_by_id(user_id: int) -> pydantic_schemas.User:
    user = database.get_user_by_id(user_id)

    return pydantic_schemas.User.from_orm(user)


# @app.post('/users/register', response_model=DbUser)
# async def register(credentials: UserCredentials) -> UserWithPassword:
#     hashed_password = get_password_hash(credentials.password)

#     user = UserWithPassword(email=credentials.email,
#                             hashed_password=hashed_password)

#     return user

@app.get('/songs/{song_id}', response_model=pydantic_schemas.Song)
async def get_song_by_id(song_id: int) -> pydantic_schemas.Song:
    song = database.get_song_by_id(song_id)

    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Song not found')

    return song


async def save_song_to_disk(file: UploadFile = File(None)) -> pydantic_schemas.Song:
    filename = f'{uuid.uuid4().hex}.mp3'

    filepath = pathlib.Path(f'{MUSIC_DIRECTORY}/{filename}')

    with open(filepath, 'wb+') as f:
        f.write(file.file.read())

    song = pydantic_schemas.Song(title='test', artists=[
                                 pydantic_schemas.Artist(name='TestArtist')])

    return song


@app.post('/songs/upload', status_code=status.HTTP_201_CREATED, response_model=pydantic_schemas.Song)
async def upload_song_file(file: UploadFile = File(None)):
    if file.content_type != 'audio/mpeg':
        raise HTTPException(
            status_code=415, detail="Only files with 'Content-Type: audio/mpeg' are allowed")

    song = await save_song_to_disk(file)

    return song


@app.get('/albums/{album_id}', response_model=pydantic_schemas.Album)
def get_album_by_id(album_id: int) -> pydantic_schemas.Album:
    album = database.get_album_by_id(album_id)

    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Album not found")

    return pydantic_schemas.Album.from_orm(album)


@app.post('/albums/create', response_model=pydantic_schemas.Album)
def create_album(album: pydantic_schemas.AlbumIn) -> pydantic_schemas.Album:
    songs = [database.get_song_by_id(song_id) for song_id in album.song_ids]
    genre = database.get_genre_by_id(album.genre_id)
    artist = database.get_artist_by_id(album.artist_id)
    album_cover = database.get_file_by_id(album.album_cover_id)

    if None in songs:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="One or more songs not found")

    for song in songs:
        if song.album != None:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                                detail="One or more songs already belong to an album")

    if not genre:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Genre not found")

    if not artist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Artist not found")

    if not album_cover:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Album cover not found")

    album_model = models.Album(title=album.title,
                               release_date=album.release_date, artist=artist, genre=genre, songs=songs, album_cover=album_cover)

    result = database.create_album(album_model)

    return pydantic_schemas.Album.from_orm(result)


def save_album_cover_to_file(file: UploadFile = File(None)) -> pathlib.Path:
    filename = f'{uuid.uuid4().hex}.png'

    filepath = pathlib.Path(f'{IMAGES_DIRECTORY}/{filename}')

    image = Image.open(file.file)

    image.save(filepath)

    return filepath

@app.post('/albums/upload_album_cover', response_model=pydantic_schemas.FileUploaded)
def upload_album_cover(file: UploadFile = File(None)) -> pydantic_schemas.FileUploaded:
    if file.content_type != 'image/png' and file.content_type != 'image/jpeg' and file.content_type != 'image/bmp':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only files with 'Content-Type: image/[jpeg/bmp/png]' are accepted")

    filepath = save_album_cover_to_file(file)

    result = database.create_file(models.File(
        filepath=str(filepath), filetype="image/png"))

    return pydantic_schemas.FileUploaded(id=result.id, filetype=result.filetype, filepath=result.filepath, original_filename=file.filename)

@app.put('/albums/{id}', response_model=pydantic_schemas.Album)
def update_album_by_id(id: int, album: pydantic_schemas.AlbumIn):
    songs = [database.get_song_by_id(song_id) for song_id in album.song_ids]
    genre = database.get_genre_by_id(album.genre_id)
    artist = database.get_artist_by_id(album.artist_id)
    album_cover = database.get_file_by_id(album.album_cover_id)

    if None in songs:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="One or more songs not found")

    if not genre:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Genre not found")

    if not artist:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Artist not found")

    if not album_cover:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Album cover not found")

    album_model = models.Album(title=album.title,
                               release_date=album.release_date, artist=artist, genre=genre, songs=songs, album_cover=album_cover)


    updated_album = database.update_album_by_id(id, album_model)

    if not updated_album:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update album")

    return pydantic_schemas.Album.from_orm(updated_album)

@app.delete('/albums/{id}')
def delete_album_by_id(id: int):
    database.delete_album_by_id(id)

@app.post('/artists/create', response_model=pydantic_schemas.Artist)
def create_artist(artist: pydantic_schemas.ArtistIn) -> pydantic_schemas.Artist:
    result = database.create_artist(models.Artist(name=artist.name))

    if not result:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return pydantic_schemas.Artist.from_orm(result)

@app.get('/artists/{id}', response_model=pydantic_schemas.Artist)
def get_artist_by_id(id: int):
    artist = database.get_artist_by_id(id)

    if not artist:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artist not found")

    return pydantic_schemas.Artist.from_orm(artist)

@app.put('/artists/{id}', response_model=pydantic_schemas.Artist)
def update_artist_by_id(id: int, artist: pydantic_schemas.ArtistIn):
    updated_artist = database.update_artist_by_id(id, models.Artist(name=artist.name))

    if not updated_artist:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update artist")

    return pydantic_schemas.Artist.from_orm(updated_artist)

@app.delete('/artists/{id}')
def delete_artist_by_id(id: int):
    database.delete_artist_by_id(id)

@app.post('/genres/create', response_model=pydantic_schemas.Genre)
def create_genre(genre: pydantic_schemas.GenreIn):
    created_genre = database.create_genre(models.Genre(title=genre.title))

    if not created_genre:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create genre")

    return pydantic_schemas.Genre.from_orm(created_genre)

@app.get('/genres/{id}', response_model=pydantic_schemas.Genre)
def get_genre_by_id(id: int):
    genre = database.get_genre_by_id(id)

    if not genre:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Genre not found")

    return pydantic_schemas.Genre.from_orm(genre)

@app.put('/genre/{id}', response_model=pydantic_schemas.Genre)
def update_genre_by_id(id: int, genre: pydantic_schemas.GenreIn):
    updated_genre = database.update_genre_by_id(id, models.Genre(title=genre.title))

    if not updated_genre:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update genre")

    return pydantic_schemas.Genre.from_orm(updated_genre)

@app.delete('/genre/{id}')
def delete_genre_by_id(id: int):
    database.delete_genre_by_id(id)