import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';

@Component({
  selector: 'app-luisterenfavorieten',
  templateUrl: './luisterenfavorieten.component.html',
  styleUrls: ['./luisterenfavorieten.component.css']
})
export class LuisterenfavorietenComponent implements OnInit {
  playlist: Playlist = {id: 0, title: 'Favorieten', songs: []};
  hasError: boolean = false;
  errorMsg: string = '';

  constructor(private http: HttpClient) {
    this.http.get<Song[]>(`${environment.apiUrl}/favorites`).subscribe(songs => {
      if (this.playlist){
        this.playlist.songs = songs;

        if (this.playlist.songs.length == 0) {
          this.hasError = true;
          this.errorMsg = 'Geen favorieten gevonden.';
        }
      }
    }, err => {
      this.hasError = true;
      this.errorMsg = 'Geen favorieten gevonden.';
    });
  }

  ngOnInit(): void {
  }
}
