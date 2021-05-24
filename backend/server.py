from datetime import timedelta
import datetime
from typing import List, Optional
import pathlib
import uuid

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from jose.constants import ALGORITHMS
from passlib.context import CryptContext

from models import UserWithPassword, User, Song, Artist, Album, Genre, UserCredentials, SongPath

# openssl rand -hex 32
SECRET_KEY = 'a25570ca1b7c0a5ae1e0d2d0a542746e0a78ef042bd08de3644a556eafc45ea6'
ALGORITHM = ALGORITHMS.HS256
ACCESS_TOKEN_EXPIRES_MINUTES = 30

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

# create music directory if it doesn't exist already
MUSIC_DIRECTORY = pathlib.Path(__file__).parent / 'data'
MUSIC_DIRECTORY.mkdir(exist_ok=True, parents=True)

app = FastAPI()


def verify_password(password, hashed_password) -> bool:
    return pwd_context.verify(password, hashed_password)


def get_password_hash(password) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({'exp': expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt


@app.get('/users/{user_id}', response_model=User)
async def get_user_by_id(user_id: int) -> User:
    user = User(email='d.p.reitsma@gmail.com',
                      birthday=datetime.date(1998, 4, 5), country='The Netherlands')

    return user


@app.post('/users/register', response_model=UserWithPassword)
async def register(credentials: UserCredentials) -> UserWithPassword:
    hashed_password = get_password_hash(credentials.password)

    user = UserWithPassword(email=credentials.email, hashed_password=hashed_password)

    return user


@app.post('/users/login', response_model=User)
async def login(user: UserCredentials) -> User:
    res = User(email=user.email)

    return res


@app.get('/songs/{song_id}', response_model=Song)
async def get_song_by_id(song_id: int) -> Song:
    artist = Artist(name='Metallica')

    song = Song(title='Nothing Else Matters', artists=[artist])

    return song

saved_songs = {

}

async def save_song_to_disk(file: UploadFile = File(None)) -> SongPath:
    filename = f'{uuid.uuid4().hex}.mp3'
    
    filepath = pathlib.Path(f'{MUSIC_DIRECTORY}/{filename}')

    with open(filepath, 'wb+') as f:
        f.write(file.file.read())

    res = SongPath() # TODO: fix this

    return res


@app.post('/songs/upload', status_code=status.HTTP_201_CREATED, response_model=Song)
async def upload_song(title: str, file: UploadFile = File(None)):
    # this api end point requires you to use Content-Type: multipart/form-data
    # TODO: save file to disk

    artists = [Artist(name="Metallica")]

    song = await save_song_to_disk(title, artists, file)

    return song


@app.get('/albums/{album_id}', response_model=Album)
async def get_album_by_id(album_id: int) -> Album:
    artist = Artist(name='Metallica')

    songs = [
        Song(title='Nothing Else Matters', artists=[artist]),
        Song(title='Sad But True', artists=[artist]),
    ]

    album = Album(title='Metallica', artist=artist, genre=Genre(
        title='Metal'), songs=songs, release_date=datetime.date(1991, 8, 12))

    return album


@app.post('/albums/create', response_model=Album)
async def create_album(album: Album) -> Album:
    pass
