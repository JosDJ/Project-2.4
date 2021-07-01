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
  songs: Song[] = [];
  playlist: Playlist | null = null;

  constructor(private http: HttpClient) {
    this.http.get<Song[]>(`${environment.apiUrl}/favorites`).subscribe(songs => this.songs = songs);
  }

  ngOnInit(): void {
  }
}
