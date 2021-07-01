import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { environment } from 'src/app/environment';
import { User } from 'src/app/interfaces/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Country} from '../../interfaces/country';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services';

@Component({
  selector: 'app-mijnaccount',
  templateUrl: './mijnaccount.component.html',
  styleUrls: ['./mijnaccount.component.css']
})
export class MijnaccountComponent implements OnInit {
  user!: User;
  updateForm!: FormGroup;
  submitted = false;
  error!: string;
  loading = false;
  countries: Country[] = [];

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.http.get<Country[]>(`${environment.apiUrl}/countries`).subscribe(countries => this.countries = countries);
    this.http.get<User>(`${environment.apiUrl}/users/`).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  get f(){
    return this.updateForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    // stop if form is invalid
    if (this.updateForm.invalid){
      console.log('Invalid update form');
      return;
    }
    this.loading = true;
    this.authService
      .update(this.user.email, this.f.password.value, this.f.birthday.value, this.f.country.value, this.user)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
      );
  }

  formatDate(date: Date): string {
    return moment(date).format('DD-MM-YYYY');
  }
}
