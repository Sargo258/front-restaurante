import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:3000/api/menu';

  constructor(private http: HttpClient) {}

  createMenu(menuData: any): Observable<any> {
    return this.http.post(this.apiUrl, menuData);
  }
}
