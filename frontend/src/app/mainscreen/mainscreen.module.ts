import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { UploadComponent } from './upload/upload.component';



@NgModule({
  declarations: [
    HomeComponent,
    UploadComponent
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
