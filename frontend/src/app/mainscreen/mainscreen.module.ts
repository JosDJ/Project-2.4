import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { LuisterenComponent } from './luisteren/luisteren.component';
import { ZoekenComponent } from './zoeken/zoeken.component';
import { MijnaccountComponent } from './mijnaccount/mijnaccount.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { LuisterenfavorietenComponent } from './luisterenfavorieten/luisterenfavorieten.component';
import { RouterModule } from '@angular/router';
import { LuisterengenresComponent } from './luisterengenres/luisterengenres.component';
import { LuisterenplaylistsComponent } from './luisterenplaylists/luisterenplaylists.component';
import { LuisterenrecentComponent } from './luisterenrecent/luisterenrecent.component';
import { FormsModule } from '@angular/forms';

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
    LuisterenrecentComponent
  ],
  exports: [
    HomeComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    RouterModule,
    FormsModule
  ]
})
export class MainscreenModule { }
