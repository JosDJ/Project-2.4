import { FileService } from 'src/app/services/file.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

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

  constructor(private http: HttpClient,
    private dataParser: FileService
  ) { }

  selectedFile = null;
  selectedFileName = "";
  message = "";
  selectedImage = null;
  imgURL = "assets/addimage.png";

  listData: any = [];//on screen names
  fileList: any = [];// the music files
  ngOnInit(): void {
  }

  upload(): void {
  }

  addSong(event?: MouseEvent) {
    if (this.selectedFile != null) {
      this.dataParser.uploadSongFile(this.selectedFile).subscribe(uploadedFile => console.log(uploadedFile));


      this.listData.push(this.selectedFileName)
      this.fileList.push(this.selectedFile)
    }


  }
  onImageSelect(event: any) {
    console.log(event);
    this.selectedImage = event.target.files[0];
  }

  preview(files: any) {

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = String(reader.result);

  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name;
  }
}

