import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');

    const authReq = token ? req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ${token}' // Puedes reemplazar esto con un token dinámico si es necesario
      }
    }): req;
    return next.handle(authReq);
  }
}

