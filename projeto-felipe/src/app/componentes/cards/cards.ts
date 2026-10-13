import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Produto {
  id: number;
  nome: string;
  categoria: string;
  descricao: string;
  preco: number;
  precoAnterior?: number;
  imagem: string;
  selo?: string;
  especificacoes?: string[];
  avaliacao?: number;
  estoque?: boolean;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cards.html',
  styleUrls: ['./cards.css']
})
export class CardsComponent {
  @Input() produtos: Produto[] = [];
  @Input() mostrarCategoria = true;
  @Output() adicionar = new EventEmitter<Produto>();
  @Output() favoritar = new EventEmitter<Produto>();

  favoritos = new Set<number>();

  alternarFavorito(produto: Produto): void {
    if (this.favoritos.has(produto.id)) {
      this.favoritos.delete(produto.id);
    } else {
      this.favoritos.add(produto.id);
    }
    this.favoritar.emit(produto);
  }

  imagemIndisponivel(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x420/17151f/e9ddff?text=TechPec';
  }
}
