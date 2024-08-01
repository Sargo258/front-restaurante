import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Comments } from '../app/interface/comment.model';


@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  private commnetsUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  addTestimonial(userId: number, text: string): Observable<any> {
    return this.http.post(this.commnetsUrl, { user_id: userId, text });
  }

  getTestimonials(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.commnetsUrl);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.commnetsUrl}/${id}`);
  }
}
