import { Component, Input, OnInit } from '@angular/core';

import * as _ from 'lodash';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-playlist-viewer',
  templateUrl: './playlist-viewer.component.html',
  styleUrls: ['./playlist-viewer.component.css']
})
export class PlaylistViewerComponent implements OnInit {
  @Input()
  playlist: Playlist | null = null;

  state: StreamState | null = null;

  durations: string[] = [];

  constructor(private audioService: AudioService) {
    this.audioService.getState().subscribe(state => this.state = state);
  }

  ngOnInit(): void {

  }

  playSong(song: Song) {
    if (this.playlist) {
      this.audioService.stop();

      this.audioService.setQueue(this.playlist.songs).subscribe(queue => {
        this.audioService.playSong(song).subscribe();
      });
    }
  }

  play(song: Song) {
    if (song != this.state?.currentSong?.song)
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
