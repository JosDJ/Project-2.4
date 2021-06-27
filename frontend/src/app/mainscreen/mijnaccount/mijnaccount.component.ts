import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environment';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-mijnaccount',
  templateUrl: './mijnaccount.component.html',
  styleUrls: ['./mijnaccount.component.css']
})
export class MijnaccountComponent implements OnInit {
  user: User | undefined;

  constructor(private http: HttpClient) {
    http.get<User>(`${environment.apiUrl}/users/`).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
  }

}
