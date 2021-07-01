import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { environment } from '../environment';
import { Album } from '../interfaces/album';
import { AlbumIn } from '../interfaces/albumin';
import { Artist } from '../interfaces/artist';
import { ArtistIn } from '../interfaces/artistIn';
import { FileUploaded } from '../interfaces/file-uploaded';
import { Playlist } from '../interfaces/playlist';
import { Song } from '../interfaces/song';
import { SongIn } from '../interfaces/songin';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  files: Song[] = [

  ];

  constructor(private http: HttpClient) {
    // http.get<Song>(`${environment.apiUrl}/songs/16`).subscribe(song => {
    //   this.files.push(song);

    //   this.stateChange.next(this.files);
    // });
  }

  private stateChange: Subject<Song[]> = new Subject();

  getState(): Observable<Song[]> {
    return this.stateChange.asObservable();
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${environment.apiUrl}/albums/id/${id}`);
  }

  getallAlbumsByTitle(title: any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/albums/title/${title}`);
  }

  getPlaylistById(id: number): Observable<Playlist> {
    return this.http.get<Playlist>(`${environment.apiUrl}/playlists/id/${id}`);
  }

  getPlaylists(): Observable<Playlist[]> {
    return this.http.get<Playlist[]>(`${environment.apiUrl}/playlists`);
  }

  getFavoriteById(id: number): Observable<Song> {
    console.log(id);

    return this.http.get<Song>(`${environment.apiUrl}/favorites/id/${id}`);
  }

  addSongToFavoritesById(id: number): Observable<Song> {
    return this.http.post<Song>(`${environment.apiUrl}/favorites/id/${id}`, null)
  }

  removeSongFromFavoritesById(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/favorites/id/${id}`)
  }

  uploadSongFile(songFile: File): Observable<FileUploaded> {
    const body = new FormData();
    body.append('file', songFile);

    const result = this.http.post<FileUploaded>(`${environment.apiUrl}/songs/upload`, body);

    return result;
  }

  uploadSong(song: SongIn): Observable<Song> {
    const result = this.http.post<Song>(`${environment.apiUrl}/songs/create`, song);

    return result
  }

  uploadAlbumCover(albumCover: File): Observable<FileUploaded> {
    const body = new FormData();
    body.append('file', albumCover);

    const result = this.http.post<FileUploaded>(`${environment.apiUrl}/albums/upload_album_cover`, body);

    return result;
  }

  uploadAlbum(album: AlbumIn): Observable<Album> {
    const result = this.http.post<Album>(`${environment.apiUrl}/albums/create`, album);

    return result;
  }

  uploadNewArtist(newArtist: ArtistIn): Observable<Artist> {
    const result = this.http.post<Artist>(`${environment.apiUrl}/artists/create`, newArtist);

    return result;
  }

  deleteSong(id: number): Observable<any> {
    const result = this.http.delete<any>(`${environment.apiUrl}/songs/id/${id}`);

    return result
  }

  getSongById(id: number): Observable<Song> {
    const result = this.http.get<Song>(`${environment.apiUrl}/songs/id/${id}`);

    return result
  }

  getallSongsByTitle(title: any): Observable<any> {
    const result = this.http.get<any>(`${environment.apiUrl}/songs/title/${title}`);

    return result
  }

  getallArtistsByName(name: any): Observable<any> {
    const result = this.http.get<any>(`${environment.apiUrl}/artists/name/${name}`);

    return result
  }
}
