import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './loginscreen/login/login.component';

import { HomeComponent } from './mainscreen/home/home.component';
import { LuisterenComponent } from './mainscreen/luisteren/luisteren.component';
import { LuisterenfavorietenComponent } from './mainscreen/luisterenfavorieten/luisterenfavorieten.component';
import { LuisterengenresComponent } from './mainscreen/luisterengenres/luisterengenres.component';
import { LuisterenplaylistsComponent } from './mainscreen/luisterenplaylists/luisterenplaylists.component';
import { LuisterenrecentComponent } from './mainscreen/luisterenrecent/luisterenrecent.component';
import { MijnaccountComponent } from './mainscreen/mijnaccount/mijnaccount.component';
import { UploadComponent } from './mainscreen/upload/upload.component';
import { ZoekenComponent } from './mainscreen/zoeken/zoeken.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'luisteren', component: LuisterenComponent, canActivate: [AuthGuard] },
  { path: 'luisteren/favorieten', component: LuisterenfavorietenComponent, canActivate: [AuthGuard] },
  { path: 'luisteren/genres', component: LuisterengenresComponent, canActivate: [AuthGuard] },
  { path: 'luisteren/playlists', component: LuisterenplaylistsComponent, canActivate: [AuthGuard] },
  { path: 'luisteren/recent', component: LuisterenrecentComponent, canActivate: [AuthGuard] },
  { path: 'mijnaccount', component: MijnaccountComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] },
  { path: 'zoeken', component: ZoekenComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
