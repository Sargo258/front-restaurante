import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        console.log('Login response:', response); // Agrega este log
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  registerUser(userData: any): Observable<any> {
    console.log('Register URL:', `${this.baseUrl}/users`)
    return this.http.post<any>(`${this.baseUrl}/users`, userData);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token; // Verifica si el token está presente
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }
}
