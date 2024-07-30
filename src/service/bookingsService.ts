// src/app/service/bookingsService.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Reservation } from '../app/interface/bookings.model';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookingsUrl = `${environment.apiUrl}/bookings`; // URL base para reservas

  constructor(private http: HttpClient) {}

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.bookingsUrl, reservation);
  }

  getReservationById(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.bookingsUrl}/${id}`);
  }

  getReservationsByUserId(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.bookingsUrl}/user/${userId}`);
  }

  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/reservations/all`); // Ruta especial
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.bookingsUrl}/${id}`, reservation);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.bookingsUrl}/${id}`);
  }

  softDeleteReservation(id: number): Observable<any> {
    return this.http.patch<any>(`${this.bookingsUrl}/${id}`, {});
  }
}
