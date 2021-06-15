from sqlalchemy.orm import backref, declarative_base, relationship
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.sql.schema import ForeignKey, ForeignKeyConstraint, Table

Base = declarative_base()


class File(Base):
    __tablename__ = 'files'

    id = Column(Integer, primary_key=True)
    filetype = Column(String(50))
    filepath = Column(String(260))


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String(100))
    hashed_password = Column(String(100))
    birthday = Column(Date)
    country_id = Column(Integer, ForeignKey('countries.id'))

    country = relationship('Country', lazy='subquery')

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}', hashed_password='{self.hashed_password}', birthday='{self.birthday}', country='{self.country}'"


artist_song_table = Table('artist_song',
                          Base.metadata,
                          Column('artist_id', Integer,
                                 ForeignKey('artists.id', ondelete='CASCADE')),
                          Column('song_id', Integer, ForeignKey(
                              'songs.id', ondelete='CASCADE'))
                          )


class Artist(Base):
    __tablename__ = 'artists'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))

    albums = relationship('Album', backref='artist',
                          lazy='subquery', cascade="all, delete-orphan")
    songs = relationship('Song', secondary=artist_song_table,
                         back_populates='artists')


class Song(Base):
    __tablename__ = 'songs'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    album_id = Column(Integer, ForeignKey('albums.id', ondelete='CASCADE'))
    file_id = Column(Integer, ForeignKey('files.id', ondelete='CASCADE'))

    album = relationship('Album', backref='songs',
                         lazy='subquery')
    artists = relationship(
        'Artist', secondary=artist_song_table, back_populates='songs')
    file = relationship('File', uselist=False)


class Genre(Base):
    __tablename__ = 'genres'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    albums = relationship('Album', backref='genre',
                          lazy='subquery', cascade="all, delete-orphan")


class Album(Base):
    __tablename__ = 'albums'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    artist_id = Column(Integer, ForeignKey('artists.id', ondelete='CASCADE'))
    genre_id = Column(Integer, ForeignKey('genres.id', ondelete='CASCADE'))
    album_cover_id = Column(Integer, ForeignKey(
        'files.id', ondelete='CASCADE'))

    album_cover = relationship(
        'File', uselist=False)

    release_date = Column(Date)


class Country(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))