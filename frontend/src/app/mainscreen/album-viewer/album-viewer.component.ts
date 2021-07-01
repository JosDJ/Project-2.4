import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/app/environment';
import { Album } from 'src/app/interfaces/album';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { ApiService } from 'src/app/services/file.service';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {
  album: Album | null = {
    id: 1,
    title: '',
    artist: {
      id: 1,
      name: ''
    },
    genre: {
      id: 1,
      title: ''
    },
    release_date: '',
    songs: [],
    album_cover: {
      id: 1,
      filetype: '',
      filepath: ''
    }
  };

  apiEndpoint: string = environment.apiUrl;

  state: StreamState | null = null;

  durations: string[] = [];

  currentSong: Song | null = null;

  constructor(private route: ActivatedRoute, private audioService: AudioService, private apiService: ApiService) {
    this.audioService.getState().subscribe(state => this.state = state);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.apiService.getAlbumById(params.id).subscribe(album => {
        this.album = album;

        if (!this.album.album_cover) {
          this.album.album_cover = {
            id: 1,
            filetype: 'image/png',
            filepath: ""
          }
        }
      });
    });
  }

  playSong(song: Song) {
    this.currentSong = song;

    this.audioService.stop();

    this.audioService.playSong(song).subscribe();
  }

  play(song: Song) {
    if (song != this.currentSong)
    {
      this.playSong(song);
    }
    else {
      this.audioService.play();
    }
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }
}
