import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { environment } from '../environment';
import { Album } from '../interfaces/album';
import { AlbumIn } from '../interfaces/albumin';
import { FileUploaded } from '../interfaces/file-uploaded';
import { Song } from '../interfaces/song';
import { SongIn } from '../interfaces/songin';

@Injectable({
  providedIn: 'root'
})
export class FileService {
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
  
  deleteSong(id:number): Observable<any> {
    const result = this.http.delete<any>(`${environment.apiUrl}/songs/${id}`);

    return result
  }
}
