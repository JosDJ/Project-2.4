import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationbuttonsComponent } from './navigationbuttons/navigationbuttons.component';

@NgModule({
  declarations: [
    NavigationbuttonsComponent
  ],
  exports: [
    NavigationbuttonsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NavigationbarModule { }
