import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FloorPipe } from '../pipes/floor.pipe';
import { IsFirstPlayingPipe } from '../pipes/is-first-playing.pipe';
import { IsLastPlayingPipe } from '../pipes/is-last-playing.pipe';
import { IsTruePipe } from '../pipes/is-true.pipe';



@NgModule({
  declarations: [
    MusicPlayerComponent,
    FloorPipe,
    IsFirstPlayingPipe,
    IsLastPlayingPipe,
    IsTruePipe
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
