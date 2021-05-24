import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-musicplayerbuttons',
  templateUrl: './musicplayerbuttons.component.html',
  styleUrls: ['./musicplayerbuttons.component.css']
})
export class MusicplayerbuttonsComponent implements OnInit {

  showFirst!: boolean;

  constructor() { }

  ngOnInit(): void {
  }
}
