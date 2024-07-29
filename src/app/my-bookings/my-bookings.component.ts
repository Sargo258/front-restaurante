import { Component, OnInit } from '@angular/core';
import { Reservation } from '../interface/bookings.model';
import { BookingsService } from '../../service/bookingsService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  reservations: Reservation[] = [];
  errorMessage: string | null = null;


  constructor(private bookingsService: BookingsService) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.fetchReservations(parseInt(userId, 10));
    } else {
      this.errorMessage = 'User ID is not available';
    }
  }

  

  fetchReservations(userId: number): void {
    this.bookingsService.getReservationsByUserId(userId).subscribe({
      next: (data) => {
        this.reservations = data;
      },
      error: (err) => {
        console.error('Error fetching reservations:', err);
        this.errorMessage = 'Failed to load reservations';
      }
    });
  }

  softDeleteReservation(id: number): void {
    this.bookingsService.softDeleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(reservation => reservation.id !== id);
      },
      error: (error) => console.error('Error soft-deleting reservation', error)
    });
    
  }
};



