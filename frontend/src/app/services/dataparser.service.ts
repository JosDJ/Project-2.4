import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environment';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class DataparserService {

  constructor(private http: HttpClient) {
  }

  uploadSongEntry(id:string, title:string, artist_ids:[string]): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = new HttpParams()
      .set('id', id)
      .set('title', title)
      .set('artist_ids', artist_ids[0])
      artist_ids.forEach(ids =>{
        if (ids == '0'){
          console.log('ja skip die 0 maar gwn aub')
        }else{
          body.append('artist_ids', ids)
        }
      })


    const result = this.http.post<any>(`${environment.apiUrl}/songs/create`, body, httpOptions);

    return result
  }
}