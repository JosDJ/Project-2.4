import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';
import { LuisterenComponent } from './luisteren/luisteren.component';
import { ZoekenComponent } from './zoeken/zoeken.component';
import { MijnaccountComponent } from './mijnaccount/mijnaccount.component';


@NgModule({
  declarations: [
    HomeComponent,
    UploadComponent,
    LuisterenComponent,
    ZoekenComponent,
    MijnaccountComponent
  ],
  exports: [
    HomeComponent,
    UploadComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainscreenModule { }