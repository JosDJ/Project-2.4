import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

import { environment } from '../environment';
import { AuthenticationResponse } from '../interfaces/authentication-response';
import { JWTPayload } from '../interfaces/jwt-payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');

    if (token == null) {
      return false;
    }

    const decoded = jwt_decode<JWTPayload>(token);
    const now = (Math.floor((new Date()).getTime() / 1000));

    return now <= decoded.exp;
  }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const result = this.http.post<any>(`${environment.apiUrl}/login`, body, httpOptions);

    result.subscribe(data => this.setToken(data));

    return result;
  }

  private setToken(authResponse: AuthenticationResponse): void {
    localStorage.setItem('token', authResponse.access_token);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  register(username: string, password: string, birthday: string, country: string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };
    const postBody = {
      email: username,
      birthday,
      country_id: country,
      password
    };
    console.log(postBody);
    const result = this.http.post<any>(`${environment.apiUrl}/register`, postBody, httpOptions);
    return result;
  }
}
