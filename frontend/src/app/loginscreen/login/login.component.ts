import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginscreenModule } from '../loginscreen.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() exampleOutput = new EventEmitter<boolean>();
  visible = false;
  loginClicked(){
    this.visible = !this.visible;
    console.log("test123" + this.visible)
    this.exampleOutput.emit(this.visible);
  }

}
