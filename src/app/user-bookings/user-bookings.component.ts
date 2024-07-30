// src/app/user-bookings/user-bookings.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingsService } from '../../service/bookingsService';
import { Reservation } from '../interface/bookings.model';

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.css']
})
export class UserBookingsComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string | null = null;

  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    this.fetchAllReservations();
  }

  fetchAllReservations(): void {
    this.bookingsService.getAllReservations().subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Error fetching all reservations:', err);
        this.errorMessage = 'Failed to load reservations';
      }
    });
  }
}

