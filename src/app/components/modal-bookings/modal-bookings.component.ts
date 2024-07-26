import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-bookings',
  standalone: true,
  imports: [],
  templateUrl: './modal-bookings.component.html',
  styleUrl: './modal-bookings.component.css'
})
export class ModalBookingsComponent {
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success'; // Puede ser 'success' o 'error'
  @Output() close = new EventEmitter<void>();

  get modalClass() {
    return this.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  }

  closeModal() {
    this.close.emit();
  }

}
