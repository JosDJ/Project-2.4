import { Component, OnInit } from '@angular/core';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  state: StreamState | undefined;

  constructor(private audioService: AudioService) {
    audioService.getState().subscribe(state => {
      this.state = state;
    });
  }

  playStream(url: string) {
    this.audioService.playStream(url);
  }

  openFile(url: string) {
    this.audioService.pause()

    this.playStream(url);
  }

  ngOnInit(): void {
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

}
