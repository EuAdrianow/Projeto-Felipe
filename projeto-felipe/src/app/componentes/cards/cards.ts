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
export class Cards {
  @Input() produtos: Produto[] = [];
  @Input() mostrarCategoria = true;
  @Output() adicionar = new EventEmitter<Produto>();
  @Output() favoritar = new EventEmitter<Produto>();

  favoritos = new Set<number>();

  trackById(_: number, produto: Produto): number {
    return produto.id;
  }

  alternarFavorito(produto: Produto): void {
    // Nova referência do Set para o Angular detectar a mudança
    const next = new Set(this.favoritos);
    if (next.has(produto.id)) {
      next.delete(produto.id);
    } else {
      next.add(produto.id);
    }
    this.favoritos = next;
    this.favoritar.emit(produto);
  }

  imagemIndisponivel(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'https://placehold.co/600x420/17151f/e9ddff?text=TechPec';
  }
}
