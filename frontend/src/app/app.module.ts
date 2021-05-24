import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationbarModule } from './navigationbar/navigationbar.module';
import { MainscreenModule } from './mainscreen/mainscreen.module';
import { MusicplayerModule } from './musicplayer/musicplayer.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavigationbarModule,
    BrowserAnimationsModule,
    MusicplayerModule,
    MatSliderModule,
    MatGridListModule,
    MainscreenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
