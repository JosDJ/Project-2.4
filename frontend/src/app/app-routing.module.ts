import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './mainscreen/home/home.component';
import { LuisterenComponent } from './mainscreen/luisteren/luisteren.component';
import { MijnaccountComponent } from './mainscreen/mijnaccount/mijnaccount.component';
import { UploadComponent } from './mainscreen/upload/upload.component';
import { ZoekenComponent } from './mainscreen/zoeken/zoeken.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'luisteren', component: LuisterenComponent },
  { path: 'mijnaccount', component: MijnaccountComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'zoeken', component: ZoekenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
