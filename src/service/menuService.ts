import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuUrl = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) {}

  createMenu(menuData: any): Observable<any> {
    return this.http.post(this.menuUrl, menuData);
  };

  getMenuItems(isAdmin: boolean = false): Observable<any[]> {
    const params = new HttpParams().set('isAdmin', isAdmin ? 'true' : 'false');
    return this.http.get<any[]>(this.menuUrl, { params });
  };
  
  updateMenuItem(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.menuUrl}/${id}`, updatedData);
  }
}
