from sqlalchemy.orm import declarative_base, relationship
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.sql.schema import ForeignKey

Base = declarative_base()


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(100))
    hashed_password = Column(String(100))
    birthday = Column(Date)
    country = Column(String(50))


class Artist(Base):
    __tablename__ = 'artists'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))

    albums = relationship('Album', backref='artist')


class Song(Base):
    __tablename__ = 'songs'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    album_id = Column(Integer, ForeignKey('albums.id'))
    filepath = Column(String(200))

    album = relationship('Album', back_populates='songs')

class Genre(Base):
    __tablename__ = 'genres'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    albums = relationship('Album', backref='genre')


class Album(Base):
    __tablename__ = 'albums'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))

    artist_id = Column(Integer, ForeignKey('artists.id'))
    genre_id = Column(Integer, ForeignKey('genres.id'))

    release_date = Column(Date)