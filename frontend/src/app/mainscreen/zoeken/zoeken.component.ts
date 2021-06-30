import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-zoeken',
  templateUrl: './zoeken.component.html',
  styleUrls: ['./zoeken.component.css']
})
export class ZoekenComponent implements OnInit {

  zoekterm:string= '';
  gevondenSongs:string[] = [];
  gevondenAlbums:string[] = [];

  constructor(private dataParser: FileService) { }

  ngOnInit(): void {
  }

  search(): void {
    //TODO de for loops moeten door alle bestaande waarden van de database loopen
    this.gevondenSongs = [];
    this.gevondenAlbums = [];
    for (let i = 0; i < 15; i++) {
      this.dataParser.getSongById(i).subscribe(song => {
        if (song.title.toLowerCase( ).includes(this.zoekterm.toLowerCase( ))){
          this.gevondenSongs.push(song.title);
        }
      });  
    }
    for (let i = 0; i < 15; i++) {
      this.dataParser.getAlbumById(i).subscribe(album => {
        if (album.title.toLowerCase( ).includes(this.zoekterm.toLowerCase( ))){
          this.gevondenAlbums.push(album.title);
        }
      });  
    }
  }

}
