import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicplayertimerComponent } from './musicplayertimer/musicplayertimer.component';
import { MusicplayerbuttonsComponent } from './musicplayerbuttons/musicplayerbuttons.component';



@NgModule({
  declarations: [
    MusicplayertimerComponent,
    MusicplayerbuttonsComponent
  ],
  exports: [
    MusicplayertimerComponent,
    MusicplayerbuttonsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MusicplayerModule { }
