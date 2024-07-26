import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Reservation } from '../app/interface/bookings.model';

@Injectable({
    providedIn: 'root'
  })

  export class BookingsServie {
    private bookingsUrl = `${environment.apiUrl}/reservations`;

    constructor(private http: HttpClient) {}

    createReservation(reservation: Reservation): Observable<Reservation>{
        return this.http.post<Reservation>(this.bookingsUrl, reservation)
    };

    getReservationById(id: number): Observable<Reservation> {
        return this.http.get<Reservation>(`${this.bookingsUrl}/${id}`);
    };

    updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
        return this.http.put<Reservation>(`${this.bookingsUrl}/${id}`, reservation);
    };

    deleteReservation(id: number): Observable<void> {
        return this.http.delete<void>(`${this.bookingsUrl}/${id}`);
    };

  }