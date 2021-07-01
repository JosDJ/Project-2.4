import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/file.service';

@Component({
  selector: 'app-zoeken',
  templateUrl: './zoeken.component.html',
  styleUrls: ['./zoeken.component.css']
})
export class ZoekenComponent implements OnInit {

  zoekterm:string= '';
  gevondenSongs:string[] = [];
  gevondenAlbums:string[] = [];

  constructor(private dataParser: ApiService) { }

  ngOnInit(): void {
  }

  search(): void {
    this.gevondenSongs = [];
    this.gevondenAlbums = [];
    this.dataParser.getallSongsByTitle(this.zoekterm).subscribe(songs => {
      for(let i=0; i<songs.length; i++){
        this.gevondenSongs.push(songs[i].title);
      }
    })
    this.dataParser.getallAlbumsByTitle(this.zoekterm).subscribe(albums => {
      for(let i=0; i<albums.length; i++){
        this.gevondenAlbums.push(albums[i].title);
      }
    })
  }

}
