import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/app/environment';
import { stringify } from '@angular/compiler/src/util';
import { HttpBackend, HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Genre } from 'src/app/interfaces/genre';
import { async } from '@angular/core/testing';
import { timeout } from 'rxjs/operators';
import { SongIn } from 'src/app/interfaces/songin';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Song } from 'src/app/interfaces/song';
import { AlbumIn } from 'src/app/interfaces/albumin';
import { ArtistIn } from 'src/app/interfaces/artistIn';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  uploadArtistForm: FormGroup = new FormGroup({
    newArtist: new FormControl('', [
      Validators.required,
      Validators.maxLength(50)
    ])
  });
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
    artist: new FormControl(null, [
      Validators.required
    ]),
    genre_id: new FormControl(null, [
      Validators.required
    ]),
    song_ids: new FormControl([], [
      Validators.required
    ]),
    albumCover: new FormControl(null, [
      Validators.required
    ])
  });

  uploadedSong: any;
  errorMsg: string = '';
  errorMsgg: string = '';
  errorMsggg: string = '';
  uploadedSongs: Song[] = [];
  songToDelete: Song | null | undefined = null;
  UploadedCover: any = null;
  uploadedSongIds: number[] = [];

  title: string = '';
  artist: string = '';
  titleAlbum: string = '';
  genreAlbum: string = '';
  artistAlbum: string = '';
  releasedateAlbum: string = '';
  genre: string = '';
  releasedate: string = '';

  genres: Genre[] = [];

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

  getNewArtist(): string {
    return this.uploadArtistForm.get('newArtist')?.value;
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

  getAlbumTitle(): string {
    return this.uploadAlbumForm.get('title')?.value;
  }

  getAlbumReleaseDate(): Date {
    return this.uploadAlbumForm.get('releaseDate')?.value;
  }

  getAlbumArtistID(): number {
    return this.uploadAlbumForm.get('artist_id')?.value;
  }

  getAlbumGenreID(): number {
    return this.uploadAlbumForm.get('genre_id')?.value;
  }

  getAlbumSongIDs(): number[] {
    return this.uploadAlbumForm.get('song_ids')?.value;
  }

  getAlbumCover(): File {
    return this.uploadAlbumForm.get('albumCover')?.value;
  }

  addArtist(): void {
    if (this.uploadArtistForm.valid) {
      this.errorMsggg = '';
      const artistToAdd: ArtistIn = {
        name: this.getNewArtist(),
      }
      this.dataParser.uploadNewArtist(artistToAdd).subscribe(addedArtist => this.errorMsggg = 'De artiest: ' + addedArtist.name + ' is succesvol toegevoegd');
    }else {
      this.errorMsggg = 'Het invul veld is nog leeg';
    }
  }

  upload(): void {
    if (this.uploadAlbumForm.valid) {
      this.errorMsgg = '';
      this.dataParser.uploadAlbumCover(this.getAlbumCover()).subscribe(uploadedFile => {
        const album: AlbumIn = {
          title: this.getAlbumTitle(),
          // artist_id: this.getAlbumArtistID(),
          artist_id: 1, // TODO: artist id uit de backend halen
          release_date: this.getAlbumReleaseDate(),
          genre_id: this.getAlbumGenreID(),
          song_ids: this.uploadedSongIds,
          album_cover_id: uploadedFile.id
        };
        
        this.dataParser.uploadAlbum(album).subscribe((uploadedAlbum) => this.errorMsgg = 'Het album: ' + uploadedAlbum.title + ' is succesvol toegevoegd')
      });
    }
    else {
      this.errorMsgg = 'Niet alle velden zijn ingevuld.';
    }
  }

  addSong(event?: MouseEvent) {
    if (this.uploadSongForm.valid) {
      if (!this.uploadedSongs.find(s => s.title === this.getSongTitle())) {
        this.errorMsg = '';

        this.dataParser.uploadSongFile(this.uploadSongForm.get('file')?.value).subscribe(uploadedFile => {
          const artist_ids = [1]; // TODO: artiesten van de backend halen
          const song: SongIn = {
            title: this.getSongTitle(),
            artist_ids: artist_ids,
            file_id: uploadedFile.id
          }

          this.dataParser.uploadSong(song).subscribe(uploadedSong => {
            this.uploadedSongs.push(uploadedSong);
            this.uploadedSongIds.push(uploadedSong.id);
            this.uploadAlbumForm.patchValue({song_ids:uploadedSong.id});
            this.errorMsg = 'Song is succesvol toegevoegd';
          });
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
    // this.selectedImage = event.target.files[0];

    this.uploadAlbumForm.patchValue({ albumCover: event.target.files[0] });
    this.uploadAlbumForm.get('albumCover')?.updateValueAndValidity();
  }

  preview(files: any) {

    var reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.imgURL = String(reader.result);
  }

  onFileSelected(event: any) {
    this.uploadSongForm.patchValue({ file: event.target.files[0] });
    this.uploadSongForm.get('file')?.updateValueAndValidity();
  }
}

