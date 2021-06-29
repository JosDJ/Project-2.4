import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/app/environment';
import { stringify } from '@angular/compiler/src/util';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Genre } from 'src/app/interfaces/genre';
import { async } from '@angular/core/testing';
import { timeout } from 'rxjs/operators';
import { SongIn } from 'src/app/interfaces/songin';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  uploadedSong:any;
  errorMsg:string = '';
  uploadedSongs:any[] = [];

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

  selectedFile: File | null = null;
  selectedFileName: string = "";
  message: string = "";
  selectedImage: File | null = null;
  imgURL = "assets/addimage.png";

  constructor(private http:HttpClient,
    private dataParser:FileService
  ) { 
    http.get<Genre[]>(`${environment.apiUrl}/genres`).subscribe(genre => this.genres = genre);
  }
  
  ngOnInit(): void {
  }

  upload(): void {
    if (this.selectedImage != null && this.uploadedSongs.length != 0){
      if (this.titleAlbum != '' && this.artistAlbum != '' && this.releasedateAlbum != '') {
        console.log(this.selectedImage)
        this.dataParser.uploadAlbumCover(this.selectedImage).subscribe(uploadedFile => console.log(uploadedFile))
      }
    }
  }

  addSong(event?: MouseEvent) {
    if (this.selectedFile != null) {
      if (this.titleSong != '' && this.artistSong != '') {
        this.errorMsg = '';
        this.dataParser.uploadSongFile(this.selectedFile).subscribe(uploadedFile => this.uploadedSong = uploadedFile);
        setTimeout(() => {
          const artistSongList:number[] = [1];
          const foo:SongIn = {title: this.titleSong, artist_ids: artistSongList, file_id: this.uploadedSong.id};
          this.dataParser.uploadSongEntry(foo).subscribe(uploadedSongEntry => this.uploadedSongs.push(uploadedSongEntry));
          this.nameArray.push(this.titleSong)
        }, 300);
      } else {
        this.errorMsg = 'De benodigde velden zijn nog leeg';
      }
    }
  }

  deleteSong(element:any){
    console.log('element = ' , element)
    this.nameArray= this.nameArray.filter((song: any) => song != element);
    this.uploadedSongs= this.uploadedSongs.filter((song:any) => song.title != element);
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

