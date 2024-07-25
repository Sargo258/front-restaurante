import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../service/menuService';
import { CommonModule } from '@angular/common';
import { CommentsService } from '../../service/commnetService';
import { Comments } from '../interface/comment.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  featuredMenuItems: any[] = [];
  testimonials: Comments[] = [];
  newTestimonial = '';

  constructor(private menuService: MenuService, private comentsService: CommentsService) {}

  ngOnInit(): void {
    this.loadFeaturedMenuItems();
    this.loadTestimonials();
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

  loadTestimonials(): void {
    this.comentsService.getTestimonials().subscribe(
      (data) => this.testimonials = data,
      (error) => console.error('Error fetching testimonials', error)
    );
  }

  submitTestimonial(): void {
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;
    if (!this.newTestimonial.trim()) {
      return;
    }

    this.comentsService.addTestimonial(userId, this.newTestimonial).subscribe(
      () => {
        this.newTestimonial = '';
        this.loadTestimonials(); // Reload testimonials to show the new one
      },
      error => {
        console.error('Failed to submit testimonial:', error);
        alert('Failed to submit testimonial');
      }
    );
  }
}
