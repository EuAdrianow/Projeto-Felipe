import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';

interface Oferta {
  id: number;
  name: string;
  category: string;
  icon: string;
  price: number;
  oldPrice: number;
  badge: string;
  reviews: number;
  installments: boolean;
}

@Component({
  selector: 'app-ofertas',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    RouterLink,
    Header,
    Menu,
    Footer,
    FormsModule
  ],
  templateUrl: './ofertas.html',
  styleUrls: ['./ofertas.css']
})
export class Ofertas {
  currentYear = new Date().getFullYear();

  selectedCategory = 'Todas';
  sortOrder = 'discount';

  toastMessage = '';

  categories = [
    'Todas',
    'Hardware',
    'Periféricos',
    'Monitores',
    'Computadores'
  ];

  offers: Oferta[] = [
    {
      id: 1,
      name: 'Headset Gamer Surround',
      category: 'Periféricos',
      icon: '🎧',
      price: 189.90,
      oldPrice: 279.90,
      badge: '32% OFF',
      reviews: 128,
      installments: true
    },
    {
      id: 2,
      name: 'Teclado Mecânico RGB',
      category: 'Periféricos',
      icon: '⌨️',
      price: 249.90,
      oldPrice: 349.90,
      badge: '29% OFF',
      reviews: 94,
      installments: true
    },
    {
      id: 3,
      name: 'Mouse Gamer 12800 DPI',
      category: 'Periféricos',
      icon: '🖱️',
      price: 99.90,
      oldPrice: 149.90,
      badge: '33% OFF',
      reviews: 216,
      installments: true
    },
    {
      id: 4,
      name: 'Monitor Gamer 144Hz',
      category: 'Monitores',
      icon: '🖥️',
      price: 899.90,
      oldPrice: 1199.90,
      badge: '25% OFF',
      reviews: 73,
      installments: true
    },
    {
      id: 5,
      name: 'Memória RAM 16GB',
      category: 'Hardware',
      icon: '▥',
      price: 229.90,
      oldPrice: 319.90,
      badge: '28% OFF',
      reviews: 61,
      installments: true
    },
    {
      id: 6,
      name: 'SSD NVMe 1TB',
      category: 'Hardware',
      icon: '💾',
      price: 349.90,
      oldPrice: 469.90,
      badge: '26% OFF',
      reviews: 142,
      installments: true
    },
    {
      id: 7,
      name: 'Gabinete Gamer RGB',
      category: 'Computadores',
      icon: '🖥️',
      price: 299.90,
      oldPrice: 399.90,
      badge: '25% OFF',
      reviews: 48,
      installments: true
    },
    {
      id: 8,
      name: 'Mousepad Gamer XL',
      category: 'Periféricos',
      icon: '▰',
      price: 59.90,
      oldPrice: 89.90,
      badge: '33% OFF',
      reviews: 187,
      installments: false
    }
  ];

  get filteredOffers(): Oferta[] {
    let result = [...this.offers];

    if (this.selectedCategory !== 'Todas') {
      result = result.filter(
        offer => offer.category === this.selectedCategory
      );
    }

    switch (this.sortOrder) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;

      case 'discount':
        result.sort(
          (a, b) => this.getDiscount(b) - this.getDiscount(a)
        );
        break;

      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }

  get totalSavings(): number {
    return this.offers.reduce(
      (total, offer) => total + (offer.oldPrice - offer.price),
      0
    );
  }

  getDiscount(offer: Oferta): number {
    if (offer.oldPrice <= 0) {
      return 0;
    }

    return Math.round(
      ((offer.oldPrice - offer.price) / offer.oldPrice) * 100
    );
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearFilters(): void {
    this.selectedCategory = 'Todas';
    this.sortOrder = 'discount';
  }

  addToCart(offer: Oferta): void {
    /*
     * Demonstração local.
     * Integre aqui o serviço de carrinho da sua aplicação
     * para adicionar o produto ao carrinho real.
     */
    this.toastMessage = `${offer.name} selecionado!`;

    setTimeout(() => {
      this.toastMessage = '';
    }, 3000);
  }
}