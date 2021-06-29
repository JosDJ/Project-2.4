import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';

@Component({
  selector: 'app-luisterenplaylists',
  templateUrl: './luisterenplaylists.component.html',
  styleUrls: ['./luisterenplaylists.component.css']
})
export class LuisterenplaylistsComponent implements OnInit {
  playlists: Playlist[] = [
  ];

  activePlaylist: Playlist | null = null;

  constructor(private http: HttpClient) { 
    http.get<Playlist[]>(`${environment.apiUrl}/playlists`).subscribe(playlists => this.playlists = playlists);
  }

  ngOnInit(): void {
  }

  openPlaylist(playlist: Playlist) {
    this.activePlaylist = playlist;
  }

  resetPlaylist() {
    this.activePlaylist = null;
  }

}
