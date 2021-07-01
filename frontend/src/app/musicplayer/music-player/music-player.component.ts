import { Component, OnInit } from '@angular/core';
import { CurrentSong } from 'src/app/interfaces/current-song';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { ApiService } from 'src/app/services/file.service';
import { Queue } from 'src/app/utilities/queue';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.css']
})
export class MusicPlayerComponent implements OnInit {
  state: StreamState = {
    playing: false,
    readableCurrentTime: '00:00',
    readableDuration: '00:00',
    duration: 0,
    currentTime: 0,
    currentSong: undefined,
    canplay: false,
    error: false
  };

  queue: Song[] = [];

  constructor(private audioService: AudioService, private fileService: ApiService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;

      if (this.state.duration != 0) {
        if (this.state.currentTime == this.state.duration && !this.isLastPlaying()) {
          setTimeout(() => {
            this.next()
          }, 1000);
        }
      }
    });

    this.audioService.getQueue().subscribe(queue => this.queue = queue);
  }

  playStream(song: Song) {
    this.audioService.playSong(song).subscribe((events) => {

    });
  }

  playSong(song: Song, index: number) {
    this.state.currentSong = { index, song };

    this.audioService.stop()

    this.playStream(song);
  }

  ngOnInit() {
  }

  play() {
    this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    this.audioService.next();
  }

  previous() {
    this.audioService.previous();
  }

  isFirstPlaying(): boolean {
    return this.state.currentSong?.index === 0;
  }

  isLastPlaying(): boolean {
    return this.state.currentSong?.index === this.queue.length - 1;
  }

  onSliderChangeEnd($event: Event) {
    const value: string = ($event.target as HTMLInputElement).value;

    console.log(value);

    this.audioService.seekTo(parseFloat(value));
  }

}
