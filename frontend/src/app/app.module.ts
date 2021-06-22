import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavigationbarModule } from './navigationbar/navigationbar.module';
import { MainscreenModule } from './mainscreen/mainscreen.module';
import { MusicplayerModule } from './musicplayer/musicplayer.module';
import { LoginscreenModule } from './loginscreen/loginscreen.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { LoginComponent } from './loginscreen/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './services';
import { HttpClientModule } from '@angular/common/http';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthenticationInterceptor} from './authentication.interceptor';

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
    MainscreenModule,
    LoginscreenModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    LoginComponent,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


