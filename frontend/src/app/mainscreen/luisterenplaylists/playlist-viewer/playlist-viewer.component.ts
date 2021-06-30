import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { FileService } from 'src/app/services/file.service';
import * as _ from 'lodash';

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

  currentSong: Song | null = null;

  constructor(private audioService: AudioService) {
    this.audioService.getState().subscribe(state => this.state = state);
  }

  ngOnInit(): void {
    // echt een hack dit maar ja haha
    this.playlist?.songs.forEach(song => {
      const audio = new Audio(song.file.filepath);

      audio.addEventListener('canplay', () => {
        this.durations.push(this.audioService.formatTime(audio.duration));
      });
    });
  }

  playSong(song: Song) {
    this.currentSong = song;

    this.audioService.stop();

    this.audioService.playStream(song.file?.filepath).subscribe();
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

  getDuration(url: string): number {
    const audio = new Audio(url);

    return audio.duration;
  }
}
