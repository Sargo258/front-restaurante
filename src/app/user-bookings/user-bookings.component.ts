// src/app/user-bookings/user-bookings.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../service/bookingsService';
import { DatePipe } from '@angular/common';
import { Reservation, ReservationWithFormattedDate } from '../interface/bookings.model';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule],
  providers: [DatePipe], 
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  reservations: ReservationWithFormattedDate[] = []; 
  errorMessage: string | null = null;

  constructor(
    private bookingsService: BookingsService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.bookingsService.getAllReservations().subscribe({
      next: (data: Reservation[]) => {
        const today = new Date().toISOString().split('T')[0];
        this.reservations = data
          .filter(reservation => {
            const reservationDate = reservation.date.split('T')[0];
            return reservationDate >= today;
          })
          .map(reservation => ({
            ...reservation,
            formattedDate: this.datePipe.transform(reservation.date, 'MMM d, yyyy') || null // Usar `null` si la transformación no devuelve valor
          }));
      },
      error: (err) => {
        this.errorMessage = err.message || 'An error occurred';
      }
    });
  }
}

