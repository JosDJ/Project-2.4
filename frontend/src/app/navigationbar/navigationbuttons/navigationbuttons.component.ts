import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-navigationbuttons',
  templateUrl: './navigationbuttons.component.html',
  styleUrls: ['./navigationbuttons.component.css']
})
export class NavigationbuttonsComponent implements OnInit {

  constructor(
    private authService : AuthService
  ) {}

  ngOnInit(): void {
  }

  isLoggedIn() {
    const token = localStorage.getItem("token");
    if(token==null) {
      return false;
    }
    return true
  }

  logout():void {
    this.authService.logout();
  }
  
  openTopnav() {
    var x: any = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
}
