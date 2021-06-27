import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { DataparserService } from 'src/app/services/dataparser.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  
  title:string = '';
  artist:string = '';
  genre:string = '';
  releasedate:string = '';

  constructor(
    private dataParser:DataparserService,
  ) { }

  ngOnInit(): void {
  }
  
  getRandomInt() {
    return Math.floor(Math.random() * 1000000000000);
  }

  onSubmit(title:string, artistid:string) {
    var foo:string[] = []; 
    foo.push(artistid)
    this.upload(title, foo)
  }

  upload(title:string, artist_ids:string[]): void{
    const id = this.getRandomInt().toString();
    this.dataParser.uploadSongEntry(id,title,artist_ids);
  }
}
