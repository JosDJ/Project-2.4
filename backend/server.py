from datetime import timedelta
import datetime
from os import stat
from typing import List, Optional
import pathlib
import uuid
from PIL import Image
from starlette.status import HTTP_415_UNSUPPORTED_MEDIA_TYPE
from mutagen.mp3 import MP3

from models import User
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.staticfiles import StaticFiles

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
MUSIC_DIRECTORY = pathlib.Path('static_files') / 'music'
MUSIC_DIRECTORY.mkdir(exist_ok=True, parents=True)

IMAGES_DIRECTORY = pathlib.Path('static_files') / 'images'
IMAGES_DIRECTORY.mkdir(exist_ok=True, parents=True)

tags_metadata = [
    {
        "name": "albums",
        "description": "Operations with albums."
    },
    {
        "name": "genres",
        "description": "Operations with genres."
    },
    {
        "name": "songs",
        "description": "Operations with songs"
    },
    {
        "name": "artists",
        "description": "Operations with artists"
    },
    {
        "name": "playlists",
        "description": "Operations with playlists"
    },
    {
        "name": "countries",
        "description": "Operations with countries"
    },
    {
        "name": "favorites",
        "description": "Operations with favorites"
    }

]

app = FastAPI(openapi_tags=tags_metadata)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount('/static_files', StaticFiles(directory='static_files'),
          name="static_files")


@app.post('/login', response_model=pydantic_schemas.Token, tags=['users'])
def login(form_data: OAuth2PasswordRequestForm = Depends()) -> pydantic_schemas.Token:

    user = database.validate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Incorrect username or password',
            headers={'WWW-Authenticate': 'Bearer'}
        )

    data = {
        "email": user.email,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
    }

    access_token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)

    return pydantic_schemas.Token(access_token=access_token, token_type="bearer")


@app.post('/register', response_model=pydantic_schemas.User, tags=['users'])
async def register(user_data: pydantic_schemas.UserIn):
    user = database.get_user_by_email(
        user_data.email)  # check if user exists already

    if user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='An account with this email address already exists',
            headers={"WWW-Authenticate": "Bearer"}
        )

    country = database.get_country_by_id(user_data.country_id)

    if not country:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail='Country not found')

    new_user = models.User(
        email=user_data.email,
        hashed_password=database.get_password_hash(user_data.password),
        birthday=user_data.birthday,
        country=country
    )

    database.create_new_user(new_user)

    return pydantic_schemas.User.from_orm(new_user)


def get_current_user(token: str = Depends(oauth2_scheme)) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        if email := payload.get("email"):
            return database.get_user_by_email(email)
        else:
            raise credentials_exception
    except JWTError:
        raise credentials_exception


@app.get('/users/{id}', response_model=pydantic_schemas.User, tags=['users'])
def get_user_by_id(id: int, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.User:
    user = database.get_user_by_id(id)

    return pydantic_schemas.User.from_orm(user)

@app.get('/users/', response_model=pydantic_schemas.User, tags=['users'])
def get_user(user: models.User = Depends(get_current_user)):
    return pydantic_schemas.User.from_orm(user)


# @app.post('/users/register', response_model=DbUser)
# async def register(credentials: UserCredentials) -> UserWithPassword:
#     hashed_password = get_password_hash(credentials.password)

#     user = UserWithPassword(email=credentials.email,
#                             hashed_password=hashed_password)

#     return user

@app.post('/songs/create', response_model=pydantic_schemas.Song, tags=['songs'])
def create_song(song: pydantic_schemas.SongIn, token: str = Depends(oauth2_scheme)):
    file = database.get_file_by_id(song.file_id)
    artists = [database.get_artist_by_id(artist_id)
               for artist_id in song.artist_ids]

    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Song file not found")

    if None in artists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="One or more artists not found")

    created_song = database.create_song(models.Song(
        title=song.title, file=file, artists=artists))

    return pydantic_schemas.Song.from_orm(created_song)


@app.get('/songs/{id}', response_model=pydantic_schemas.Song, tags=["songs"])
async def get_song_by_id(id: int, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Song:
    song = database.get_song_by_id(id)
    
    if not song:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Song not found')

    return pydantic_schemas.Song.from_orm(song)


@app.put('/songs/{id}', response_model=pydantic_schemas.Song, tags=["songs"])
def update_song_by_id(id: int, song: pydantic_schemas.SongIn, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Song:
    file = database.get_file_by_id(song.file_id)
    artists = [database.get_artist_by_id(artist_id)
               for artist_id in song.artist_ids]

    if not file:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Song file not found")

    if None in artists:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="One or more artists not found")

    updated_song = database.update_song_by_id(
        id, models.Song(title=song.title, file=file, artists=artists))

    return pydantic_schemas.Song.from_orm(updated_song)


@app.delete('/songs/{id}', tags=["songs"])
def delete_song_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_song_by_id(id)


def save_song_to_disk(file: UploadFile = File(None)) -> pathlib.Path:
    filename = f'{uuid.uuid4().hex}.mp3'

    filepath = pathlib.Path(f'{MUSIC_DIRECTORY}/{filename}')

    with open(filepath, 'wb+') as f:
        f.write(file.file.read())

    return filepath

def get_song_duration(filepath: pathlib.Path) -> int:
    audio = MP3(filepath)

    return int(audio.info.length)

@app.post('/songs/upload', status_code=status.HTTP_201_CREATED, response_model=pydantic_schemas.FileUploaded, tags=["songs"])
def upload_song_file(file: UploadFile = File(None), token: str = Depends(oauth2_scheme)):
    if file.content_type != 'audio/mpeg':
        raise HTTPException(
            status_code=HTTP_415_UNSUPPORTED_MEDIA_TYPE, detail="Only files with 'Content-Type: audio/mpeg' are allowed")

    filepath = save_song_to_disk(file)

    duration = get_song_duration(filepath)

    song_file = database.create_file(models.File(filetype='audio/mpeg', filepath=filepath.as_posix(), duration=duration))
 
    return pydantic_schemas.FileUploaded(id=song_file.id, filetype=song_file.filetype, filepath=song_file.filepath, original_filename=file.filename, duration=duration)


@app.get('/albums/{album_id}', response_model=pydantic_schemas.Album, tags=["albums"])
def get_album_by_id(album_id: int, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Album:
    album = database.get_album_by_id(album_id)

    if not album:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Album not found")

    return pydantic_schemas.Album.from_orm(album)


@app.post('/albums/create', response_model=pydantic_schemas.Album, tags=["albums"])
def create_album(album: pydantic_schemas.AlbumIn, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Album:
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
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Album cover not found")

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


@app.post('/albums/upload_album_cover', response_model=pydantic_schemas.FileUploaded, tags=["albums"])
def upload_album_cover(file: UploadFile = File(None), token: str = Depends(oauth2_scheme)) -> pydantic_schemas.FileUploaded:
    if file.content_type != 'image/png' and file.content_type != 'image/jpeg' and file.content_type != 'image/bmp':
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Only files with 'Content-Type: image/[jpeg/bmp/png]' are accepted")

    filepath = save_album_cover_to_file(file)

    result = database.create_file(models.File(
        filepath=filepath.as_posix(), filetype="image/png"))

    return pydantic_schemas.FileUploaded(id=result.id, filetype=result.filetype, filepath=result.filepath, original_filename=file.filename)


@app.put('/albums/{id}', response_model=pydantic_schemas.Album, tags=["albums"])
def update_album_by_id(id: int, album: pydantic_schemas.AlbumIn, token: str = Depends(oauth2_scheme)):
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
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Album cover not found")

    album_model = models.Album(title=album.title,
                               release_date=album.release_date, artist=artist, genre=genre, songs=songs, album_cover=album_cover)

    updated_album = database.update_album_by_id(id, album_model)

    if not updated_album:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update album")

    return pydantic_schemas.Album.from_orm(updated_album)


@app.delete('/albums/{id}', tags=["albums"])
def delete_album_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_album_by_id(id)


@app.post('/artists/create', response_model=pydantic_schemas.Artist, tags=["artists"])
def create_artist(artist: pydantic_schemas.ArtistIn, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Artist:
    result = database.create_artist(models.Artist(name=artist.name))

    if not result:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return pydantic_schemas.Artist.from_orm(result)


@app.get('/artists/{id}', response_model=pydantic_schemas.Artist, tags=["artists"])
def get_artist_by_id(id: int, token: str = Depends(oauth2_scheme)):
    artist = database.get_artist_by_id(id)

    if not artist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Artist not found")

    return pydantic_schemas.Artist.from_orm(artist)


@app.get('/artists', response_model=List[pydantic_schemas.Artist], tags=["artists"])
def get_artists(token: str = Depends(oauth2_scheme)):
    artists = [pydantic_schemas.Artist.from_orm(artist) for artist in database.get_artists()]

    return artists   


@app.put('/artists/{id}', response_model=pydantic_schemas.Artist, tags=["artists"])
def update_artist_by_id(id: int, artist: pydantic_schemas.ArtistIn, token: str = Depends(oauth2_scheme)):
    updated_artist = database.update_artist_by_id(
        id, models.Artist(name=artist.name))

    if not updated_artist:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update artist")

    return pydantic_schemas.Artist.from_orm(updated_artist)


@app.delete('/artists/{id}', tags=["artists"])
def delete_artist_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_artist_by_id(id)


@app.post('/genres/create', response_model=pydantic_schemas.Genre, tags=["genres"])
def create_genre(genre: pydantic_schemas.GenreIn, token: str = Depends(oauth2_scheme)):
    created_genre = database.create_genre(models.Genre(title=genre.title))

    if not created_genre:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create genre")

    return pydantic_schemas.Genre.from_orm(created_genre)


@app.get('/genres/{id}', response_model=pydantic_schemas.Genre, tags=["genres"])
def get_genre_by_id(id: int, token: str = Depends(oauth2_scheme)):
    genre = database.get_genre_by_id(id)

    if not genre:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Genre not found")

    return pydantic_schemas.Genre.from_orm(genre)

@app.get('/genres/', response_model=List[pydantic_schemas.Genre], tags=["genres"])
def get_genres(token: str = Depends(oauth2_scheme)):
    genres = [pydantic_schemas.Genre.from_orm(genre) for genre in database.get_genres()]

    return genres


@app.put('/genre/{id}', response_model=pydantic_schemas.Genre, tags=["genres"])
def update_genre_by_id(id: int, genre: pydantic_schemas.GenreIn, token: str = Depends(oauth2_scheme)):
    updated_genre = database.update_genre_by_id(
        id, models.Genre(title=genre.title))

    if not updated_genre:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update genre")

    return pydantic_schemas.Genre.from_orm(updated_genre)


@app.delete('/genre/{id}', tags=["genres"])
def delete_genre_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_genre_by_id(id)


@app.post('/playlists/create', response_model=pydantic_schemas.Playlist, tags=['playlists'])
def create_playlist(playlist: pydantic_schemas.PlaylistIn, user: models.User = Depends(get_current_user)) -> pydantic_schemas.Playlist:
    songs = [database.get_song_by_id(song_id) for song_id in playlist.song_ids]

    created_playlist = database.create_playlist(
        models.Playlist(title=playlist.title, songs=songs, author=user))

    return pydantic_schemas.Playlist.from_orm(created_playlist)


@app.get('/playlists/{id}', response_model=pydantic_schemas.Playlist, tags=['playlists'])
def get_playlist_by_id(id: int, token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Playlist:
    playlist = database.get_playlist_by_id(id)

    if not playlist:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Playlist not found')

    return pydantic_schemas.Playlist.from_orm(playlist)

@app.get('/playlists/', response_model=List[pydantic_schemas.Playlist], tags=['playlists'])
def get_playlists(token: str = Depends(oauth2_scheme)) -> pydantic_schemas.Playlist:
    playlists = [pydantic_schemas.Playlist.from_orm(playlist) for playlist in database.get_playlists()]

    return playlists

@app.put('/playlists/{id}', response_model=pydantic_schemas.Playlist, tags=['playlists'])
def update_playlist_by_id(id: int, playlist: pydantic_schemas.PlaylistIn, user: models.User = Depends(get_current_user)) -> pydantic_schemas.Playlist:
    songs = [database.get_song_by_id(song_id) for song_id in playlist.song_ids]

    updated_playlist = database.update_playlist_by_id(
        id, models.Playlist(title=playlist.title, songs=songs))

    return pydantic_schemas.Playlist.from_orm(updated_playlist)


@app.delete('/playlists/{id}', tags=['playlists'])
def delete_playlist_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_playlist_by_id(id)


@app.delete('/users/{id}', tags=['users'])
def delete_user_by_id(id: int, token: str = Depends(oauth2_scheme)):
    database.delete_user_by_id(id)


@app.put('/users/{id}', response_model=pydantic_schemas.User, tags=['users'])
def update_user_by_id(id: int, user: pydantic_schemas.UserIn, token: str = Depends(oauth2_scheme)):
    country = database.get_country_by_id(user.country_id)
    updated_user = database.update_user_by_id(id, models.User(
        email=user.email,
        hashed_password=database.get_password_hash(user.password),
        birthday=user.birthday,
        country=country
    ))

    if not updated_user:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not update user"
        )

    return pydantic_schemas.User.from_orm(updated_user)


@app.get('/countries/', response_model=List[pydantic_schemas.Country], tags=['countries'])
def get_countries() -> List[pydantic_schemas.Country]:
    countries = [pydantic_schemas.Country.from_orm(
        country) for country in database.get_countries()]

    return countries


@app.get('/countries/{id}', response_model=pydantic_schemas.Country, tags=['countries'])
def get_country_by_id(id: int) -> pydantic_schemas.Country:
    country = database.get_country_by_id(id)

    if not country:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Country not found')

    return pydantic_schemas.Country.from_orm(country)

@app.get('/favorites', response_model=List[pydantic_schemas.Song], tags=['favorites'])
def get_favorites(user: models.User = Depends(get_current_user)) -> List[pydantic_schemas.Song]:
    favorites = [pydantic_schemas.Song.from_orm(favorite) for favorite in user.favorites]

    return favorites