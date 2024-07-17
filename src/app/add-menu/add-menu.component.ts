import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalComponent } from '../components/modalLogin/modal.component';
import { urlValidator } from '../../validators/urlValidator';
import { MenuService } from '../../service/menuService';

@Component({
  selector: 'app-add-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent {
  menuForm: FormGroup;
  showAlert: boolean = false;
  alertMessage: string = '';
  alertType: 'success' | 'error' = 'success';
  showModal: boolean = false;;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private menuService: MenuService) {
    this.menuForm = this.fb.group({
      name: ['', [Validators.required]],
      image_url: ['', [Validators.required, urlValidator()]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    this.menuForm.markAllAsTouched();
  if (this.menuForm.invalid) {
    this.showAlertModal('error', 'Please fill in all fields correctly.');
    return;
  }

  const menuData = this.menuForm.value;

  this.menuService.createMenu(menuData).subscribe({
    next: (response) => {
      console.log('Menu item created', response);
      this.showAlertModal('success', 'Menu item created successfully!');
      this.router.navigate(['/menu']);
    },
    error: (error) => {
      console.error('Failed to create menu item:', error);
      this.showAlertModal('error', 'Failed to create menu item. Please try again.');
    }
    });
  }

  private showAlertModal(type: 'success' | 'error', message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 2000);
  }
}
