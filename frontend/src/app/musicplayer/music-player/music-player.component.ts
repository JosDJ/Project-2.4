import { Component, OnInit } from '@angular/core';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';
import { FileService } from 'src/app/services/file.service';
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
    canplay: false,
    error: false
  };

  songs: Song[] = [];

  currentSong: any = {};

  constructor(private audioService: AudioService, private fileService: FileService) {
    this.audioService.getState().subscribe(state => {
      this.state = state;
    });

    this.fileService.getState().subscribe(songs => {
      this.songs = songs;
    });
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe((events) => {

    });
  }

  playSong(song: Song, index: number) {
    this.currentSong = { index, song };

    this.audioService.stop()

    this.playStream(song.file.filepath);
  }

  ngOnInit(){
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
    const index = this.currentSong.index + 1;
    const song = this.songs[index];

    this.playSong(song, index);
  }

  previous() {
    const index = this.currentSong.index - 1;
    const song = this.songs[index];

    this.playSong(song, index);
  }

  isFirstPlaying(): boolean {
    return this.currentSong.index === 0;
  }

  isLastPlaying(): boolean {
    return this.currentSong.index === this.songs.length - 1;
  }

  onSliderChangeEnd(change: any) {
    this.audioService.seekTo(change.value);
  }

}
