import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services';
import {HttpClient} from '@angular/common/http';
import {Country} from '../../interfaces/country';
import {environment} from '../../environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  returnUrl !: string;
  submitted = false;
  error!: string;
  loading = false;
  countries: Country[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.http.get<Country[]>(`${environment.apiUrl}/countries`).subscribe(countries => this.countries = countries);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      birthday: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    // redirect if user is already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  // tslint:disable-next-line:typedef
  get f(){
    return this.registerForm.controls;
  }

  // tslint:disable-next-line:typedef
  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid){
      console.log('invalid registerform');
      return;
    }
    this.loading = true;
    this.authService
      .register(this.f.username.value, this.f.password.value, this.f.birthday.value, this.f.country.value)
      .subscribe(
        res => console.log(res),
        err => console.log(err)
    );
  }
}
