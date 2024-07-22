import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../../service/menuService';
import { ModalMenuComponent } from '../components/modal-menu/modal-menu.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ CommonModule, ModalMenuComponent, FormsModule ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  filteredMenuItems: any[] = [];
  selectedItem: any = null;
  userRole: string = '';
  searchTerm: string = '';
  priceRange: { min: number, max: number } = { min: 0, max: Infinity };

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenuItems();
    this.getUserRole();
  }

  loadMenuItems() {
    this.menuService.getMenuItems().subscribe(
      menuItems => {
        this.menuItems = menuItems;
        this.filteredMenuItems = menuItems;
      },
      error => {
        console.error('Failed to load menu items:', error);
      }
    );
  }

  getUserRole() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userRole = user.role;
  }

  onSelectItem(item: any) {
    if (this.userRole !== 'admin') {
      return;
    }
    this.selectedItem = item;
  }

  updateMenuItem(item: any) {
    this.menuService.updateMenuItem(item.id, item).subscribe(
      updatedItem => {
        const index = this.menuItems.findIndex(menuItem => menuItem.id === updatedItem.id);
        if (index !== -1) {
          this.menuItems[index] = updatedItem;
        }
        this.selectedItem = null;
        this.loadMenuItems();
      },
      error => {
        console.error('Failed to update menu item:', error);
      }
    );
  }

  closeModal() {
    this.selectedItem = null;
  }

  applyFilters() {
    console.log('Applying filters with search term:', this.searchTerm, 'and price range:', this.priceRange);

    this.filteredMenuItems = this.menuItems.filter(item => {
      const matchesSearchTerm = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesPriceRange = item.price >= this.priceRange.min && item.price <= this.priceRange.max;
      return matchesSearchTerm && matchesPriceRange;
    });

    console.log('Filtered menu items:', this.filteredMenuItems);
  }

  search() {
    console.log('Searching with term:', this.searchTerm);
    this.applyFilters(); 
  }
}
