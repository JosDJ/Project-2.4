import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigationbuttons',
  templateUrl: './navigationbuttons.component.html',
  styleUrls: ['./navigationbuttons.component.css']
})
export class NavigationbuttonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
    myFunction() {
      var x: any = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }

}
