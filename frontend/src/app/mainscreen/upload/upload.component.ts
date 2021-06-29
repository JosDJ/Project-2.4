import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/app/environment';
import { stringify } from '@angular/compiler/src/util';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Genre } from 'src/app/interfaces/genre';
import { async } from '@angular/core/testing';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadedSong:any;

  title: string = '';
  artist: string = '';
  titleSong: string = '';
  artistSong: string = '';
  titleAlbum: string = '';
  genreAlbum: string = '';
  artistAlbum: string = '';
  releasedateAlbum: string = '';
  genre: string = '';
  releasedate: string = '';

  genres:Genre[] = [];
  nameArray:any=[];//on screen names
  fileArray:any=[];// the music files

  selectedFile: File | null = null;
  selectedFileName: string = "";
  message: string = "";
  selectedImage = null;
  imgURL = "assets/addimage.png";

  constructor(private http:HttpClient,
    private dataParser:FileService
  ) { 
    http.get<Genre[]>(`${environment.apiUrl}/genres`).subscribe(genre => this.genres = genre);
  }
  
  ngOnInit(): void {
  }

  upload(): void {
  }

  addSong(event?: MouseEvent) {
    if (this.selectedFile != null) {
      this.dataParser.uploadSongFile(this.selectedFile).subscribe(async uploadedFile => this.uploadedSong = uploadedFile);
      setTimeout(() => {
        console.log('foo', this.uploadedSong.id)
        this.nameArray.push(this.selectedFileName)
        this.fileArray.push(this.selectedFile)
      }, 300);
    }
  }

  deleteSong(element:any){
    this.nameArray= this.nameArray.filter((song: any) => song != element);
    this.fileArray= this.fileArray.filter((song: any) => song.name != element);
  }

  onImageSelect(event: any){
    this.selectedImage = event.target.files[0];
  }

  preview(files: any) {

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = String(reader.result);
  }
  
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
    
  }
}

