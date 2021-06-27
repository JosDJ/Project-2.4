from sqlalchemy.orm import backref, declarative_base, relationship
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.sql.schema import ForeignKey, ForeignKeyConstraint, Table

Base = declarative_base()

artist_song_table = Table('artist_song',
                          Base.metadata,
                          Column('artist_id', Integer,
                                 ForeignKey('artists.id', ondelete='CASCADE')),
                          Column('song_id', Integer, ForeignKey(
                              'songs.id', ondelete='CASCADE'))
                          )

playlist_song_table = Table('playlist_song',
                            Base.metadata,
                            Column('playlist_id', Integer,
                                   ForeignKey('playlists.id', ondelete='CASCADE')),
                            Column('song_id', Integer, ForeignKey(
                                'songs.id', ondelete='CASCADE'))
                            )

favorites_table = Table('favorites', Base.metadata, Column('user_id', ForeignKey('users.id', ondelete='CASCADE')), Column('song_id', Integer, ForeignKey(
                              'songs.id', ondelete='CASCADE'))
                          )


class File(Base):
    __tablename__='files'

    id=Column(Integer, primary_key = True)
    filetype=Column(String(50))
    filepath=Column(String(260))

    def __repr__(self) -> str:
        return f"<File(id={self.id}, filetype='{self.filetype}', filepath='{self.filepath}'"


class User(Base):
    __tablename__='users'

    id=Column(Integer, primary_key = True)
    email=Column(String(100))
    hashed_password=Column(String(100))
    birthday=Column(Date)
    country_id=Column(Integer, ForeignKey('countries.id'))

    country=relationship('Country', lazy = 'subquery')

    playlists=relationship('Playlist', back_populates = 'author')

    favorites=relationship('Song', secondary=favorites_table)

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}', hashed_password='{self.hashed_password}', birthday='{self.birthday}', country_id={self.country_id})>"


class Artist(Base):
    __tablename__='artists'

    id=Column(Integer, primary_key = True)
    name=Column(String(50))

    albums=relationship('Album', backref = 'artist',
                          lazy = 'subquery', cascade = "all, delete-orphan")
    songs=relationship('Song', secondary = artist_song_table,
                         back_populates='artists')

    def __repr__(self) -> str:
        return f"<Artist(id={self.id}, name={self.name})>"


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

    playlists = relationship('Playlist', secondary=playlist_song_table,
                             back_populates='songs')

    file = relationship('File', backref=backref('songs', uselist=False))

    def __repr__(self) -> str:
        return f"<Song(id={self.id}, title='{self.title}', album_id={self.album_id}, file_id={self.file_id})>"


class Genre(Base):
    __tablename__ = 'genres'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))

    albums = relationship('Album', backref='genre',
                          lazy='subquery', cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Genre(id={self.id}, title='{self.title}')>"


class Album(Base):
    __tablename__ = 'albums'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    release_date = Column(Date)

    artist_id = Column(Integer, ForeignKey('artists.id', ondelete='CASCADE'))
    genre_id = Column(Integer, ForeignKey('genres.id', ondelete='CASCADE'))
    album_cover_id = Column(Integer, ForeignKey(
        'files.id', ondelete='CASCADE'))

    album_cover = relationship('File', backref=backref('albums', uselist=False))

    def __repr__(self) -> str:
        return f"<Album(id={self.id}, title='{self.title}', release_date='{self.release_date}', artist_id={self.artist_id}, genre_id={self.genre_id}, album_cover_id={self.album_cover_id})>"


class Country(Base):
    __tablename__ = 'countries'

    id = Column(Integer, primary_key=True)
    name = Column(String(200))

    def __repr__(self) -> str:
        return f"<Country(id={self.id}, name='{self.name}')>"


class Playlist(Base):
    __tablename__ = 'playlists'

    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    author_id = Column(Integer, ForeignKey('users.id', ondelete='CASCADE'))

    songs = relationship('Song', secondary=playlist_song_table,
                         back_populates='playlists')

    author = relationship('User', back_populates='playlists')

    def __repr__(self) -> str:
        return f"<Playlist(id={self.id}, title='{self.title}')>"
