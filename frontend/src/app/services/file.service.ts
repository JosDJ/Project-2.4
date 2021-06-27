import { HttpClient } from '@angular/common/http';
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
    http.get<Song>(`${environment.apiUrl}/songs/16`).subscribe(song => {
      this.files.push(song);

      this.stateChange.next(this.files);
    });
  }

  private stateChange: Subject<Song[]> = new Subject();

  getState(): Observable<Song[]> {
    return this.stateChange.asObservable();
  }
}
