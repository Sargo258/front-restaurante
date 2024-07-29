import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Reservation } from '../interface/bookings.model';
import { BookingsService } from '../../service/bookingsService';
import { ModalBookingsComponent } from '../components/modal-bookings/modal-bookings.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [FormsModule, ModalBookingsComponent, CommonModule],
  templateUrl: './bookings.component.html',
  styleUrl: './bookings.component.css'
})
export class BookingsComponent {

  reservation: Reservation = {

    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    people: 1,
    user_id: this.getUserId() 
    
  };
  showModal: boolean = false;
  modalMessage: string = '';
  modalType: 'success' | 'error' = 'success';

  constructor(private bookingsService: BookingsService) {}

  makeReservation() {
    this.reservation.user_id = this.getUserId();
    if (this.reservation.user_id === null) {
      console.error('No user_id found');
      this.showModal = true;
      this.modalMessage = 'Error: User not logged in.';
      this.modalType = 'error';
      return;
    }
    this.bookingsService.createReservation(this.reservation).subscribe(
      response => {
        console.log('Reservation successful:', response);
        this.modalMessage = 'Reservation successful!';
        this.modalType = 'success';
        this.showModal = true;
      },
      error => {
        if (error.status === 400) {
          this.modalMessage = 'You already have a reservation for this date.';
        } else {
          this.modalMessage = 'Error making reservation. Please try again.';
        }
        this.modalType = 'error';
        this.showModal = true;
      }
    );
  }

  closeModal() {
    this.showModal = false;
  }

  private getUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.id;
    }
    return null;
  }
}
