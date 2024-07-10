import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit{
  @Input() title: string = 'Alert';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  showModal: boolean = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.closeModal();
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['type'] && !changes['type'].isFirstChange()) {
      // Actualizamos la visibilidad del modal según el tipo
      this.showModal = true;
       // Mostrar el modal cuando cambie el tipo
      
    }
  }

  closeModal() {
    this.showModal = false
  }
}
