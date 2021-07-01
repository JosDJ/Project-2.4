import { ObserversModule } from '@angular/cdk/observers';
import { UrlResolver } from '@angular/compiler';
import { Injectable } from '@angular/core';
import * as moment from "moment";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from '../environment';
import { Song } from '../interfaces/song';
import { StreamState } from '../interfaces/stream-state';

// Based on: https://auth0.com/blog/building-an-audio-player-app-with-angular-and-rxjs/

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audio = new Audio();
  _stop = new Subject();

  constructor() {
    
  }

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    currentSong: undefined,
    canplay: false,
    error: false
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  private streamObservable(song: Song) {
    return new Observable(observer => {
      this.audio.src = environment.apiUrl + '/' + song.file.filepath;
      this.audio.load();
      this.audio.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event, song);

        observer.next(event);
      }

      this.addEvents(this.audio, this.audioEvents, handler);

      return () => {
        this.audio.pause()
        this.audio.currentTime = 0;

        this.removeEvents(this.audio, this.audioEvents, handler);

        this.resetState();
      }
    });
  }

  playSong(song: Song) {
    return this.streamObservable(song).pipe(takeUntil(this._stop));
  }

  private addEvents(obj: any, events: Array<string>, handler: any) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    })
  }

  private removeEvents(obj: any, events: Array<string>, handler: any) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }

  private updateStateEvents(event: Event, song: Song): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audio.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        this.state.currentSong = song;
        break;
      case "playing":
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audio.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      currentSong: undefined,
      canplay: false,
      error: false
    };
  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

  public play(): void {
    this.audio.play()
  }

  public pause(): void {
    this.audio.pause()
  }

  public stop(): void {
    this._stop.next();
  }

  public seekTo(seconds: number): void {
    this.audio.fastSeek(seconds);
  }

  public getDuration(): number {
    const duration: number = isNaN(this.audio.duration) || (!isFinite(this.audio.duration)) ? 0 : this.audio.duration;

    return duration;
  }

  public getCurrentTime(): number {
    return this.audio.currentTime;
  }

  public formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;

    return moment.utc(momentTime).format(format);
  }
}
