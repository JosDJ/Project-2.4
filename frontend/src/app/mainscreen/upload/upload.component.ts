import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/app/environment';
import { stringify } from '@angular/compiler/src/util';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Genre } from 'src/app/interfaces/genre';
import { async } from '@angular/core/testing';
import { timeout } from 'rxjs/operators';
import { SongIn } from 'src/app/interfaces/songin';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from 'src/app/interfaces/song';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadSongForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    artist: new FormControl('', [
      Validators.required
    ]),
    file: new FormControl(null, [
      Validators.required
    ])
  });

  uploadAlbumForm: FormGroup = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ]),
    releaseDate: new FormControl(new Date(), [
      Validators.required
    ]),
    artist_id: new FormControl(null, [
      Validators.required
    ]),
    genre_id: new FormControl(null, [
      Validators.required
    ]),
    song_ids: new FormControl([], [
      Validators.required
    ]),
    album_cover_id: new FormControl(null, [
      Validators.required
    ])
  });

  uploadedSong: any;
  errorMsg: string = '';
  errorMsgg: string = '';
  uploadedSongs: Song[] = [];
  songToDelete: Song | null | undefined = null;
  UploadedCover: any = null;

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

  genres: Genre[] = [];
  nameArray: any = [];//on screen names

  selectedFile: File | null = null;
  selectedFileName: string = "";
  message: string = "";
  selectedImage: File | null = null;
  imgURL = "assets/addimage.png";

  constructor(private http: HttpClient,
    private dataParser: FileService
  ) {
    http.get<Genre[]>(`${environment.apiUrl}/genres`).subscribe(genres => this.genres = genres);
  }

  ngOnInit(): void {
  }

  getSongTitle(): string {
    return this.uploadSongForm.get('title')?.value;
  }

  getSongArtist(): string {
    return this.uploadSongForm.get('artist')?.value;
  }

  getSongFile(): File {
    return this.uploadSongForm.get('file')?.value;
  }

  upload(): void {
    if (this.selectedImage != null && this.uploadedSongs.length != 0) {
      if (this.titleAlbum != '' && this.artistAlbum != '' && this.releasedateAlbum != '') {
        this.errorMsgg = '';
        console.log(this.selectedImage)
        this.dataParser.uploadAlbumCover(this.selectedImage).subscribe(uploadedFile => console.log(uploadedFile))
        setTimeout(() => {
          const artistgenreList: number[] = [1];
          // const foo:SongIn = {title: this.titleSong, artist_ids: artistSongList, file_id: this.uploadedSong.id};
          // this.dataParser.uploadSongEntry(foo).subscribe(uploadedSongEntry => this.uploadedSongs.push(uploadedSongEntry));
        }, 300);
      } else {
        this.errorMsgg = 'De benodigde velden zijn nog leeg';
      }
    } else {
      this.errorMsgg = 'U moet of nog een song adden of u moet uw album cover uploaden';
    }
  }

  addSong(event?: MouseEvent) {
    if (this.uploadSongForm.valid) {
      if (!this.nameArray.includes(this.getSongTitle())) {
        this.errorMsg = '';

        this.dataParser.uploadSongFile(this.uploadSongForm.get('file')?.value).subscribe(uploadedFile => {
          const artist_ids = [1]; // TODO: artiesten van de backend halen
          const song: SongIn = {
            title: this.getSongTitle(),
            artist_ids: artist_ids,
            file_id: uploadedFile.id
          }

          this.dataParser.uploadSong(song).subscribe(uploadedSong => this.uploadedSongs.push(uploadedSong));
        });
      }
      else {
        this.errorMsg = 'Bestand is al toegevoegd.';
      }
    }
    else {
      this.errorMsg = "Niet alle velden zijn ingevuld.";
    }
  }

  deleteSong(song: Song) {
    this.uploadedSongs = this.uploadedSongs.filter((s: Song) => s !== song);

    this.dataParser.deleteSong(song.id).subscribe(deletedSong => console.log(deletedSong));
  }

  onImageSelect(event: any) {
    this.selectedImage = event.target.files[0];
  }

  preview(files: any) {

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = String(reader.result);
  }

  onFileSelected(event: any) {
    this.uploadSongForm.patchValue({file: event.target.files[0]});
    this.uploadSongForm.get('file')?.updateValueAndValidity();

    // this.selectedFile = event.target.files[0];
    // this.selectedFileName = event.target.files[0].name;

  }
}

