import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../service/menuService';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule,ReactiveFormsModule ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  selectedItem: any = null;
  editForm: FormGroup;

  constructor(private menuService: MenuService, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuService.getMenuItems().subscribe(
      menuItems => {
        this.menuItems = menuItems;
      },
      error => {
        console.error('Failed to load menu items:', error);
      }
    );
  }
  
  onSelectItem(item: any) {
    this.selectedItem = item;
    this.editForm.patchValue({
      name: item.name,
      description: item.description,
      price: item.price
    });
  }

  onSubmit() {
    if (this.editForm.invalid || !this.selectedItem) {
      return;
    }

    const { name, description, price } = this.editForm.value;
    const { id } = this.selectedItem;

    this.menuService.updateMenuItem(id, { name, description, price }).subscribe(
      updatedItem => {
        
        const index = this.menuItems.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          this.menuItems[index] = updatedItem;
        }

        
        this.selectedItem = null;
        this.editForm.reset();
        this.loadMenuItems();
      },
      error => {
        console.error('Failed to update menu item:', error);
        
      }
    );
  }
}