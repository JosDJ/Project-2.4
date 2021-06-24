import { Component, OnInit } from '@angular/core';
import { DataparserService } from 'src/app/services/dataparser.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  
  constructor(
    private dataParser:DataparserService,
  ) { }
  
  ngOnInit(): void {
    
  }

  upload(title:string, artist_ids:[string]): void{
    const id = Math.random().toString();
    this.dataParser.uploadSongEntry(id,title,artist_ids);
  }
}
