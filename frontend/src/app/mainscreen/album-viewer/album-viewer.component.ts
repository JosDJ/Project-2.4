import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { Album } from 'src/app/interfaces/album';
import { Song } from 'src/app/interfaces/song';
import { StreamState } from 'src/app/interfaces/stream-state';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-album-viewer',
  templateUrl: './album-viewer.component.html',
  styleUrls: ['./album-viewer.component.css']
})
export class AlbumViewerComponent implements OnInit {
  @Input()
  album: Album | null = null;

  apiEndpoint: string = environment.apiUrl;

  state: StreamState | null = null;

  durations: string[] = [];

  currentSong: Song | null = null;

  constructor(private audioService: AudioService) {
    this.audioService.getState().subscribe(state => this.state = state);
  }

  ngOnInit(): void {
    this.album = {
      id: 1,
      title: "Test album",
      artist: {
        id: 1,
        name: "Iron Maiden"
      },
      release_date: new Date(1990, 1, 1),
      genre: {
        id: 1,
        title: "Metal"
      },
      songs: [
        {
          id: 1,
          title: "Song 1",
          artists: [
            {
              id: 1,
              name: "Metallica"
            },
            {
              id: 2,
              name: "Slayer"
            },
            {
              id: 2,
              name: "Megadeth"
            }
          ],
          album_id: 1,
          file: {
            id: 1,
            filetype: "audio/mpeg",
            filepath: "http://localhost:8000/static_files/music/2e768149f56f4fe2a7a0e27d4bbf4eaf.mp3",
            duration: 27
          }
        },
        {
          id: 1,
          title: "Song 2",
          artists: [
            {
              id: 1,
              name: "Metallica"
            },
            {
              id: 2,
              name: "Slayer"
            },
            {
              id: 2,
              name: "Megadeth"
            }
          ],
          album_id: 1,
          file: {
            id: 1,
            filetype: "audio/mpeg",
            filepath: "http://localhost:8000/static_files/music/2e768149f56f4fe2a7a0e27d4bbf4eaf.mp3",
            duration: 27
          }
        },
        {
          id: 1,
          title: "Song 3",
          artists: [
            {
              id: 1,
              name: "Metallica"
            },
            {
              id: 2,
              name: "Slayer"
            },
            {
              id: 2,
              name: "Megadeth"
            }
          ],
          album_id: 1,
          file: {
            id: 1,
            filetype: "audio/mpeg",
            filepath: "http://localhost:8000/static_files/music/2e768149f56f4fe2a7a0e27d4bbf4eaf.mp3",
            duration: 27
          }
        },
      ],
      album_cover: {
        id: 1,
        filetype: "image/png",
        filepath: "static_files/images/8e6750bf6a7948c1b8ea632236b5158d.png"
      }

    }

    // echt een hack dit maar ja haha
    this.album?.songs.forEach(song => {
      const audio = new Audio(song.file.filepath);

      audio.addEventListener('canplay', () => {
        this.durations.push(this.audioService.formatTime(audio.duration));
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

  formatTime(seconds: number): string {
    return this.audioService.formatTime(seconds);
  }
}
