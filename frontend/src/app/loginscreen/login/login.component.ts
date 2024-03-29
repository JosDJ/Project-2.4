import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginscreenModule } from '../loginscreen.module';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';


    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('invalid loginform');
      return;
    }

    this.loading = true;
    this.authService
      .login(this.f.username.value, this.f.password.value)
      // .pipe(first())
      .subscribe(
        (data) => {
          if (this.authService.isLoggedIn()) {
            this.router.navigate([this.returnUrl]);
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
          this.error = 'this username and password are incorrect';
        }
      );
  }

  @Output() exampleOutput = new EventEmitter<boolean>();
  visible = false;
  loginClicked() {
    this.visible = !this.visible;
    console.log('test123' + this.visible);
    this.exampleOutput.emit(this.visible);
  }
}
