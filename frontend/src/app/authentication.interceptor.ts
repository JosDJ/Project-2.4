import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      // request = request.clone({headers: request.headers.set('Authorization', `Bearer ${token}`)})
      const headers = request.headers.set('Authorization', `Bearer ${token}`)

      request = request.clone({headers: headers});
    }

    return next.handle(request);
  }
}
