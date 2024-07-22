import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-menu',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule],
  templateUrl: './modal-menu.component.html',
  styleUrl: './modal-menu.component.css'
})
export class ModalMenuComponent {

  @Input() selectedItem: any = null;
  @Output() updateItem = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  editForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnChanges() {
    if (this.selectedItem) {
      this.editForm.patchValue({
        name: this.selectedItem.name,
        description: this.selectedItem.description,
        price: this.selectedItem.price
      });
    }
  }

  onSubmit() {
    if (this.editForm.invalid || !this.selectedItem) {
      return;
    }
    const { name, description, price } = this.editForm.value;
    this.updateItem.emit({ ...this.selectedItem, name, description, price });
    this.closeModal.emit();
  }
}

