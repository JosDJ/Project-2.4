import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { environment } from '../environment';
import { FileUploaded } from '../interfaces/file-uploaded';
import { Song } from '../interfaces/song';

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

  uploadSongEntry(song: Song): Observable<any> {
    const result = this.http.post<any>(`${environment.apiUrl}/songs/create`, song);
    
    return result
  }
}
