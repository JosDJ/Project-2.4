import datetime

from fastapi.exceptions import HTTPException
from sqlalchemy.inspection import inspect
from config import config

import models
from models import Base, User

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
    countries = [
        models.Country(name='Afghanistan (AF)'),
        models.Country(name='Åland (AX)'),
        models.Country(name='Albanië (AL)'),
        models.Country(name='Algerije (DZ)'),
        models.Country(name='Amerikaans-Samoa (AS)'),
        models.Country(name='Amerikaanse Maagdeneilanden (VI)'),
        models.Country(name='Andorra (AD)'),
        models.Country(name='Angola (AO)'),
        models.Country(name='Anguilla (AI)'),
        models.Country(name='Antarctica (AQ)'),
        models.Country(name='Antigua en Barbuda (AG)'),
        models.Country(name='Argentinië (AR)'),
        models.Country(name='Armenië (AM)'),
        models.Country(name='Aruba (AW)'),
        models.Country(name='Australië (AU)'),
        models.Country(name='Azerbeidzjan (AZ)'),
        models.Country(name='Bahama’s (BS)'),
        models.Country(name='Bahrein (BH)'),
        models.Country(name='Bangladesh (BD)'),
        models.Country(name='Barbados (BB)'),
        models.Country(name='Belarus (BY)'),
        models.Country(name='België (BE)'),
        models.Country(name='Belize (BZ)'),
        models.Country(name='Benin (BJ)'),
        models.Country(name='Bermuda (BM)'),
        models.Country(name='Bhutan (BT)'),
        models.Country(name='Bolivia (BO)'),
        models.Country(name='Bosnië en Herzegovina (BA)'),
        models.Country(name='Botswana (BW)'),
        models.Country(name='Bouveteiland (BV)'),
        models.Country(name='Brazilië (BR)'),
        models.Country(name='Brits Indische Oceaanterritorium (IO)'),
        models.Country(name='Britse Maagdeneilanden (VG)'),
        models.Country(name='Brunei (BN)'),
        models.Country(name='Bulgarije (BG)'),
        models.Country(name='Burkina Faso (BF)'),
        models.Country(name='Burundi (BI)'),
        models.Country(name='Cambodja (KH)'),
        models.Country(name='Canada (CA)'),
        models.Country(name='Caribisch Nederland (BQ)'),
        models.Country(name='Centraal-Afrikaanse Republiek (CF)'),
        models.Country(name='Chili (CL)'),
        models.Country(name='China (CN)'),
        models.Country(name='Christmaseiland (CX)'),
        models.Country(name='Cocoseilanden (CC)'),
        models.Country(name='Colombia (CO)'),
        models.Country(name='Comoren (KM)'),
        models.Country(name='Congo-Brazzaville (CG)'),
        models.Country(name='Congo-Kinshasa (CD)'),
        models.Country(name='Cookeilanden (CK)'),
        models.Country(name='Costa Rica (CR)'),
        models.Country(name='Cuba (CU)'),
        models.Country(name='Curaçao (CW)'),
        models.Country(name='Cyprus (CY)'),
        models.Country(name='Denemarken (DK)'),
        models.Country(name='Djibouti (DJ)'),
        models.Country(name='Dominica (DM)'),
        models.Country(name='Dominicaanse Republiek (DO)'),
        models.Country(name='Duitsland (DE)'),
        models.Country(name='Ecuador (EC)'),
        models.Country(name='Egypte (EG)'),
        models.Country(name='El Salvador (SV)'),
        models.Country(name='Equatoriaal-Guinea (GQ)'),
        models.Country(name='Eritrea (ER)'),
        models.Country(name='Estland (EE)'),
        models.Country(name='eSwatini (SZ)'),
        models.Country(name='Ethiopië (ET)'),
        models.Country(name='Faeröer (FO)'),
        models.Country(name='Falklandeilanden (FK)'),
        models.Country(name='Fiji (FJ)'),
        models.Country(name='Filipijnen (PH)'),
        models.Country(name='Finland (FI)'),
        models.Country(name='Frankrijk (FR)'),
        models.Country(name='Frans-Guyana (GF)'),
        models.Country(name='Frans-Polynesië (PF)'),
        models.Country(
            name='Franse Gebieden in de zuidelijke Indische Oceaan (TF)'),
        models.Country(name='Gabon (GA)'),
        models.Country(name='Gambia (GM)'),
        models.Country(name='Georgië (GE)'),
        models.Country(name='Ghana (GH)'),
        models.Country(name='Gibraltar (GI)'),
        models.Country(name='Grenada (GD)'),
        models.Country(name='Griekenland (GR)'),
        models.Country(name='Groenland (GL)'),
        models.Country(name='Guadeloupe (GP)'),
        models.Country(name='Guam (GU)'),
        models.Country(name='Guatemala (GT)'),
        models.Country(name='Guernsey (GG)'),
        models.Country(name='Guinee (GN)'),
        models.Country(name='Guinee-Bissau (GW)'),
        models.Country(name='Guyana (GY)'),
        models.Country(name='Haïti (HT)'),
        models.Country(name='Heard en McDonaldeilanden (HM)'),
        models.Country(name='Honduras (HN)'),
        models.Country(name='Hongarije (HU)'),
        models.Country(name='Hongkong SAR van China (HK)'),
        models.Country(name='Ierland (IE)'),
        models.Country(name='IJsland (IS)'),
        models.Country(name='India (IN)'),
        models.Country(name='Indonesië (ID)'),
        models.Country(name='Irak (IQ)'),
        models.Country(name='Iran (IR)'),
        models.Country(name='Isle of Man (IM)'),
        models.Country(name='Israël (IL)'),
        models.Country(name='Italië (IT)'),
        models.Country(name='Ivoorkust (CI)'),
        models.Country(name='Jamaica (JM)'),
        models.Country(name='Japan (JP)'),
        models.Country(name='Jemen (YE)'),
        models.Country(name='Jersey (JE)'),
        models.Country(name='Jordanië (JO)'),
        models.Country(name='Kaaimaneilanden (KY)'),
        models.Country(name='Kaapverdië (CV)'),
        models.Country(name='Kameroen (CM)'),
        models.Country(name='Kazachstan (KZ)'),
        models.Country(name='Kenia (KE)'),
        models.Country(name='Kirgizië (KG)'),
        models.Country(name='Kiribati (KI)'),
        models.Country(
            name='Kleine afgelegen eilanden van de Verenigde Staten (UM)'),
        models.Country(name='Koeweit (KW)'),
        models.Country(name='Kroatië (HR)'),
        models.Country(name='Laos (LA)'),
        models.Country(name='Lesotho (LS)'),
        models.Country(name='Letland (LV)'),
        models.Country(name='Libanon (LB)'),
        models.Country(name='Liberia (LR)'),
        models.Country(name='Libië (LY)'),
        models.Country(name='Liechtenstein (LI)'),
        models.Country(name='Litouwen (LT)'),
        models.Country(name='Luxemburg (LU)'),
        models.Country(name='Macau SAR van China (MO)'),
        models.Country(name='Madagaskar (MG)'),
        models.Country(name='Malawi (MW)'),
        models.Country(name='Maldiven (MV)'),
        models.Country(name='Maleisië (MY)'),
        models.Country(name='Mali (ML)'),
        models.Country(name='Malta (MT)'),
        models.Country(name='Marokko (MA)'),
        models.Country(name='Marshalleilanden (MH)'),
        models.Country(name='Martinique (MQ)'),
        models.Country(name='Mauritanië (MR)'),
        models.Country(name='Mauritius (MU)'),
        models.Country(name='Mayotte (YT)'),
        models.Country(name='Mexico (MX)'),
        models.Country(name='Micronesia (FM)'),
        models.Country(name='Moldavië (MD)'),
        models.Country(name='Monaco (MC)'),
        models.Country(name='Mongolië (MN)'),
        models.Country(name='Montenegro (ME)'),
        models.Country(name='Montserrat (MS)'),
        models.Country(name='Mozambique (MZ)'),
        models.Country(name='Myanmar (Birma) (MM)'),
        models.Country(name='Namibië (NA)'),
        models.Country(name='Nauru (NR)'),
        models.Country(name='Nederland (NL)'),
        models.Country(name='Nepal (NP)'),
        models.Country(name='Nicaragua (NI)'),
        models.Country(name='Nieuw-Caledonië (NC)'),
        models.Country(name='Nieuw-Zeeland (NZ)'),
        models.Country(name='Niger (NE)'),
        models.Country(name='Nigeria (NG)'),
        models.Country(name='Niue (NU)'),
        models.Country(name='Noord-Korea (KP)'),
        models.Country(name='Noord-Macedonië (MK)'),
        models.Country(name='Noordelijke Marianen (MP)'),
        models.Country(name='Noorwegen (NO)'),
        models.Country(name='Norfolk (NF)'),
        models.Country(name='Oeganda (UG)'),
        models.Country(name='Oekraïne (UA)'),
        models.Country(name='Oezbekistan (UZ)'),
        models.Country(name='Oman (OM)'),
        models.Country(name='Oost-Timor (TL)'),
        models.Country(name='Oostenrijk (AT)'),
        models.Country(name='Pakistan (PK)'),
        models.Country(name='Palau (PW)'),
        models.Country(name='Palestijnse gebieden (PS)'),
        models.Country(name='Panama (PA)'),
        models.Country(name='Papoea-Nieuw-Guinea (PG)'),
        models.Country(name='Paraguay (PY)'),
        models.Country(name='Peru (PE)'),
        models.Country(name='Pitcairneilanden (PN)'),
        models.Country(name='Polen (PL)'),
        models.Country(name='Portugal (PT)'),
        models.Country(name='Puerto Rico (PR)'),
        models.Country(name='Qatar (QA)'),
        models.Country(name='Réunion (RE)'),
        models.Country(name='Roemenië (RO)'),
        models.Country(name='Rusland (RU)'),
        models.Country(name='Rwanda (RW)'),
        models.Country(name='Saint Kitts en Nevis (KN)'),
        models.Country(name='Saint Lucia (LC)'),
        models.Country(name='Saint Vincent en de Grenadines (VC)'),
        models.Country(name='Saint-Barthélemy (BL)'),
        models.Country(name='Saint-Martin (MF)'),
        models.Country(name='Saint-Pierre en Miquelon (PM)'),
        models.Country(name='Salomonseilanden (SB)'),
        models.Country(name='Samoa (WS)'),
        models.Country(name='San Marino (SM)'),
        models.Country(name='Sao Tomé en Principe (ST)'),
        models.Country(name='Saoedi-Arabië (SA)'),
        models.Country(name='Senegal (SN)'),
        models.Country(name='Servië (RS)'),
        models.Country(name='Seychellen (SC)'),
        models.Country(name='Sierra Leone (SL)'),
        models.Country(name='Singapore (SG)'),
        models.Country(name='Sint-Helena (SH)'),
        models.Country(name='Sint-Maarten (SX)'),
        models.Country(name='Slovenië (SI)'),
        models.Country(name='Slowakije (SK)'),
        models.Country(name='Soedan (SD)'),
        models.Country(name='Somalië (SO)'),
        models.Country(name='Spanje (ES)'),
        models.Country(name='Spitsbergen en Jan Mayen (SJ)'),
        models.Country(name='Sri Lanka (LK)'),
        models.Country(name='Suriname (SR)'),
        models.Country(name='Syrië (SY)'),
        models.Country(name='Tadzjikistan (TJ)'),
        models.Country(name='Taiwan (TW)'),
        models.Country(name='Tanzania (TZ)'),
        models.Country(name='Thailand (TH)'),
        models.Country(name='Togo (TG)'),
        models.Country(name='Tokelau (TK)'),
        models.Country(name='Tonga (TO)'),
        models.Country(name='Trinidad en Tobago (TT)'),
        models.Country(name='Tsjaad (TD)'),
        models.Country(name='Tsjechië (CZ)'),
        models.Country(name='Tunesië (TN)'),
        models.Country(name='Turkije (TR)'),
        models.Country(name='Turkmenistan (TM)'),
        models.Country(name='Turks- en Caicoseilanden (TC)'),
        models.Country(name='Tuvalu (TV)'),
        models.Country(name='Uruguay (UY)'),
        models.Country(name='Vanuatu (VU)'),
        models.Country(name='Vaticaanstad (VA)'),
        models.Country(name='Venezuela (VE)'),
        models.Country(name='Verenigd Koninkrijk (GB)'),
        models.Country(name='Verenigde Arabische Emiraten (AE)'),
        models.Country(name='Verenigde Staten (US)'),
        models.Country(name='Vietnam (VN)'),
        models.Country(name='Wallis en Futuna (WF)'),
        models.Country(name='Westelijke Sahara (EH)'),
        models.Country(name='Zambia (ZM)'),
        models.Country(name='Zimbabwe (ZW)'),
        models.Country(name='Zuid-Afrika (ZA)'),
        models.Country(
            name='Zuid-Georgia en Zuidelijke Sandwicheilanden (GS)'),
        models.Country(name='Zuid-Korea (KR)'),
        models.Country(name='Zuid-Soedan (SS)'),
        models.Country(name='Zweden (SE)'),
        models.Country(name='Zwitserland (CH)'),
    ]

    session.bulk_save_objects(countries)

    user = models.User(
        email='test@test.com',
        hashed_password=get_password_hash('qwerty123'),
        birthday=datetime.date(1998, 5, 4),
        country=countries[0])

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

    user.favorites = songs

    session.add(user)
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
        song_to_update.file = song.file
        song_to_update.artists = song.artists

    session.commit()

    return song_to_update


def delete_song_by_id(id: int):
    session.query(models.Song).filter_by(id=id).delete()

    session.commit()


def create_new_user(user: User) -> Optional[models.User]:
    session.add(user)

    session.commit()

    return user


def update_user_by_id(id: int, user: models.User) -> Optional[models.User]:
    user_to_update = get_user_by_id(id)

    if user_to_update:
        user_to_update.email = user.email
        user_to_update.birthday = user.birthday
        user_to_update.country = user.country
        user_to_update.hashed_password = user.hashed_password

    session.commit()

    return user_to_update


def delete_user_by_id(id: int):
    session.query(models.User).filter_by(id=id).delete()

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
        playlist_to_update.author = playlist.author

    session.commit()

    return playlist_to_update


def delete_playlist_by_id(id: int):
    session.query(models.Playlist).filter_by(id=id).delete()
    session.commit()


def create_country(country: models.Country):
    session.add(country)

    session.commit()

    return country


def get_country_by_id(id: int) -> Optional[models.Country]:
    country = session.query(models.Country).filter_by(id=id).first()

    return country


def get_countries() -> List[models.Country]:
    countries = session.query(models.Country).all()

    return countries


def update_country_by_id(id: int, country: models.Country) -> Optional[models.Country]:
    country_to_update = get_country_by_id(id)

    if country_to_update:
        country_to_update.title = country.title

    session.commit()

    return country_to_update


def delete_country_by_id(id: int):
    session.query(models.Country).filter_by(id=id).delete()

    session.commit()
