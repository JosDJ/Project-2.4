import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { Genre } from 'src/app/interfaces/genre';

@Component({
  selector: 'app-luisterengenres',
  templateUrl: './luisterengenres.component.html',
  styleUrls: ['./luisterengenres.component.css']
})
export class LuisterengenresComponent implements OnInit {
  genres: Genre[] = [];

  constructor(private http: HttpClient) { 
    this.http.get<Genre[]>(`${environment.apiUrl}/genres`).subscribe(genres => this.genres = genres);
  }

  ngOnInit(): void {
  }
}
