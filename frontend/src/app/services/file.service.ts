import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, SkipSelf } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';

import { environment } from '../environment';
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

  uploadSongFile(songFile:any): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data',
        }),
      };
      
      console.log(songFile)

      // const body = new HttpParams()
      // .set('file', songFile)
      const body = new FormData();body.append('file',songFile);

      const result = this.http.post<any>(`${environment.apiUrl}/songs/upload`, body, httpOptions);

      result.subscribe();

      return result
  }

  uploadSongEntry(id:string, title:string, artist_ids:string[]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const body = new HttpParams()
      .set('id', id)
      .set('title', title)
      .set('artist_ids', artist_ids[0])
      artist_ids.forEach(ids =>{
        if (ids == artist_ids[0]){
          console.log('ja skip die eerste entry maar gwn aub')
        }else{
          body.append('artist_ids', ids)
        }
      })

    const result = this.http.post<any>(`${environment.apiUrl}/songs/create`, body, httpOptions);

    result.subscribe();

    return result
  }
}
