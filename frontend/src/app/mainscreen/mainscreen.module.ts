import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { LuisterenComponent } from './luisteren/luisteren.component';
import { ZoekenComponent } from './zoeken/zoeken.component';
import { MijnaccountComponent } from './mijnaccount/mijnaccount.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card'
import { LuisterenfavorietenComponent } from './luisterenfavorieten/luisterenfavorieten.component';
import { RouterModule } from '@angular/router';
import { LuisterengenresComponent } from './luisterengenres/luisterengenres.component';
import { LuisterenplaylistsComponent } from './luisterenplaylists/luisterenplaylists.component';
import { LuisterenrecentComponent } from './luisterenrecent/luisterenrecent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaylistViewerComponent } from './playlist-viewer/playlist-viewer.component';
import { AlbumViewerComponent } from './album-viewer/album-viewer.component';
import { MatDividerModule } from '@angular/material/divider';
import { FormatTimePipe } from '../pipes/format-time.pipe';
import { GetTotalDurationPipe } from '../pipes/get-total-duration.pipe';
import { GetFullYearPipe } from '../pipes/get-full-year.pipe';
import { SelectIfTruePipe } from '../pipes/select-if-true.pipe';
import { CountriesEqualPipe } from '../pipes/countries-equal.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    UploadComponent,
    LuisterenComponent,
    ZoekenComponent,
    MijnaccountComponent,
    LuisterenfavorietenComponent,
    LuisterengenresComponent,
    LuisterenplaylistsComponent,
    LuisterenrecentComponent,
    PlaylistViewerComponent,
    AlbumViewerComponent,
    FormatTimePipe,
    GetTotalDurationPipe,
    GetFullYearPipe,
    SelectIfTruePipe,
    CountriesEqualPipe
  ],
  exports: [
    HomeComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDividerModule
  ]
})
export class MainscreenModule { }
