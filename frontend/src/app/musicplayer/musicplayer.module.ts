import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';



@NgModule({
  declarations: [
    MusicPlayerComponent
  ],
  exports: [
    MusicPlayerComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatGridListModule
  ]
})
export class MusicplayerModule { }
