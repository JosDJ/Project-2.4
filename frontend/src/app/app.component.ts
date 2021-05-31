import { Component } from '@angular/core';
import { LoginComponent } from './loginscreen/login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  visible: boolean | undefined;

  constructor(
    private loginComponent: LoginComponent
  ) { }

  title = 'frontend';

  desired_rowHeight = '3rem';
  
  exampleMethodParent($event: any){
    console.log("anderetest "+this.visible)
    this.visible = $event;
    console.log("anderetest2 "+this.visible)
  }

}
