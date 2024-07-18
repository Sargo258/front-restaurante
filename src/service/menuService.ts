import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(this.menuUrl,);
  };
  
  updateMenuItem(id: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.menuUrl}/${id}`, updatedData);
  }
}
