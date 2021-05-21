from datetime import timedelta
import datetime
from typing import List, Optional

from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from jose.constants import ALGORITHMS
from passlib.context import CryptContext

from models import UserWithPassword, User, Song, Artist, Album, Genre, UserCredentials

# openssl rand -hex 32
SECRET_KEY = 'a25570ca1b7c0a5ae1e0d2d0a542746e0a78ef042bd08de3644a556eafc45ea6'
ALGORITHM = ALGORITHMS.HS256
ACCESS_TOKEN_EXPIRES_MINUTES = 30

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

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


@app.post('/songs/upload', status_code=status.HTTP_201_CREATED)
async def upload_songs(files: List[UploadFile] = File(None)):
    # this api end point requires you to use Content-Type: multipart/form-data
    # TODO: save files

    return {
        'filenames': [file.filename for file in files]
    }


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
