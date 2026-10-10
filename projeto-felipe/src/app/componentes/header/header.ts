import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  searchTerm = '';

  @Output() search = new EventEmitter<string>();
  @Output() cartClicked = new EventEmitter<void>();

  onSearch(event: Event): void {
    event.preventDefault();
    this.search.emit(this.searchTerm.trim());
  }

  openCart(): void {
    this.cartClicked.emit();
  }
}