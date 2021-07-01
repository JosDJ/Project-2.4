import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';
import { ApiService } from 'src/app/services/file.service';

@Component({
  selector: 'app-luisterenplaylists',
  templateUrl: './luisterenplaylists.component.html',
  styleUrls: ['./luisterenplaylists.component.css']
})
export class LuisterenplaylistsComponent implements OnInit {
  playlists: Playlist[] = [
  ];
  errorMsg: string = '';
  hasError: boolean = false;

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) { 
    this.apiService.getPlaylists().subscribe(playlists => this.playlists = playlists, err => {
      this.errorMsg = 'Geen playlists gevonden.';
      this.hasError = true;
    });
  }

  ngOnInit(): void {
  }

  goToPlaylist(id: number) {
    this.router.navigate([`/luisteren/playlists/${id}`]);
  }
}
