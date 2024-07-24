import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menuService';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  featuredMenuItems: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadFeaturedMenuItems();
  }

  loadFeaturedMenuItems() {
    this.menuService.getFeaturedMenuItems().subscribe(
      items => {
        this.featuredMenuItems = items;
      },
      error => {
        console.error('Failed to load featured menu items:', error);
      }
    );
  }
}
