import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Header } from '../../componentes/header/header';
import { Menu } from '../../componentes/menu/menu';
import { Footer } from '../../componentes/footer/footer';
import { CarrinhoService } from '../../services/carrinhoservice/carrinhoservice';

interface Category {
  name: string;
  icon: string;
  style: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  reviews: number;
  installments: boolean;
  favorite: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Header,
    Menu,
    Footer,
    
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home {
  private readonly carrinhoService = inject(CarrinhoService);
  currentYear = new Date().getFullYear();

  searchTerm = '';
  selectedCategory = '';
  sortOrder = 'featured';
  email = '';

  cartCount = 0;
  toastMessage = '';

  private toastTimeout?: ReturnType<typeof setTimeout>;

  categories: Category[] = [
    {
      name: 'Placas de vídeo',
      icon: '🎮',
      style: 'category-gpu'
    },
    {
      name: 'Processadores',
      icon: '⚡',
      style: 'category-cpu'
    },
    {
      name: 'Periféricos',
      icon: '⌨️',
      style: 'category-peripherals'
    },
    {
      name: 'Monitores',
      icon: '🖥️',
      style: 'category-monitors'
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Placa de Vídeo GeForce RTX 4060',
      category: 'Placas de vídeo',
      image: 'assets/images/rtx-4060.png',
      price: 1899.90,
      oldPrice: 2299.90,
      badge: 'OFERTA',
      reviews: 128,
      installments: true,
      favorite: false
    },
    {
      id: 2,
      name: 'Processador AMD Ryzen 7 5700x',
      category: 'Processadores',
      image: 'assets/images/ryzen-7-5700x.png',
      price: 1499.90,
      oldPrice: 1699.90,
      badge: 'MAIS VENDIDO',
      reviews: 94,
      installments: true,
      favorite: false
    },
    {
      id: 3,
      name: 'Teclado Magnético Aula WIN60HE',
      category: 'Periféricos',
      image: 'assets/images/teclado-aula-win60he.png',
      price: 249.90,
      oldPrice: 329.90,
      badge: 'OFERTA',
      reviews: 76,
      installments: true,
      favorite: false
    },
    {
      id: 4,
      name: 'Monitor OLED LG UltraGear 27" 240hz',
      category: 'Monitores',
      image: 'assets/images/monitor-lgultragear-27-240.png',
      price: 1099.90,
      reviews: 63,
      installments: true,
      favorite: false
    },
    {
      id: 5,
      name: 'Placa de Vídeo NVidia RTX 5070ti',
      category: 'Placas de vídeo',
      image: 'assets/images/rog-strix-5070ti.png',
      price: 2399.90,
      oldPrice: 2699.90,
      reviews: 51,
      installments: true,
      favorite: false
    },
    {
      id: 6,
      name: 'Processador AMD Ryzen 5 5600',
      category: 'Processadores',
      image: 'assets/images/ryzen-5-5600.png',
      price: 899.90,
      reviews: 87,
      installments: true,
      favorite: false
    },
    {
      id: 7,
      name: 'Mouse Attack Shark X11',
      category: 'Periféricos',
      image: 'assets/images/mouse-gamer.webp',
      price: 159.90,
      oldPrice: 199.90,
      reviews: 112,
      installments: true,
      favorite: false
    },
    {
      id: 8,
      name: 'Monitor AOC Gaming 27" 300hz',
      category: 'Monitores',
      image: 'assets/images/monitor-aoc-27-300.png',
      price: 799.90,
      reviews: 45,
      installments: true,
      favorite: false
    }
  ];

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLocaleLowerCase('pt-BR');

    let result = this.products.filter(product => {
      const matchesCategory =
        !this.selectedCategory ||
        product.category === this.selectedCategory;

      const matchesSearch =
        !term ||
        product.name.toLocaleLowerCase('pt-BR').includes(term) ||
        product.category.toLocaleLowerCase('pt-BR').includes(term);

      return matchesCategory && matchesSearch;
    });

    switch (this.sortOrder) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;

      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;

      case 'name':
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name, 'pt-BR')
        );
        break;

      default:
        // Mantém a ordem original dos produtos em destaque.
        break;
    }

    return result;
  }

  selectCategory(categoryName: string): void {
    this.selectedCategory =
      this.selectedCategory === categoryName ? '' : categoryName;

    document.getElementById('produtos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  onSearch(event: Event): void {
    event.preventDefault();

    document.getElementById('produtos')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  sortProducts(): void {
    // A ordenação é aplicada automaticamente pelo getter
    // filteredProducts quando sortOrder é alterado.
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedCategory = '';
    this.sortOrder = 'featured';
  }

  toggleFavorite(product: Product): void {
    product.favorite = !product.favorite;

    this.showToast(
      product.favorite
        ? 'Produto adicionado aos favoritos!'
        : 'Produto removido dos favoritos!'
    );
  }

addToCart(product: Product): void {
  this.carrinhoService.adicionar({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category
  });
  this.showToast(`${product.name} adicionado ao carrinho!`);
}

  showCart(): void {
    this.showToast(
      this.cartCount > 0
        ? `Você tem ${this.cartCount} item(ns) no carrinho.`
        : 'Seu carrinho está vazio.'
    );
  }

  showAccount(): void {
    this.showToast('Acesse sua conta para continuar.');
  }

  subscribe(event: Event): void {
    event.preventDefault();

    const normalizedEmail = this.email.trim();

    if (!normalizedEmail) {
      this.showToast('Informe seu e-mail.');
      return;
    }

    this.showToast(
      'Cadastro demonstrativo recebido! A newsletter ainda precisa ser integrada.'
    );

    this.email = '';
  }

  private showToast(message: string): void {
    this.toastMessage = message;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.toastMessage = '';
      this.toastTimeout = undefined;
    }, 3000);
  }
}