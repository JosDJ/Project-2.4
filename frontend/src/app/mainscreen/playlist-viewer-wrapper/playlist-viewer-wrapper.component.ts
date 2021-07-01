import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Playlist } from 'src/app/interfaces/playlist';
import { AuthService } from 'src/app/services';
import { ApiService } from 'src/app/services/file.service';

@Component({
  selector: 'app-playlist-viewer-wrapper',
  templateUrl: './playlist-viewer-wrapper.component.html',
  styleUrls: ['./playlist-viewer-wrapper.component.css']
})
export class PlaylistViewerWrapperComponent implements OnInit {
  playlist: Playlist | null = null;
  errorMsg: string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiService.getPlaylistById(params.id).subscribe(playlist => this.playlist = playlist, err => {
        this.errorMsg = 'Playlist niet gevonden';
      });
    });
  }
}
