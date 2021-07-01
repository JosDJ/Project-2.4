import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment';
import { Album } from 'src/app/interfaces/album';
import { Song } from 'src/app/interfaces/song';
import { ApiService } from 'src/app/services/file.service';

@Component({
  selector: 'app-zoeken',
  templateUrl: './zoeken.component.html',
  styleUrls: ['./zoeken.component.css']
})
export class ZoekenComponent implements OnInit {

  zoekterm:string= '';
  gevondenSongs: Song[] = [];
  gevondenAlbums: Album[] = [];
  error!: string;
  errorAlbums!: string;

  environment = environment;

  constructor(private dataParser: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  search(): void {
    this.error = '';
    this.errorAlbums = '';
    this.gevondenSongs  = [];
    this.gevondenAlbums = [];
    if (this.zoekterm == ''){

    }else{
      this.dataParser.getallSongsByTitle(this.zoekterm).subscribe(songs => {
        this.gevondenSongs = songs;
      },
      (error: string) => {
        this.error = 'no songs found';
      })
      this.dataParser.getallAlbumsByTitle(this.zoekterm).subscribe(albums => {
        this.gevondenAlbums = albums;
      },
      (errorAlbums: string) => {
        this.errorAlbums = 'no albums found';
      })
    }  
  }

  goToAlbum(id: number) {
    this.router.navigate([`/luisteren/albums/${id}`]);
  }

}
