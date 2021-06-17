import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './loginscreen/login/login.component';

import { HomeComponent } from './mainscreen/home/home.component';
import { LuisterenComponent } from './mainscreen/luisteren/luisteren.component';
import { MijnaccountComponent } from './mainscreen/mijnaccount/mijnaccount.component';
import { UploadComponent } from './mainscreen/upload/upload.component';
import { ZoekenComponent } from './mainscreen/zoeken/zoeken.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard] },
  { path: 'luisteren', component: LuisterenComponent,
    canActivate: [AuthGuard] },
  { path: 'mijnaccount', component: MijnaccountComponent,
    canActivate: [AuthGuard] },
  { path: 'upload', component: UploadComponent,
    canActivate: [AuthGuard] },
  { path: 'zoeken', component: ZoekenComponent,
    canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
