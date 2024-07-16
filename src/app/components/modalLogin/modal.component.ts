import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnChanges{
  @Input() title: string = 'Alert';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  showModal: boolean = true;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && !changes['type'].isFirstChange()) {
      // Actualizamos la visibilidad del modal según el tipo
      this.showModal = true;
    }
  }

  closeModal() {
    this.showModal = false
  }
}
