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

  // activePlaylist: Playlist | null = null;
  activePlaylist: Playlist | null = {
    id: 1,
    title: "Test Playlist",
    songs: [
      {
        id: 1,
        title: "Song 1",
        artists: [
          {
            id: 1,
            name: "Metallica"
          },
          {
            id: 2,
            name: "Slayer"
          },
          {
            id: 2,
            name: "Megadeth"
          }
        ],
        album_id: 1,
        file: {
          id: 1,
          filetype: "audio/mpeg",
          filepath: "http://localhost:8000/static_files/music/2e768149f56f4fe2a7a0e27d4bbf4eaf.mp3"
        }
      },
      {
        id: 2,
        title: "Song 2",
        artists: [
          {
            id: 1,
            name: "Metallica"
          },
          {
            id: 2,
            name: "Slayer"
          },
          {
            id: 2,
            name: "Megadeth"
          }
        ],
        album_id: 1,
        file: {
          id: 1,
          filetype: "audio/mpeg",
          filepath: "http://localhost:8000/static_files/music/2e768149f56f4fe2a7a0e27d4bbf4eaf.mp3"
        }
      }
    ]
  };

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
