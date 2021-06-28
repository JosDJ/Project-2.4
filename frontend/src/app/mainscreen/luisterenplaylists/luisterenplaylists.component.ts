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
    {
      id: 1,
      title: "Playlist 1",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 2",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 3",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 4",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 5",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 6",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 7",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 8",
      songs: []
    },
    {
      id: 1,
      title: "Playlist 9",
      songs: []
    },
  ];

  constructor(private http: HttpClient) { 
    //http.get<Playlist[]>(`${environment.apiUrl}/playlists`).subscribe(playlists => this.playlists = playlists);
  }

  ngOnInit(): void {
  }

}
