import { Component, Input, OnInit } from '@angular/core';
import { Playlist } from 'src/app/interfaces/playlist';
import { Song } from 'src/app/interfaces/song';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-playlist-viewer',
  templateUrl: './playlist-viewer.component.html',
  styleUrls: ['./playlist-viewer.component.css']
})
export class PlaylistViewerComponent implements OnInit {
  @Input()
  playlist: Playlist | undefined;
  
  constructor(private audioService: AudioService) { }

  ngOnInit(): void {
    this.playlist?.songs.forEach(song => {
      console.log(this.artistsToString(song));
    });
  }

  artistsToString(song: Song): string {
    console.log(song.artists);

    return song.artists.map(artist => artist.name).join(', ');
  }
}
